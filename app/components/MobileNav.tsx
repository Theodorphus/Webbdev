'use client';

import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageProvider';
import LanguageToggle from '../i18n/LanguageToggle';

/**
 * Mobilnavigering — hamburgerknapp som öppnar en fullskärms-overlay.
 * Visas bara under md (desktop använder den vanliga inline-navet).
 */
export default function MobileNav({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const links = [
    { id: 'arbete', label: t.nav2.arbete },
    { id: 'process', label: t.nav2.process },
    { id: 'priser', label: t.nav2.priser },
    { id: 'om', label: t.nav2.om },
    { id: 'tjanster-sida', label: t.footer2.tjanster, href: '/tjanster' },
  ];

  // Lås bakgrundsscroll medan menyn är öppen + stäng på Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.nav.stangMeny : t.nav.oppnaMeny}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <span className="sr-only">{t.nav.meny}</span>
        {/* Hamburger → X */}
        <span className="relative block h-4 w-5" aria-hidden>
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
              open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
            }`}
          />
        </span>
      </button>

      {/* Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[#050509]/95 backdrop-blur-xl transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-2 px-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href ?? `#${link.id}`}
              onClick={() => setOpen(false)}
              className={`w-full max-w-xs rounded-2xl px-6 py-4 text-center text-lg font-semibold transition-colors ${
                activeSection === link.id
                  ? 'bg-accent/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-4 w-full max-w-xs rounded-full bg-[#ededf2] px-6 py-4 text-center text-lg font-semibold text-[#0a0a12] transition-colors hover:bg-white"
          >
            {t.nav2.cta}
          </a>
          <div className="mt-6">
            <LanguageToggle compact />
          </div>
        </nav>
      </div>
    </div>
  );
}
