'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { localizedHref } from '../i18n/routes';
import { useLang } from '../i18n/LanguageProvider';
import LanguageToggle from '../i18n/LanguageToggle';
import ThemeControl from './ThemeControl';

/**
 * Mobilnavigering — hamburgerknapp som öppnar en fullskärms-overlay.
 * Visas bara under lg (desktop använder den vanliga inline-navet).
 */
export default function MobileNav({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const home = lang === 'en' ? '/en' : '/';

  const links = [
    { id: 'portfolio', label: t.footer2.portfolio, href: localizedHref('/portfolio', lang) },
    { id: 'process', label: t.nav2.process },
    { id: 'priser', label: t.nav2.priser, href: localizedHref('/priser', lang) },
    { id: 'gratis-demo', label: t.nav2.demo, href: '/gratis-demo' },
    { id: 'om', label: t.nav2.om },
    { id: 'tjanster', label: t.footer2.tjanster, href: localizedHref('/tjanster', lang) },
  ];

  // Lås bakgrundsscroll medan menyn är öppen + stäng på Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const getFocusable = () => Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])') ?? [],
    ).filter(element => !(element instanceof HTMLInputElement) || element.type !== 'radio' || element.checked);
    getFocusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      const focusable = getFocusable();
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.nav.stangMeny : t.nav.oppnaMeny}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
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

      {/* Portalen gör att headerns backdrop-filter inte begränsar mobilmenyns höjd. */}
      {open && createPortal(<div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.meny}
        className={`fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-xl transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        inert={!open}
      >
        <button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} aria-label={t.nav.stangMeny} className="absolute right-5 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 text-xl text-foreground">×</button>
        <nav className="flex min-h-full flex-col items-center justify-center gap-1 px-6 py-20">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href ?? `${home}#${link.id}`}
              onClick={() => setOpen(false)}
              className={`w-full max-w-xs rounded-2xl px-6 py-3 text-center text-lg font-semibold transition-colors ${
                (activeSection === link.id || activeSection.startsWith(link.id + "/"))
                  ? 'bg-accent/10 text-foreground'
                  : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${home}#kontakt`}
            onClick={() => setOpen(false)}
            className="mt-4 w-full max-w-xs rounded-full bg-foreground px-6 py-3 text-center text-lg font-semibold text-background transition-colors hover:bg-foreground"
          >
            {t.nav2.cta}
          </a>
          <div className="mt-6">
            <LanguageToggle compact />
            <ThemeControl compact />
          </div>
        </nav>
      </div>, document.body)}
    </div>
  );
}
