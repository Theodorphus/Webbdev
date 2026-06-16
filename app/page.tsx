'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import useAnimations from './components/animations/useAnimations';
import { faqByLang } from './faq';
import { CountUp, Item, Magnetic, MaskReveal, Stagger, TiltCard } from './components/animations/Motion';
import MobileNav from './components/MobileNav';
import StickyCta from './components/StickyCta';
import { orter } from './webbutveckling/orter';
import { useLang } from './i18n/LanguageProvider';
import LanguageToggle from './i18n/LanguageToggle';

function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#6366f1" opacity="0.15" />
      <path d="M4.5 7.5l2.5 2.5L10.5 5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

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

const PROJECTS_PER_PAGE = 6;

// Länk till Google-företagsprofilens recensioner.
const GOOGLE_REVIEWS_URL = 'https://g.page/r/CVBdAbJ_4hdSEAE/review';

const projects = [
  {
    name: 'Karla Cleaning Crew',
    desc: { sv: 'Professionell hemsida för ett städföretag med tydlig presentation av tjänster, priser och kontaktformulär.', en: 'Professional website for a cleaning company with a clear presentation of services, pricing and a contact form.' },
    result: { sv: 'Snabb, mobiloptimerad och enkel att hitta på Google.', en: 'Fast, mobile-optimized and easy to find on Google.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://karlacleaningcrew.se/',
    img: '/1.png',
  },
  {
    name: 'Wellness Studio',
    desc: { sv: 'Modern bokningssida för spa- och wellness-tjänster med integrerad betalning via Stripe och automatiserad e-post.', en: 'Modern booking site for spa and wellness services with integrated Stripe payments and automated email.' },
    result: { sv: 'Helautomatiserad bokningsprocess utan manuellt arbete.', en: 'Fully automated booking flow with no manual work.' },
    tech: ['Next.js', 'Tailwind', 'Supabase'],
    url: 'https://bokning-gue0ah1a6-webbdev.vercel.app/',
    img: '/2.png',
  },
  {
    name: 'Konstbyte',
    desc: { sv: 'E-handelsplattform för konstnärer med community-features, AI-integration och fullständig administratörsöversikt.', en: 'E-commerce platform for artists with community features, AI integration and a full admin dashboard.' },
    result: { sv: 'Skalbar plattform med AI-funktioner och Stripe-betalningar.', en: 'Scalable platform with AI features and Stripe payments.' },
    tech: ['Next.js', 'Prisma', 'Stripe', 'AI'],
    url: 'https://www.konstbyte.se/',
    img: '/3.png',
  },
  {
    name: 'Prolink',
    desc: { sv: 'Modern företagswebbplats med fokus på tydlig presentation av tjänster och professionell design.', en: 'Modern corporate website focused on a clear presentation of services and professional design.' },
    result: { sv: 'Snygg och snabb sajt som stärker varumärket online.', en: 'Sleek, fast site that strengthens the brand online.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://www.prolink.se/',
    img: '/4.png',
  },
  {
    name: 'SwedenSweet',
    desc: { sv: 'E-handelsplattform för svenska godsaker med sömlös shoppingupplevelse och modern design.', en: 'E-commerce platform for Swedish treats with a seamless shopping experience and modern design.' },
    result: { sv: 'Komplett nätbutik med enkel navigation och snabb checkout.', en: 'Complete online store with easy navigation and fast checkout.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://swedensweet.vercel.app/',
    img: '/5.png',
  },
  {
    name: 'FlexLeague',
    desc: { sv: 'Plattform för att skapa och hantera ligor och tävlingar med matchschema, tabeller och resultat i realtid.', en: 'Platform for creating and managing leagues and tournaments with schedules, standings and live results.' },
    result: { sv: 'Smidig liga-hantering med automatiska tabeller och statistik.', en: 'Smooth league management with automatic standings and stats.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://flex-league-o59hu8vor-ths-projects-9e3c8e82.vercel.app/',
    img: '/Flex.png',
  },
  {
    name: 'Erotikmässan',
    desc: { sv: 'Modern eventwebbplats för Erotikmässan med stilren design, programöversikt och tydlig presentation av utställare.', en: 'Modern event website with clean design, program overview and a clear presentation of exhibitors.' },
    result: { sv: 'Iögonfallande sajt som lyfter eventet och driver biljettförsäljning.', en: 'Eye-catching site that elevates the event and drives ticket sales.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://erotikm-ssan.vercel.app/',
    img: '/7.png',
  },
  {
    name: 'Widkull Payroll AB',
    desc: { sv: 'Professionell företagswebbplats för en lönebyrå med tydlig presentation av tjänster och förtroendeingivande design.', en: 'Professional corporate website for a payroll firm with a clear service presentation and trust-building design.' },
    result: { sv: 'Trovärdig och modern sajt som stärker varumärket online.', en: 'Credible, modern site that strengthens the brand online.' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    url: 'https://widkull.vercel.app/',
    img: '/6.png',
  },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [portfolioPage, setPortfolioPage] = useState(0);
  const scopeRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();
  const faqItems = faqByLang[lang];

  useAnimations(scopeRef);

  // Markera aktiv sektion i nav medan man scrollar
  useEffect(() => {
    const ids = ['tjanster', 'processen', 'portfolio', 'recensioner', 'priser', 'om-mig'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    // Spåra vilka sektioner som korsar "bandet" och välj den översta.
    // Nollställs när ingen är i vyn (t.ex. uppe i hero) så markeringen inte fastnar.
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

  useEffect(() => {
    const heroGlow = document.querySelector<HTMLElement>('[data-hero] .hero-glow');
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return; // glow/spotlight är musbaserade
      // Hero-glowen följer musen så länge pekaren är över heron.
      const hero = (e.target as HTMLElement | null)?.closest?.('[data-hero]') as HTMLElement | null;
      if (hero && heroGlow) {
        const r = hero.getBoundingClientRect();
        heroGlow.style.setProperty('--hx', `${e.clientX - r.left}px`);
        heroGlow.style.setProperty('--hy', `${e.clientY - r.top}px`);
      }
      const card = (e.target as HTMLElement | null)?.closest?.('.card-spotlight') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '', company: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div ref={scopeRef} className="relative overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-[#06060f]/90 shadow-lg shadow-indigo-950/20'
            : 'border-white/5 bg-[#06060f]/80'
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? 'py-2.5' : 'py-4'
          }`}
        >
          <span className="font-mono text-sm font-bold tracking-widest text-indigo-400 uppercase">
            Webbdev<span className="text-white/30">.</span>Studio
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            {[
              { id: 'tjanster', label: t.nav.tjanster },
              { id: 'processen', label: t.nav.processen },
              { id: 'portfolio', label: t.nav.portfolio },
              { id: 'recensioner', label: t.nav.recensioner },
              { id: 'priser', label: t.nav.priser },
              { id: 'om-mig', label: t.nav.omMig },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link transition-colors hover:text-white ${
                  activeSection === link.id ? 'is-active text-white' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <a
              href="#kontakt"
              className="inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400/60 hover:text-indigo-200"
            >
              {t.nav.kontakt}
            </a>
          </div>
          <MobileNav activeSection={activeSection} />
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-hero className="relative flex min-h-screen items-center bg-grid pt-20">
        <div className="hero-glow" aria-hidden />
        {/* Parallax-lager: yttre div = scroll-parallax + mus-depth, inre = orb med drift */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div data-parallax="-22" data-depth="1" className="absolute -top-40 left-1/2 -translate-x-1/2">
            <div className="h-[700px] w-[700px] rounded-full bg-indigo-600/20 blur-[130px] animate-pulse-glow" />
          </div>
          <div data-parallax="-34" data-depth="1.6" className="absolute top-1/3 -right-32">
            <div className="h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[110px] animate-drift" />
          </div>
          <div data-parallax="-14" data-depth="1.3" className="absolute bottom-0 left-0">
            <div className="h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[90px] animate-drift-slow" />
          </div>
        </div>

        <Stagger className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          {/* Badge */}
          <Item className="inline-flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {t.hero.badge}
            </div>
          </Item>

          {/* H1 — cinematic mask-reveal per rad */}
          <h1 className="font-display mt-6 max-w-3xl text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <MaskReveal className="pb-1">
              <span className="text-white">{t.hero.titel1}</span>
            </MaskReveal>
            <MaskReveal className="pb-1">
              <span className="animate-gradient-x bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {t.hero.titel2}
              </span>
            </MaskReveal>
          </h1>

          {/* Lokal-rad — matchar sökningar som "webbutveckling göteborg" */}
          <Item className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            {t.hero.lokal}
          </Item>

          {/* USP-rad */}
          <Item className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/60">
            {t.hero.usp.map((usp, i) => (
              <span key={usp} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-white/20">·</span>}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                {usp}
              </span>
            ))}
          </Item>

          {/* CTAs — magnetiska */}
          <Item className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#kontakt"
                className="group btn-shine inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-indigo-600 px-9 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:shadow-indigo-800/60 hover:scale-[1.03] active:scale-[0.98] sm:w-auto sm:justify-start"
              >
                {t.hero.ctaPrimar}
                <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
              </a>
            </Magnetic>
            <Magnetic strength={0.15} className="w-full sm:w-auto">
              <a
                href="#processen"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:border-white/25 sm:w-auto"
              >
                {t.hero.ctaSekundar}
              </a>
            </Magnetic>
          </Item>

          {/* Stats — räknar upp när de blir synliga */}
          <Item className="mt-14 flex flex-wrap gap-x-8 gap-y-6 border-t border-white/8 pt-10 sm:gap-10">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-white">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </Item>
        </Stagger>
      </section>

      {/* ── TRUST-BAR (företag jag byggt för) ─────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.015] py-8" aria-label={t.trust.rubrik}>
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
            {t.trust.rubrik}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {[
              { name: 'Karla Cleaning Crew', url: 'https://karlacleaningcrew.se/' },
              { name: 'Konstbyte', url: 'https://www.konstbyte.se/' },
              { name: 'Prolink', url: 'https://www.prolink.se/' },
              { name: 'SwedenSweet', url: 'https://swedensweet.vercel.app/' },
              { name: 'Widkull', url: 'https://widkull.vercel.app/' },
            ].map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-tight text-white/40 transition-colors hover:text-white/80"
              >
                {brand.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.problem.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              {t.problem.rubrik}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.08">
            {t.problem.items.map((item, i) => ({ ...item, icon: [problemIcons.speed, problemIcons.ux, problemIcons.trust, problemIcons.perf, problemIcons.mobile, problemIcons.seo][i] })).map((item) => (
              <div key={item.label} className="card-spotlight h-full rounded-2xl border border-red-500/10 bg-red-500/5 p-7 transition-all hover:border-red-500/25 hover:bg-red-500/8">
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
      <section id="tjanster" className="relative py-20 bg-grid">
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.tjanster.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              {t.tjanster.rubrik}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-animate-group data-stagger="0.07">
            {t.tjanster.items.map((item) => (
              <div key={item.title} className="group card-spotlight flex h-full gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:shadow-lg hover:shadow-indigo-900/20">
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
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section id="processen" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.process.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
              {t.process.rubrik}
            </h2>
          </div>
          {/* Kort-layout med stora cirklar */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.1">
            {t.process.steg.map((item, i) => (
              <div key={item.title} className="group card-spotlight h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5">
                {/* Stor cirkel med siffra */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-xl font-bold text-indigo-300 transition-all group-hover:border-indigo-500/60 group-hover:text-indigo-200 group-hover:scale-110">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-base font-bold text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
              </div>
            ))}
            {/* Sista "kort" — CTA */}
            <div className="card-spotlight h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-violet-950/40 p-7 flex flex-col justify-between">
              <p className="text-sm leading-relaxed text-white/60">
                {t.process.ctaText}
              </p>
              <a
                href="#kontakt"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {t.process.ctaLank} <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────── */}
      <section id="portfolio" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.portfolio.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{t.portfolio.rubrik}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.1">
            {projects
              .slice(portfolioPage * PROJECTS_PER_PAGE, portfolioPage * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE)
              .map((item, index) => (
              <TiltCard key={item.name} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-spotlight block h-full rounded-3xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-900/30"
              >
                {/* Preview */}
                <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl border border-white/8 transition-all group-hover:border-indigo-500/20">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    {...(index === 0 ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{item.name}</h3>
                  <span className="flex-shrink-0 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">{t.portfolio.live}</span>
                </div>

                <p className="text-sm leading-relaxed text-white/55 mb-3">{item.desc[lang]}</p>

                {/* Kundresultat */}
                <div className="flex items-start gap-2 rounded-lg border border-indigo-500/15 bg-indigo-500/5 px-3 py-2 mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <p className="text-xs text-indigo-300/80">{item.result[lang]}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/45">
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
              </TiltCard>
            ))}
          </div>

          {/* Paginering */}
          {projects.length > PROJECTS_PER_PAGE && (
            <div className="mt-10 flex items-center justify-center gap-3">
              {Array.from({ length: Math.ceil(projects.length / PROJECTS_PER_PAGE) }).map((_, page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => {
                    setPortfolioPage(page);
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label={`${t.portfolio.sida} ${page + 1}`}
                  aria-current={portfolioPage === page ? 'page' : undefined}
                  className={`h-10 min-w-10 cursor-pointer rounded-xl border px-3 text-sm font-medium transition-all ${
                    portfolioPage === page
                      ? 'border-indigo-500/50 bg-indigo-500/15 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-indigo-500/30 hover:text-white'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RECENSIONER ──────────────────────────────────────── */}
      <section id="recensioner" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.recensioner.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{t.recensioner.rubrik}</h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span className="text-sm text-white/55">{t.recensioner.betygText}</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2" data-animate-group data-stagger="0.1">
            {t.recensioner.lista.map((r) => (
              <div
                key={r.namn}
                className="card-spotlight flex h-full flex-col rounded-3xl border border-white/8 bg-white/[0.03] p-7"
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">“{r.text}”</p>
                <p className="mt-5 text-sm font-semibold text-white/90">{r.namn}</p>
              </div>
            ))}
          </div>

          <div className="mt-8" data-animate="block">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
            >
              {t.recensioner.lankText}
              <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── PRISER ───────────────────────────────────────────── */}
      <section id="priser" className="relative py-20 bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06060f] via-transparent to-[#06060f]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div data-parallax="-30" className="absolute top-0 -right-40">
            <div className="h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[110px]" />
          </div>
          <div data-parallax="-18" className="absolute bottom-0 -left-32">
            <div className="h-[320px] w-[320px] rounded-full bg-cyan-500/8 blur-[100px]" />
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.priser.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{t.priser.rubrik}</h2>
          </div>
          <div className="pricing-grid grid gap-6 md:grid-cols-3 md:items-end" data-animate-group data-stagger="0.12">
            {t.priser.paket
              .map((p, i) => ({ ...p, price: ['2 000 kr', '4 000 kr', '6 000 kr'][i], highlighted: i === 1 }))
              .map((item) => (
              <div
                key={item.tier}
                className={`pricing-card relative rounded-3xl transition-all duration-300 ${
                  item.highlighted
                    ? 'border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/95 to-violet-950/80 p-9 shadow-2xl shadow-indigo-900/50 ring-1 ring-indigo-500/20 hover:shadow-indigo-800/60 hover:-translate-y-1.5'
                    : 'border border-white/8 bg-white/[0.03] p-8 hover:border-white/15 hover:-translate-y-1'
                }`}
              >
                {item.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/50 bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-lg shadow-indigo-900/40">
                    {t.priser.mestPopular}
                  </div>
                )}
                <div className="mb-7">
                  <h3 className={`font-mono font-bold uppercase tracking-wider ${item.highlighted ? 'text-indigo-300 text-sm' : 'text-white/60 text-sm'}`}>
                    {item.tier}
                  </h3>
                  <div className={`font-display mt-3 font-bold text-white ${item.highlighted ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}>
                    {item.price}
                  </div>
                  <p className="mt-2 text-sm text-white/50">{item.desc}</p>
                </div>
                <ul className="mb-8 space-y-3.5">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                      <IconCheck />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`block w-full rounded-full py-4 text-center text-sm font-bold transition-all ${
                    item.highlighted
                      ? 'btn-shine bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-900/40 hover:shadow-indigo-800/50'
                      : 'border border-white/12 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t.priser.komIgang}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OM MIG ───────────────────────────────────────────── */}
      <section id="om-mig" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate="block" className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 sm:p-10 md:p-14">
            <div>
              {/* Text + fakta */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.omMig.etikett}</p>
                <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{t.omMig.rubrik}</h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                  {t.omMig.stycken.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {t.omMig.fakta.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-indigo-400/50 w-12 shrink-0">{row.tag}</span>
                      <span className="text-xs text-white/55">{row.label}</span>
                    </div>
                    <span className="text-sm font-medium text-white/80">{row.value}</span>
                  </div>
                ))}
                </div>

                {/* Sociala länkar — bygger trovärdighet */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Theodor på LinkedIn"
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-white"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400 transition-colors group-hover:text-indigo-300">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://www.facebook.com/theo.hakansson.5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Theodor på Facebook"
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-white"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400 transition-colors group-hover:text-indigo-300">
                      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.faqRubrik.etikett}</p>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{t.faqRubrik.rubrik}</h2>
          </div>
          <div className="space-y-3" data-animate-group data-stagger="0.07">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] transition-colors open:border-indigo-500/30 open:bg-indigo-500/5 hover:border-white/15"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-white/85 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="flex-shrink-0 text-indigo-400 transition-transform duration-300 group-open:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate="block" className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-[#06060f] to-violet-950/60 p-6 sm:p-10 md:p-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-violet-500/15 blur-[60px]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">{t.kontakt.etikett}</p>
              <h2 className="font-display mt-4 text-center text-3xl font-bold text-white md:text-4xl">
                {t.kontakt.rubrik}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/65">
                {t.kontakt.ingress}
              </p>
              <form onSubmit={handleSubmit} className="mt-10 space-y-4">
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">{t.kontakt.namn}</label>
                    <input
                      type="text"
                      placeholder={t.kontakt.namnPlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">{t.kontakt.epost}</label>
                    <input
                      type="email"
                      placeholder={t.kontakt.epostPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50">{t.kontakt.meddelande}</label>
                  <textarea
                    rows={4}
                    placeholder={t.kontakt.meddelandePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                  />
                </div>
                {status === 'success' && (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    {t.kontakt.success}
                  </div>
                )}
                {status === 'error' && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {t.kontakt.error}
                  </div>
                )}

                {/* Trust text tätt ovanför knappen */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <p className="text-xs font-medium text-white/50">{t.kontakt.trust}</p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group btn-shine w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-indigo-600 py-[1.125rem] text-base font-bold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:shadow-indigo-800/60 hover:scale-[1.02] disabled:opacity-60 active:scale-[0.99]"
                >
                  {status === 'loading' ? (
                    t.kontakt.skickar
                  ) : (
                    <>
                      <IconSend />
                      {t.kontakt.skicka}
                    </>
                  )}
                </button>

                {/* Direktkontakt för den som inte gillar formulär */}
                <p className="pt-2 text-center text-xs text-white/40">
                  {t.kontakt.mejlFraga}{' '}
                  <a
                    href="mailto:webbdevstudio@gmail.com"
                    className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    webbdevstudio@gmail.com
                  </a>
                </p>

                {/* GDPR-notis */}
                <p className="text-center text-[11px] leading-relaxed text-white/30">
                  {t.kontakt.gdpr1}{' '}
                  <Link href="/integritetspolicy" className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-white/50">
                    {t.kontakt.gdpr2}
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* Företagsuppgifter */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="font-mono text-sm font-bold tracking-widest text-indigo-400 uppercase">
                Webbdev<span className="text-white/20">.</span>Studio
              </span>
              <p className="mt-3 text-xs leading-relaxed text-white/35">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{t.footer.foretag}</h3>
              <address className="mt-3 space-y-1.5 text-xs not-italic leading-relaxed text-white/50">
                {t.footer.foretagRader.map((rad) => (
                  <p key={rad}>{rad}</p>
                ))}
              </address>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{t.footer.orter}</h3>
              <nav className="mt-3 flex flex-col gap-1.5 text-xs leading-relaxed">
                {orter.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/webbutveckling/${o.slug}`}
                    className="text-white/50 transition-colors hover:text-indigo-300"
                  >
                    Webbutveckling {o.iNamn}
                  </Link>
                ))}
              </nav>
              <address className="mt-4 text-xs not-italic leading-relaxed text-white/40">
                Västra Gunnesgärde 41<br />
                417 47 Göteborg
              </address>
            </div>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{t.footer.kontakt}</h3>
              <div className="mt-3 space-y-1.5 text-xs leading-relaxed">
                <p>
                  <a href="tel:+46709525822" className="text-white/50 transition-colors hover:text-indigo-300">
                    070‑952 58 22
                  </a>
                </p>
                <p>
                  <a href="mailto:webbdevstudio@gmail.com" className="text-white/50 transition-colors hover:text-indigo-300">
                    webbdevstudio@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright-rad */}
          <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/5 pt-6 sm:flex-row sm:justify-between">
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} Webbdev Studio — webbdev.se
            </p>
            <div className="flex items-center gap-4 text-xs text-white/25">
              <Link href="/integritetspolicy" className="transition-colors hover:text-white/50">
                {t.footer.integritetspolicy}
              </Link>
              <span aria-hidden>·</span>
              <span>Org.nr 199507216498</span>
            </div>
          </div>
        </div>
      </footer>

      <StickyCta />
    </div>
  );
}
