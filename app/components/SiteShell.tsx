'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { LanguageProvider, useLang } from '../i18n/LanguageProvider';
import LanguageToggle from '../i18n/LanguageToggle';
import MobileNav from './MobileNav';
import SiteFooter from './SiteFooter';
import ThemeControl, { ThemeSync } from './ThemeControl';

function Header() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const home = lang === 'en' ? '/en' : '/';
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const links = [
    { href: localizedHref('/portfolio', lang), label: t.footer2.portfolio },
    { href: localizedHref('/tjanster', lang), label: t.footer2.tjanster },
    { href: `${home}#process`, label: t.nav2.process },
    { href: localizedHref('/priser', lang), label: t.nav2.priser },
    { href: '/gratis-demo', label: t.nav2.demo },
  ];
  return <header className={`fixed inset-x-0 top-0 z-[60] border-b border-foreground/[0.07] backdrop-blur-xl ${scrolled ? 'bg-background/95' : 'bg-background/85'}`}>
    <a href="#page-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[70] focus:rounded-lg focus:bg-foreground focus:p-3 focus:text-background">{lang === 'en' ? 'Skip to content' : 'Hoppa till innehåll'}</a>
    <div className={`mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-5 transition-[padding] sm:px-8 ${scrolled ? 'py-3' : 'py-[18px]'}`}>
      <Link href={home} aria-label={lang === 'sv' ? 'Webbdev Studio – startsida' : 'Webbdev Studio – home'} className="font-display shrink-0 text-base font-bold text-foreground">Webbdev<span className="text-accent">.</span>studio</Link>
      <nav aria-label={lang === 'en' ? 'Main navigation' : 'Huvudmeny'} className="hidden items-center gap-5 text-[13px] lg:flex xl:gap-7">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(link.href + '/') ? 'page' : undefined} className={`transition-colors hover:text-foreground ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'text-accent-light' : 'text-foreground/65'}`}>{link.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><ThemeControl /><LanguageToggle /><Link href={`${home}#kontakt`} className="rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:bg-foreground">{t.nav2.cta}</Link></div>
      <div className="flex items-center gap-2 lg:hidden"><ThemeControl /><MobileNav key={pathname} activeSection={localizedHref(pathname, 'sv').slice(1)} /></div>
    </div>
  </header>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <LanguageProvider lang={pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sv'} updateDocumentLang>
    <ThemeSync />
    <Header />
    <div id="page-content" tabIndex={-1} className="flex-1 outline-none">{children}</div>
    <SiteFooter />
  </LanguageProvider>;
}
