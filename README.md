# Webbdev Studio — webbdev.se

Sajten för Webbdev Studio: Next.js 16 (App Router, Turbopack), React 19,
TypeScript och Tailwind CSS 4. Hostas på Vercel och deployas automatiskt vid
push till `main`.

## Kom igång

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produktionsbygge
npm run lint
```

## Struktur

- `app/` — routes. Svenska sidor ligger i roten (`/priser`, `/tjanster` …), engelska under `/en`.
- `app/components/Home.tsx` — startsidan (server-renderad, delas av `/` och `/en`).
- `app/i18n/dictionary.ts` — synlig text på svenska och engelska.
- `app/blogg/posts.ts`, `app/portfolio/cases.ts`, `app/webbutveckling/orter.ts` — innehåll för blogg, kundcase och lokala landningssidor.
- `app/api/` — kontaktformulär, chatt-lead och AI-chatt. Delad säkerhetslogik (origin-kontroll, rate-limit) i `app/api/_lib/`.
- `app/sitemap.ts` — uppdatera datumen i `updated` när en sidas innehåll ändras.
- `assets/originals/` — kundens originalbilder (deployas inte).
- `docs/conversion-measurement.md` — vilka analytics-händelser som skickas.

## Miljövariabler

| Variabel | Krävs | Används till |
| --- | --- | --- |
| `RESEND_API_KEY` | ja | Mejl från kontaktformulär och chatt-leads |
| `RESEND_FROM` | nej | Avsändaradress för mejlen |
| `ANTHROPIC_API_KEY` | ja | AI-chatten |
| `NEXT_PUBLIC_SITE_URL` | nej | Kanonisk URL (standard `https://www.webbdev.se`) |
| `KV_REST_API_URL` + `KV_REST_API_TOKEN` | rekommenderas | Delad rate-limit via Upstash Redis (Vercel Marketplace → Upstash). `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` fungerar också. Utan dem räknas träffar per serverless-instans. |
| `CHAT_DAILY_LIMIT` | nej | Max antal chattmeddelanden per dygn för hela sajten (standard 400) |

## Google Ads contact conversions

The root layout mounts `GoogleAds` once, using `next/script` with
`afterInteractive`. The Ads destination is `AW-18237659170`. GA4 is not required
for this direct Ads integration; no GA4 property has been configured.

The **Kontaktformulär** event snippet is configured directly in
`app/lib/googleAds.ts`: `send_to` is
`AW-18237659170/XZ4aCMWl2sMcEKKwsvhD`, with value `1.0` and currency `SEK`.
No Google Ads environment variables are required in Vercel. Deploy the updated
code to activate it on the live website.

Consent uses basic mode: the queue is initialized with denied defaults, but the
Google script/config is loaded only after accepting advertising measurement.
Rejecting means no Google network requests on a fresh visit. The choice persists
in localStorage and can be changed with the Cookieinställningar link in the
footer and on the privacy policy page. Analytics storage and ad personalization
remain denied. Existing Vercel Analytics is separate.

The same Ads conversion is sent for all three enquiry flows: the contact form and
the free demo (both `/api/contact`) and chat leads (`/api/lead`). Only a
successful response with a server-generated `conversionId` triggers the event,
with that ID as `transaction_id`. Validation failures, rate limits, mail errors
and honeypot submissions do not trigger a conversion. Form contents are never
added to the event. Events before consent are not replayed.

Production verification (after deployment):

1. Open a clean browser profile without blockers and connect Google Tag Assistant
   to `https://www.webbdev.se`.
2. Accept advertising measurement. Confirm `typeof window.gtag === 'function'`,
   `Array.isArray(window.dataLayer)`, and a successful network load of
   `googletagmanager.com/gtag/js?id=AW-18237659170`.
3. Submit one agreed test inquiry. Confirm exactly one `conversion` event with the
   correct `send_to`, and a Google Ads conversion request in Network/Tag Assistant.
   A live submission sends a real email; use mocked API responses for local tests.
4. Check rejected consent, API error, reload and client navigation: no false or
   duplicate conversion events. Reopen cookie settings to test withdrawal.
5. Check Ads diagnostics later; a queued event alone does not prove Google received
   it, and a received test event does not guarantee an ad-attributed conversion.
