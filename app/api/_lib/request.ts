export function hasTrustedOrigin(req: Request): boolean {
  const fetchSite = req.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') return false;

  const origin = req.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';

  try {
    const originUrl = new URL(origin);
    const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const host = forwardedHost ?? req.headers.get('host');
    return Boolean(host && originUrl.host === host);
  } catch {
    return false;
  }
}

export async function readJsonBody<T>(req: Request, maxBytes: number): Promise<T> {
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error('unsupported-content-type');
  }

  const declaredLength = Number(req.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new Error('body-too-large');
  }

  // Enforce the limit while reading, including chunked requests without a
  // Content-Length header. Do not buffer an arbitrarily large body first.
  const reader = req.body?.getReader();
  if (!reader) throw new Error('missing-body');
  const decoder = new TextDecoder();
  let bytes = 0;
  let raw = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        throw new Error('body-too-large');
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  const parsed: unknown = JSON.parse(raw);
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('expected-json-object');
  }
  return parsed as T;
}

export function cleanSubject(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
