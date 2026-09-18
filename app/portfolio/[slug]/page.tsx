import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BeforeAfter from '../../components/BeforeAfter';
import CaseCta from '../../components/CaseCta';
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
  const review = dictionary.sv.recensioner.lista.find(review => review.namn === 'Veronika Wildkull');
  return <main className="mx-auto max-w-[80rem] px-5 pb-24 pt-28 sm:px-8">
    <Link href="/portfolio" className="text-sm text-foreground/60 hover:text-foreground">← Alla projekt</Link>
    <div className="mb-12 mt-10 max-w-4xl"><p className="font-mono text-xs uppercase tracking-widest text-accent-light">{item.category}</p><p className="mt-5 text-lg text-foreground/65">{item.name}</p><h1 className="font-display mt-3 text-[clamp(32px,4.6vw,60px)] font-bold leading-[1.08]">{item.title}</h1><p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/65">{item.intro}</p></div>
    {!cement && review && <figure className="mb-12 rounded-2xl border border-accent/30 bg-accent/5 p-8 sm:p-12"><p className="text-xs uppercase tracking-widest text-accent-light">Kundens egna ord</p><blockquote className="font-display mt-5 max-w-3xl text-xl leading-relaxed">“{review.text}”</blockquote><figcaption className="mt-5 text-sm text-foreground/60">{review.namn} · Wildkull Payroll · via Google</figcaption></figure>}
    {cement ? <BeforeAfter before="/work/cases/cement-before-home.webp" after="/work/cases/cement-after-home.webp" label="Öckerö Cementgjuteris startsida" /> : <div className="max-h-[720px] overflow-y-auto rounded-2xl border border-foreground/10"><Image src={item.image} alt="Wildkull Payrolls webbplats med tjänster, mötesbokning och grönt bildspråk" width={item.imageWidth} height={item.imageHeight} sizes="(max-width: 1280px) 95vw, 1200px" className="h-auto w-full" preload /></div>}
    <div className="mt-14 grid gap-8 md:grid-cols-3">{[["Designfokus", item.focus], [cement ? 'Utgångsläge' : 'Lösningen', item.before ?? item.solution], [cement ? 'Lösningen' : 'Det besökaren möter', cement ? item.solution : item.outcomes.join(' ')]].map(([title, text]) => <section key={title}><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-4 text-base leading-relaxed text-muted">{text}</p></section>)}</div>
    <section className="case-decisions" aria-labelledby="case-decisions-title"><div><p className="studio-eyebrow">Från behov till design</p><h2 id="case-decisions-title" className="font-display mt-3 text-3xl font-semibold">Tre val som formar helheten.</h2></div>{item.decisions.map((decision, index) => <article key={decision.title}><span className="font-mono text-sm text-accent-light">0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.text}</p></div></article>)}</section>
    <MobileProjects slug={item.slug} />
    {cement && <div className="mt-16 space-y-14">{gallery.map(pair => <section key={pair.title}><h2 className="font-display text-2xl font-semibold">{pair.title}</h2><p className="mb-6 mt-3 text-sm text-foreground/60">{pair.text}</p><div className="grid gap-5 md:grid-cols-2">{(['before', 'after'] as const).map(version => <figure key={version} className="overflow-hidden rounded-xl border border-foreground/10"><figcaption className="bg-foreground/5 px-4 py-3 text-xs text-foreground/65">{version === 'before' ? 'Tidigare webbplats' : 'Ny webbplats'}</figcaption><a href={`/work/cases/${pair[version]}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${version === 'before' ? 'Före' : 'Efter'}: ${pair.title}. Öppna bild i ny flik`}><Image src={`/work/cases/${pair[version]}.webp`} alt={`${version === 'before' ? 'Tidigare' : 'Ny'} webbplats: ${pair.title}`} width={1600} height={750} sizes="(max-width: 768px) 95vw, 46vw" className="h-auto w-full" /></a></figure>)}</div></section>)}</div>}

    <section className="mt-14 border-t border-foreground/10 pt-8"><h2 className="font-display text-2xl font-semibold">Det konkreta resultatet i designen</h2><ul className="mt-5 space-y-3 text-sm text-foreground/75">{item.outcomes.map(text => <li key={text}>✓ {text}</li>)}</ul><p className="mt-6 text-xs leading-relaxed text-muted">{item.note}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-accent-light hover:text-foreground">Öppna projektets webbplats ↗</a></section>
    <CaseCta slug={item.slug} />
    <Link href={`/portfolio/${cement ? 'wildkull' : 'ockerocement'}`} className="mt-8 inline-block text-sm text-foreground/60 hover:text-foreground">Nästa kundcase: {cement ? 'Wildkull Payroll' : 'Öckerö Cementgjuteri'} →</Link>
  </main>;
}
