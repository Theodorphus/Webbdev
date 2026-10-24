'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Scroll-reveal — blocket fadear upp när det kommer in i vyn (en gång).
 *
 * Själva rörelsen ligger i CSS (.reveal i globals.css), så komponenten
 * behöver bara en IntersectionObserver som sätter data-visible. Inget
 * animationsbibliotek hamnar i bundeln, och ingen re-render sker.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.visible = '';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
