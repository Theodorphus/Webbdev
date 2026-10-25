'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import type { ReactElement } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLang } from '../i18n/LanguageProvider';

// Ikoner för problem-korten, i samma ordning som t.problem.items.
const problemIcons: ReactElement[] = [
  // Förfrågningar
  <svg key="inquiry" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>,
  // Navigation
  <svg key="navigation" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>,
  // Intryck
  <svg key="trust" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>,
  // Laddtid
  <svg key="perf" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Mobil
  <svg key="mobile" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>,
  // Google
  <svg key="seo" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>,
];

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TjansterContent() {
  const { t, lang } = useLang();

  return (
    <main className="relative overflow-x-hidden pt-28">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Breadcrumbs lang={lang} items={[{ name: t.footer2.tjanster }]} />
      </div>

      <section id="tjanster" className="relative pb-16 pt-12">
        <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="mb-8 max-w-[46rem]">
            <p className="studio-eyebrow">{t.tjanster.etikett}</p>
            <h1 className="font-display mt-4 text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t.tjanster.rubrik}
            </h1>
            <p className="mt-[22px] text-[16.5px] leading-[1.65] text-muted [text-wrap:pretty]">{lang === 'sv' ? 'En tydlig presentation, enklare kontakt eller försäljning online. Jag utgår från vad din hemsida ska hjälpa kunden att göra och väljer teknik därefter.' : 'A clear introduction, easier contact or online sales. I start with what your website should help customers do and choose the technology to match.'}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.tjanster.items.map((item) => (
              <div key={item.title} className="group card-spotlight flex h-full flex-col gap-5 sm:flex-row rounded-2xl border border-foreground/8 bg-surface p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-surface-raised">
                {/* self-start: annars sträcks etiketten ut över hela kortet i mobilens kolumnlayout. */}
                <div className="mt-0.5 flex-shrink-0 self-start">
                  <div className="rounded-lg border border-foreground/15 bg-surface-raised px-2.5 py-1 font-sans text-xs text-muted whitespace-nowrap">
                    {item.tag}
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{item.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Avslutande CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <Link
              href={localizedHref("/#kontakt", lang)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-9 py-4 text-base font-semibold text-on-accent shadow-card transition-all hover:bg-accent-hover active:scale-[0.98]"
            >
              {t.tjansterSida.cta}
              <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="mb-10">
            <p className="studio-eyebrow">{t.problem.etikett}</p>
            <h2 className="font-display mt-4 text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
              {t.problem.rubrik}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.problem.items.map((item, i) => (
              <div key={item.label} className="card-spotlight h-full rounded-2xl border border-foreground/8 bg-surface p-7 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent-light">
                  {problemIcons[i]}
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground/95">{item.label}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Avslutande CTA — sidan ska inte sluta på problemen. */}
          <div className="mt-16 rounded-2xl border border-foreground/[0.09] bg-surface px-6 py-12 text-center sm:px-10">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {lang === 'sv' ? 'Känner du igen något av det här?' : 'Recognise any of this?'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              {lang === 'sv'
                ? 'Berätta hur din webbplats fungerar i dag och vad den borde hjälpa dig med. Jag återkommer inom 24 timmar med frågor och förslag på nästa steg.'
                : 'Tell me how your website works today and what it should help you with. I’ll reply within 24 hours with questions and suggested next steps.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <Link
                href={localizedHref("/#kontakt", lang)}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover"
              >
                {t.tjansterSida.cta}
                <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
              </Link>
              <Link href={localizedHref("/priser", lang)} className="studio-text-link">
                {lang === 'sv' ? 'Se priser' : 'See pricing'} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
