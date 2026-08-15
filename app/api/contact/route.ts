import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { cleanSubject, hasTrustedOrigin, readJsonBody } from '../_lib/request';

/**
 * Enkel rate-limit i minnet: max 3 förfrågningar per IP per 10 minuter.
 * (Per serverless-instans — best effort, men stoppar burst-spam.)
 */
const RATE_LIMIT = 3;
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

  let body: { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  try {
    body = await readJsonBody(req, 8_000);
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: fältet är osynligt för människor — bottar fyller i det.
  // Svara 200 så botten tror att den lyckades.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
    !name.trim() || !email.trim() || !message.trim() ||
    name.length > 200 || email.length > 200 || message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
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
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  let result;
  try {
    result = await resend.emails.send({
      // Sätt RESEND_FROM (t.ex. "Webbdev Studio <kontakt@webbdev.se>") när
      // domänen är verifierad i Resend — testavsändaren är fallback.
      from: process.env.RESEND_FROM ?? 'Webbdev Studio <onboarding@resend.dev>',
      to: 'webbdevstudio@gmail.com',
      replyTo: cleanEmail,
      subject: `Ny förfrågan från ${cleanSubject(cleanName)}`,
      html: `
        <p><strong>Namn:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Meddelande:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>
      `,
    });
  } catch (error) {
    console.error('Resend request failed:', error);
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet.' }, { status: 500 });
  }

  const { data, error } = result;

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet.' }, { status: 500 });
  }

  console.log('Email sent:', data?.id);
  return NextResponse.json({ ok: true });
}
