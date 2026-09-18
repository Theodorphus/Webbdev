import Image from 'next/image';
import Link from 'next/link';
import type { Lang } from '../i18n/dictionary';

export default function HeroProject({ lang }: { lang: Lang }) {
  const sv = lang === 'sv';
  return (
    <Link href="/portfolio/ockerocement" className="hero-project group" aria-label={sv ? 'Läs kundcaset om Öckerö Cementgjuteri' : 'Read the Öckerö Cementgjuteri case study (Swedish)'}>
      <div className="hero-project-heading">
        <span>{sv ? 'Ett urval av mitt arbete' : 'A closer look at my work'}</span>
        <span>{sv ? 'Före / Efter' : 'Before / After'}</span>
      </div>
      <div className="hero-project-visual">
      <div className="hero-project-screen">
        <div className="hero-project-toolbar" aria-hidden><span /><span /><span /><p>Öckerö Cementgjuteri</p></div>
        <Image src="/work/cases/cement-after-home.webp" alt={sv ? 'Öckerö Cementgjuteris startsida med skärgårdsbild och tydliga vägar till sortiment och kontakt' : 'Öckerö Cementgjuteri homepage with coastal photography and clear product and contact navigation'} width={1600} height={743} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 680px, 55vw" preload className="block h-auto w-full" />
        <div className="hero-project-detail">
          <Image src="/work/cases/cement-after-products.webp" alt={sv ? 'Produktkategorier i den nya webbplatsen' : 'Product categories on the redesigned website'} width={1600} height={747} sizes="(max-width: 767px) 85vw, 45vw" className="block h-auto w-full" />
        </div>
      </div>
      <div className="hero-project-phone"><Image src="/work/mobile/ockerocement.webp" alt={sv ? 'Samma webbplats på en mobilskärm' : 'The same website on a mobile screen'} width={390} height={844} sizes="(max-width: 767px) 100px, 170px" /></div>
      </div>
      <div className="hero-project-caption">
        <div><h2>Öckerö Cementgjuteri</h2><p>{sv ? 'Webbdesign · Produktkatalog · Före & efter' : 'Web design · Product catalogue · Before & after'}</p></div>
        <span className="hero-project-arrow" aria-hidden>↗</span>
      </div>
      <span className="hero-project-link">{sv ? 'Se hur webbplatsen förändrades' : 'Explore the redesign (Swedish)'} <span aria-hidden>→</span></span>
    </Link>
  );
}
