'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedHref, languageForPath } from './routes';
import { useLang } from './LanguageProvider';
import type { Lang } from './dictionary';

/** SV/EN-växlare. `compact` används i mobilmenyn. */
export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const pathname = usePathname();

  const options: Lang[] = ['sv', 'en'];

  return (
    <div
      className={`inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 p-0.5 font-mono text-[11px] font-semibold ${
        compact ? '' : ''
      }`}
      role="group"
      aria-label="Språk / Language"
    >
      {options.map((opt) => (
        <Link
          key={opt}
          href={languageForPath(localizedHref(pathname, opt)) === opt ? localizedHref(pathname, opt) : opt === 'en' ? '/en' : '/'}
          hrefLang={opt === 'sv' ? 'sv-SE' : 'en-US'}
          lang={opt}
          aria-current={lang === opt ? 'page' : undefined}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === opt
              ? 'bg-accent/20 text-accent-light'
              : 'text-muted hover:text-foreground/80'
          }`}
        >
          {opt}
        </Link>
      ))}
    </div>
  );
}
