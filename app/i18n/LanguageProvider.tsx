'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { dictionary, type Dict, type Lang } from './dictionary';

// Språket bestäms av routen ('/' = sv, '/en' = en) och ändras aldrig under
// sidans livstid — växlaren navigerar istället för att byta state. Därför
// finns här varken setter eller localStorage-persistens.
type LanguageContextValue = {
  lang: Lang;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  lang = 'sv',
  updateDocumentLang = false,
}: {
  children: ReactNode;
  lang?: Lang;
  updateDocumentLang?: boolean;
}) {
  useEffect(() => {
    if (updateDocumentLang) document.documentElement.lang = lang;
  }, [lang, updateDocumentLang]);

  const value = useMemo(() => ({ lang, t: dictionary[lang] }), [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang måste användas inom <LanguageProvider>');
  return ctx;
}
