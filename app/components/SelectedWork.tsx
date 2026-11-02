import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { projects, type Project, type ProjectSlug } from '../portfolio/projects';
import { dictionary, type Lang } from '../i18n/dictionary';

// Utvalda projekt på startsidan. Ett huvudprojekt i full bredd med bild och
// berättelse, följt av en lista där varje rad är ett projekt. På datorer med
// mus visas en förhandsbild när man håller över raden; på mobil och
// pekskärm ligger en liten bild direkt i raden. Allt är server-renderat.

const featuredSlug: ProjectSlug = 'wildkull';
const listSlugs: ProjectSlug[] = ['ockerocement', 'swedensweet', 'karla', 'prolink'];

const bySlug = (slug: ProjectSlug) => projects.find((p) => p.slug === slug)!;

function ProjectLink({ project, className, children, label }: { project: Project; className: string; children: ReactNode; label?: string }) {
  // Kundcasen är interna sidor; övriga projekt öppnar kundens sajt.
  return project.caseHref
    ? <Link href={project.caseHref} className={className} aria-label={label}>{children}</Link>
    : <a href={project.url} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}</a>;
}

export default function SelectedWork({ lang }: { lang: Lang }) {
  const t = dictionary[lang];
  const sv = lang === 'sv';
  const caseLabel = sv ? 'Läs kundcaset' : 'Read the case study (Swedish)';
  const newTab = sv ? '(öppnas i ny flik)' : '(opens in a new tab)';
  const featured = bySlug(featuredSlug);
  const ft = t.arbete.projekt[featured.slug];

  return (
    <div className="work">
      <ProjectLink project={featured} className="work-featured group">
        <div className="work-featured-media">
          <Image
            src={featured.img}
            alt={sv ? `${featured.namn}s webbplats` : `The ${featured.namn} website`}
            width={1200}
            height={1500}
            sizes="(max-width: 1023px) calc(100vw - 40px), 720px"
          />
        </div>
        <div className="work-featured-body">
          <p className="work-meta">{ft.kategori}</p>
          <h3>{featured.namn}</h3>
          <p className="work-desc">{ft.desc}</p>
          {ft.result && <p className="work-result">{ft.result}</p>}
          <span className="work-cta">
            {featured.caseHref ? caseLabel : t.arbete.besok}
            {!featured.caseHref && <span className="sr-only"> {newTab}</span>}
          </span>
        </div>
      </ProjectLink>

      <ul className="work-list">
        {listSlugs.map((slug) => {
          const p = bySlug(slug);
          const text = t.arbete.projekt[slug];
          return (
            <li key={slug}>
              <ProjectLink project={p} className="work-row group">
                <span className="work-row-thumb" aria-hidden>
                  <Image src={p.img} alt="" width={1200} height={1500} sizes="(max-width: 1023px) 96px, 320px" />
                </span>
                <span className="work-row-name">{p.namn}</span>
                <span className="work-row-cat">{text.kategori}</span>
                <span className="work-row-result">{text.result}</span>
                <span className="work-row-go">
                  {p.caseHref ? caseLabel : t.arbete.besok}
                  {!p.caseHref && <span className="sr-only"> {newTab}</span>}
                </span>
              </ProjectLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
