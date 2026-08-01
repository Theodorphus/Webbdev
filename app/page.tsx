'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { faqByLang } from './faq';
import { Item, Magnetic, MaskReveal, Reveal, Stagger, WipeImage } from './components/animations/Motion';
import MobileNav from './components/MobileNav';
import StickyCta from './components/StickyCta';
import PriceCalculator from './components/PriceCalculator';
import { orter } from './webbutveckling/orter';
import { useLang } from './i18n/LanguageProvider';
import { trackConversion } from './lib/gtag';
import LanguageToggle from './i18n/LanguageToggle';

function IconArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDiagonal() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    { chars: 28, delay: 3.1, content: <>{'  '}<span className="tok-fn">resultat</span><span className="tok-pun">:</span> <span className="tok-str">{'"fler kunder"'}</span><span className="tok-pun">,</span></> },
    { chars: 2, delay: 3.5, content: <><span className="tok-pun">{`}`}</span></>, caret: true },
  ];
  return (
    <div className="code-window rounded-[20px] border border-white/[0.09] bg-[rgba(9,9,17,0.85)] shadow-[0_40px_80px_-30px_rgba(109,106,248,0.25)] backdrop-blur-sm">
      {/* Fönstertitelrad */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-[18px] py-[13px]">
        <span className="h-[11px] w-[11px] rounded-full bg-red-400/65" />
        <span className="h-[11px] w-[11px] rounded-full bg-amber-400/65" />
        <span className="h-[11px] w-[11px] rounded-full bg-green-400/65" />
        <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-[#ededf2]/45">page.tsx</span>
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
  'Konstbyte',
  'Prolink',
  'SwedenSweet',
  'Wildkull Payroll',
  'André Roslund',
  'Bolagdirekt',
  'Oddsverket',
  'Erotikmässan',
];

// Metadata för de fyra stora casen — texterna bor i dictionary (t.arbete.cases,
// samma index). reverse växlar bildsida varannan rad.
const CASE_META = [
  { url: 'https://www.konstbyte.se/', img: '/3.png', tech: ['Next.js', 'Prisma', 'Stripe', 'AI'], reverse: false },
  { url: 'https://www.wildkullpayroll.se/', img: '/6.png', tech: ['Next.js', 'Tailwind', 'Vercel'], reverse: true },
  { url: 'https://www.andre-roslund.se/', img: '/8.png', tech: ['Next.js', 'Tailwind', 'Vercel'], reverse: false },
  { url: 'https://karlacleaningcrew.se/', img: '/1.png', tech: ['Next.js', 'Tailwind', 'Vercel'], reverse: true },
];

// URL:er för "övriga projekt"-listan (texterna i t.arbete.ovriga, samma index).
const MORE_URLS = [
  'https://swedensweet.vercel.app/',
  'https://www.prolink.se/',
  'https://flex-league.vercel.app/',
  'https://bolagdirekt.vercel.app/',
  'https://oddsverket.se/',
  'https://www.erotikmassan.com/',
];

const GOOGLE_REVIEWS_URL = 'https://g.page/r/CVBdAbJ_4hdSEAE/review';

export function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reduce = useReducedMotion();
  const { lang, t } = useLang();
  const faqItems = faqByLang[lang];

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

  // Markera aktiv sektion i nav medan man scrollar.
  useEffect(() => {
    const ids = ['arbete', 'process', 'priser', 'om'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const topMost = ids.find((id) => visible.has(id));
        setActiveSection(topMost ?? '');
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        trackConversion('formSubmit');
        setFormData({ name: '', email: '', message: '', company: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      // Nätverksfel — utan denna fastnar formuläret i "loading" för alltid.
      setStatus('error');
    }
  };

  const activeReview = t.recension2.lista[reviewIndex];

  return (
    <div className="relative overflow-x-clip">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-[60] border-b border-white/[0.07] backdrop-blur-[20px] backdrop-saturate-[1.4] transition-all duration-300 ${
          scrolled ? 'bg-[rgba(5,5,9,0.88)]' : 'bg-[rgba(5,5,9,0.75)]'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[80rem] items-center justify-between px-8 transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-[18px]'
          }`}
        >
          <span className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">
            Webbdev<span className="text-accent">.</span>studio
          </span>
          <nav className="hidden items-center gap-9 text-[13.5px] font-medium text-[#ededf2]/60 md:flex">
            {[
              { id: 'arbete', label: t.nav2.arbete },
              { id: 'process', label: t.nav2.process },
              { id: 'priser', label: t.nav2.priser },
              { id: 'om', label: t.nav2.om },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-colors hover:text-white ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <LanguageToggle />
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-[#ededf2] px-[22px] py-2.5 text-[13.5px] font-semibold text-[#0a0a12] transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              {t.nav2.cta}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            </a>
          </div>
          <MobileNav activeSection={activeSection} />
        </div>
      </header>

      <main>

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
            <span className="text-[#ededf2]/35">{t.hero2.status2}</span>
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
            <Item>
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
                    <div className="mt-[5px] font-mono text-[10px] uppercase tracking-[0.16em] text-[#ededf2]/40">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Item>
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
                  <span className="font-display whitespace-nowrap text-[17px] font-semibold text-[#ededf2]/35">
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
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#ededf2]/40">
              {t.arbete.period}
            </span>
          </Reveal>

          <div className="flex flex-col gap-24">
            {t.arbete.cases.map((c, i) => {
              const meta = CASE_META[i];
              return (
                <Reveal key={c.namn}>
                  <a
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group grid items-center gap-10 lg:gap-14 ${
                      meta.reverse ? 'lg:grid-cols-[1fr_1.25fr]' : 'lg:grid-cols-[1.25fr_1fr]'
                    }`}
                  >
                    <WipeImage
                      className={`relative aspect-[16/10] rounded-[20px] border border-white/[0.09] bg-[#0b0b14] ${
                        meta.reverse ? 'lg:order-2' : ''
                      }`}
                    >
                      <Image
                        src={meta.img}
                        alt={c.namn}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,5,9,0.35)] to-transparent to-40%" />
                    </WipeImage>
                    <div className={meta.reverse ? 'lg:order-1' : ''}>
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
                        {c.kategori}
                      </span>
                      <h3 className="font-display mt-3.5 text-[34px] font-bold tracking-[-0.02em] text-white">
                        {c.namn}
                      </h3>
                      <p className="mt-[18px] max-w-[26rem] text-[15.5px] leading-[1.65] text-[#ededf2]/60 [text-wrap:pretty]">
                        {c.desc}
                      </p>
                      <p className="mt-5 inline-flex items-center gap-2.5 border-l-2 border-accent pl-3.5 text-sm font-medium text-[#ededf2]/85">
                        {c.result}
                      </p>
                      <div className="mt-[26px] flex flex-wrap gap-2.5">
                        {meta.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 px-3.5 py-[5px] font-mono text-[11px] text-[#ededf2]/45"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="mt-[30px] inline-flex items-center gap-2.5 text-sm font-semibold text-accent-light">
                        {t.arbete.besok}
                        <IconArrow />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* Övriga projekt — kompakt lista */}
          <Reveal className="mt-24 border-t border-white/[0.07]">
            {t.arbete.ovriga.map((p, i) => (
              <a
                key={p.namn}
                href={MORE_URLS[i]}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/[0.07] px-2 py-[26px] transition-all duration-200 hover:bg-white/[0.02] hover:pl-5 sm:grid-cols-[1fr_2fr_auto] sm:gap-8"
              >
                <span className="font-display text-[19px] font-semibold tracking-[-0.01em] text-white">
                  {p.namn}
                </span>
                <span className="hidden text-sm text-[#ededf2]/50 sm:block">{p.kategori}</span>
                <span className="text-[#ededf2]/40">
                  <IconDiagonal />
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

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
              <span className="ml-3 font-normal text-[#ededf2]/40">{t.recension2.viaGoogle}</span>
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

      {/* ── PRISER ───────────────────────────────────────────── */}
      <section id="priser" className="border-t border-white/[0.07] py-[140px]">
        <div className="mx-auto max-w-[80rem] px-8">
          <Reveal className="mb-[72px] max-w-[40rem]">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.priser.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t.priser2.rubrik}
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {t.priser.paket
              .map((p, i) => ({ ...p, populer: i === 1 }))
              .map((p) => (
                <Reveal key={p.tier} className="flex">
                  <div
                    className="flex w-full flex-col px-9 py-11"
                    style={{
                      background: p.populer ? 'linear-gradient(180deg, #0c0b1c, #08080f)' : '#08080f',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs uppercase tracking-[0.2em] ${
                          p.populer ? 'text-[#b4b2ff]' : 'text-[#ededf2]/50'
                        }`}
                      >
                        {p.tier}
                      </span>
                      {p.populer && (
                        <span className="rounded-full border border-[rgba(109,106,248,0.45)] bg-[rgba(109,106,248,0.18)] px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#b4b2ff]">
                          {t.priser2.badge}
                        </span>
                      )}
                    </div>
                    <div className="font-display mt-6 text-[52px] font-bold tracking-[-0.03em] text-white">
                      {p.pris}
                    </div>
                    <p className="mt-2.5 text-sm text-[#ededf2]/50">{p.desc}</p>
                    <div className="my-[30px] h-px bg-white/[0.08]" />
                    <ul className="flex flex-1 flex-col gap-[13px]">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[14.5px] text-[#ededf2]/70">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mt-[3px] flex-shrink-0" aria-hidden>
                            <path d="M3.5 8l3 3 5-6.5" stroke="#6d6af8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#kontakt"
                      className={`mt-9 block rounded-full py-[15px] text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                        p.populer
                          ? 'bg-accent text-white hover:bg-[#7d7aff]'
                          : 'border border-white/[0.18] text-[#ededf2]/80 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {t.priser.komIgang}
                    </a>
                  </div>
                </Reveal>
              ))}
          </div>
          <Reveal>
            <p className="mt-7 text-center text-[13.5px] text-[#ededf2]/45">
              {t.priser2.osaker1}{' '}
              <a href="#kontakt" className="font-medium text-accent-light transition-colors hover:text-[#c7c6ff]">
                {t.priser2.osakerCta}
              </a>{' '}
              {t.priser2.osaker2}
            </p>
          </Reveal>

          {/* Priskalkylator — interaktivt estimat */}
          <PriceCalculator />
        </div>
      </section>

      {/* ── OM MIG ───────────────────────────────────────────── */}
      <section id="om" className="border-t border-white/[0.07] py-[140px]">
        <div className="mx-auto grid max-w-[80rem] items-center gap-12 px-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <WipeImage className="rounded-[20px] border border-white/10">
              <Image
                src="/pp3.png"
                alt="Theo Håkansson — Webbdev Studio"
                width={1236}
                height={1272}
                sizes="(max-width: 1024px) 420px, 35vw"
                className="block h-auto w-full object-cover [filter:saturate(0.9)_contrast(1.02)]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,5,9,0.5)] to-transparent to-45%" />
            </WipeImage>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <span className="font-display text-[17px] font-semibold text-white">Theo Håkansson</span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#ededf2]/60">
                {t.omMig2.roll}
              </span>
            </div>
          </Reveal>
          <Reveal>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
              {t.omMig.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t.omMig2.rubrik}
            </h2>
            <div className="mt-[26px] flex max-w-[36rem] flex-col gap-4 text-base leading-[1.65] text-[#ededf2]/60">
              <p className="[text-wrap:pretty]">{t.omMig2.p1}</p>
              <p className="[text-wrap:pretty]">{t.omMig2.p2}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 border-t border-white/[0.09]">
              {t.omMig.fakta.map((row) => (
                <div key={row.label} className="flex flex-col gap-[5px] border-b border-white/[0.09] py-5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#ededf2]/40">
                    {row.label}
                  </span>
                  <span className="text-[15px] font-medium text-white/90">{row.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
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
            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-3.5 text-left">
              {/* Honeypot — osynligt för människor, fångar spam-bottar */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t.kontakt.namnPlaceholder}
                  aria-label={t.kontakt.namn}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-[14px] border border-white/[0.12] bg-white/[0.04] px-5 py-[17px] text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-[rgba(109,106,248,0.6)] focus:bg-white/[0.06]"
                />
                <input
                  type="email"
                  placeholder={t.kontakt.epostPlaceholder}
                  aria-label={t.kontakt.epost}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full rounded-[14px] border border-white/[0.12] bg-white/[0.04] px-5 py-[17px] text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-[rgba(109,106,248,0.6)] focus:bg-white/[0.06]"
                />
              </div>
              <textarea
                rows={4}
                placeholder={t.kontakt.meddelandePlaceholder}
                aria-label={t.kontakt.meddelande}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full resize-none rounded-[14px] border border-white/[0.12] bg-white/[0.04] px-5 py-[17px] text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-[rgba(109,106,248,0.6)] focus:bg-white/[0.06]"
              />
              {status === 'error' && (
                <div className="rounded-[14px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {t.kontakt.error}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent py-[19px] text-base font-semibold text-white transition-all duration-200 hover:bg-[#7d7aff] hover:shadow-[0_20px_60px_-15px_rgba(109,106,248,0.7)] disabled:opacity-60"
              >
                {status === 'loading'
                  ? t.kontakt.skickar
                  : status === 'success'
                    ? t.kontakt2.successKnapp
                    : t.kontakt.skicka}
                {status !== 'success' && <IconArrow />}
              </button>
              <p className="mt-1.5 text-center text-[12.5px] text-[#ededf2]/45">{t.kontakt.risk}</p>
            </form>
          </Reveal>
          <Reveal>
            <p className="mt-9 text-sm text-[#ededf2]/45">
              {t.kontakt2.direktFraga}{' '}
              <a
                href="tel:+46709525822"
                onClick={() => trackConversion('phoneClick')}
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
            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#ededf2]/50">
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
      <footer className="border-t border-white/[0.07] py-14">
        <div className="mx-auto max-w-[80rem] px-8">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div>
              <span className="font-display text-[17px] font-bold text-white">
                Webbdev<span className="text-accent">.</span>studio
              </span>
              <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-[#ededf2]/40">
                {t.footer.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-16">
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/35">
                  {t.footer2.navigera}
                </span>
                <a href="#arbete" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.arbete}</a>
                <a href="#process" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.process}</a>
                <a href="#priser" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.priser}</a>
                <a href="#om" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.om}</a>
                <Link href="/tjanster" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.footer2.tjanster}</Link>
                <Link href="/blogg" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.footer2.blogg}</Link>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/35">
                  {t.footer.kontakt}
                </span>
                <a href="tel:+46709525822" onClick={() => trackConversion('phoneClick')} className="text-[#ededf2]/55 transition-colors hover:text-white">
                  070‑952 58 22
                </a>
                <a href="mailto:webbdevstudio@gmail.com" className="text-[#ededf2]/55 transition-colors hover:text-white">
                  webbdevstudio@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededf2]/55 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/35">
                  {t.footer.foretag}
                </span>
                {t.footer.foretagRader.map((rad) => (
                  <span key={rad} className="text-[#ededf2]/45">{rad}</span>
                ))}
                <span className="text-[#ededf2]/45">Västra Gunnesgärde 41, Göteborg</span>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/35">
                  {t.footer.orter}
                </span>
                {orter.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/webbutveckling/${o.slug}`}
                    className="text-[#ededf2]/55 transition-colors hover:text-white"
                  >
                    {o.namn}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/[0.07] pt-6 text-xs text-[#ededf2]/50 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Webbdev Studio — webbdev.se</span>
            <Link href="/integritetspolicy" className="transition-colors hover:text-[#ededf2]/60">
              {t.footer.integritetspolicy}
            </Link>
          </div>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}

export default function HomePage() {
  return <Home />;
}
