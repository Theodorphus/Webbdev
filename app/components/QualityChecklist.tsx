'use client';
import { useLang } from '../i18n/LanguageProvider';

export default function QualityChecklist() {
  const { lang } = useLang();
  const sv = lang === 'sv';
  const checks = sv ? [
    'Mobil och dator: text, bilder och knappar ska fungera på olika skärmstorlekar.',
    'Kontaktformulär: obligatoriska fält, felmeddelanden och kvittens kontrolleras.',
    'Navigation: länkar och kontaktvägar ska leda besökaren rätt.',
    'Laddning: bilder och sidans beteende granskas före publicering.',
  ] : [
    'Mobile and desktop: text, images and buttons are checked across screen sizes.',
    'Contact forms: required fields, error messages and confirmation states are checked.',
    'Navigation: links and contact options are checked to lead visitors to the right place.',
    'Loading: images and page behaviour are reviewed before publication.',
  ];
  return <section className="quality-checklist" aria-labelledby="quality-heading"><h3 id="quality-heading" className="font-display text-lg font-semibold">{sv ? 'Sista steget är omsorgen om detaljerna.' : 'The final step is attention to detail.'}</h3><p className="text-sm leading-relaxed text-muted">{sv ? 'Inför lansering går jag igenom webbplatsen och rättar det som behöver justeras. Här är några av kontrollerna.' : 'Before launch, I review the website and address anything that needs adjusting. These are some of the checks.'}</p><ul>{checks.map(check => <li key={check}>{check}</li>)}</ul></section>;
}
