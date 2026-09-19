import Image from 'next/image';
import { domain, type Project } from '../portfolio/projects';

function IconDiagonal() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Storlek = 'stor' | 'liten';

export function BrowserPreview({
  project,
  storlek = 'stor',
  priority = false,
}: {
  project: Project;
  storlek?: Storlek;
  priority?: boolean;
}) {
  const stor = storlek === 'stor';
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-foreground/[0.09] bg-surface shadow-card transition-colors duration-300 group-hover:border-foreground/20">
      {/* Webbläsarram */}
      <div className={`flex items-center gap-[6px] border-b border-foreground/[0.07] bg-foreground/[0.035] ${stor ? 'px-4 py-3' : 'px-3 py-2.5'}`}>
        <span className="h-[9px] w-[9px] rounded-full bg-muted/40" />
        <span className="h-[9px] w-[9px] rounded-full bg-muted/40" />
        <span className="h-[9px] w-[9px] rounded-full bg-muted/40" />
        <span className="mx-2 min-w-0 flex-1 truncate rounded-md bg-foreground/[0.05] px-2.5 py-[3px] text-center font-sans text-xs text-muted">
          {domain(project.url)}
        </span>
        <span className="text-muted transition-colors duration-300 group-hover:text-accent-light">
          <IconDiagonal />
        </span>
      </div>
      {/* Previewfönster */}
      <div className={`relative overflow-hidden ${stor ? 'aspect-[16/11]' : 'aspect-[16/10]'}`}>
        <Image
          src={project.img}
          alt={project.namn}
          width={1200}
          height={1500}
          sizes={stor ? '(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 45vw, 580px' : '(max-width: 640px) 92vw, 30vw'}
          preload={priority}
          className={`h-auto w-full transition-transform duration-[3500ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:!translate-y-0 motion-reduce:transition-none ${
            stor ? 'group-hover:translate-y-[-45%] group-focus-visible:translate-y-[-45%]' : 'group-hover:translate-y-[-50%] group-focus-visible:translate-y-[-50%]'
          }`}
        />
      </div>
    </div>
  );
}

export type ProjectText = { kategori: string; desc: string; result?: string };

/** Stort kort — de utvalda projekten. */
export function ProjectCard({
  project,
  text,
  besok,
  priority = false,
  caseLabel = "Läs kundcaset",
}: {
  project: Project;
  caseLabel?: string;
  text: ProjectText;
  besok: string;
  priority?: boolean;
}) {
  return (
    <a
      href={project.caseHref ?? project.url}
      target={project.caseHref ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="project-card group block"
    >
      <BrowserPreview project={project} priority={priority} />
      <div className="mt-[22px] px-0.5">
        <span className="font-sans text-xs uppercase tracking-[0.1em] text-accent-light">
          {text.kategori}
        </span>
        <h3 className="font-display mt-2.5 text-[25px] font-bold tracking-[-0.02em] text-foreground">
          {project.namn}
        </h3>
        <p className="mt-2.5 text-base leading-[1.65] text-foreground/70 [text-wrap:pretty]">
          {text.desc}
        </p>
        {text.result && <p className="mt-4 border-l border-accent-light/50 pl-3 text-sm leading-relaxed text-foreground/85">{text.result}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-accent-light">
          {project.caseHref ? caseLabel : besok}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <IconDiagonal />
          </span>
        </span>
      </div>
    </a>
  );
}

/** Kompakt kort — övriga projekt. */
export function ProjectCardSmall({ project, text }: { project: Project; text: ProjectText }) {
  return (
    <a
      href={project.caseHref ?? project.url}
      target={project.caseHref ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group block"
    >
      <BrowserPreview project={project} storlek="liten" />
      <div className="mt-3.5 flex items-baseline justify-between gap-3 px-0.5">
        <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-foreground">
          {project.namn}
        </h3>
        <span className="truncate font-sans text-xs uppercase tracking-[0.1em] text-muted">
          {text.kategori}
        </span>
      </div>
    </a>
  );
}
