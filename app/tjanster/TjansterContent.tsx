'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import { useRef, type ReactElement } from 'react';
import useAnimations from '../components/animations/useAnimations';
import { useLang } from '../i18n/LanguageProvider';

// Ikoner för problem-korten (flyttade från framsidan).
const problemIcons: Record<string, ReactElement> = {
  speed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ux: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  trust: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  perf: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  mobile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  seo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
};

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TjansterContent() {
  const scopeRef = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useAnimations(scopeRef);

  return (
    <main ref={scopeRef} className="relative overflow-x-hidden pt-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Tillbaka-länk */}
        <Link
          href={localizedHref("/", lang)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-light"
        >
          <span className="transition-transform group-hover:-translate-x-0.5"><IconBack /></span>
          {t.tjansterSida.tillbaka}
        </Link>
      </div>

      <section id="tjanster" className="relative py-16">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="eyebrow">{t.tjanster.etikett}</p>
            <h1 className="font-display mt-3 text-3xl font-bold text-foreground md:text-4xl">
              {t.tjanster.rubrik}
            </h1>
          </div>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted">{lang === 'sv' ? 'En tydlig presentation, enklare kontakt eller försäljning online. Vi utgår från vad din hemsida ska hjälpa kunden att göra och väljer teknik därefter.' : 'A clear introduction, easier contact or online sales. We start with what your website should help customers do and choose the technology to match.'}</p>
          <div className="grid gap-4 sm:grid-cols-2" data-animate-group data-stagger="0.07">
            {t.tjanster.items.map((item) => (
              <div key={item.title} className="group card-spotlight flex h-full flex-col gap-5 sm:flex-row rounded-2xl border border-foreground/8 bg-surface p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-surface-raised">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="rounded-lg border border-foreground/15 bg-surface-raised px-2.5 py-1 font-sans text-xs text-muted whitespace-nowrap">
                    {item.tag}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{item.title}</h3>
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
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="eyebrow">{t.problem.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-foreground md:text-4xl">
              {t.problem.rubrik}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.08">
            {t.problem.items.map((item, i) => ({ ...item, icon: [problemIcons.speed, problemIcons.ux, problemIcons.trust, problemIcons.perf, problemIcons.mobile, problemIcons.seo][i] })).map((item) => (
              <div key={item.label} className="card-spotlight h-full rounded-2xl border border-foreground/8 bg-surface p-7 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground/95">{item.label}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
