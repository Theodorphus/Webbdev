'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import { Reveal } from '../components/animations/Motion';
import PriceTerms from '../components/PriceTerms';
import PriceCalculator from '../components/PriceCalculator';
import { useLang } from '../i18n/LanguageProvider';
import { packageIds } from '../lib/packages';

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PriserContent() {
  const { t, lang } = useLang();

  return (
    <main className="relative overflow-x-hidden pb-32 pt-28">
      <div className="mx-auto max-w-[80rem] px-8">
        {/* Tillbaka-länk */}
        <Link
          href={localizedHref("/", lang)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-light"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            <IconBack />
          </span>
          {t.priserSida.tillbaka}
        </Link>

        {/* Sidhuvud */}
        <Reveal className="mt-14 max-w-[46rem]">
          <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-accent-light">
            {t.priser.etikett}
          </span>
          <h1 className="font-display mt-4 text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            {t.priser2.rubrik}
          </h1>
          <p className="mt-[22px] text-[16.5px] leading-[1.65] text-muted [text-wrap:pretty]">
            {t.priserSida.ingress}
          </p>
        </Reveal>

        {/* Paketen */}
        <div className="mt-[72px] grid gap-px overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.08] md:grid-cols-3">
          {t.priser.paket
            .map((p, i) => ({ ...p, id: packageIds[i], populer: i === 1 }))
            .map((p) => (
              <Reveal key={p.tier} className="flex">
                <div
                  className="flex w-full flex-col px-6 py-11 xl:px-9"
                  style={{
                    background: p.populer ? 'var(--surface-raised)' : 'var(--surface)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`font-sans text-xs uppercase tracking-[0.1em] ${
                        p.populer ? 'text-accent-light' : 'text-muted'
                      }`}
                    >
                      {p.tier}
                    </span>
                    {p.populer && (
                      <span className="rounded-full border border-[rgba(166,79,56,0.45)] bg-[rgba(166,79,56,0.18)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-accent-light">
                        {t.priser2.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-display mt-6 text-[clamp(30px,3.6vw,52px)] font-bold leading-tight tracking-[-0.03em] text-foreground">
                    {p.pris}
                  </div>
                  <p className="mt-2 text-xs text-accent-light">{lang === "sv" ? "Exkl. moms · vägledande pris" : "Excl. VAT · indicative price"}</p>
                  <p className="mt-2.5 text-sm text-muted">{p.desc}</p>
                  <div className="my-[30px] h-px bg-foreground/[0.08]" />
                  <ul className="flex flex-1 flex-col gap-[13px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14.5px] text-foreground/70">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-[3px] flex-shrink-0" aria-hidden>
                          <path d="M3.5 8l3 3 5-6.5" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${localizedHref('/', lang)}?paket=${p.id}#kontakt`}
                    className={`mt-9 block rounded-full py-[15px] text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                      p.populer
                        ? 'bg-accent text-on-accent hover:bg-accent-hover'
                        : 'border border-foreground/[0.18] text-foreground/80 hover:border-foreground/30 hover:text-foreground'
                    }`}
                  >
                    {t.priser.komIgang}
                  </Link>
                </div>
              </Reveal>
            ))}
        </div>

        <Reveal>
          <p className="mt-7 text-center text-[13.5px] leading-relaxed text-muted">
            {t.priser2.prisNotis}
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-3 text-center text-[13.5px] text-muted">
            {t.priser2.osaker1}{' '}
            <Link href={localizedHref("/#kontakt", lang)} className="font-medium text-accent-light transition-colors hover:text-accent-light">
              {t.priser2.osakerCta}
            </Link>{' '}
            {t.priser2.osaker2}
          </p>
        </Reveal>

        {/* Priskalkylator — interaktivt estimat */}
        <PriceTerms />
        <PriceCalculator />

        {/* Avslutande CTA */}
        <Reveal className="mt-[120px] rounded-2xl border border-foreground/[0.09] bg-surface px-8 py-14 text-center">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.02em] text-foreground">
            {t.priserSida.ctaRubrik}
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15.5px] leading-[1.65] text-muted">
            {t.priserSida.ctaText}
          </p>
          <Link
            href={localizedHref("/#kontakt", lang)}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-on-accent transition-transform active:scale-[0.98]"
          >
            {t.priserSida.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <IconArrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
