import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { cleanSubject, hasTrustedOrigin, readJsonBody } from '../_lib/request';

/**
 * Lead-endpoint för chatt-widgeten. Tar emot namn + kontaktuppgift (och
 * valfri kontext) från lead-kortet i chatten och mejlar det till Theo.
 *
 * Speglar säkerhetsmönstret i app/api/contact/route.ts: rate-limit i minnet,
 * honeypot och HTML-escaping av allt som hamnar i mejlet.
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/** Skydda mejlets HTML mot injicerad markup. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  if (!hasTrustedOrigin(req)) {
    return NextResponse.json({ error: 'Otillåten förfrågan.' }, { status: 403 });
  }

  let body: {
    name?: string;
    contact?: string;
    message?: string;
    transcript?: string;
    company?: string;
  };
  try {
    body = await readJsonBody(req, 12_000);
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const { name, contact, message, transcript, company } = body;

  // Honeypot: osynligt fält som bara bottar fyller i. Svara 200 så botten tror
  // att den lyckades.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !contact) {
    return NextResponse.json({ error: 'Namn och kontaktuppgift krävs.' }, { status: 400 });
  }
  if (
    typeof name !== 'string' ||
    typeof contact !== 'string' ||
    name.length > 200 ||
    contact.length > 200 ||
    (message != null && (typeof message !== 'string' || message.length > 2000)) ||
    (transcript != null && (typeof transcript !== 'string' || transcript.length > 8000))
  ) {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'För många förfrågningar — försök igen om en stund.' },
      { status: 429 },
    );
  }

  const cleanName = name.trim();
  const cleanContact = contact.trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const transcriptHtml = transcript
    ? `<hr><p><strong>Chatt-historik:</strong></p><pre style="white-space:pre-wrap;font-family:inherit;background:#f5f5f5;padding:12px;border-radius:8px">${escapeHtml(
        transcript,
      )}</pre>`
    : '';

  let result;
  try {
    result = await resend.emails.send({
      from: 'Webbdev Studio <onboarding@resend.dev>',
      to: 'webbdevstudio@gmail.com',
      replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact) ? cleanContact : undefined,
      subject: `💬 Nytt lead från chatten — ${cleanSubject(cleanName)}`,
      html: `
        <p><strong>🎯 Nytt lead via chattboten</strong></p>
        <p><strong>Namn:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Kontakt:</strong> ${escapeHtml(cleanContact)}</p>
        ${message ? `<p><strong>Meddelande:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
        ${transcriptHtml}
      `,
    });
  } catch (error) {
    console.error('Resend request failed:', error);
    return NextResponse.json({ error: 'Kunde inte skicka förfrågan.' }, { status: 500 });
  }

  const { data, error } = result;

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Kunde inte skicka förfrågan.' }, { status: 500 });
  }

  console.log('Lead email sent:', data?.id);
  return NextResponse.json({ ok: true });
}
