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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('sv');

  // Återställ ett sparat val efter mount. Svenska är alltid standard —
  // engelska visas bara om besökaren själv valt det.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'sv' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

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
