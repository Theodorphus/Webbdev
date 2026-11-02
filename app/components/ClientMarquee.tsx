import { dictionary, type Lang } from '../i18n/dictionary';

// Kunder som visas i det rullande bandet under heron. Ren CSS-animation —
// ingen JS. Listan dupliceras för en sömlös loop; kopian döljs för
// skärmläsare. Med reducerad rörelse står listan still och radbryts.
const clients = [
  'SwedenSweet',
  'Öckerö Cementgjuteri',
  'Wildkull Payroll',
  'Karla Cleaning Crew',
  'Prolink',
  'Konstbyte',
  'André Roslund',
];

export default function ClientMarquee({ lang }: { lang: Lang }) {
  const label = dictionary[lang].trust.rubrik;
  return (
    <section className="client-marquee" aria-label={label}>
      <p className="studio-eyebrow client-marquee-label">{label}</p>
      <div className="client-marquee-viewport">
        <ul className="client-marquee-track">
          {clients.map((name) => <li key={name}>{name}</li>)}
        </ul>
        <ul className="client-marquee-track" aria-hidden="true">
          {clients.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </div>
    </section>
  );
}
