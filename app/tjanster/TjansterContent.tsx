'use client';

import Link from 'next/link';
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
  const scopeRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useAnimations(scopeRef);

  return (
    <div ref={scopeRef} className="relative overflow-x-hidden pt-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Tillbaka-länk */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-indigo-300"
        >
          <span className="transition-transform group-hover:-translate-x-0.5"><IconBack /></span>
          {t.tjansterSida.tillbaka}
        </Link>
      </div>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="eyebrow">{t.problem.etikett}</p>
            <h1 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              {t.problem.rubrik}
            </h1>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.08">
            {t.problem.items.map((item, i) => ({ ...item, icon: [problemIcons.speed, problemIcons.ux, problemIcons.trust, problemIcons.perf, problemIcons.mobile, problemIcons.seo][i] })).map((item) => (
              <div key={item.label} className="card-spotlight h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-base font-bold text-white/95">{item.label}</h3>
                <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TJÄNSTER ─────────────────────────────────────────── */}
      <section id="tjanster" className="relative py-16 bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06060f] via-transparent to-[#06060f]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div data-parallax="-26" className="absolute top-1/4 -left-40">
            <div className="h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[110px]" />
          </div>
          <div data-parallax="-42" className="absolute bottom-0 -right-32">
            <div className="h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="eyebrow">{t.tjanster.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              {t.tjanster.rubrik}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-animate-group data-stagger="0.07">
            {t.tjanster.items.map((item) => (
              <div key={item.title} className="group card-spotlight flex h-full gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:shadow-lg hover:shadow-indigo-900/20">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1 font-mono text-[10px] text-indigo-400 whitespace-nowrap">
                    {item.tag}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Avslutande CTA */}
          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <Link
              href="/#kontakt"
              className="group btn-shine inline-flex items-center justify-center gap-2.5 rounded-full bg-indigo-600 px-9 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.tjansterSida.cta}
              <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
