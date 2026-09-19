'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../i18n/LanguageProvider';

const examples = [
  { visitors: 14070, views: 65446, visitorChange: 365, viewChange: 321, image: '/work/cases/traffic-1.webp', width: 1585, height: 518 },
  { visitors: 1251, views: 6932, visitorChange: 595, viewChange: 558, image: '/work/cases/traffic-2.webp', width: 1356, height: 521 },
];

export default function TrafficResults() {
  const { lang } = useLang();
  const sv = lang === 'sv';
  const number = (value: number) => value.toLocaleString(sv ? 'sv-SE' : 'en-US');
  return <section id="resultat" aria-labelledby="results-heading" className="border-t border-foreground/10 py-20 sm:py-28">
    <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
      <div className="mb-9 max-w-2xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-accent-light">{sv ? 'Trafik i verkliga projekt' : 'Traffic from real projects'}</p><h2 id="results-heading" className="font-display mt-4 text-[clamp(30px,3.5vw,46px)] font-semibold leading-tight">{sv ? 'Webbplatser med växande trafik.' : 'Websites with growing traffic.'}</h2><p className="mt-5 text-sm leading-relaxed text-muted">{sv ? 'Två exempel från webbplatser jag har byggt. Här ser du besökare, sidvisningar och utvecklingen som visas i projektens statistik.' : 'Two examples from websites I have built. Explore the visitor counts, page views and growth shown in their analytics.'}</p></div>
      <div className="grid gap-6 lg:grid-cols-2">{examples.map((item, index) => <figure key={item.image} className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
        <figcaption className="px-6 pt-6"><p className="text-xs uppercase tracking-widest text-muted">{sv ? 'Trafikexempel' : 'Traffic example'} 0{index + 1}</p><div className="mt-5 grid grid-cols-2 gap-5"><div><p className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold">{number(item.visitors)}</p><p className="mt-1 text-xs text-muted">{sv ? 'besökare i visad period' : 'visitors in the shown period'}</p><p className="mt-3 inline-block rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-200">+{item.visitorChange}% <span className="font-normal">{sv ? 'visad förändring' : 'shown change'}</span></p></div><div><p className="font-display text-[clamp(28px,3.5vw,44px)] font-semibold">{number(item.views)}</p><p className="mt-1 text-xs text-muted">{sv ? 'sidvisningar' : 'page views'}</p><p className="mt-3 text-xs text-muted">+{item.viewChange}% {sv ? 'i statistikverktyget' : 'in the analytics tool'}</p></div></div></figcaption>
        <a href={item.image} target="_blank" rel="noopener noreferrer" className="group mx-4 mb-5 mt-6 block overflow-hidden rounded-xl border border-foreground/10" aria-label={`${sv ? 'Öppna statistikbild' : 'Open analytics screenshot'} ${index + 1} ${sv ? 'i ny flik' : 'in a new tab'}`}><Image src={item.image} alt={`${number(item.visitors)} ${sv ? 'besökare' : 'visitors'}, +${item.visitorChange}%; ${number(item.views)} ${sv ? 'sidvisningar' : 'page views'}, +${item.viewChange}%.`} width={item.width} height={item.height} sizes="(max-width: 1024px) 95vw, 580px" className="h-auto w-full" /><span className="block bg-surface px-4 py-3 text-xs text-accent-light group-hover:text-foreground">{sv ? 'Se statistikbilden i full storlek' : 'View full-size screenshot'} ↗</span></a>
      </figure>)}</div>
      <p className="mt-5 max-w-4xl text-xs leading-relaxed text-muted">{sv ? 'Källa: projektens tillhandahållna statistikbilder. Procenttalen återges från statistikverktyget; fullständiga datum- och jämförelseperioder syns inte i bilderna. Trafik påverkas även av innehåll, marknadsföring och säsong. Siffrorna visar trafik, inte försäljning eller en garanti för framtida resultat.' : 'Source: supplied project analytics screenshots. Percentages are reproduced from the analytics tool; full date and comparison ranges are not visible. Traffic also depends on content, marketing and seasonality. These figures show traffic, not sales or a guarantee of future results.'}</p>
      <Link href={sv ? '/#kontakt' : '/en#kontakt'} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent-light hover:text-foreground">{sv ? 'Prata om målen för din hemsida' : 'Discuss the goals for your website'} →</Link>
    </div>
  </section>;
}
