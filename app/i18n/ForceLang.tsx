'use client';

import { useEffect } from 'react';
import { useLang } from './LanguageProvider';
import type { Lang } from './dictionary';

/**
 * Tvingar ett visst språk på en språkspecifik route (t.ex. /en).
 * Renderar inget — sätter bara språket i providern vid mount.
 */
export default function ForceLang({ lang }: { lang: Lang }) {
  const { setLang } = useLang();
  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);
  return null;
}
