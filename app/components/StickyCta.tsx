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

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#06060f]/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-all duration-300 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#kontakt"
        className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 py-3.5 text-base font-bold text-white shadow-xl shadow-indigo-900/50 transition-colors hover:bg-indigo-500 active:scale-[0.99]"
      >
        {t.sticky.cta}
      </a>
    </div>
  );
}
