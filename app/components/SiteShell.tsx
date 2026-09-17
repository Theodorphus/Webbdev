'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { LanguageProvider, useLang } from '../i18n/LanguageProvider';
import LanguageToggle from '../i18n/LanguageToggle';
import MobileNav from './MobileNav';
import SiteFooter from './SiteFooter';

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
    { href: '/portfolio', label: t.footer2.portfolio },
    { href: '/tjanster', label: t.footer2.tjanster },
    { href: `${home}#process`, label: t.nav2.process },
    { href: '/priser', label: t.nav2.priser },
    { href: '/gratis-demo', label: t.nav2.demo },
  ];
  return <header className={`fixed inset-x-0 top-0 z-[60] border-b border-white/[0.07] backdrop-blur-xl ${scrolled ? 'bg-[#050509]/95' : 'bg-[#050509]/85'}`}>
    <a href="#page-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[70] focus:rounded-lg focus:bg-white focus:p-3 focus:text-black">{lang === 'en' ? 'Skip to content' : 'Hoppa till innehåll'}</a>
    <div className={`mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-5 transition-[padding] sm:px-8 ${scrolled ? 'py-3' : 'py-[18px]'}`}>
      <Link href={home} aria-label="Webbdev Studio – startsida" className="font-display shrink-0 text-base font-bold text-white">Webbdev<span className="text-accent">.</span>studio</Link>
      <nav aria-label={lang === 'en' ? 'Main navigation' : 'Huvudmeny'} className="hidden items-center gap-5 text-[13px] lg:flex xl:gap-7">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(link.href + '/') ? 'page' : undefined} className={`transition-colors hover:text-white ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'text-accent-light' : 'text-white/65'}`}>{link.label}</Link>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><LanguageToggle /><Link href={`${home}#kontakt`} className="rounded-full bg-[#ededf2] px-5 py-2.5 text-[13px] font-semibold text-[#0a0a12] hover:bg-white">{t.nav2.cta}</Link></div>
      <MobileNav key={pathname} activeSection={pathname.slice(1)} />
    </div>
  </header>;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <LanguageProvider lang={pathname === '/en' ? 'en' : 'sv'} updateDocumentLang>
    <Header />
    <div id="page-content" tabIndex={-1} className="flex-1 outline-none">{children}</div>
    <SiteFooter />
  </LanguageProvider>;
}
