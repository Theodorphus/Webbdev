'use client';

import Link from 'next/link';
import { useLang } from '../i18n/LanguageProvider';
import { business } from '../lib/business';
import { orter } from '../webbutveckling/orter';

export default function SiteFooter() {
  const { t, lang } = useLang();
  const home = lang === 'en' ? '/en' : '/';
  return (
      <footer className="border-t border-white/[0.07] py-14">
        <div className="mx-auto max-w-[80rem] px-8">
          <div className="flex flex-wrap items-start justify-between gap-10">
            <div>
              <span className="font-display text-[17px] font-bold text-white">
                Webbdev<span className="text-accent">.</span>studio
              </span>
              <p className="mt-3 max-w-[22rem] text-[13px] leading-relaxed text-[#ededf2]/60">
                {t.footer.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-16">
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/60">
                  {t.footer2.navigera}
                </span>
                <a href={`${home}#arbete`} className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.arbete}</a>
                <a href={`${home}#process`} className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.process}</a>
                <Link href="/gratis-demo" className="text-accent-light hover:text-white">{t.nav2.demo}</Link>
                <Link href="/priser" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.priser}</Link>
                <a href={`${home}#om`} className="text-[#ededf2]/55 transition-colors hover:text-white">{t.nav2.om}</a>
                <Link href="/tjanster" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.footer2.tjanster}</Link>
                <Link href="/portfolio" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.footer2.portfolio}</Link>
                <Link href="/blogg" className="text-[#ededf2]/55 transition-colors hover:text-white">{t.footer2.blogg}</Link>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/60">
                  {t.footer.kontakt}
                </span>
                <a href="tel:+46709525822" className="text-[#ededf2]/55 transition-colors hover:text-white">
                  070‑952 58 22
                </a>
                <a href="mailto:webbdevstudio@gmail.com" className="text-[#ededf2]/55 transition-colors hover:text-white">
                  webbdevstudio@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededf2]/55 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/60">
                  {t.footer.foretag}
                </span>
                {[business.name, `Org.nr: ${business.registrationNumber}`, lang === "sv" ? "Priser exklusive moms" : "Prices exclude VAT"].map((rad) => (
                  <span key={rad} className="text-[#ededf2]/60">{rad}</span>
                ))}
                <span className="text-[#ededf2]/60">Västra Gunnesgärde 41, Göteborg</span>
              </div>
              <div className="flex flex-col gap-2 text-[13px]">
                <span className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ededf2]/60">
                  {t.footer.orter}
                </span>
                {orter.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/webbutveckling/${o.slug}`}
                    className="text-[#ededf2]/55 transition-colors hover:text-white"
                  >
                    {o.namn}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/[0.07] pt-6 text-xs text-[#ededf2]/60 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Webbdev Studio — webbdev.se</span>
            <Link href="/integritetspolicy" className="transition-colors hover:text-[#ededf2]/60">
              {t.footer.integritetspolicy}
            </Link>
          </div>
        </div>
      </footer>
  );
}
