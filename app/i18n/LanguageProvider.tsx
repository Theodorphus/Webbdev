'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { dictionary, type Dict, type Lang } from './dictionary';

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'webbdev-lang';

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  // Sätts av språkspecifika routes (t.ex. /en) för att tvinga ett språk.
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? 'sv');

  // Om routen anger ett språk (t.ex. /en) vinner det och sparas som val.
  // Annars: återställ ett tidigare sparat val. Svenska är standard.
  useEffect(() => {
    if (initialLang) {
      setLangState(initialLang);
      localStorage.setItem(STORAGE_KEY, initialLang);
      return;
    }
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'sv' || saved === 'en') {
      setLangState(saved);
    }
  }, [initialLang]);

  // Håll <html lang> i synk för tillgänglighet och SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'sv' ? 'en' : 'sv');
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: dictionary[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang måste användas inom <LanguageProvider>');
  return ctx;
}
