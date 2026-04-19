'use client';

import { useState } from 'react';

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7" cy="7" r="7" fill="#6366f1" opacity="0.2" />
      <path d="M4 7l2.5 2.5L10 4.5" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#06060f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-mono text-sm font-bold tracking-widest text-indigo-400 uppercase">
            Webbdev<span className="text-white/30">.</span>Studio
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#tjanster" className="hover:text-white transition-colors">Tjänster</a>
            <a href="#processen" className="hover:text-white transition-colors">Process</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#priser" className="hover:text-white transition-colors">Priser</a>
            <a href="#om-mig" className="hover:text-white transition-colors">Om mig</a>
          </nav>
          <a
            href="#kontakt"
            className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400/60"
          >
            Kontakta mig
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center bg-grid pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Webbutveckling för moderna företag
          </div>

          <h1 className="animate-fade-up-2 mt-8 max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-white">Modern hemsida</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              som ger fler kunder
            </span>
          </h1>

          <p className="animate-fade-up-3 mt-7 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Jag bygger snabba, professionella hemsidor som konverterar — med Next.js och
            modern design. Leverans på 3 dagar, fast pris, inga dolda kostnader.
          </p>

          <div className="animate-fade-up-3 mt-10 flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-500 hover:shadow-indigo-800/50 active:scale-[0.98]"
            >
              Få en gratis analys
              <span className="transition-transform group-hover:translate-x-0.5"><IconArrow /></span>
            </a>
            <a
              href="#processen"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
            >
              Se processen
            </a>
          </div>

          <div className="animate-fade-in mt-16 flex flex-wrap gap-10 border-t border-white/8 pt-10">
            {[
              { value: '3 dagar', label: 'Snabb leverans' },
              { value: '2+ år', label: 'Erfarenhet' },
              { value: '100%', label: 'Fast pris' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Varför byta?</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Kostar din gamla hemsida affärer?
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Slöar försäljningen', desc: 'Gamla hemsidor avviker besökare på första sekunden — du förlorar kunder utan att ens veta om det.' },
              { label: 'Förvirrande UX', desc: 'Dålig navigation gör att kunder inte hittar det de söker. De lämnar och går till konkurrenten.' },
              { label: 'Ser oprofessionell ut', desc: 'En daterad design signalerar att du inte håller dig uppdaterad. Det skrämmer bort moderna kunder.' },
              { label: 'Dålig laddtid', desc: 'Varje sekund extra laddtid kostar dig konverteringar och Google-ranking.' },
              { label: 'Inte mobilvänlig', desc: '70% av trafiken är mobil. Utan responsiv design förlorar du mer än hälften av dina besökare.' },
              { label: 'Syns inte på Google', desc: 'Utan SEO-optimering hittar ingen dig. Ingen trafik = ingen försäljning.' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-red-500/10 bg-red-500/5 p-6 transition-all hover:border-red-500/20"
              >
                <div className="mb-3 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                  Problem
                </div>
                <h3 className="mb-2 font-semibold text-white/90">{item.label}</h3>
                <p className="text-sm leading-relaxed text-white/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TJÄNSTER */}
      <section id="tjanster" className="relative py-28 bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06060f] via-transparent to-[#06060f]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Det jag levererar</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Teknik &amp; tjänster i världsklass
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Next.js & React', desc: 'Snabbaste ramverket för moderna, SEO-vänliga hemsidor med server-side rendering.', tag: 'Core' },
              { title: 'Supabase backend', desc: 'Säker databas med realtidsuppdateringar, autentisering och API ur lådan.', tag: 'Backend' },
              { title: 'Admin-panel', desc: 'Hantera allt innehåll själv via ett modernt gränssnitt — ingen kod krävs.', tag: 'CMS' },
              { title: 'Optimerad prestanda', desc: 'Lighthouse-score 95+. Core Web Vitals godkänt. Din sida rankar på Google.', tag: 'SEO' },
              { title: 'Premium design', desc: 'Modernt, iögonfallande och konverteringsoptimerat. Byggt för att imponera.', tag: 'Design' },
              { title: 'Stripe-betalningar', desc: 'Säker e-handel med Stripe. Sälj produkter eller tjänster direkt från hemsidan.', tag: 'E-commerce' },
              { title: 'Fast pris', desc: 'Inget timpris, inga överraskningar. Du vet exakt vad du betalar från dag ett.', tag: 'Pris' },
              { title: '3 dagars leverans', desc: 'Från brief till live hemsida på 3 arbetsdagar. Snabbt när det gäller.', tag: 'Leverans' },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5"
              >
                <div className="mb-3 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] text-indigo-400">
                  {item.tag}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white/90 group-hover:text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="processen" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Min process</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Från idé till live på 5 steg
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { step: '01', title: 'Gratis analys', desc: 'Vi börjar med ett samtal om dina mål och din nuvarande situation. Jag analyserar konkurrenter och sätter ihop en strategi.' },
              { step: '02', title: 'Designförslag', desc: 'Du får ett visuellt designförslag som visar exakt hur hemsidan kommer se ut — innan ett enda tecken kod skrivs.' },
              { step: '03', title: 'Byggnation', desc: 'Jag bygger hemsidan med senaste tekniken. Full transparens — du kan följa framgången i realtid via ett delat Vercel-projekt.' },
              { step: '04', title: 'Lansering', desc: 'Din hemsida är live. Jag hanterar domän, SSL, hosting och alla tekniska detaljer. Du behöver inte göra något.' },
              { step: '05', title: 'Support & underhåll', desc: 'Första månaden support ingår gratis. Snabba svar, snabba fixes. Du är aldrig ensam med din hemsida.' },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative flex gap-8 border-t border-white/8 py-10 transition-all hover:border-indigo-500/20"
              >
                <div className="hidden w-16 flex-shrink-0 md:block">
                  <span className="font-mono text-4xl font-bold text-white/8 transition-colors group-hover:text-indigo-500/20">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-bold text-indigo-400">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white/90 group-hover:text-white">{item.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Min portfölj</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Projekt jag har byggt</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Karla Cleaning Crew',
                desc: 'Professionell hemsida för ett städföretag med tydlig presentation av tjänster, priser och kontaktformulär.',
                tech: ['Next.js', 'Tailwind', 'Vercel'],
                url: 'https://karlacleaningcrew.se/',
              },
              {
                name: 'Wellness Studio',
                desc: 'Modern bokningssida för spa- och wellness-tjänster med integrerad betalning via Stripe och automatiserad e-post.',
                tech: ['Next.js', 'Tailwind', 'Supabase'],
                url: 'https://bokning-taupe.vercel.app/',
              },
              {
                name: 'Konstbyte — Marknadsplats',
                desc: 'E-handelsplattform för konstnärer med community-features, AI-integration och fullständig administratörsöversikt.',
                tech: ['Next.js', 'Prisma', 'Stripe', 'AI'],
                url: 'https://www.konstbyte.se/',
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-white/8 bg-white/[0.03] p-8 transition-all hover:border-indigo-500/25 hover:bg-indigo-500/5"
              >
                <div className="mb-6 h-48 w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-indigo-950/60 to-violet-950/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-5xl font-bold text-white/10">{item.name[0]}</div>
                    <div className="mt-2 text-xs text-white/20 uppercase tracking-widest">Besök projekt</div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white/90 group-hover:text-white">{item.name}</h3>
                      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">Live</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{item.desc}</p>
                  </div>
                  <span className="flex-shrink-0 text-white/30 transition-all group-hover:text-indigo-400 group-hover:translate-x-1">
                    <IconArrow />
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/50">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRISER */}
      <section id="priser" className="relative py-28 bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06060f] via-transparent to-[#06060f]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Priser</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Välj rätt paket för dig</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                className={`relative rounded-3xl p-8 transition-all ${
                  item.highlighted
                    ? 'border border-indigo-500/40 bg-gradient-to-b from-indigo-950/80 to-violet-950/60 shadow-2xl shadow-indigo-900/30 scale-[1.02]'
                    : 'border border-white/8 bg-white/[0.03]'
                }`}
              >
                {item.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-indigo-500/40 bg-indigo-600 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                    Mest populär
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-mono text-lg font-bold text-white/80">{item.tier}</h3>
                  <div className="mt-3 text-4xl font-bold text-white">{item.price}</div>
                  <p className="mt-1 text-sm text-white/60">{item.desc}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                      <IconCheck />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-all ${
                    item.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Kom igång
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OM MIG */}
      <section id="om-mig" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-10 md:p-14">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Om mig</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Vem bygger din hemsida?</h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                  <p>
                    Jag är en junior webbutvecklare med en examen i systemvetenskap från Göteborgs
                    universitet och drygt 2 år av praktisk erfarenhet genom egna projekt och
                    frilansuppdrag.
                  </p>
                  <p>
                    Eftersom jag är i början av min karriär kan jag erbjuda prisvärda lösningar utan
                    att kompromissa med kvaliteten. Jag har också gott om tid för support och
                    är alltid tillgänglig för frågor och justeringar.
                  </p>
                  <p>
                    Jag tar varje projekt på allvar och lägger ner den tid som krävs för att du ska
                    vara nöjd med resultatet.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Utbildning', value: 'Systemvetenskap, GU', tag: 'EDU' },
                  { label: 'Erfarenhet', value: '2+ år webbutveckling', tag: 'EXP' },
                  { label: 'Teknikstack', value: 'Next.js · React · TypeScript', tag: 'TECH' },
                  { label: 'Leveranstid', value: '3 arbetsdagar', tag: 'SPEED' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-indigo-400/50 w-12 shrink-0">{row.tag}</span>
                      <span className="text-xs text-white/60">{row.label}</span>
                    </div>
                    <span className="text-sm font-medium text-white/70">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/80 via-[#06060f] to-violet-950/60 p-10 md:p-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-violet-500/15 blur-[60px]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/60">Kom igång</p>
              <h2 className="mt-4 text-center text-3xl font-bold text-white md:text-4xl">
                Redo för din nya hemsida?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/70">
                Fyll i formuläret nedan så hör jag av mig inom 24 timmar med en gratis analys.
              </p>
              <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">Namn</label>
                    <input
                      type="text"
                      placeholder="Ditt namn"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 transition-colors focus:border-indigo-500/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/40">E-post</label>
                    <input
                      type="email"
                      placeholder="namn@foretag.se"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 transition-colors focus:border-indigo-500/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">Berätta om ditt projekt</label>
                  <textarea
                    rows={4}
                    placeholder="Vad behöver du hjälp med? Berätta om ditt företag och dina mål..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 transition-colors focus:border-indigo-500/50 focus:outline-none"
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
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-500 disabled:opacity-60 active:scale-[0.99]"
                >
                  {status === 'loading' ? 'Skickar...' : (
                    <>
                      Skicka förfrågan
                      <span className="transition-transform group-hover:translate-x-0.5"><IconArrow /></span>
                    </>
                  )}
                </button>
              </form>
              <p className="mt-5 text-center text-xs text-white/25">
                Ingen kostnad, ingen förpliktelse. Svar inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="font-mono text-sm font-bold tracking-widest text-indigo-400 uppercase">
            Webbdev<span className="text-white/20">.</span>Studio
          </span>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Webbdev Studio — webbdev.se
          </p>
          <a href="mailto:hej@webbdev.se" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            hej@webbdev.se
          </a>
        </div>
      </footer>
    </div>
  );
}
