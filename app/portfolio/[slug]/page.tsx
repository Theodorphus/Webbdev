import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BeforeAfter from '../../components/BeforeAfter';
import CaseCta from '../../components/CaseCta';
import ImageViewer from '../../components/ImageViewer';
import MobileProjects from '../../components/MobileProjects';
import { dictionary } from '../../i18n/dictionary';
import { customerCases, getCustomerCase } from '../cases';

export const dynamicParams = false;
export function generateStaticParams() { return customerCases.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = getCustomerCase((await params).slug);
  if (!item) notFound();
  return { title: `${item.name} – kundcase`, description: item.intro, alternates: { canonical: `/portfolio/${item.slug}` }, openGraph: { title: `${item.name} – Webbdev Studio`, description: item.intro, url: `/portfolio/${item.slug}`, images: [{ url: item.image }] } };
}

const gallery = [
  { title: 'Sortimentet får en tydlig struktur', text: 'Den nya produktöversikten visar produktområden med bilder, rubriker och korta beskrivningar.', before: 'cement-before-products', after: 'cement-after-products' },
  { title: 'Kontakt med mindre letande', text: 'Adress, öppettider, kontaktpersoner och nästa steg får egna tydliga ytor.', before: 'cement-before-contact', after: 'cement-after-contact' },
  { title: 'Från presentation till besök', text: 'Den tidigare företagspresentationen och den nya vägbeskrivningen visar två sätt att hjälpa besökaren att lära känna och hitta verksamheten.', before: 'cement-before-intro', after: 'cement-after-directions' },
];

