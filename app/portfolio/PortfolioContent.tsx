'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import TrafficResults from '../components/TrafficResults';
import MobileProjects from '../components/MobileProjects';
import { Reveal } from '../components/animations/Motion';
import { BrowserPreview } from '../components/ProjectPreview';
import { useLang } from '../i18n/LanguageProvider';
import { featuredProjects, otherProjects, type Project } from './projects';

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

// Ett case i full bredd: preview till vänster, texten till höger. Varannan rad
// byter sida så att sidan inte blir en enda lodrät kolumn.
function CaseRow({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLang();
  const text = t.arbete.projekt[project.slug];
  const reverse = index % 2 === 1;
  return (
    <Reveal>
      <a
        href={project.caseHref ?? project.url}
        target={project.caseHref ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="group grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
      >
        <div className={reverse ? 'lg:order-2' : ''}>
          <BrowserPreview project={project} priority={index < 2} />
        </div>
        <div className={reverse ? 'lg:order-1' : ''}>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
            {text.kategori}
          </span>
          <h2 className="font-display mt-3.5 text-[30px] font-bold [overflow-wrap:anywhere] tracking-[-0.02em] text-foreground">
            {project.namn}
          </h2>
          <p className="mt-[18px] max-w-[30rem] text-[15.5px] leading-[1.65] text-foreground/60 [text-wrap:pretty]">
            {text.desc}
          </p>
          <p className="mt-5 max-w-[30rem] border-l-2 border-accent pl-3.5 text-sm font-medium text-foreground/85">
            {text.result}
          </p>
          <div className="mt-[26px] flex flex-wrap gap-2.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-foreground/10 px-3.5 py-[5px] font-mono text-[11px] text-foreground/60"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-[30px] inline-flex items-center gap-2.5 text-sm font-semibold text-accent-light">
            {project.caseHref ? (lang === 'sv' ? 'Läs kundcaset' : 'Read the case study (Swedish)') : t.arbete.besok}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <IconArrow />
            </span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function PortfolioContent() {
  const { t, lang } = useLang();

  return (
    <main className="portfolio-page relative pb-32 pt-28">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Link
          href={localizedHref("/", lang)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent-light"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">
            <IconBack />
          </span>
          {t.portfolioSida.tillbaka}
        </Link>

        {/* Sidhuvud */}
        <Reveal className="mt-14 max-w-[46rem]">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
            {t.portfolioSida.etikett}
          </span>
          <h1 className="font-display mt-4 text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            {t.portfolioSida.rubrik}
          </h1>
          <p className="mt-[22px] text-[16.5px] leading-[1.65] text-foreground/60 [text-wrap:pretty]">
            {t.portfolioSida.ingress}
          </p>
        </Reveal>

        {/* Utvalda projekt — ett case per rad */}
        <div className="mt-[88px] flex flex-col gap-[104px]">
          {[...featuredProjects].sort((a, b) => Number(Boolean(b.caseHref)) - Number(Boolean(a.caseHref))).map((p, i) => (
            <CaseRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <MobileProjects />

        {/* Fler projekt */}
        <Reveal className="mt-[120px] flex items-center gap-5">
          <h2 className="font-display text-[21px] font-bold tracking-[-0.02em] text-foreground">
            {t.portfolioSida.fler}
          </h2>
          <span className="h-px flex-1 bg-foreground/[0.09]" />
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {otherProjects.map((p) => {
            const text = t.arbete.projekt[p.slug];
            return (
              <Reveal key={p.slug}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <BrowserPreview project={p} />
                  <div className="mt-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-light">
                      {text.kategori}
                    </span>
                    <h3 className="font-display mt-2.5 text-[22px] font-bold tracking-[-0.02em] text-foreground">
                      {p.namn}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-muted [text-wrap:pretty]">
                      {text.desc}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20"><TrafficResults /></div>

        {/* Avslutande CTA */}
        <Reveal className="mt-[120px] rounded-[24px] border border-foreground/[0.09] bg-foreground/[0.02] px-5 sm:px-8 py-14 text-center">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.02em] text-foreground">
            {t.portfolioSida.ctaRubrik}
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15.5px] leading-[1.65] text-foreground/60">
            {t.portfolioSida.ctaText}
          </p>
          <Link
            href={localizedHref("/#kontakt", lang)}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent px-5 sm:px-8 py-4 text-[15px] font-semibold text-on-accent transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {t.portfolioSida.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <IconArrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
