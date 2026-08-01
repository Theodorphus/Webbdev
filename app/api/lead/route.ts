import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'För många förfrågningar — försök igen om en stund.' },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    contact?: string;
    message?: string;
    transcript?: string;
    company?: string;
  };
  try {
    body = await req.json();
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

  const resend = new Resend(apiKey);

  const transcriptHtml = transcript
    ? `<hr><p><strong>Chatt-historik:</strong></p><pre style="white-space:pre-wrap;font-family:inherit;background:#f5f5f5;padding:12px;border-radius:8px">${escapeHtml(
        transcript,
      )}</pre>`
    : '';

  const { data, error } = await resend.emails.send({
    // Samma fallback-mönster som contact-rutten: RESEND_FROM när domänen är
    // verifierad i Resend, annars testavsändaren.
    from: process.env.RESEND_FROM ?? 'Webbdev Studio <onboarding@resend.dev>',
    to: 'webbdevstudio@gmail.com',
    replyTo: contact.includes('@') ? contact : undefined,
    subject: `💬 Nytt lead från chatten — ${name}`,
    html: `
      <p><strong>🎯 Nytt lead via chattboten</strong></p>
      <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
      <p><strong>Kontakt:</strong> ${escapeHtml(contact)}</p>
      ${message ? `<p><strong>Meddelande:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
      ${transcriptHtml}
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Lead email sent:', data?.id);
  return NextResponse.json({ ok: true });
}
