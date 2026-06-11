'use client';

import { useLayoutEffect, type RefObject } from 'react';
import { gsap, EASE } from './gsap';

/**
 * Centraliserad rörelsehook (GSAP ScrollTrigger).
 *
 * Innehåll syns direkt — ingen scroll-reveal. Hooken sköter numera bara
 * bakgrundsdjup:
 *
 *  data-parallax="-18"          → scroll-parallax i yPercent (scrubbed)
 *  data-depth="1.4"             → mus-parallax-djup inom [data-hero]
 */
export default function useAnimations(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, root);

      // ── Scroll-parallax (hero-orbar + sektionsbakgrunder) ───
      for (const el of q('[data-parallax]')) {
        const speed = Number(el.dataset.parallax || -14);
        const section = el.closest('section') ?? el;
        // Sektioner som redan är i vyn vid load (hero) startar från
        // scrolltoppen; sektioner längre ner startar när de glider in.
        const atTop = section.getBoundingClientRect().top + window.scrollY < window.innerHeight;
        gsap.to(el, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: atTop ? 'top top' : 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // ── Mus-parallax (depth-layers i hero) ──────────────────
      const hero = root.querySelector<HTMLElement>('[data-hero]');
      const layers = q('[data-depth]');
      if (hero && layers.length) {
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          for (const layer of layers) {
            const depth = Number(layer.dataset.depth || 1);
            gsap.to(layer, {
              x: nx * 26 * depth,
              y: ny * 18 * depth,
              duration: 1.1,
              ease: EASE.soft,
              overwrite: 'auto',
            });
          }
        };
        hero.addEventListener('pointermove', onMove, { passive: true });
        return () => hero.removeEventListener('pointermove', onMove);
      }
    });

    return () => mm.revert();
  }, [scope]);
}
