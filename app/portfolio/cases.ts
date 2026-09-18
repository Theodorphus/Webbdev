export const customerCases = [
  {
    slug: 'ockerocement', name: 'Öckerö Cementgjuteri', category: 'Byggmaterial · Före & efter',
    title: 'Från bildtung startsida till en tydlig väg in i sortimentet.',
    intro: 'En uppdaterad webbplats för byggmaterial, betong och maskinuthyrning i Göteborgs skärgård. Här visar vi förändringen i första intryck, produktöversikt och kontaktvägar.',
    image: '/work/cases/cement-after-home.webp', imageWidth: 1600, imageHeight: 743,
    url: 'https://ockerocement.vercel.app/',
    focus: 'Göra det tydligt vad företaget erbjuder och hjälpa besökaren vidare till produkter eller kontakt redan från första skärmen.',
    before: 'Den tidigare startsidan dominerades av en stenbild. Presentationen av företaget började längre ner, och kontaktinformationen låg på en separat sida.',
    solution: 'Den nya startsidan kombinerar en lokal miljöbild med ett tydligt erbjudande och två synliga vägar vidare. Sortimentet delas upp i bildbaserade kategorier. Kontaktuppgifter, öppettider och vägbeskrivning får tydliga egna ytor.',
    decisions: [
      { title: 'Låt platsen ge företaget en identitet', text: 'Skärgårdsbilden skapar en direkt koppling till verksamhetens plats. Rubriken och den korta presentationen ligger i samma vy, så att miljön också får ett tydligt sammanhang.' },
      { title: 'Ge två tydliga vägar från första skärmen', text: 'Besökaren kan gå vidare till produkterna eller ta kontakt direkt. Det ger både den som vill utforska sortimentet och den som redan vet vad den behöver ett synligt nästa steg.' },
      { title: 'Gör ett brett sortiment lättare att överblicka', text: 'Bildbaserade produktkategorier delar upp erbjudandet i begripliga delar. Öppettider och kontaktuppgifter får egna ytor, och mobilvyn samlar innehållet i en tydlig kolumn.' },
    ],
    outcomes: ['Erbjudande och kontaktknappar direkt i sidans inledning.', 'Bildbaserad översikt över betong, markbeläggning och fler produktområden.', 'Kontaktpersoner, öppettider och karta samlade i en tydligare layout.'],
    note: 'Jämförelsen visar design och innehåll i de tillhandahållna skärmbilderna. Någon uppmätt förändring i trafik eller förfrågningar redovisas inte.',
  },
  {
    slug: 'wildkull', name: 'Wildkull Payroll', category: 'Företagswebbplats · Kundberättelse',
    title: 'Lönekompetens med ett personligt och tydligt uttryck.',
    intro: 'En webbplats som presenterar lönehantering, rådgivning och interimstöd. Ett sammanhållet bildspråk och synliga kontaktvägar ger besökaren en tydlig introduktion till verksamheten.',
    image: '/work/wildkull.webp', imageWidth: 1200, imageHeight: 1500,
    url: 'https://www.wildkullpayroll.se/',
    focus: 'Låta besökaren förstå tjänsterna och hitta vägen till ett första samtal, samtidigt som verksamhetens personliga karaktär får ta plats.',
    before: null,
    solution: 'Tjänster och målgrupp presenteras i sidans inledning, tillsammans med vägar vidare till tjänsteutbud och kontakt. Gröna toner, ett varmt bildspråk och en återkommande ugglesymbol binder ihop uttrycket.',
    decisions: [
      { title: 'Börja med nyttan av lönehantering', text: 'Rubriken lyfter trygghet och frigjord tid. Tjänsterna får därmed ett sammanhang som är relevant för företaget som söker hjälp, redan innan besökaren läser detaljerna.' },
      { title: 'Låt ett personligt uttryck bära förtroendet', text: 'Gröna toner, miljöbilder och ugglesymbolen håller ihop presentationen. Samma visuella språk följer med från startsidan till tjänsterna.' },
      { title: 'Gör det enkelt att komma vidare på mobilen', text: 'Text, tjänstelänk och kontaktvägar följer en tydlig vertikal ordning. De stora knapparna gör det lättare att gå från att läsa om verksamheten till att ta nästa steg.' },
    ],
    outcomes: ['Tydlig introduktion till lönehantering, effektivisering och rådgivning.', 'Synlig knapp för att boka ett möte i navigationen.', 'Sammanhållet färg- och bildspråk genom sidan.'],
    note: 'Beskrivningen utgår från projektets skärmbild och kundens befintliga recension. Inga mätbara affärsresultat anges.',
  },
] as const;

export function getCustomerCase(slug: string) { return customerCases.find(item => item.slug === slug); }
