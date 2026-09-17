'use client';

import { useLang } from '../i18n/LanguageProvider';
import { priceTerms } from '../lib/business';

export default function PriceTerms() {
  const { lang } = useLang();
  const terms = priceTerms[lang];
  return <section aria-labelledby="price-terms" className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"><h2 id="price-terms" className="font-display text-2xl font-semibold">{lang === 'sv' ? 'Tydligt från offert till lansering' : 'Clear terms from quote to launch'}</h2><p className="mt-3 text-sm font-medium text-accent-light">{terms.vat}</p><div className="mt-6 grid gap-6 md:grid-cols-3">{[
    [lang === 'sv' ? 'Fast pris för rätt omfattning' : 'A fixed price for an agreed scope', terms.scope],
    [lang === 'sv' ? 'Domän, drift & abonnemang' : 'Domain, hosting & subscriptions', terms.running],
    [lang === 'sv' ? 'Support efter lansering' : 'Support after launch', terms.support],
  ].map(([title, text]) => <div key={title}><h3 className="text-sm font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p></div>)}</div></section>;
}
