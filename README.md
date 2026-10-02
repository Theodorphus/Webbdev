This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Google Ads contact conversions

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
in localStorage and can be changed with Cookieinställningar. Analytics storage
and ad personalization remain denied. Existing Vercel Analytics is separate.

Only a successful `/api/contact` response with a server-generated `conversionId`
triggers the Ads event, with that ID as `transaction_id`. Validation failures,
rate limits, mail errors and honeypot submissions do not trigger a conversion.
Form contents are never added to the event. Events before consent are not replayed.

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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
