'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';

/**
 * Exit-intent popup.
 *
 * Fångar besökare som är på väg att lämna sidan (musen far upp mot
 * adressfältet/stäng-knappen på desktop) och erbjuder en gratis offert.
 * Visas en gång per session (sessionStorage) och bara på desktop — på mobil
 * finns ingen pålitlig "exit-intent"-signal, och där fyller sticky-CTA:n samma
 * roll. Skickar leadet till /api/lead (mejlar Theo), precis som chatt-widgeten.
 */

const SEEN_KEY = 'webbdev-exit-seen';

export default function ExitIntent() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  // Behåll "redan visad"-status i en ref så event-listenern kan läsa den utan
  // att registreras om.
  const armedRef = useRef(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Hoppa över helt om den redan visats i sessionen, eller på touch-enheter
    // (ingen muspekare → ingen meningsfull exit-intent).
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    armedRef.current = true;

    const trigger = () => {
      if (!armedRef.current) return;
      armedRef.current = false;
      sessionStorage.setItem(SEEN_KEY, '1');
      setOpen(true);
    };

    // Musen lämnar dokumentet uppåt (mot flikar/adressfält).
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || (e as MouseEvent & { toElement?: unknown }).toElement) return;
      if (e.clientY <= 0) trigger();
    };

    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, []);

  // Stäng på Escape + flytta fokus till stäng-knappen när den öppnas.
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    if (!name.trim() || !contact.trim()) {
      setValidationError(t.exitIntent.kravs);
      return;
    }
    setValidationError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          message: 'Lead via exit-intent popup',
          company,
        }),
      });
      if (!res.ok) throw new Error('lead failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.exitIntent.rubrik}
    >
      {/* Bakgrundsdimma — klick stänger */}
      <button
        type="button"
        aria-label={t.exitIntent.stang}
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-fade-in"
      />

      {/* Kort */}
      <div className="exit-card relative w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-[#0a0a18]/95 p-7 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl sm:p-9">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-[90px]" />

        {/* Stäng-knapp */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.exitIntent.stang}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          {status === 'success' ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">{t.exitIntent.success}</p>
            </div>
          ) : (
            <>
              {/* Betygsrad — socialt bevis högst upp i popupen */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15" aria-hidden>
                      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
                <span className="text-xs font-medium text-white/70">{t.heroTrust.betyg} · Google</span>
              </div>

              <h2 className="font-display text-2xl font-bold leading-tight text-white">
                {t.exitIntent.rubrik}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-white/60">{t.exitIntent.ingress}</p>

              <form onSubmit={submit} className="mt-6 space-y-3">
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.exitIntent.namnPlaceholder}
                  aria-label={t.exitIntent.namnPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                />
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t.exitIntent.kontaktPlaceholder}
                  aria-label={t.exitIntent.kontaktPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                />

                {validationError && <p className="text-xs text-red-300">{validationError}</p>}
                {status === 'error' && <p className="text-xs text-red-300">{t.exitIntent.fel}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-shine w-full rounded-full bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-900/40 transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60"
                >
                  {status === 'sending' ? t.exitIntent.skickar : t.exitIntent.skicka}
                </button>
              </form>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                {t.exitIntent.garanti}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
