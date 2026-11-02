import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '../i18n/dictionary';
import HeroCompare from './HeroCompare';

export default function HeroProject({ lang }: { lang: Lang }) {
  const sv = lang === 'sv';
  return (
    <div className="hero-project">
      <div className="hero-project-heading">
        <span>{sv ? 'Ett urval av mitt arbete' : 'A closer look at my work'}</span>
        <span>{sv ? 'Dra för att jämföra' : 'Drag to compare'}</span>
      </div>
      <div className="hero-project-visual">
        <div className="hero-project-screen">
          <div className="hero-project-toolbar" aria-hidden><span /><span /><span /><p>Öckerö Cementgjuteri</p></div>
          <HeroCompare lang={lang} />
        </div>
        <div className="hero-project-phone"><Image src="/work/mobile/ockerocement.webp" alt={sv ? 'Samma webbplats på en mobilskärm' : 'The same website on a mobile screen'} width={390} height={844} sizes="(max-width: 767px) 100px, 170px" /></div>
      </div>
      <Link href="/portfolio/ockerocement" className="hero-project-cta" aria-label={sv ? 'Läs kundcaset om Öckerö Cementgjuteri' : 'Read the Öckerö Cementgjuteri case study (Swedish)'}>
        <div className="hero-project-caption">
          <div><h2>Öckerö Cementgjuteri</h2><p>{sv ? 'Webbdesign · Produktkatalog · Före & efter' : 'Web design · Product catalogue · Before & after'}</p></div>
          <span className="hero-project-arrow" aria-hidden>↗</span>
        </div>
        <span className="hero-project-link">{sv ? 'Se hur webbplatsen förändrades' : 'Explore the redesign (Swedish)'} <span aria-hidden>→</span></span>
      </Link>
    </div>
  );
}
