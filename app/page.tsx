'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import useAnimations from './components/animations/useAnimations';
import { faqItems } from './faq';
import { CountUp, Item, Magnetic, MaskReveal, Stagger, TiltCard } from './components/animations/Motion';

function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#6366f1" opacity="0.15" />
      <path d="M4.5 7.5l2.5 2.5L10.5 5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scopeRef = useRef<HTMLDivElement>(null);

  useAnimations(scopeRef);

  // Markera aktiv sektion i nav medan man scrollar
  useEffect(() => {
    const ids = ['tjanster', 'processen', 'portfolio', 'priser', 'om-mig'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
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
    const onMove = (e: PointerEvent) => {
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
              { id: 'tjanster', label: 'Tjänster' },
              { id: 'processen', label: 'Process' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'priser', label: 'Priser' },
              { id: 'om-mig', label: 'Om mig' },
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
          <a
            href="#kontakt"
            className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400/60 hover:text-indigo-200"
          >
            Kontakta mig
          </a>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-hero className="relative flex min-h-screen items-center bg-grid pt-20">
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
              Webbutveckling för moderna företag
            </div>
          </Item>

          {/* H1 — cinematic mask-reveal per rad */}
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.06] tracking-tight md:text-6xl lg:text-7xl">
            <MaskReveal>
              <span className="text-white">Hemsidor som</span>
            </MaskReveal>
            <MaskReveal>
              <span className="animate-gradient-x bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                faktiskt säljer
              </span>
            </MaskReveal>
          </h1>

          {/* USP-rad */}
          <Item className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/60">
            {['Leverans på 3 dagar', 'Fast pris', 'Inga dolda kostnader'].map((usp, i) => (
              <span key={usp} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-white/20">·</span>}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                {usp}
              </span>
            ))}
          </Item>

          {/* CTAs — magnetiska */}
          <Item className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#kontakt"
                className="group btn-shine inline-flex items-center gap-2.5 rounded-full bg-indigo-600 px-9 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:shadow-indigo-800/60 hover:scale-[1.03] active:scale-[0.98]"
              >
                Få en gratis analys
                <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="#processen"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:border-white/25"
              >
                Se hur det funkar
              </a>
            </Magnetic>
          </Item>

          {/* Stats — räknar upp när de blir synliga */}
          <Item className="mt-14 flex flex-wrap gap-10 border-t border-white/8 pt-10">
            {[
              { to: 3, suffix: ' dagar', label: 'Snabb leverans' },
              { to: 2, suffix: '+ år', label: 'Erfarenhet' },
              { to: 100, suffix: '%', label: 'Fast pris' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </Item>
        </Stagger>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Varför byta?</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Kostar din gamla hemsida affärer?
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.08">
            {[
              { icon: problemIcons.speed, label: 'Slöar försäljningen',   desc: 'Gamla hemsidor tappar besökare på första sekunden — du förlorar kunder utan att veta om det.' },
              { icon: problemIcons.ux,    label: 'Förvirrande UX',        desc: 'Dålig navigation gör att kunder inte hittar det de söker och går till konkurrenten.' },
              { icon: problemIcons.trust, label: 'Ser oprofessionell ut', desc: 'En daterad design signalerar att du inte håller dig uppdaterad och skrämmer bort kunder.' },
              { icon: problemIcons.perf,  label: 'Dålig laddtid',         desc: 'Varje extra sekund laddtid kostar dig konverteringar och Google-ranking.' },
              { icon: problemIcons.mobile,'label': 'Inte mobilvänlig',    desc: '70% av trafiken är mobil. Utan responsiv design förlorar du halva marknaden.' },
              { icon: problemIcons.seo,   label: 'Syns inte på Google',   desc: 'Utan SEO-optimering hittar ingen dig. Ingen trafik = ingen försäljning.' },
            ].map((item) => (
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Det jag levererar</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Teknik &amp; tjänster i världsklass
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-animate-group data-stagger="0.07">
            {[
              { title: 'Next.js & React',     desc: 'Snabbaste ramverket för moderna, SEO-vänliga hemsidor med server-side rendering.', tag: 'Core' },
              { title: 'Supabase backend',    desc: 'Säker databas med realtidsuppdateringar, autentisering och API ur lådan.',          tag: 'Backend' },
              { title: 'Admin-panel',         desc: 'Hantera allt innehåll själv via ett modernt gränssnitt — ingen kod krävs.',         tag: 'CMS' },
              { title: 'Optimerad prestanda', desc: 'Lighthouse-score 95+. Core Web Vitals godkänt. Din sida rankar på Google.',          tag: 'SEO' },
              { title: 'Premium design',      desc: 'Modernt, iögonfallande och konverteringsoptimerat. Byggt för att imponera.',         tag: 'Design' },
              { title: 'Stripe-betalningar',  desc: 'Säker e-handel med Stripe. Sälj produkter eller tjänster direkt från hemsidan.',    tag: 'E-commerce' },
              { title: 'Fast pris',           desc: 'Inget timpris, inga överraskningar. Du vet exakt vad du betalar från dag ett.',      tag: 'Pris' },
              { title: '3 dagars leverans',   desc: 'Från brief till live hemsida på 3 arbetsdagar. Snabbt när det gäller.',              tag: 'Leverans' },
            ].map((item) => (
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Min process</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Från idé till live på 5 steg
            </h2>
          </div>
          {/* Kort-layout med stora cirklar */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.1">
            {[
              { n: 1, title: 'Gratis analys',    desc: 'Vi börjar med ett samtal om dina mål. Jag analyserar din situation och sätter ihop en strategi.' },
              { n: 2, title: 'Designförslag',    desc: 'Du får ett visuellt förslag som visar exakt hur hemsidan kommer se ut — innan ett tecken kod skrivs.' },
              { n: 3, title: 'Byggnation',       desc: 'Jag bygger med senaste tekniken. Full transparens — du kan följa framgången i realtid.' },
              { n: 4, title: 'Lansering',        desc: 'Din hemsida är live. Jag hanterar domän, SSL och hosting. Du behöver inte göra något.' },
              { n: 5, title: 'Support',          desc: 'Första månaden support ingår gratis. Snabba svar, snabba fixes. Du är aldrig ensam.' },
            ].map((item) => (
              <div key={item.n} className="group card-spotlight h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5">
                {/* Stor cirkel med siffra */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-xl font-bold text-indigo-300 transition-all group-hover:border-indigo-500/60 group-hover:text-indigo-200 group-hover:scale-110">
                  {item.n}
                </div>
                <h3 className="mb-2 text-base font-bold text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
              </div>
            ))}
            {/* Sista "kort" — CTA */}
            <div className="card-spotlight h-full rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-violet-950/40 p-7 flex flex-col justify-between">
              <p className="text-sm leading-relaxed text-white/60">
                Redo att komma igång? Det kostar ingenting att höra av sig.
              </p>
              <a
                href="#kontakt"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Boka gratis analys <span className="transition-transform group-hover:translate-x-1"><IconArrow /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────── */}
      <section id="portfolio" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Min portfölj</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Projekt jag har byggt</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-animate-group data-stagger="0.1">
            {[
              {
                name: 'Karla Cleaning Crew',
                desc: 'Professionell hemsida för ett städföretag med tydlig presentation av tjänster, priser och kontaktformulär.',
                result: 'Snabb, mobiloptimerad och enkel att hitta på Google.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://karlacleaningcrew.se/',
                img: '/1.png',
              },
              {
                name: 'Wellness Studio',
                desc: 'Modern bokningssida för spa- och wellness-tjänster med integrerad betalning via Stripe och automatiserad e-post.',
                result: 'Helautomatiserad bokningsprocess utan manuellt arbete.',
                tech: ['Next.js', 'Tailwind', 'Supabase'],
                url: 'https://bokning-gue0ah1a6-webbdev.vercel.app/',
                img: '/2.png',
              },
              {
                name: 'Konstbyte',
                desc: 'E-handelsplattform för konstnärer med community-features, AI-integration och fullständig administratörsöversikt.',
                result: 'Skalbar plattform med AI-funktioner och Stripe-betalningar.',
                tech: ['Next.js', 'Prisma', 'Stripe', 'AI'],
                url: 'https://www.konstbyte.se/',
                img: '/3.png',
              },
              {
                name: 'Prolink',
                desc: 'Modern företagswebbplats med fokus på tydlig presentation av tjänster och professionell design.',
                result: 'Snygg och snabb sajt som stärker varumärket online.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://www.prolink.se/',
                img: '/4.png',
              },
              {
                name: 'SwedenSweet',
                desc: 'E-handelsplattform för svenska godsaker med sömlös shoppingupplevelse och modern design.',
                result: 'Komplett nätbutik med enkel navigation och snabb checkout.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://swedensweet.vercel.app/',
                img: '/5.png',
              },
              {
                name: 'FlexLeague',
                desc: 'Plattform för att skapa och hantera ligor och tävlingar med matchschema, tabeller och resultat i realtid.',
                result: 'Smidig liga-hantering med automatiska tabeller och statistik.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://flex-league-o59hu8vor-ths-projects-9e3c8e82.vercel.app/',
                img: '/Flex.png',
              },
              {
                name: 'Erotikmässan',
                desc: 'Modern eventwebbplats för Erotikmässan med stilren design, programöversikt och tydlig presentation av utställare.',
                result: 'Iögonfallande sajt som lyfter eventet och driver biljettförsäljning.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://erotikm-ssan.vercel.app/',
                img: '/7.png',
              },
              {
                name: 'Widkull Payroll AB',
                desc: 'Professionell företagswebbplats för en lönebyrå med tydlig presentation av tjänster och förtroendeingivande design.',
                result: 'Trovärdig och modern sajt som stärker varumärket online.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://widkull.vercel.app/',
                img: '/6.png',
              },
            ].map((item) => (
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
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{item.name}</h3>
                  <span className="flex-shrink-0 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">Live</span>
                </div>

                <p className="text-sm leading-relaxed text-white/55 mb-3">{item.desc}</p>

                {/* Kundresultat */}
                <div className="flex items-start gap-2 rounded-lg border border-indigo-500/15 bg-indigo-500/5 px-3 py-2 mb-4">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <p className="text-xs text-indigo-300/80">{item.result}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/45">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── OMDÖMEN ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Omdömen</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Vad kunderna säger</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-animate-group data-stagger="0.1">
            {[
              {
                quote: 'Snabbt, smidigt och resultatet blev mycket snyggare än jag väntat mig. Hela processen var enkel från start till mål.',
                name: 'Karla',
                company: 'Karla Cleaning Crew',
              },
              {
                quote: 'Theodor förstod direkt vad vi behövde. Plattformen fungerar felfritt och våra kunder älskar den nya designen.',
                name: 'Konstbyte',
                company: 'konstbyte.se',
              },
              {
                quote: 'Proffsigt bemötande och en sajt som verkligen stärker vårt varumärke. Snabb leverans och allt fungerade direkt.',
                name: 'Prolink',
                company: 'prolink.se',
              },
              {
                quote: 'Vår nätbutik blev snygg, snabb och otroligt enkel att använda. Checkouten flyter på och kunderna är nöjda.',
                name: 'SwedenSweet',
                company: 'swedensweet.vercel.app',
              },
            ].map((item) => (
              <figure
                key={item.company}
                className="card-spotlight flex h-full flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5"
              >
                <div>
                  <div className="mb-4 flex gap-1 text-indigo-400" aria-label="5 av 5 stjärnor">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l2.9 6.26L21.5 9.27l-4.75 4.37L17.8 20 12 16.6 6.2 20l1.05-6.36L2.5 9.27l6.6-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-white/70">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-bold text-indigo-300">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/85">{item.name}</div>
                    <div className="text-xs text-white/40">{item.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
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
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Priser</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Välj rätt paket för dig</h2>
          </div>
          <div className="pricing-grid grid gap-6 md:grid-cols-3 md:items-end" data-animate-group data-stagger="0.12">
            {[
              {
                tier: 'Bas',
                price: '2 000 kr',
                desc: 'Perfekt för att komma igång snabbt',
                features: ['Responsiv hemsida', '5 sidor', 'Kontaktformulär', 'Mobil-optimerad'],
                highlighted: false,
              },
              {
                tier: 'Premium',
                price: '4 000 kr',
                desc: 'Det mest populära alternativet',
                features: ['Allt från Bas', 'Upp till 15 sidor', 'Admin-panel för innehåll', 'SEO-optimerad', '1 månads support'],
                highlighted: true,
              },
              {
                tier: 'Full Service',
                price: '6 000 kr',
                desc: 'Komplett lösning med allt inkluderat',
                features: ['Allt från Premium', 'Obegränsat antal sidor', 'E-handel via Stripe', 'Avancerad admin-panel', '3 månaders support'],
                highlighted: false,
              },
            ].map((item) => (
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
                    ★ Mest populär
                  </div>
                )}
                <div className="mb-7">
                  <h3 className={`font-mono font-bold uppercase tracking-wider ${item.highlighted ? 'text-indigo-300 text-sm' : 'text-white/60 text-sm'}`}>
                    {item.tier}
                  </h3>
                  <div className={`mt-3 font-bold text-white ${item.highlighted ? 'text-6xl' : 'text-5xl'}`}>
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
                  Kom igång
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OM MIG ───────────────────────────────────────────── */}
      <section id="om-mig" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div data-animate="block" className="rounded-3xl border border-white/8 bg-white/[0.03] p-10 md:p-14">
            <div className="grid gap-12 md:grid-cols-[minmax(0,280px)_1fr] md:items-center lg:gap-16">
              {/* Porträtt */}
              <div className="mx-auto w-full max-w-[280px] md:mx-0">
                <div className="group relative">
                  <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-cyan-500/15 opacity-70 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 ring-1 ring-white/5 shadow-2xl shadow-indigo-950/50">
                    <div data-animate="image" className="relative aspect-[4/5] w-full will-change-transform">
                      <Image
                        src="/pp.png"
                        alt="Theodor — webbutvecklare bakom Webbdev Studio"
                        fill
                        sizes="280px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06060f]/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Text + fakta */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Om mig</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Vem bygger din hemsida?</h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                  <p>
                    Jag är en junior webbutvecklare med en examen i systemvetenskap från Göteborgs
                    universitet och drygt 2 år av praktisk erfarenhet genom egna projekt och frilansuppdrag.
                  </p>
                  <p>
                    Eftersom jag är i början av min karriär kan jag erbjuda prisvärda lösningar utan
                    att kompromissa med kvaliteten. Jag har också gott om tid för support och är alltid
                    tillgänglig för frågor och justeringar.
                  </p>
                  <p>
                    Jag tar varje projekt på allvar och lägger ner den tid som krävs för att du ska
                    vara nöjd med resultatet.
                  </p>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Utbildning',  value: 'Systemvetenskap, GU',       tag: 'EDU' },
                  { label: 'Erfarenhet',  value: '2+ år webbutveckling',       tag: 'EXP' },
                  { label: 'Teknikstack', value: 'Next.js · React · TypeScript', tag: 'TECH' },
                  { label: 'Leveranstid', value: '3 arbetsdagar',               tag: 'SPEED' },
                ].map((row) => (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10" data-animate="header">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Vanliga frågor</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Bra att veta</h2>
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
          <div data-animate="block" className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-[#06060f] to-violet-950/60 p-10 md:p-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-violet-500/15 blur-[60px]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Kom igång</p>
              <h2 className="mt-4 text-center text-3xl font-bold text-white md:text-4xl">
                Redo för din nya hemsida?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/65">
                Fyll i formuläret nedan så hör jag av mig med en gratis analys.
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
                    <label className="mb-1.5 block text-xs font-medium text-white/50">Namn</label>
                    <input
                      type="text"
                      placeholder="Ditt namn"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/50">E-post</label>
                    <input
                      type="email"
                      placeholder="namn@foretag.se"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/50">Berätta om ditt projekt</label>
                  <textarea
                    rows={4}
                    placeholder="Vad behöver du hjälp med? Berätta om ditt företag och dina mål..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/25 transition-colors focus:border-indigo-500/50 focus:bg-white/8 focus:outline-none"
                  />
                </div>
                {status === 'success' && (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    Tack! Jag kontaktar dig inom 24 timmar.
                  </div>
                )}
                {status === 'error' && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    Något gick fel — försök igen senare.
                  </div>
                )}

                {/* Trust text tätt ovanför knappen */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <p className="text-xs font-medium text-white/50">Jag svarar alltid inom 24 timmar · Ingen kostnad · Ingen förpliktelse</p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group btn-shine w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-indigo-600 py-4.5 py-[1.125rem] text-base font-bold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:shadow-indigo-800/60 hover:scale-[1.02] disabled:opacity-60 active:scale-[0.99]"
                >
                  {status === 'loading' ? (
                    'Skickar...'
                  ) : (
                    <>
                      <IconSend />
                      Skicka förfrågan gratis
                    </>
                  )}
                </button>

                {/* Direktkontakt för den som inte gillar formulär */}
                <p className="pt-2 text-center text-xs text-white/40">
                  Föredrar du mejl?{' '}
                  <a
                    href="mailto:webbdevstudio@gmail.com"
                    className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    webbdevstudio@gmail.com
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="font-mono text-sm font-bold tracking-widest text-indigo-400 uppercase">
            Webbdev<span className="text-white/20">.</span>Studio
          </span>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Webbdev Studio — webbdev.se
          </p>
          <a href="mailto:webbdevstudio@gmail.com" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            webbdevstudio@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
