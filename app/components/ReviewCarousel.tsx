'use client';

import { useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';
import { Reveal } from './animations/Motion';

/** Recensionsväljaren på startsidan — den enda delen av sektionen med state. */
export default function ReviewCarousel() {
  const [reviewIndex, setReviewIndex] = useState(1);
  const { lang, t } = useLang();
  const activeReview = t.recension2.lista[reviewIndex];

  return (
    <>
      <Reveal>
        <blockquote
          key={reviewIndex}
          aria-live="polite"
          className="font-display mt-9 min-h-[8em] sm:min-h-[5.5em] text-[clamp(24px,3vw,36px)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground/90 [text-wrap:pretty]"
        >
          “{activeReview.text}”
        </blockquote>
        <p className="mt-8 text-[15px] font-semibold text-foreground/75">
          {activeReview.namn}
          <span className="ml-3 font-normal text-foreground/70">{t.recension2.viaGoogle}{lang === 'en' ? ' · Translated from Swedish' : ''}</span>
        </p>
      </Reveal>
      <Reveal className="mt-9 flex justify-center gap-1">
        {t.recension2.lista.map((r, i) => (
          <button
            key={r.namn}
            type="button"
            onClick={() => setReviewIndex(i)}
            aria-label={`${t.recension2.aria} ${i + 1}`}
            aria-pressed={reviewIndex === i}
            // Minst 24px träffyta (WCAG 2.5.8) — pricken är bara visuell.
            className="group flex h-11 min-w-11 items-center justify-center px-1"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                reviewIndex === i ? 'w-7 bg-accent' : 'w-2 bg-foreground/20 group-hover:bg-foreground/35'
              }`}
            />
          </button>
        ))}
      </Reveal>
    </>
  );
}
