import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { hasTrustedOrigin, readJsonBody } from '../_lib/request';

/**
 * AI-chatt-endpoint som streamar svar från Claude.
 *
 * Speglar säkerhetsmönstret i app/api/contact/route.ts: enkel rate-limit i
 * minnet och honeypot. Tar emot hela konversationen (stateless — klienten
 * skickar med historiken varje gång) och streamar tillbaka modellens svar
 * som ren text (text/plain), bit för bit.
 */

// Modell-id är komplett som det står — lägg inte till datum-suffix.
const MODEL = 'claude-haiku-4-5';

/** Max ~15 meddelanden per IP per 5 minuter (per serverless-instans, best effort). */
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 5 * 60 * 1000;
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

type Lang = 'sv' | 'en';
type ChatMessage = { role: 'user' | 'assistant'; content: string };

/** Tak för konversationens storlek — skyddar mot uppblåsta requests. */
const MAX_MESSAGES = 40;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 12000;

/**
 * Systemprompten ger boten allt den behöver veta om Webbdev Studio.
 * Hålls medvetet faktabaserad så att boten inte hittar på priser/villkor.
 * Innehållet speglar sidans dictionary, FAQ och företagsinfo.
 */
function systemPrompt(lang: Lang): string {
  const shared = `
FÖRETAG: Webbdev Studio — en enmansbyrå för webbutveckling i Göteborg, driven av Theodor (Theo).
KONTAKT: webbdevstudio@gmail.com · +46 70 952 58 22 · webbdev.se
TJÄNSTER: Moderna, snabba, konverteringsoptimerade hemsidor byggda i Next.js, React, TypeScript och Tailwind. Supabase-backend, admin-panel (CMS), Stripe-betalningar (e-handel), SEO-optimering.
LEVERANS: 3–7 arbetsdagar från godkänt designförslag. Fast pris — inga dolda kostnader, inget timpris.
PRISNIVÅER: cirka 2000, 4000 och 6000+ SEK beroende på projektets omfattning och kundens krav. Kunden får alltid en tydlig offert innan arbetet börjar. Tre paket:
- Bas (cirka 2000 SEK): responsiv hemsida, 5 sidor, kontaktformulär, mobiloptimerad.
- Premium (populärast, cirka 4000 SEK): allt i Bas + upp till 15 sidor + admin-panel + SEO + 1 månads support.
- Full Service (från cirka 6000 SEK): allt i Premium + fler sidor + e-handel via Stripe + avancerad admin-panel + 3 månaders support.
PROCESS: 1) Gratis analys/samtal, 2) Designförslag (godkänns innan bygget), 3) Byggnation, 4) Lansering (domän, SSL, hosting sköts åt kunden), 5) Support.
ÄGANDE: Kunden äger 100% av kod, design och innehåll — ingen inlåsning.
BETALNING: Del vid projektstart, resten vid lansering. Vanlig faktura.
`.trim();

  if (lang === 'en') {
    return `You are the friendly assistant on the website of Webbdev Studio, a web development studio in Gothenburg, Sweden.

Your job is to answer visitors' questions about the services, pricing, process and delivery times, and to gently guide interested visitors toward getting in touch (the contact form is in the "Kontakt" section, or they can email webbdevstudio@gmail.com / call +46 70 952 58 22).

Reply in English. Be concise, warm and helpful — a few sentences, not essays. Use the facts below; never invent prices, timelines or features that aren't listed. If you don't know something, say so honestly and suggest the visitor reach out to Theo directly. Do not promise anything binding on Theo's behalf — frame specifics as "typically" and point to a free analysis for an exact quote.

FACTS (Swedish source, answer in English):
${shared}`;
  }

  return `Du är den vänliga assistenten på webbplatsen för Webbdev Studio, en webbyrå i Göteborg.

Din uppgift är att svara på besökarnas frågor om tjänster, priser, process och leveranstider, och att varsamt guida intresserade besökare mot att höra av sig (kontaktformuläret finns i sektionen "Kontakt", eller så mejlar de webbdevstudio@gmail.com / ringer +46 70 952 58 22).

Svara på svenska. Var kortfattad, varm och hjälpsam — några meningar, inte uppsatser. Använd fakta nedan; hitta aldrig på priser, tidsramar eller funktioner som inte står med. Om du inte vet något, säg det ärligt och föreslå att besökaren hör av sig till Theo direkt. Lova inget bindande för Theos räkning — formulera detaljer som "brukar" och hänvisa till en gratis analys för en exakt offert.

FAKTA:
${shared}`;
}

export async function POST(req: Request) {
  if (!hasTrustedOrigin(req)) {
    return NextResponse.json({ error: 'Otillåten förfrågan.' }, { status: 403 });
  }

  let body: { messages?: ChatMessage[]; lang?: Lang; company?: string };
  try {
    body = await readJsonBody(req, 16_000);
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const { messages, company } = body;
  const lang: Lang = body.lang === 'en' ? 'en' : 'sv';

  // Honeypot: osynligt fält som bara bottar fyller i. Svara tomt och 200.
  if (company) {
    return new Response('', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }

  // Validera konversationen.
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }
  for (const m of messages) {
    if (
      !m ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length === 0 ||
      m.content.length > MAX_CHARS_PER_MESSAGE
    ) {
      return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
    }
  }

  if (messages.reduce((sum, message) => sum + message.content.length, 0) > MAX_TOTAL_CHARS) {
    return NextResponse.json({ error: 'Konversationen är för lång.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'För många meddelanden — försök igen om en stund.' },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt(lang),
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  // Streama modellens text-deltas till klienten som ren text.
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        stream.on('text', (delta) => {
          controller.enqueue(encoder.encode(delta));
        });
        await stream.finalMessage();
        controller.close();
      } catch (err) {
        console.error('Anthropic stream error:', err);
        // Strömmen kan redan ha skickat data; stäng den så att klienten
        // ser ett (möjligen ofullständigt) svar snarare än att hänga.
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
