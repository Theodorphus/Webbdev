import Image from 'next/image';
import { domain, type Project } from '../portfolio/projects';

function IconDiagonal() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Skärmdumparna är 1200×1500 — dubbelt så höga som ramens fönster. Vid hover
// dras bilden uppåt så att resten av sajten scrollar förbi i miniatyr.
// Procenten nedan är räknad på bildens egen höjd: 1 − (fönsterhöjd / bildhöjd),
// alltså −45 % för 16/11-fönstret och −50 % för 16/10.
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
    <div className="overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0b0b14] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)] transition-colors duration-300 group-hover:border-white/20">
      {/* Webbläsarram */}
      <div className={`flex items-center gap-[6px] border-b border-white/[0.07] bg-white/[0.035] ${stor ? 'px-4 py-3' : 'px-3 py-2.5'}`}>
        <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]/60" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]/60" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#28c840]/55" />
        <span className="mx-2 flex-1 truncate rounded-md bg-white/[0.05] px-2.5 py-[3px] text-center font-mono text-[10.5px] text-[#ededf2]/40">
          {domain(project.url)}
        </span>
        <span className="text-[#ededf2]/30 transition-colors duration-300 group-hover:text-accent-light">
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
          sizes={stor ? '(max-width: 768px) 92vw, 46vw' : '(max-width: 640px) 92vw, 30vw'}
          priority={priority}
          className={`h-auto w-full transition-transform duration-[3500ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:!translate-y-0 motion-reduce:transition-none ${
            stor ? 'group-hover:translate-y-[-45%]' : 'group-hover:translate-y-[-50%]'
          }`}
        />
      </div>
    </div>
  );
}

export type ProjectText = { kategori: string; desc: string };

/** Stort kort — de utvalda projekten. */
export function ProjectCard({
  project,
  text,
  besok,
  priority = false,
}: {
  project: Project;
  text: ProjectText;
  besok: string;
  priority?: boolean;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <BrowserPreview project={project} priority={priority} />
      <div className="mt-[22px] px-0.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8b89ff]">
          {text.kategori}
        </span>
        <h3 className="font-display mt-2.5 text-[25px] font-bold tracking-[-0.02em] text-white">
          {project.namn}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[#ededf2]/55 [text-wrap:pretty]">
          {text.desc}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-accent-light">
          {besok}
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
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <BrowserPreview project={project} storlek="liten" />
      <div className="mt-3.5 flex items-baseline justify-between gap-3 px-0.5">
        <h3 className="font-display text-[16.5px] font-semibold tracking-[-0.01em] text-white">
          {project.namn}
        </h3>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[#ededf2]/40">
          {text.kategori}
        </span>
      </div>
    </a>
  );
}
