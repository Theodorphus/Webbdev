'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useMotionPreference } from './components/animations/useMotionPreference';
import { faqByLang } from './faq';
import { Item, Magnetic, MaskReveal, Reveal, Stagger } from './components/animations/Motion';
import TrafficResults from './components/TrafficResults';
import ContactForm from './components/ContactForm';
import StickyCta from './components/StickyCta';
import { featuredProjects, otherProjects } from './portfolio/projects';
import { ProjectCard, ProjectCardSmall } from './components/ProjectPreview';
import { LanguageProvider, useLang } from './i18n/LanguageProvider';
import type { Lang } from './i18n/dictionary';
import { getHomeSchema } from './lib/homeSchema';

function IconArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#6d6af8" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

// Hero-blickfång: kod-editor där sajtens löfte "skrivs" rad för rad.
// Typewriter är ren CSS (.code-line + type-line i globals) — delays per prototypen.
function HeroCodeWindow() {
  const lines: { chars: number; delay: number; content: ReactElement; caret?: boolean }[] = [
    { chars: 14, delay: 0.9, content: <><span className="tok-com">{'// webbdev.se'}</span></> },
    { chars: 18, delay: 1.4, content: <><span className="tok-key">const</span> <span className="tok-fn">hemsida</span> <span className="tok-pun">= {`{`}</span></> },
    { chars: 26, delay: 1.9, content: <>{'  '}<span className="tok-fn">leverans</span><span className="tok-pun">:</span> <span className="tok-str">{'"3–7 dagar"'}</span><span className="tok-pun">,</span></> },
    { chars: 16, delay: 2.3, content: <>{'  '}<span className="tok-fn">pris</span><span className="tok-pun">:</span> <span className="tok-str">{'"fast"'}</span><span className="tok-pun">,</span></> },
    { chars: 26, delay: 2.7, content: <>{'  '}<span className="tok-fn">dolda_avgifter</span><span className="tok-pun">:</span> <span className="tok-key">false</span><span className="tok-pun">,</span></> },
    { chars: 28, delay: 3.1, content: <>{'  '}<span className="tok-fn">mål</span><span className="tok-pun">:</span> <span className="tok-str">{'"fler kunder"'}</span><span className="tok-pun">,</span></> },
    { chars: 2, delay: 3.5, content: <><span className="tok-pun">{`}`}</span></>, caret: true },
  ];
  return (
    <div className="code-window rounded-[20px] border border-white/[0.09] bg-[rgba(9,9,17,0.85)] shadow-[0_40px_80px_-30px_rgba(109,106,248,0.25)] backdrop-blur-sm">
      {/* Fönstertitelrad */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-[18px] py-[13px]">
        <span className="h-[11px] w-[11px] rounded-full bg-red-400/65" />
        <span className="h-[11px] w-[11px] rounded-full bg-amber-400/65" />
        <span className="h-[11px] w-[11px] rounded-full bg-green-400/65" />
        <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-[#ededf2]/60">page.tsx</span>
      </div>
      {/* Kodyta */}
      <div className="px-6 py-[22px] text-[13.5px] leading-[1.75]">
        {lines.map((l, i) => (
          <span
            key={i}
            className={`code-line ${l.caret ? 'code-caret' : ''}`}
            style={{
              ['--w' as string]: `${l.chars}ch`,
              ['--steps' as string]: l.chars,
              ['--delay' as string]: `${l.delay}s`,
            }}
          >
            {l.content}
          </span>
        ))}
      </div>
    </div>
  );
}

// Kundnamn i marquee-bandet.
const MARQUEE_NAMES = [
  'Karla Cleaning Crew',
  'Öckerö Cementgjuteri',
  'Konstbyte',
  'Prolink',
  'SwedenSweet',
  'Wildkull Payroll',
  'André Roslund',
  'Bolagdirekt',
  'Oddsverket',
  'Erotikmässan',
];

const GOOGLE_REVIEWS_URL = 'https://g.page/r/CVBdAbJ_4hdSEAE/review';

export function Home({ lang = 'sv' }: { lang?: Lang }) {
  return (
    <LanguageProvider lang={lang} updateDocumentLang>
      <HomeContent />
    </LanguageProvider>
  );
}

function HomeContent() {
  const [wordIndex, setWordIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reduce = useMotionPreference();
  const { lang, t } = useLang();
  const faqItems = faqByLang[lang];
  const homeSchema = getHomeSchema(lang, faqItems);

  // Roterande hero-ord (statiskt vid reduced motion).
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % t.hero2.ord.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduce, t.hero2.ord.length]);

  // Auto-rotera recensionerna var 7:e sekund.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setReviewIndex((i) => (i + 1) % t.recension2.lista.length);
    }, 7000);
    return () => clearInterval(id);
  }, [reduce, t.recension2.lista.length]);

  const activeReview = t.recension2.lista[reviewIndex];

  return (
    <div lang={lang} className="relative overflow-x-clip">

      {/* ── NAV ─────────────────────────────────────────────── */}


      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSchema).replace(/</g, '\\u003c'),
          }}
        />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-hero className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-20 pt-[140px]">
        {/* En enda, disciplinerad aurora */}
        <div
          aria-hidden
          className="animate-aurora pointer-events-none absolute -top-[30%] left-1/2 h-[900px] w-[1300px] -translate-x-1/2 blur-[60px]"
          style={{
            background:
              'radial-gradient(45% 45% at 50% 50%, rgba(109,106,248,0.22), transparent 70%), radial-gradient(30% 35% at 65% 40%, rgba(56,189,248,0.08), transparent 70%)',
          }}
        />
        {/* Tunn horisontlinje */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)' }}
        />

        <Stagger className="relative mx-auto w-full max-w-[80rem] px-8">
          {/* Statusrad */}
          <Item className="flex items-center gap-3.5 font-mono text-xs uppercase tracking-[0.28em] text-[#ededf2]/50">
            <span className="animate-ticker-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero2.status1}
            <span aria-hidden className="text-white/20">/</span>
            <span className="text-[#ededf2]/60">{t.hero2.status2}</span>
          </Item>

          {/* H1 — två rader med mask-reveal, roterande ord i rad 2 */}
          <h1 className="font-display mt-9 text-[clamp(56px,8.5vw,124px)] font-bold leading-[0.98] tracking-[-0.035em] text-white">
            <MaskReveal className="pb-[0.08em]">
              <span>{t.hero2.titel1}</span>
            </MaskReveal>
            <MaskReveal className="pb-[0.12em]">
              <span>
                <em className="not-italic text-accent">{t.hero2.accentOrd}</em>{' '}
                {t.hero2.ord[wordIndex]}
                <span className="ml-2.5 inline-block h-[0.75em] w-[3px] bg-accent opacity-80 align-baseline" />
              </span>
            </MaskReveal>
          </h1>

          <div className="mt-12 grid items-end gap-16 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="max-w-[34rem] text-[19px] leading-[1.55] text-[#ededf2]/60 [text-wrap:pretty]">
                {t.hero2.ingress}
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
                <Magnetic strength={0.35} className="w-full sm:w-auto">
                  <a
                    href="#kontakt"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-[38px] py-[18px] text-base font-semibold text-white transition-all duration-200 hover:bg-[#7d7aff] hover:shadow-[0_20px_60px_-15px_rgba(109,106,248,0.7)] sm:w-auto"
                  >
                    {t.hero.ctaPrimar}
                    <IconArrow />
                  </a>
                </Magnetic>
                <a
                  href="#arbete"
                  className="inline-flex items-center gap-2.5 self-center border-b border-white/20 pb-[3px] text-[15px] font-semibold text-[#ededf2]/75 transition-colors hover:text-white sm:self-auto"
                >
                  {t.hero2.ctaSekundar}
                </a>
              </div>
              {/* Statistikrad med hairline-avdelare */}
              <div className="mt-11 flex border-t border-white/[0.09] pt-6">
                {t.hero2.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`${i === 0 ? 'pr-8' : 'border-l border-white/[0.09] px-8'} ${i === 2 ? '!pr-0' : ''}`}
                  >
                    <div className="font-display text-[26px] font-bold tracking-[-0.02em] text-white">
                      {s.varde}
                      {i === 1 && <span className="text-accent">★</span>}
                    </div>
                    <div className="mt-[5px] font-mono text-[10px] uppercase tracking-[0.16em] text-[#ededf2]/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Kodfönster */}
            <Item className="hidden lg:block">
              <div aria-hidden>
                <HeroCodeWindow />
              </div>
            </Item>
          </div>
        </Stagger>
      </section>

      {/* ── MARQUEE (kundnamn) ───────────────────────────────── */}
      <section
        aria-label={t.trust.rubrik}
        className="overflow-hidden border-y border-white/[0.07] bg-white/[0.012] py-[26px]"
      >
        <div className="marquee-track">
          {[false, true].map((clone) => (
            <div key={String(clone)} aria-hidden={clone} className="flex items-center gap-[72px] pr-[72px]">
              {MARQUEE_NAMES.map((name) => (
                <span key={name} className="flex items-center gap-[72px]">
                  <span className="font-display whitespace-nowrap text-[17px] font-semibold text-[#ededf2]/60">
                    {name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(109,106,248,0.6)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── UTVALDA PROJEKT ──────────────────────────────────── */}
      <section id="arbete" className="pb-20 pt-[140px]">
        <div className="mx-auto max-w-[80rem] px-8">
          <Reveal className="mb-[72px] flex items-baseline justify-between gap-6">
            <h2 className="font-display text-[clamp(36px,4.5vw,60px)] font-bold tracking-[-0.03em] text-white">
              {t.arbete.rubrik}
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#ededf2]/60">
              {t.arbete.period}
            </span>
          </Reveal>

          {/* De utvalda — stora kort med webbläsarram och preview */}
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug}>
                <ProjectCard
                caseLabel={lang === "sv" ? "Läs kundcaset" : "Read the case study (Swedish)"}
                  project={p}
                  text={t.arbete.projekt[p.slug]}
                  besok={t.arbete.besok}
                  priority={i < 2}
                />
              </Reveal>
            ))}
          </div>

          {/* Fler projekt — samma preview, kompakt format */}
          <Reveal className="mt-[104px] flex items-center gap-5">
            <h3 className="font-display text-[21px] font-bold tracking-[-0.02em] text-white">
              {t.arbete.fler}
            </h3>
            <span className="h-px flex-1 bg-white/[0.09]" />
          </Reveal>
          <div className="mt-9 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {otherProjects.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCardSmall project={p} text={t.arbete.projekt[p.slug]} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
            >
              {t.arbete.alla}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <IconArrow />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <TrafficResults />

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section id="process" className="border-t border-white/[0.07] py-[140px]">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.processIntro.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t.processIntro.rubrik}
            </h2>
            <p className="mt-[22px] max-w-[24rem] text-[15.5px] leading-[1.65] text-[#ededf2]/60 [text-wrap:pretty]">
              {t.processIntro.text}
            </p>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2.5 text-[15px] font-semibold text-accent-light transition-colors hover:text-[#c7c6ff]"
            >
              {t.processIntro.cta}
              <IconArrow />
            </a>
          </Reveal>
          <div>
            {t.process.steg.map((steg, i) => (
              <Reveal key={steg.title}>
                <div className="grid items-start gap-7 border-b border-white/[0.07] py-9 sm:grid-cols-[88px_1fr]">
                  <span className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-[rgba(109,106,248,0.55)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[21px] font-semibold tracking-[-0.01em] text-white">
                      {steg.title}
                    </h3>
                    <p className="mt-2.5 max-w-[32rem] text-[15px] leading-[1.65] text-[#ededf2]/55 [text-wrap:pretty]">
                      {steg.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENSIONER ──────────────────────────────────────── */}
      <section id="recensioner" className="relative overflow-hidden border-t border-white/[0.07] py-[140px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[40%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 blur-[50px]"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(109,106,248,0.12), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[56rem] px-8 text-center">
          <Reveal className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </Reveal>
          <Reveal>
            <motion.blockquote
              key={reviewIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-display mt-9 text-[clamp(24px,3vw,36px)] font-medium leading-[1.35] tracking-[-0.02em] text-white/90 [text-wrap:pretty]"
            >
              “{activeReview.text}”
            </motion.blockquote>
            <p className="mt-8 text-[15px] font-semibold text-[#ededf2]/75">
              {activeReview.namn}
              <span className="ml-3 font-normal text-[#ededf2]/60">{t.recension2.viaGoogle}</span>
            </p>
          </Reveal>
          <Reveal className="mt-9 flex justify-center gap-1">
            {t.recension2.lista.map((r, i) => (
              <button
                key={r.namn}
                type="button"
                onClick={() => setReviewIndex(i)}
                aria-label={`${t.recension2.aria} ${i + 1}`}
                // Minst 24px träffyta (WCAG 2.5.8) — pricken är bara visuell.
                className="group flex h-6 min-w-6 items-center justify-center px-1"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    reviewIndex === i ? 'w-7 bg-accent' : 'w-2 bg-white/20 group-hover:bg-white/35'
                  }`}
                />
              </button>
            ))}
          </Reveal>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex text-[13.5px] font-medium text-[rgba(165,163,255,0.8)] transition-colors hover:text-[#c7c6ff]"
          >
            {t.recensioner.lankText} →
          </a>
        </div>
      </section>

      {/* ── PRISER (teaser → /priser) ────────────────── */}
      <section className="border-t border-white/[0.07] py-[88px]">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 px-8 text-center md:flex-row md:justify-between md:gap-12 md:text-left">
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.priser.etikett}
            </span>
            <h2 className="font-display mt-3.5 text-[clamp(26px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              {t.priserTeaser.rubrik}
            </h2>
            <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.65] text-[#ededf2]/60 [text-wrap:pretty]">
              {t.priserTeaser.text}
            </p>
          </Reveal>
          <Reveal className="flex-shrink-0">
            <Link
              href="/priser"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.18] px-7 py-3.5 text-[14.5px] font-semibold text-[#ededf2]/85 transition-all duration-200 hover:-translate-y-px hover:border-white/30 hover:text-white"
            >
              {t.priserTeaser.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <IconArrow />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── OM MIG ───────────────────────────────────────────── */}
      <section id="om" className="border-t border-white/[0.07] py-[140px]">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.omMig.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t.omMig2.rubrik}
            </h2>
            <div className="mt-8 flex items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
              <Image
                src="/pp3.webp"
                alt="Theo Håkansson"
                width={336}
                height={336}
                sizes="(max-width: 639px) 168px, 336px"
                className="aspect-square h-auto w-[42vw] max-w-[168px] rounded-[32px] border border-white/10 object-cover [filter:saturate(0.9)_contrast(1.02)] sm:w-[336px] sm:max-w-full sm:rounded-[64px]"
              />
              <p className="flex flex-col gap-1">
                <span className="font-display text-[17px] font-semibold whitespace-nowrap text-white">Theo Håkansson</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#ededf2]/60">
                  {t.omMig2.roll}
                </span>
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2.5 text-[15px] font-semibold text-accent-light transition-colors hover:text-[#c7c6ff]"
            >
              {t.nav.kontakt}
              <IconArrow />
            </a>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex max-w-[38rem] flex-col gap-4 text-base leading-[1.65] text-[#ededf2]/60">
                <p className="[text-wrap:pretty]">{t.omMig2.p1}</p>
                <p className="[text-wrap:pretty]">{t.omMig2.p2}</p>
                <p className="[text-wrap:pretty]">{t.omMig2.p3}</p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {t.omMig.fakta.map((row) => (
                <Reveal key={row.label} className="flex">
                  <div className="flex w-full flex-col rounded-[20px] border border-white/[0.08] bg-white/[0.02] px-7 py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.16]">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(165,163,255,0.8)]">
                      {row.tag}
                    </span>
                    <span className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#ededf2]/60">
                      {row.label}
                    </span>
                    <span className="mt-1.5 text-[15px] font-medium text-white/90">{row.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-white/[0.07] py-[140px]">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.faqIntro.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t.faqIntro.rubrik}
            </h2>
            <p className="mt-[22px] max-w-[22rem] text-[15px] leading-[1.65] text-[#ededf2]/55">
              {t.faqIntro.text1}{' '}
              <a href="mailto:webbdevstudio@gmail.com" className="text-accent-light transition-colors hover:text-[#c7c6ff]">
                {t.faqIntro.mejla}
              </a>{' '}
              {t.faqIntro.text2}
            </p>
          </Reveal>
          <Reveal>
            {faqItems.map((item) => (
              <details key={item.q} className="group border-b border-white/[0.08]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-1 py-[26px] font-display text-[17px] font-semibold text-white/[0.88] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-base font-normal text-accent-light transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[36rem] px-1 pb-[26px] text-[15px] leading-[1.7] text-[#ededf2]/55">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className="relative overflow-hidden border-t border-white/[0.07] py-[160px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[20%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 blur-[60px]"
          style={{ background: 'radial-gradient(45% 45% at 50% 50%, rgba(109,106,248,0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[52rem] px-8 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] font-bold leading-none tracking-[-0.035em] text-white">
              {t.kontakt2.rubrik1} <em className="not-italic text-accent">{t.kontakt2.rubrik2}</em>
            </h2>
            <p className="mx-auto mt-7 max-w-[30rem] text-[17px] leading-[1.6] text-[#ededf2]/60 [text-wrap:pretty]">
              {t.kontakt2.ingress}
            </p>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal>
            <p className="mt-9 text-sm text-[#ededf2]/60">
              {t.kontakt2.direktFraga}{' '}
              <a
                href="tel:+46709525822"
                className="font-medium text-accent-light transition-colors hover:text-[#c7c6ff]"
              >
                070‑952 58 22
              </a>{' '}
              ·{' '}
              <a
                href="mailto:webbdevstudio@gmail.com"
                className="font-medium text-accent-light transition-colors hover:text-[#c7c6ff]"
              >
                webbdevstudio@gmail.com
              </a>
            </p>
            {/* GDPR-notis */}
            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#ededf2]/60">
              {t.kontakt.gdpr1}{' '}
              <Link href="/integritetspolicy" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/50">
                {t.kontakt.gdpr2}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}


      <StickyCta />
    </div>
  );
}

export default function HomePage() {
  return <Home lang="sv" />;
}
