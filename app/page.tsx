'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { faqByLang } from './faq';
import { Reveal } from './components/animations/Motion';
import HeroProject from './components/HeroProject';
import QualityChecklist from './components/QualityChecklist';
import { localizedHref } from './i18n/routes';
import ContactForm from './components/ContactForm';
import StickyCta from './components/StickyCta';
import { projects } from './portfolio/projects';
import { ProjectCard } from './components/ProjectPreview';
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

const selectedProjects = ['wildkull', 'ockerocement', 'swedensweet'].map(slug => projects.find(project => project.slug === slug)!);

const GOOGLE_REVIEWS_URL = 'https://g.page/r/CVBdAbJ_4hdSEAE';

export function Home({ lang = 'sv' }: { lang?: Lang }) {
  return (
    <LanguageProvider lang={lang} updateDocumentLang>
      <HomeContent />
    </LanguageProvider>
  );
}

function HomeContent() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const { lang, t } = useLang();
  const faqItems = faqByLang[lang];
  const homeSchema = getHomeSchema(lang, faqItems);

  const activeReview = t.recension2.lista[reviewIndex];

  return (
    <div lang={lang} className="home-page relative">

      {/* ── NAV ─────────────────────────────────────────────── */}


      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSchema).replace(/</g, '\\u003c'),
          }}
        />

      <section data-hero className="studio-hero">
        <div className="studio-container hero-layout">
          <div className="hero-copy">
            <p className="studio-eyebrow">{t.hero2.status1}</p>
            <h1>{lang === 'sv' ? <>Genomtänkta hemsidor.<br /><span>För företag som vill växa.</span></> : <>Thoughtful websites.<br /><span>For businesses ready to grow.</span></>}</h1>
            <p className="hero-intro">{t.hero2.ingress}</p>
            <div className="hero-actions">
              <a href="#kontakt" className="studio-button">{t.hero.ctaPrimar}<IconArrow /></a>
              <a href="#arbete" className="studio-text-link">{t.hero2.ctaSekundar}<span aria-hidden>↘</span></a>
            </div>
            <p className="hero-response">{lang === 'sv' ? 'Personlig återkoppling inom 24 timmar. Inget köpkrav.' : 'A personal reply within 24 hours. No obligation.'}</p>
            <div className="hero-proof">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer"><span className="hero-rating">{t.heroTrust.betyg} <span aria-hidden>★★★★★</span></span><span>{t.heroTrust.text}</span></a>
              <div><strong>{lang === 'sv' ? 'En kontakt. Hela vägen.' : 'One contact. Start to finish.'}</strong><span>{lang === 'sv' ? 'Från första skiss till lansering' : 'From the first sketch to launch'}</span></div>
            </div>
          </div>
          <HeroProject lang={lang} />
        </div>
      </section>

      <section className="home-testimonial" aria-label={lang === 'sv' ? 'Kundomdöme' : 'Client testimonial'}>
        <div className="studio-container testimonial-layout">
          <p className="studio-eyebrow">{lang === 'sv' ? 'Förtroende som förtjänas' : 'Trust, earned'}</p>
          <figure><blockquote>“{t.recension2.lista[0].text}”</blockquote><figcaption><strong>Veronika Wildkull</strong><span>Wildkull Payroll · {t.recension2.viaGoogle}{lang === 'en' ? ' · Translated from Swedish' : ''}</span></figcaption></figure>
        </div>
      </section>

      {/* ── UTVALDA PROJEKT ──────────────────────────────────── */}
      <section id="arbete" className="py-20 md:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Reveal className="mb-10 flex flex-wrap items-baseline justify-between gap-4 md:mb-14">
            <h2 className="font-display text-[clamp(36px,4.5vw,60px)] font-bold tracking-[-0.03em] text-foreground">
              {t.arbete.rubrik}
            </h2>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/70">
              {t.arbete.period}
            </span>
          </Reveal>

          {/* De utvalda — stora kort med webbläsarram och preview */}
          <div className="grid gap-x-7 gap-y-12 md:grid-cols-3">
            {selectedProjects.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard
                caseLabel={lang === "sv" ? "Läs kundcaset" : "Read the case study (Swedish)"}
                  project={p}
                  text={t.arbete.projekt[p.slug]}
                  besok={t.arbete.besok}
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <Link
              href={localizedHref("/portfolio", lang)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/12 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/25 hover:bg-foreground/[0.04]"
            >
              {t.arbete.alla}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <IconArrow />
              </span>
            </Link>
            <Link href={`${localizedHref('/portfolio', lang)}#mobil`} className="studio-text-link">{lang === 'sv' ? 'Se projekten på mobilen' : 'See the projects on mobile'} <span aria-hidden>↗</span></Link>
          </Reveal>
        </div>
      </section>


      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section id="process" className="border-t border-foreground/[0.07] py-20 md:py-28">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-light">
              {t.processIntro.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t.processIntro.rubrik}
            </h2>
            <p className="mt-[22px] max-w-[24rem] text-[15.5px] leading-[1.65] text-foreground/70 [text-wrap:pretty]">
              {t.processIntro.text}
            </p>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2.5 text-[15px] font-semibold text-accent-light transition-colors hover:text-accent-light"
            >
              {t.processIntro.cta}
              <IconArrow />
            </a>
          </Reveal>
          <div>
            {t.process.steg.map((steg, i) => (
              <Reveal key={steg.title}>
                <div className="grid grid-cols-[36px_minmax(0,1fr)] items-start gap-5 border-b border-foreground/[0.07] py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-8">
                  <span className="font-display text-[30px] sm:text-[40px] font-bold leading-none tracking-[-0.03em] text-accent-light/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[21px] font-semibold tracking-[-0.01em] text-foreground">
                      {steg.title}
                    </h3>
                    <p className="mt-2.5 max-w-[32rem] text-[15px] leading-[1.65] text-foreground/70 [text-wrap:pretty]">
                      {steg.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <QualityChecklist />
          </div>
        </div>
      </section>

      {/* ── RECENSIONER ──────────────────────────────────────── */}
      <section id="recensioner" className="relative overflow-hidden border-t border-foreground/[0.07] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[40%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 blur-[50px]"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(109,106,248,0.12), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[56rem] px-5 sm:px-8 text-center">
          <h2 className="studio-eyebrow mb-6">{t.recensioner.rubrik}</h2>
          <Reveal className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </Reveal>
          <Reveal>
            <blockquote
              key={reviewIndex}
              aria-live="polite"
              className="font-display mt-9 min-h-[8em] sm:min-h-[5.5em] text-[clamp(24px,3vw,36px)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground/90 [text-wrap:pretty]"
            >
              “{activeReview.text}”
            </blockquote>
            <p className="mt-8 text-[15px] font-semibold text-foreground/75">
              {activeReview.namn}
              <span className="ml-3 font-normal text-foreground/70">{t.recension2.viaGoogle}{lang === 'en' ? ' · Translated from Swedish' : ''}</span>
            </p>
          </Reveal>
          <Reveal className="mt-9 flex justify-center gap-1">
            {t.recension2.lista.map((r, i) => (
              <button
                key={r.namn}
                type="button"
                onClick={() => setReviewIndex(i)}
                aria-label={`${t.recension2.aria} ${i + 1}`}
                aria-pressed={reviewIndex === i}
                // Minst 24px träffyta (WCAG 2.5.8) — pricken är bara visuell.
                className="group flex h-11 min-w-11 items-center justify-center px-1"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    reviewIndex === i ? 'w-7 bg-accent' : 'w-2 bg-foreground/20 group-hover:bg-foreground/35'
                  }`}
                />
              </button>
            ))}
          </Reveal>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex text-[13.5px] font-medium text-accent-light transition-colors hover:text-accent-light"
          >
            {t.recensioner.lankText} →
          </a>
        </div>
      </section>

      {/* ── PRISER (teaser → /priser) ────────────────── */}
      <section className="border-t border-foreground/[0.07] py-[88px]">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 px-5 sm:px-8 text-center md:flex-row md:justify-between md:gap-12 md:text-left">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-light">
              {t.priser.etikett}
            </span>
            <h2 className="font-display mt-3.5 text-[clamp(26px,3vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
              {t.priserTeaser.rubrik}
            </h2>
            <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.65] text-foreground/70 [text-wrap:pretty]">
              {t.priserTeaser.text}
            </p>
          </Reveal>
          <Reveal className="flex-shrink-0">
            <Link
              href={localizedHref("/priser", lang)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/[0.18] px-7 py-3.5 text-[14.5px] font-semibold text-foreground/85 transition-all duration-200 hover:-translate-y-px hover:border-foreground/30 hover:text-foreground"
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
      <section id="om" className="border-t border-foreground/[0.07] py-20 md:py-28">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-light">
              {t.omMig.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t.omMig2.rubrik}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
              <Image
                src="/pp3.webp"
                alt="Theo Håkansson"
                width={336}
                height={336}
                sizes="(max-width: 639px) 168px, 336px"
                className="aspect-square h-auto w-[42vw] max-w-[168px] rounded-[32px] border border-foreground/10 object-cover [filter:saturate(0.9)_contrast(1.02)] sm:w-[336px] sm:max-w-full sm:rounded-[64px]"
              />
              <p className="flex flex-col gap-1">
                <span className="font-display text-[17px] font-semibold text-foreground">Theo Håkansson</span>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-foreground/70">
                  {t.omMig2.roll}
                </span>
              </p>
            </div>
            <a
              href="#kontakt"
              className="mt-8 inline-flex items-center gap-2.5 text-[15px] font-semibold text-accent-light transition-colors hover:text-accent-light"
            >
              {t.nav.kontakt}
              <IconArrow />
            </a>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex max-w-[38rem] flex-col gap-4 text-base leading-[1.65] text-foreground/70">
                <p className="[text-wrap:pretty]">{t.omMig2.p1}</p>
                <p className="[text-wrap:pretty]">{t.omMig2.p2}</p>
                <p className="[text-wrap:pretty]">{t.omMig2.p3}</p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {t.omMig.fakta.map((row) => (
                <Reveal key={row.label} className="flex">
                  <div className="flex w-full flex-col rounded-[20px] border border-foreground/[0.08] bg-foreground/[0.02] px-7 py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/[0.16]">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">
                      {row.tag}
                    </span>
                    <span className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70">
                      {row.label}
                    </span>
                    <span className="mt-1.5 text-[15px] font-medium text-foreground/90">{row.value}</span>
                    {row.tag === 'SPEED' && <p className="mt-2 text-xs leading-relaxed text-foreground/65">{lang === 'sv' ? 'Från godkänd design och komplett material. Tidsplanen anpassas efter omfattning.' : 'From approved design and complete content. Timing depends on scope.'}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-foreground/[0.07] py-20 md:py-28">
        <div className="mx-auto grid max-w-[80rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-[120px]">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-light">
              {t.faqIntro.etikett}
            </span>
            <h2 className="font-display mt-4 text-[clamp(32px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t.faqIntro.rubrik}
            </h2>
            <p className="mt-[22px] max-w-[22rem] text-[15px] leading-[1.65] text-foreground/70">
              {t.faqIntro.text1}{' '}
              <a href="mailto:webbdevstudio@gmail.com" className="text-accent-light transition-colors hover:text-accent-light">
                {t.faqIntro.mejla}
              </a>{' '}
              {t.faqIntro.text2}
            </p>
          </Reveal>
          <Reveal>
            {faqItems.map((item) => (
              <details key={item.q} className="group border-b border-foreground/[0.08]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-1 py-[26px] font-display text-[17px] font-semibold text-foreground/[0.88] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-foreground/15 text-base font-normal text-accent-light transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-[36rem] px-1 pb-[26px] text-[15px] leading-[1.7] text-foreground/70">
                  {item.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className="relative overflow-hidden border-t border-foreground/[0.07] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[20%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 blur-[60px]"
          style={{ background: 'radial-gradient(45% 45% at 50% 50%, rgba(109,106,248,0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-[52rem] px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] font-bold leading-none tracking-[-0.035em] text-foreground">
              {t.kontakt2.rubrik1} <em className="not-italic text-accent">{t.kontakt2.rubrik2}</em>
            </h2>
            <p className="mx-auto mt-7 max-w-[30rem] text-[17px] leading-[1.6] text-foreground/70 [text-wrap:pretty]">
              {t.kontakt2.ingress}
            </p>
          </Reveal>
          <div className="contact-person"><Image src="/pp3.webp" alt="Theo Håkansson" width={56} height={56} sizes="56px" /><div><strong>{lang === 'sv' ? 'Din förfrågan går direkt till Theo.' : 'Your enquiry goes directly to Theo.'}</strong><p>{lang === 'sv' ? 'Grundare, designer och utvecklare' : 'Founder, designer and developer'}</p></div></div>
          <p className="contact-next">{lang === 'sv' ? 'I vårt första samtal går vi igenom ditt företag, vad webbplatsen ska hjälpa dig med och vilken omfattning som passar. Du behöver inte ha en färdig kravlista.' : 'In our first conversation, we discuss your business, what your website should help you achieve and the right scope. You don’t need a finished brief.'}</p>
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal>
            <p className="mt-9 text-sm text-foreground/70">
              {t.kontakt2.direktFraga}{' '}
              <a
                href="tel:+46709525822"
                className="break-words font-medium text-accent-light transition-colors hover:text-accent-light"
              >
                070‑952 58 22
              </a>{' '}
              ·{' '}
              <a
                href="mailto:webbdevstudio@gmail.com"
                className="break-words font-medium text-accent-light transition-colors hover:text-accent-light"
              >
                webbdevstudio@gmail.com
              </a>
            </p>
            {/* GDPR-notis */}
            <p className="mt-4 text-center text-xs leading-relaxed text-foreground/70">
              {t.kontakt.gdpr1}{' '}
              <Link href="/integritetspolicy" className="underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-muted">
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
