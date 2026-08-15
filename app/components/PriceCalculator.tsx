'use client';

import { useMemo, useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';

/**
 * Interaktiv priskalkylator i priser-sektionen.
 *
 * Besökaren väljer typ av sida, antal sidor och extra funktioner och får ett
 * ungefärligt prisintervall direkt — ett av de mest konverterande inslagen en
 * webbyrå kan ha. Resultatet länkar vidare till kontaktformuläret för en exakt
 * offert. Ren klient-logik; intervallet är medvetet ungefärligt och förankras i
 * prisnivåerna 2 000, 4 000 och 6 000+ kr för små till stora projekt.
 */

// Baspris per sidtyp (matchar paketens fasta priser).
const BASE: Record<string, number> = {
  landing: 2000,
  foretag: 4000,
  ehandel: 6000,
};

// Antal sidor som ingår i baspriset innan pris-per-sida slår in.
const INCLUDED_PAGES: Record<string, number> = {
  landing: 1,
  foretag: 5,
  ehandel: 8,
};

const PER_PAGE = 400; // tillägg per sida utöver de inkluderade
const PER_FEATURE = 1500; // tillägg per extra funktion
const MAX_PAGES = 20;

function formatPrice(value: number, lang: string): string {
  // Avrunda till närmaste 500 så intervallet ser "uppskattat" ut, inte exakt.
  const rounded = Math.round(value / 500) * 500;
  const grouped = rounded.toLocaleString(lang === 'sv' ? 'sv-SE' : 'en-US');
  // Priset är alltid i SEK — "kr" på svenska, "SEK" för engelska besökare.
  return lang === 'sv' ? `${grouped} kr` : `${grouped} SEK`;
}

export default function PriceCalculator() {
  const { t, lang } = useLang();
  const c = t.priser.kalkylator;

  const [type, setType] = useState('foretag');
  const [pages, setPages] = useState(INCLUDED_PAGES.foretag);
  const [features, setFeatures] = useState<string[]>([]);

  // Varje sidtyp startar på sitt inkluderade sidantal. Utan detta ligger
  // slidern kvar från förra valet och en landningssida prissätts som en
  // femsidig sajt — dubbelt mot vad priskortet lovar.
  function selectType(id: string) {
    setType(id);
    setPages(INCLUDED_PAGES[id] ?? INCLUDED_PAGES.foretag);
  }

  const { low, high } = useMemo(() => {
    const base = BASE[type] ?? BASE.foretag;
    const included = INCLUDED_PAGES[type] ?? INCLUDED_PAGES.foretag;
    const extraPages = Math.max(0, pages - included);
    const estimate = base + extraPages * PER_PAGE + features.length * PER_FEATURE;
    // Band runt estimatet: −10 % nedåt, +15 % uppåt. Medvetet asymmetriskt —
    // hellre ett intervall som tar i än ett som lovar för lågt.
    const low = Math.max(2000, estimate * 0.9);
    const high = Math.max(low + 500, estimate * 1.15);
    return { low, high };
  }, [type, pages, features]);

  function toggleFeature(id: string) {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }

  return (
    <div
      data-animate="block"
      className="relative mt-16 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#08080f] p-6 sm:p-9"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-[rgba(109,106,248,0.12)] blur-[100px]" />

      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
        {/* Vänster: val */}
        <div>
          <p className="eyebrow">{c.etikett}</p>
          <h3 className="font-display mt-2 text-2xl font-bold text-white md:text-3xl">{c.rubrik}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">{c.ingress}</p>

          {/* Typ av sida */}
          <fieldset className="mt-7">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
              {c.typLabel}
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {c.typer.map((opt) => {
                const active = type === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectType(opt.id)}
                    aria-pressed={active}
                    className={`rounded-2xl border p-3.5 text-left transition-all ${
                      active
                        ? 'border-[rgba(109,106,248,0.6)] bg-accent/10 ring-1 ring-accent/30'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className={`block text-sm font-semibold ${active ? 'text-white' : 'text-white/80'}`}>
                      {opt.namn}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-white/60">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Antal sidor */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="calc-pages" className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {c.sidorLabel}
              </label>
              <span className="rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-xs text-[#b4b2ff]">
                {pages} {pages === 1 ? c.sidorEn : c.sidorFlera}
              </span>
            </div>
            <input
              id="calc-pages"
              type="range"
              min={1}
              max={MAX_PAGES}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="calc-range w-full"
              aria-valuetext={`${pages} ${pages === 1 ? c.sidorEn : c.sidorFlera}`}
            />
          </div>

          {/* Extra funktioner */}
          <fieldset className="mt-7">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
              {c.funktionerLabel}
            </legend>
            <div className="flex flex-wrap gap-2">
              {c.funktioner.map((f) => {
                const active = features.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFeature(f.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                      active
                        ? 'border-[rgba(109,106,248,0.6)] bg-accent/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}
                    {f.namn}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Höger: resultat */}
        <div className="flex flex-col justify-center rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,#0c0b1c,#08080f)] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b4b2ff]/80">{c.resultatLabel}</p>
          <p className="font-display mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {formatPrice(low, lang)}
            <span className="mx-1.5 text-white/60">–</span>
            {formatPrice(high, lang)}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/60">{c.resultatNote}</p>

          <a
            href="#kontakt"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold text-white transition-all hover:bg-[#7d7aff] hover:shadow-[0_20px_60px_-15px_rgba(109,106,248,0.7)] active:scale-[0.99]"
          >
            {c.ctaText}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-3 text-center text-[11px] text-white/60">{c.ctaSub}</p>
        </div>
      </div>
    </div>
  );
}
