'use client';

import { Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { isPackageId, packageIds, packageLabels } from '../lib/packages';
import { useLang } from '../i18n/LanguageProvider';
import { trackConversion } from '../lib/analytics';

const inputClass = 'mt-2 w-full rounded-[14px] border border-foreground/15 bg-foreground/[0.04] px-5 py-4 text-base text-foreground placeholder:text-muted focus:border-accent-light';

function PackageField({ selectedPackage = '' }: { selectedPackage?: string }) {
  const { lang } = useLang();
  return <div className="space-y-2">
      <label className="block text-sm">{lang === 'sv' ? 'Jag är intresserad av' : 'I’m interested in'}<select key={selectedPackage} name="package" defaultValue={selectedPackage} className={`${inputClass} package-select`} aria-describedby="package-hint"><option value="">{lang === 'sv' ? 'Hjälp mig välja rätt lösning' : 'Help me choose the right solution'}</option>{packageIds.map(id => <option key={id} value={id}>{packageLabels[lang][id]}</option>)}</select></label>
      <p id="package-hint" className="text-xs leading-relaxed text-muted">{lang === 'sv' ? 'Du kan ändra valet. Det är en utgångspunkt för vårt samtal, ingen beställning.' : 'You can change this. It’s a starting point for our conversation, not an order.'}</p>
  </div>;
}

function RequestedPackageField() {
  const searchParams = useSearchParams();
  const requestedPackage = searchParams.get('paket');
  const selectedPackage = isPackageId(requestedPackage) ? requestedPackage : '';
  return <PackageField selectedPackage={selectedPackage} />;
}

export default function ContactForm() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [limited, setLimited] = useState(false);
  const started = useRef(false);
  const sending = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    const data = new FormData(event.currentTarget);
    setStatus('loading'); setLimited(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(20_000),
        body: JSON.stringify({ name: String(data.get('name') ?? '').trim(), email: String(data.get('email') ?? '').trim(), message: String(data.get('message') ?? '').trim(), package: data.get('package') ?? '', company: data.get('company') ?? '' }),
      });
      if (!response.ok) { setLimited(response.status === 429); throw new Error('Request failed'); }
      trackConversion('contact_submitted');
      setStatus('success');
    } catch { setStatus('error'); trackConversion('contact_error'); }
    finally { sending.current = false; }
  }

  if (status === 'success') return <div role="status" className="mt-10 rounded-2xl border border-accent/40 bg-accent/10 p-8 text-left"><h3 ref={successHeading} tabIndex={-1} className="font-display text-2xl font-semibold">{lang === 'sv' ? 'Din förfrågan är skickad.' : 'Your request has been sent.'}</h3><p className="mt-4 text-sm leading-relaxed text-foreground/70">{lang === 'sv' ? 'Tack! Jag går igenom ditt meddelande och återkommer via e-post inom 24 timmar. Därefter pratar vi om dina behov och nästa steg. Du har inte beställt något.' : 'Thank you! I will review your message and reply by email within 24 hours. We can then discuss your needs and next steps. You have not placed an order.'}</p><button type="button" onClick={() => { started.current = false; setStatus('idle'); }} className="mt-5 text-sm text-accent-light underline underline-offset-4">{lang === 'sv' ? 'Skriv ett nytt meddelande' : 'Write another message'}</button></div>;

  return <form onSubmit={submit} onFocusCapture={() => { if (!started.current) { started.current = true; trackConversion('contact_started'); } }} className="mt-10 text-left" aria-label={lang === 'sv' ? 'Kontaktformulär' : 'Contact form'}>
    <p className="mb-5 text-xs text-muted">{lang === 'sv' ? 'Fält markerade med * är obligatoriska.' : 'Fields marked * are required.'}</p>
    <fieldset disabled={status === 'loading'} className="space-y-5"><legend className="sr-only">{t.kontakt.rubrik}</legend>
      <div className="hidden" aria-hidden="true"><label>Lämna tomt<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <Suspense fallback={<PackageField />}><RequestedPackageField /></Suspense>
      <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm">{t.kontakt.namn} *<input name="name" autoComplete="name" required pattern=".*\S.*" maxLength={200} className={inputClass} placeholder={t.kontakt.namnPlaceholder} /></label><label className="block text-sm">{t.kontakt.epost} *<input name="email" autoComplete="email" type="email" required maxLength={200} className={inputClass} placeholder={t.kontakt.epostPlaceholder} /></label></div>
      <label className="block text-sm">{t.kontakt.meddelande} *<textarea name="message" rows={4} required minLength={2} maxLength={2000} className={inputClass} placeholder={t.kontakt.meddelandePlaceholder} /></label>
      {status === 'error' && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{limited ? (lang === 'sv' ? 'Flera förfrågningar har skickats. Vänta en stund och försök igen.' : 'Several requests have been sent. Please wait and try again.') : (lang === 'sv' ? 'Det gick inte att skicka. Dina uppgifter finns kvar. Försök igen eller mejla webbdevstudio@gmail.com.' : 'Could not send. Your details are still here. Try again or email webbdevstudio@gmail.com.')}</p>}
      <button type="submit" className="w-full rounded-full bg-accent px-6 py-4 text-base font-semibold text-on-accent hover:bg-[#7773ff] disabled:cursor-wait disabled:opacity-60">{status === 'loading' ? t.kontakt.skickar : t.kontakt.skicka} ↗</button>
    </fieldset>
    <p className="mt-4 text-center text-xs text-foreground/60">{t.kontakt.risk}</p>
  </form>;
}
