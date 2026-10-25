'use client';

import Link from 'next/link';
import { useLang } from './i18n/LanguageProvider';
import { localizedHref } from './i18n/routes';

// Visas för okända adresser och notFound(). Renderas inuti layouten, så
// språket kommer från SiteShells provider (svenska, eller engelska under /en).
export default function NotFound() {
  const { t, lang } = useLang();
  const sv = lang === 'sv';
  const links = [
    { href: localizedHref('/portfolio', lang), label: sv ? 'Se mina projekt' : 'See my work' },
    { href: localizedHref('/tjanster', lang), label: t.footer2.tjanster },
    { href: localizedHref('/priser', lang), label: t.nav2.priser },
    { href: localizedHref('/#kontakt', lang), label: t.nav.kontakt },
  ];

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[80rem] flex-col justify-center px-5 pb-24 pt-36 sm:px-8">
      <p className="studio-eyebrow">404</p>
      <h1 className="font-display mt-4 max-w-2xl text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
        {sv ? 'Sidan kunde inte hittas.' : 'This page could not be found.'}
      </h1>
      <p className="mt-6 max-w-xl text-[16.5px] leading-[1.65] text-muted">
        {sv
          ? 'Adressen kan vara felstavad, eller så har sidan flyttats. Här är några vägar vidare.'
          : 'The address may be misspelled, or the page has moved. Here are a few ways forward.'}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={localizedHref('/', lang)} className="studio-button">
          {sv ? 'Till startsidan' : 'Go to the homepage'}
        </Link>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="studio-text-link underline-offset-4 hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
