'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import type { Lang } from '../i18n/dictionary';

/**
 * Före/efter-jämförelse i heron. Efter-bilden är basen (LCP-bilden, preloadad
 * och synlig direkt). När före-bilden har laddats sveper avdelaren in en gång
 * till mitten. Därefter kan besökaren dra eller använda piltangenterna.
 * Med reducerad rörelse hoppar avdelaren direkt till mitten utan animation.
 */
export default function HeroCompare({ lang }: { lang: Lang }) {
  const sv = lang === 'sv';
  const id = useId();
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(false);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (!beforeLoaded || touched.current) return;
    let frame = 0;
    const duration = 1400;
    const delay = window.setTimeout(() => {
      setActive(true);
      const start = performance.now();
      const step = (now: number) => {
        if (touched.current) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setPos(Math.round(eased * 50 * 10) / 10);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, 500);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [beforeLoaded]);

  // Med reducerad rörelse hoppar avdelaren direkt till mitten; annars
  // startar effekten ovan svepet.
  const onBeforeLoad = () => {
    if (touched.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPos(50);
      setActive(true);
      return;
    }
    setBeforeLoaded(true);
  };

  const onInput = (value: number) => {
    touched.current = true;
    setActive(true);
    setPos(value);
  };

  return (
    <div className="hero-compare" data-active={active ? '' : undefined} style={{ '--pos': pos } as CSSProperties}>
      <Image
        src="/work/cases/cement-after-home.webp"
        alt={sv ? 'Öckerö Cementgjuteris nya startsida med skärgårdsbild och tydliga vägar till sortiment och kontakt' : 'The new Öckerö Cementgjuteri homepage with coastal photography and clear product and contact navigation'}
        width={1600}
        height={743}
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 680px, 55vw"
        preload
        className="block h-auto w-full"
      />
      <div className="hero-compare-before">
        <Image
          src="/work/cases/cement-before-home.webp"
          alt={sv ? 'Den tidigare startsidan, dominerad av en stenbild' : 'The previous homepage, dominated by a stone photo'}
          width={1600}
          height={744}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 680px, 55vw"
          loading="eager"
          onLoad={onBeforeLoad}
        />
      </div>
      <span className="hero-compare-label hero-compare-label-before" aria-hidden>{sv ? 'Före' : 'Before'}</span>
      <span className="hero-compare-label hero-compare-label-after" aria-hidden>{sv ? 'Efter' : 'After'}</span>
      <div className="hero-compare-divider" aria-hidden><span>↔</span></div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => onInput(Number(e.target.value))}
        aria-label={sv ? 'Jämför webbplatsen före och efter' : 'Compare the website before and after'}
        aria-valuetext={sv ? `${Math.round(pos)} procent av före-bilden visas` : `${Math.round(pos)} percent of the before image shown`}
      />
    </div>
  );
}
