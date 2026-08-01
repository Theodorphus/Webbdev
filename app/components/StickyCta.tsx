'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';

/**
 * Sticky CTA för mobil — fast knapp längst ner på skärmen.
 * Visas först när man scrollat förbi hero, och döljs när
 * kontaktsektionen är i vy (då formuläret redan syns).
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const kontakt = document.getElementById('kontakt');
    if (!hero) return;

    let pastHero = false;
    let inKontakt = false;
    const update = () => setVisible(pastHero && !inKontakt);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { rootMargin: '-60% 0px 0px 0px' },
    );
    heroObserver.observe(hero);

    const kontaktObserver = kontakt
      ? new IntersectionObserver(
          ([entry]) => {
            inKontakt = entry.isIntersecting;
            update();
          },
          { rootMargin: '0px 0px -20% 0px' },
        )
      : null;
    if (kontakt && kontaktObserver) kontaktObserver.observe(kontakt);

    return () => {
      heroObserver.disconnect();
      kontaktObserver?.disconnect();
    };
  }, []);

  // Signalera till andra flytande element (chattbubblan) att baren är synlig,
  // så de kan väja uppåt på mobil i stället för att överlappa knappen.
  useEffect(() => {
    document.body.classList.toggle('sticky-cta-visible', visible);
    return () => document.body.classList.remove('sticky-cta-visible');
  }, [visible]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-[#050509]/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      inert={!visible}
    >
      <a
        href="#kontakt"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-base font-bold text-white shadow-xl shadow-[rgba(109,106,248,0.35)] transition-colors hover:bg-[#7d7aff] active:scale-[0.99]"
      >
        {t.sticky.cta}
      </a>
    </div>
  );
}
