'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_CONSENT_KEY, COOKIE_SETTINGS_EVENT, GOOGLE_ADS_ID, initializeGoogleAds, setAdsConsent } from '../lib/googleAds';

export default function GoogleAds() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const banner = useRef<HTMLElement>(null);
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

  // Reopened from a "Cookieinställningar" link: move focus into the banner.
  useEffect(() => {
    const open = () => setEditing(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);
  useEffect(() => {
    if (editing) banner.current?.focus();
  }, [editing]);

  function choose(value: 'granted' | 'denied') {
    setAdsConsent(value === 'granted');
    try { localStorage.setItem(ADS_CONSENT_KEY, value); } catch { /* Keep session choice. */ }
    setChoice(value);
    setEditing(false);
  }

  return <>
    {choice === 'granted' && <Script id="google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />}
    {ready && (choice === null || editing) && <section ref={banner} tabIndex={-1} aria-label={english ? 'Advertising measurement' : 'Annonsmätning'} className="fixed bottom-4 left-4 right-4 z-[100] max-w-lg rounded-2xl border border-foreground/20 bg-background p-5 text-foreground shadow-xl outline-none">
      <p className="font-semibold">{english ? 'Allow advertising measurement?' : 'Tillåt annonsmätning?'}</p>
      <p className="mt-2 text-sm">{english ? 'With your consent, Google Ads uses cookies to measure whether ads for Webbdev Studio lead to contact requests. Your form contents are not sent to Google.' : 'Med ditt samtycke använder Google Ads cookies för att mäta om annonser för Webbdev Studio leder till kontaktförfrågningar. Formulärets innehåll skickas inte till Google.'} <Link className="underline" href="/integritetspolicy">{english ? 'Privacy policy' : 'Integritetspolicy'}</Link></p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose('denied')} className="rounded-full border border-foreground/30 px-5 py-2 text-sm">{english ? 'Decline' : 'Avvisa'}</button>
        <button type="button" onClick={() => choose('granted')} className="rounded-full border border-foreground/30 px-5 py-2 text-sm">{english ? 'Accept' : 'Godkänn'}</button>
      </div>
    </section>}
  </>;
}
