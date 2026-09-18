import type { Lang } from './dictionary';

const routes = {
  '/': '/en',
  '/portfolio': '/en/portfolio',
  '/priser': '/en/pricing',
  '/tjanster': '/en/services',
} as const;

/** Preserve the current page when switching between translated routes. */
export function localizedHref(path: string, lang: Lang): string {
  const [pathname, hash] = path.split('#');
  const pair = Object.entries(routes).find(([sv, en]) => pathname === sv || pathname === en);
  const translated = pair ? pair[lang === 'sv' ? 0 : 1] : pathname;
  return `${translated}${hash ? `#${hash}` : ''}`;
}

export function languageForPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv';
}
