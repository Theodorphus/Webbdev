'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';

/**
 * Sticky CTA för mobil — fast knapp längst ner på skärmen.
 * Visas först när man scrollat förbi hero, och döljs när
 * kontaktsektionen eller footern är i vy (formuläret syns redan, och
 * baren skulle annars täcka footerns sista rad längst ned på sidan).
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero) return;
    const endTargets = [document.getElementById('kontakt'), document.querySelector('footer')].filter((el): el is HTMLElement => el !== null);

    let pastHero = false;
    const inView = new Set<Element>();
    const update = () => setVisible(pastHero && inView.size === 0);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { rootMargin: '-60% 0px 0px 0px' },
    );
    heroObserver.observe(hero);

    const endObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target);
          else inView.delete(entry.target);
        }
        update();
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    endTargets.forEach((el) => endObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  // Signalera till andra flytande element (chattbubblan) att baren är synlig,
  // så de kan väja uppåt på mobil i stället för att överlappa knappen.
  useEffect(() => {
    document.body.classList.toggle('sticky-cta-visible', visible);
    return () => document.body.classList.remove('sticky-cta-visible');
  }, [visible]);

  // Alltid monterad så baren kan glida in och ut; inert håller knappen
  // utanför tabbordningen medan den är dold.
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-foreground/[0.07] bg-background/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      inert={!visible}
    >
      <a
        href="#kontakt"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-base font-bold text-on-accent shadow-card transition-colors hover:bg-accent-hover active:scale-[0.99]"
      >
        {t.sticky.cta}
      </a>
    </div>
  );
}
