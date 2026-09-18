'use client';
import Image from 'next/image';
import { useLang } from '../i18n/LanguageProvider';

const previews = [
  { slug: 'wildkull', name: 'Wildkull Payroll', sv: 'Tjänster och kontakt får plats även på en smal skärm.', en: 'Services and contact options adapted to a narrow screen.' },
  { slug: 'ockerocement', name: 'Öckerö Cementgjuteri', sv: 'Sortiment, öppettider och kontakt är tydliga redan i inledningen.', en: 'Products, opening hours and contact options are clear from the start.' },
  { slug: 'swedensweet', name: 'SwedenSweet', sv: 'Erbjudandet och vägen till grossistpriser följer med till mobilen.', en: 'The offer and access to wholesale pricing carry over to mobile.' },
];

export default function MobileProjects({ slug }: { slug?: string }) {
  const { lang } = useLang();
  const sv = lang === 'sv';
  const selected = slug ? previews.filter(item => item.slug === slug) : previews;
  return <section id="mobil" className={`mobile-projects border-t border-foreground/10 pt-12 ${slug ? 'mobile-projects--single' : ''}`} aria-labelledby="mobile-project-heading">
    <div>
    <p className="studio-eyebrow">{sv ? 'Samma omsorg på en mindre skärm' : 'The same care on a smaller screen'}</p>
    <h2 id="mobile-project-heading" className="font-display mt-4 text-3xl font-semibold">{sv ? 'Så ser projekten ut på mobilen.' : 'The projects, on mobile.'}</h2>
    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{sv ? 'Riktiga skärmbilder från webbplatserna i mobilstorlek. Öppna en bild för att se detaljerna i full storlek.' : 'Actual screenshots of the websites at mobile size. Open an image to view the details at full size.'}</p>
    </div>
    <div className={`mt-9 ${slug ? 'max-w-sm' : 'mobile-project-grid'}`}>{selected.map(item => <figure key={item.slug}>
      <a href={`/work/mobile/${item.slug}.webp`} target="_blank" rel="noopener noreferrer" className="mobile-project-frame" aria-label={`${item.name}: ${sv ? 'öppna mobilbild i ny flik' : 'open mobile screenshot in a new tab'}`}><Image src={`/work/mobile/${item.slug}.webp`} alt={`${item.name}, ${sv ? 'startsidan på mobil' : 'mobile homepage'}`} width={390} height={844} sizes="260px" /></a>
      <figcaption><strong className="font-medium">{item.name}</strong><p>{sv ? item.sv : item.en}</p></figcaption>
    </figure>)}</div>
  </section>;
}
