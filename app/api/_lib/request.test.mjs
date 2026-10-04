import assert from 'node:assert/strict';
import test from 'node:test';
import { readJsonBody, hasTrustedOrigin } from './request.ts';

function request(body, headers = {}) {
  return new Request('https://www.webbdev.se/api/contact', {
    method: 'POST', body,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

test('accepts a JSON object with Swedish text', async () => {
  assert.deepEqual(await readJsonBody(request('{"name":"Öckerö"}'), 100), { name: 'Öckerö' });
});

test('rejects null, arrays, primitives and invalid JSON before route destructuring', async () => {
  for (const body of ['null', '[]', '1', 'true', '"text"', '{']) {
    await assert.rejects(readJsonBody(request(body), 100));
  }
});

test('enforces bytes rather than character count without Content-Length', async () => {
  const body = '{"name":"öööö"}';
  await assert.rejects(readJsonBody(request(body), body.length), /body-too-large/);
  assert.deepEqual(await readJsonBody(request(body), Buffer.byteLength(body)), { name: 'öööö' });
});

test('cancels an oversized stream without consuming the remaining body', async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(101)); },
    cancel() { cancelled = true; },
  });
  const req = new Request('https://www.webbdev.se/api/contact', {
    method: 'POST', body: stream, duplex: 'half',
    headers: { 'content-type': 'application/json' },
  });
  await assert.rejects(readJsonBody(req, 100), /body-too-large/);
  assert.equal(cancelled, true);
});

test('handles UTF-8 characters split between network chunks', async () => {
  const bytes = new TextEncoder().encode('{"name":"Ö"}');
  const stream = new ReadableStream({
    start(controller) {
      for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
      controller.close();
    },
  });
  const req = new Request('https://www.webbdev.se/api/contact', {
    method: 'POST', body: stream, duplex: 'half',
    headers: { 'content-type': 'application/json' },
  });
  assert.deepEqual(await readJsonBody(req, 100), { name: 'Ö' });
});

test('rejects unsupported media types and oversized declared bodies', async () => {
  await assert.rejects(readJsonBody(request('{}', { 'content-type': 'text/plain' }), 100));
  await assert.rejects(readJsonBody(request('{}', { 'content-length': '101' }), 100));
});

test('accepts same-origin requests and rejects foreign origins', () => {
  assert.equal(hasTrustedOrigin(request('{}', { origin: 'https://www.webbdev.se', host: 'www.webbdev.se', 'sec-fetch-site': 'same-origin' })), true);
  assert.equal(hasTrustedOrigin(request('{}', { origin: 'https://other.example', host: 'www.webbdev.se', 'sec-fetch-site': 'cross-site' })), false);
});
