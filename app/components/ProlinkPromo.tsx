import type { Lang } from '../i18n/dictionary';

export default function ProlinkPromo({ lang }: { lang: Lang }) {
  const sv = lang === 'sv';

  return (
    <aside id="prolink" aria-labelledby="prolink-heading" className="studio-container py-12 md:py-16">
      <div className="rounded-[24px] border border-foreground/10 bg-surface-1 p-6 sm:p-9 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-5">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground">Prolink<span className="text-accent-light">.</span></span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{sv ? 'Reklam · Prolink' : 'Advertisement · Prolink'}</span>
        </div>
        <div className="mt-6 grid items-center gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
          <div>
            <h2 id="prolink-heading" className="font-display text-[clamp(24px,3vw,36px)] font-semibold leading-tight tracking-[-0.025em] text-foreground">
              {sv ? 'Rätt kompetens för nästa steg.' : 'The right expertise for your next step.'}
            </h2>
            <p className="mt-3 max-w-[38rem] text-[15px] leading-relaxed text-muted">
              {sv
                ? 'Behöver ditt företag hjälp med mer än hemsidan? På Prolink hittar du svenska frilansare inom bland annat ekonomi, juridik och marknadsföring.'
                : 'Need help beyond your website? Prolink connects your business with Swedish freelancers in areas such as finance, legal services and marketing.'}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {sv ? 'Kostnadsfritt att publicera uppdrag · Direktkontakt med frilansare' : 'Free to post a project · Direct contact with freelancers'}
            </p>
          </div>
          <a href="https://www.prolink.se/" target="_blank" rel="sponsored noopener noreferrer" className="studio-button w-full md:w-auto" aria-label={sv ? 'Upptäck Prolink (öppnas i ny flik)' : 'Explore Prolink (opens in a new tab)'}>
            {sv ? 'Upptäck Prolink' : 'Explore Prolink'}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
