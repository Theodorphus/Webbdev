'use client';

import Link from 'next/link';
import { localizedHref } from '../i18n/routes';
import { useLang } from '../i18n/LanguageProvider';
import { business } from '../lib/business';
import { orter } from '../webbutveckling/orter';

export default function SiteFooter() {
  const { t, lang } = useLang();
  const home = lang === 'en' ? '/en' : '/';
  return (
      <footer className="border-t border-foreground/10 bg-[var(--surface-1)] py-16">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <div className="grid gap-12 xl:grid-cols-[1fr_2.5fr]">
            <div>
              <span className="font-display text-[17px] font-bold text-foreground">
                Webbdev<span className="text-accent-light">.</span>studio
              </span>
              <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-muted">
                {t.footer.tagline}
              </p>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-10 min-[420px]:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 text-sm">
                <span className="mb-1.5 font-sans text-xs font-semibold text-foreground">
                  {t.footer2.navigera}
                </span>
                <a href={`${home}#arbete`} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.nav2.arbete}</a>
                <a href={`${home}#process`} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.nav2.process}</a>
                <Link href="/gratis-demo" className="text-accent-light hover:text-foreground">{t.nav2.demo}</Link>
                <Link href={localizedHref("/priser", lang)} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.nav2.priser}</Link>
                <a href={`${home}#om`} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.nav2.om}</a>
                <Link href={localizedHref("/tjanster", lang)} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.footer2.tjanster}</Link>
                <Link href={localizedHref("/portfolio", lang)} className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.footer2.portfolio}</Link>
                <Link href="/blogg" className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4">{t.footer2.blogg}</Link>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <span className="mb-1.5 font-sans text-xs font-semibold text-foreground">
                  {t.footer.kontakt}
                </span>
                <a href="tel:+46709525822" className="font-medium text-foreground transition-colors hover:text-foreground hover:underline underline-offset-4">
                  070‑952 58 22
                </a>
                <a href="mailto:webbdevstudio@gmail.com" className="break-words font-medium text-foreground transition-colors hover:text-foreground hover:underline underline-offset-4">
                  webbdevstudio@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/theo-h%C3%A5kansson-30b112114/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <span className="mb-1.5 font-sans text-xs font-semibold text-foreground">
                  {t.footer.foretag}
                </span>
                {[business.name, `Org.nr: ${business.registrationNumber}`, lang === "sv" ? "Priser exklusive moms" : "Prices exclude VAT"].map((rad) => (
                  <span key={rad} className="text-muted">{rad}</span>
                ))}
                <span className="text-muted">Västra Gunnesgärde 41, Göteborg</span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <span className="mb-1.5 font-sans text-xs font-semibold text-foreground">
                  {t.footer.orter}
                </span>
                {orter.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/webbutveckling/${o.slug}`}
                    className="text-muted transition-colors hover:text-foreground hover:underline underline-offset-4"
                  >
                    {o.namn}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2 border-t border-foreground/[0.07] pt-6 text-xs text-muted sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Webbdev Studio — webbdev.se</span>
            <Link href="/integritetspolicy" className="transition-colors hover:text-muted">
              {t.footer.integritetspolicy}
            </Link>
          </div>
        </div>
      </footer>
  );
}
