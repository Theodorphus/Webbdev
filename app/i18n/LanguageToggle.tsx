'use client';

import { useLang } from './LanguageProvider';
import type { Lang } from './dictionary';

/** SV/EN-växlare. `compact` används i mobilmenyn. */
export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();

  const options: Lang[] = ['sv', 'en'];

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 font-mono text-[11px] font-semibold ${
        compact ? '' : ''
      }`}
      role="group"
      aria-label="Språk / Language"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLang(opt)}
          aria-pressed={lang === opt}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === opt
              ? 'bg-indigo-500/20 text-indigo-200'
              : 'text-white/45 hover:text-white/80'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
