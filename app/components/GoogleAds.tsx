'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_CONSENT_KEY, GOOGLE_ADS_ID, initializeGoogleAds, setAdsConsent } from '../lib/googleAds';

export default function GoogleAds() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const pathname = usePathname();
  const english = pathname === '/en' || pathname.startsWith('/en/');

  useEffect(() => {
    initializeGoogleAds();
    let stored: string | null = null;
    try { stored = localStorage.getItem(ADS_CONSENT_KEY); } catch { /* Optional storage. */ }
    const saved = stored === 'granted' || stored === 'denied' ? stored : null;
    setAdsConsent(saved === 'granted');
    // Restore browser-only storage after hydration; SSR must render no banner.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(saved);
    setReady(true);
  }, []);

  function choose(value: 'granted' | 'denied') {
    setAdsConsent(value === 'granted');
    try { localStorage.setItem(ADS_CONSENT_KEY, value); } catch { /* Keep session choice. */ }
    setChoice(value);
    setEditing(false);
  }

  return <>
    {choice === 'granted' && <Script id="google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />}
    {ready && (choice === null || editing) ? <section aria-label={english ? 'Advertising measurement' : 'Annonsmätning'} className="fixed bottom-4 left-4 right-4 z-[100] max-w-lg rounded-2xl border border-foreground/20 bg-background p-5 text-foreground shadow-xl">
      <p className="font-semibold">{english ? 'Allow advertising measurement?' : 'Tillåt annonsmätning?'}</p>
      <p className="mt-2 text-sm">{english ? 'With your consent, Google Ads uses cookies to measure whether our ads lead to contact requests. Your form contents are not sent to Google.' : 'Med ditt samtycke använder Google Ads cookies för att mäta om våra annonser leder till kontaktförfrågningar. Formulärets innehåll skickas inte till Google.'} <Link className="underline" href="/integritetspolicy">{english ? 'Privacy policy' : 'Integritetspolicy'}</Link></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('denied')} className="rounded-full border border-foreground/30 px-5 py-2 text-sm">{english ? 'Decline' : 'Avvisa'}</button>
        <button type="button" onClick={() => choose('granted')} className="rounded-full border border-foreground/30 px-5 py-2 text-sm">{english ? 'Accept' : 'Godkänn'}</button>
      </div>
    </section> : ready && <button type="button" onClick={() => setEditing(true)} className="fixed bottom-2 left-2 z-[70] rounded-full border border-foreground/20 bg-background px-3 py-2 text-xs text-foreground">{english ? 'Cookie settings' : 'Cookieinställningar'}</button>}
  </>;
}
