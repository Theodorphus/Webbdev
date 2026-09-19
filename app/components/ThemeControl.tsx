'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useLang } from '../i18n/LanguageProvider';
import { applyTheme, isTheme, setTheme, subscribeTheme, themeSnapshot, themeStorageKey, type ThemePreference } from '../lib/theme';

export function ThemeSync() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystem = () => { if (themeSnapshot() === 'system') applyTheme('system'); };
    const updateStorage = (event: StorageEvent) => {
      if (event.key === themeStorageKey || event.key === null) applyTheme(isTheme(event.newValue) ? event.newValue : 'light');
    };
    applyTheme(themeSnapshot());
    media.addEventListener('change', updateSystem);
    window.addEventListener('storage', updateStorage);
    return () => { media.removeEventListener('change', updateSystem); window.removeEventListener('storage', updateStorage); };
  }, []);
  return null;
}

function ThemeIcon({ theme }: { theme: ThemePreference }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {theme === 'light' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : theme === 'dark' ? <path d="M20.5 14A8.7 8.7 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" /> : <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>}
  </svg>;
}

export default function ThemeControl({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const preference = useSyncExternalStore(subscribeTheme, themeSnapshot, () => 'light' as const);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const title = lang === 'sv' ? 'Utseende' : 'Appearance';
  const labels = { system: 'System', light: lang === 'sv' ? 'Ljust' : 'Light', dark: lang === 'sv' ? 'Mörkt' : 'Dark' };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent | FocusEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    // A label click briefly blurs the radio before focusing its associated input.
    // Close on focus arriving outside, so the label can finish selecting a theme.
    document.addEventListener('focusin', outside);
    root.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [open]);

  return <div ref={root} className={compact ? 'theme-control theme-control--compact' : 'theme-control'} onKeyDown={event => { if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus(); } }}>
    {compact ? <p className="theme-label">{title}</p> : <button ref={trigger} type="button" className="theme-trigger" onClick={() => setOpen(value => !value)} aria-label={`${title}: ${labels[preference]}`} aria-expanded={open} aria-controls={id}><ThemeIcon theme={preference} /></button>}
    {(compact || open) && <fieldset id={id} className={compact ? 'theme-options theme-options--inline' : 'theme-options'}><legend className="sr-only">{title}</legend>{(['light', 'dark', 'system'] as const).map(option => <label key={option} className="theme-option"><input type="radio" name={id} value={option} checked={preference === option} onChange={() => setTheme(option)} /><ThemeIcon theme={option} /><span>{labels[option]}</span></label>)}</fieldset>}
  </div>;
}