export default async function CustomerCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getCustomerCase((await params).slug);
  if (!item) notFound();
  const cement = item.slug === 'ockerocement';
  const nextCase = customerCases.find(candidate => candidate.slug !== item.slug)!;
  const review = dictionary.sv.recensioner.lista.find(review => review.namn === 'Veronika Wildkull');
  return <main className="mx-auto max-w-[80rem] px-5 pb-24 pt-28 sm:px-8">
    <Link href="/portfolio" className="text-sm text-muted hover:text-foreground">← Alla projekt</Link>
    <div className="mb-12 mt-10 max-w-4xl"><p className="font-sans text-xs uppercase tracking-widest text-accent-light">{item.category}</p><p className="mt-5 text-lg text-muted">{item.name}</p><h1 className="font-display mt-3 text-[clamp(32px,4.6vw,60px)] font-bold leading-[1.08]">{item.title}</h1><p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">{item.intro}</p></div>
    <dl className="mb-12 grid gap-6 border-y border-foreground/10 py-6 sm:grid-cols-3">
      <div><dt className="text-xs text-muted">Verksamhet</dt><dd className="mt-2 text-sm font-medium">{cement ? 'Byggmaterial och maskinuthyrning' : 'Lönehantering och rådgivning'}</dd></div>
      <div><dt className="text-xs text-muted">Webbplatsens fokus</dt><dd className="mt-2 text-sm font-medium">{cement ? 'Sortiment, produktöversikt och kontakt' : 'Tjänstepresentation och mötesbokning'}</dd></div>
      <div><dt className="text-xs text-muted">I detta case</dt><dd className="mt-2 text-sm font-medium">{cement ? 'Före och efter · dator och mobil' : 'Designbeslut · kundomdöme · mobilvy'}</dd></div>
    </dl>
    {!cement && review && <figure className="mb-12 rounded-2xl border border-accent/30 bg-accent/5 p-8 sm:p-12"><p className="text-xs uppercase tracking-widest text-accent-light">Kundens egna ord</p><blockquote className="font-display mt-5 max-w-3xl text-xl leading-relaxed">“{review.text}”</blockquote><figcaption className="mt-5 text-sm text-muted">{review.namn} · Wildkull Payroll · via Google</figcaption></figure>}
    {cement ? <BeforeAfter before="/work/cases/cement-before-home.webp" after="/work/cases/cement-after-home.webp" label="Öckerö Cementgjuteris startsida" /> : <figure className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface"><div tabIndex={0} role="region" aria-label="Bläddra i Wildkull Payrolls webbplats" className="max-h-[720px] overflow-y-auto"><Image src={item.image} alt="Wildkull Payrolls startsida med tydligt erbjudande och vägar till tjänster och mötesbokning" width={item.imageWidth} height={item.imageHeight} sizes="(max-width: 1280px) 95vw, 1200px" className="h-auto w-full" preload /></div><figcaption className="px-6 py-5 text-sm leading-relaxed text-muted">Startsidan samlar erbjudandet, tjänstelänken och vägen till ett första möte. Det gröna bildspråket håller ihop presentationen. <ImageViewer src={item.image} alt="Wildkull Payrolls webbplats" width={item.imageWidth} height={item.imageHeight} className="mt-3 inline-block text-accent-light underline underline-offset-4">Förstora skärmbilden ↗</ImageViewer></figcaption></figure>}
    <div className="mt-14 grid gap-8 md:grid-cols-3">{[["Designfokus", item.focus], [cement ? 'Utgångsläge' : 'Lösningen', item.before ?? item.solution], [cement ? 'Lösningen' : 'Det besökaren möter', cement ? item.solution : item.outcomes.join(' ')]].map(([title, text]) => <section key={title}><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-4 text-base leading-relaxed text-muted">{text}</p></section>)}</div>
    <section className="case-decisions" aria-labelledby="case-decisions-title"><div><p className="studio-eyebrow">Från behov till design</p><h2 id="case-decisions-title" className="font-display mt-3 text-3xl font-semibold">Tre val som formar helheten.</h2></div>{item.decisions.map((decision, index) => <article key={decision.title}><span className="font-sans text-sm text-accent-light">0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.text}</p></div></article>)}</section>
    <MobileProjects slug={item.slug} />
    {cement && <div className="mt-16 space-y-14">{gallery.map(pair => <section key={pair.title}><h2 className="font-display text-2xl font-semibold">{pair.title}</h2><p className="mb-6 mt-3 text-sm text-muted">{pair.text}</p><div className="grid gap-5 md:grid-cols-2">{(['before', 'after'] as const).map(version => <figure key={version} className="overflow-hidden rounded-xl border border-foreground/10"><figcaption className="bg-foreground/5 px-4 py-3 text-xs text-muted">{version === 'before' ? 'Tidigare webbplats' : 'Ny webbplats'}</figcaption><ImageViewer src={`/work/cases/${pair[version]}.webp`} alt={`${version === 'before' ? 'Tidigare' : 'Ny'} webbplats: ${pair.title}`} width={1600} height={750} className="group block w-full text-left"><Image src={`/work/cases/${pair[version]}.webp`} alt={`${version === 'before' ? 'Tidigare' : 'Ny'} webbplats: ${pair.title}`} width={1600} height={750} sizes="(max-width: 768px) 95vw, 46vw" className="h-auto w-full" /><span className="block px-4 py-3 text-xs text-accent-light group-hover:underline underline-offset-4">Förstora bilden ↗</span></ImageViewer></figure>)}</div></section>)}</div>}

    <section className="mt-14 border-t border-foreground/10 pt-8"><h2 className="font-display text-2xl font-semibold">Det konkreta resultatet i designen</h2><ul className="mt-5 space-y-3 text-sm text-foreground/75">{item.outcomes.map(text => <li key={text}>✓ {text}</li>)}</ul><p className="mt-6 text-xs leading-relaxed text-muted">{item.note}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-accent-light hover:text-foreground">Öppna projektets webbplats ↗</a></section>
    <CaseCta slug={item.slug} />
    <Link href={`/portfolio/${nextCase.slug}`} className="group mt-16 grid items-center gap-8 border-t border-foreground/10 pt-10 md:grid-cols-2 md:gap-12">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-foreground/10 bg-surface"><Image src={nextCase.image} alt={nextCase.name} fill sizes="(max-width: 768px) 95vw, 580px" className="object-cover object-top" /></div>
      <div><p className="studio-eyebrow">Nästa kundcase</p><h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">{nextCase.name}</h2><p className="mt-4 max-w-md text-base leading-relaxed text-muted">{nextCase.title}</p><span className="mt-6 inline-block text-sm font-medium text-accent-light underline-offset-4 group-hover:underline">Utforska projektet →</span></div>
    </Link>
  </main>;
}
