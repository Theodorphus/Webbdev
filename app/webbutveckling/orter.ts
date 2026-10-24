// Ortsdata för lokala landningssidor (/webbutveckling/[ort]).
// Varje ort har UNIKT innehåll — Google straffar nära-dubbletter
// ("doorway pages"), så rubriker, brödtext, poänger och närområden
// skiljer sig genuint åt mellan orterna.

export type Ort = {
  slug: string;
  namn: string; // "Göteborg"
  iNamn: string; // "i Göteborg" / "i Mölndal"
  region: string;
  title: string;
  description: string;
  intro: string[];
  /** Lokala anledningar att välja oss — unika per ort. */
  poanger: { rubrik: string; text: string }[];
  /** Närliggande områden/orter att nämna naturligt för long-tail. */
  narliggande: string[];
  /** Ortsunik mening i FAQ:ns leveranssvar — utan den blir svaret identiskt
   *  på alla ortssidor (dåligt för indexeringen). */
  leveransDetalj: string;
};

export const orter: Ort[] = [
  {
    slug: "goteborg",
    namn: "Göteborg",
    iNamn: "i Göteborg",
    region: "Västra Götaland",
    title: "Webbutveckling i Göteborg",
    description:
      "Webbutveckling i Göteborg för företag som vill synas och sälja. Snabba, moderna hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Jag är webbutvecklare baserad i Göteborg och bygger moderna hemsidor för lokala företag — från enskilda firmor till etablerade varumärken. Sitter du i Göteborg och behöver en hemsida som faktiskt drar in kunder är du på rätt ställe.",
      "Till skillnad från stora byråer får du personlig kontakt rakt igenom. Jag bygger med samma teknik som de snabbaste sajterna på nätet, men till ett fast pris utan dolda kostnader.",
    ],
    poanger: [
      {
        rubrik: "Lokal närvaro",
        text: "Baserad i Göteborg — vi kan ses fysiskt över en kaffe eller köra allt digitalt. Du väljer.",
      },
      {
        rubrik: "Byggt för Göteborgs marknad",
        text: "Hemsidor byggda för lokala sökningar, så att det blir lättare för kunder i Göteborgsområdet att hitta dig på Google.",
      },
      {
        rubrik: "Snabb leverans",
        text: "En mindre hemsida byggs normalt på 3–7 arbetsdagar från godkänd design och komplett material — utan månader av väntan.",
      },
    ],
    narliggande: ["Hisingen", "Mölndal", "Partille", "Kungsbacka", "Lerum"],
    leveransDetalj:
      "Sitter du i Göteborg kan vi dessutom ta uppstartsmötet över en kaffe — det brukar göra att designförslaget är klart redan efter ett par dagar.",
  },
  {
    slug: "skovde",
    namn: "Skövde",
    iNamn: "i Skövde",
    region: "Västra Götaland",
    title: "Webbutveckling i Skövde",
    description:
      "Webbutveckling i Skövde för företag i Skaraborg. Moderna, snabba hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Jag bygger moderna hemsidor för företag i Skövde och övriga Skaraborg. Behöver ditt företag synas bättre lokalt och få en sajt som imponerar på kunderna? Då hjälper jag dig hela vägen.",
      "Du jobbar direkt med utvecklaren — ingen säljare, inga mellanhänder. Bara en snabb, professionell hemsida till ett pris du vet på förhand.",
    ],
    poanger: [
      {
        rubrik: "För Skaraborgs företag",
        text: "Jag förstår den lokala marknaden i Skövde-regionen och bygger sajter som når rätt kunder.",
      },
      {
        rubrik: "Helt digitalt om du vill",
        text: "Hela processen kan skötas på distans — videomöten, delade förslag och löpande avstämningar.",
      },
      {
        rubrik: "Fast pris, snabb leverans",
        text: "Du vet exakt vad det kostar från start, och en mindre sajt byggs normalt på 3–7 arbetsdagar från godkänd design.",
      },
    ],
    narliggande: ["Skara", "Falköping", "Tibro", "Mariestad", "Lidköping"],
    leveransDetalj:
      "För företag i Skövde och övriga Skaraborg sköts avstämningarna via videomöte med delade designförslag, så tempot hålls uppe trots avståndet.",
  },
  {
    slug: "molndal",
    namn: "Mölndal",
    iNamn: "i Mölndal",
    region: "Västra Götaland",
    title: "Webbutveckling i Mölndal",
    description:
      "Webbutveckling i Mölndal för lokala företag. Moderna, snabba hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Mölndal har ett starkt och växande näringsliv, och allt fler företag här inser att en daterad hemsida kostar kunder. Jag bygger moderna, snabba sajter för Mölndalsföretag som vill ta nästa steg online.",
      "Som granne i Göteborgsområdet är jag aldrig långt borta. Du får en utvecklare som tar projektet på allvar och en hemsida som står sig mot konkurrenterna.",
    ],
    poanger: [
      {
        rubrik: "Nära Mölndal",
        text: "Granne i Göteborgsområdet — enkelt att ses på plats om du föredrar det personliga mötet.",
      },
      {
        rubrik: "För det lokala näringslivet",
        text: "Från butiker och hantverkare till tjänsteföretag i Mölndal — jag anpassar sajten efter din bransch.",
      },
      {
        rubrik: "Konverteringsfokus",
        text: "Snygg design räcker inte. Jag bygger sajter som faktiskt får besökare att höra av sig.",
      },
    ],
    narliggande: ["Kållered", "Lindome", "Göteborg", "Kungsbacka", "Pixbo"],
    leveransDetalj:
      "Eftersom Mölndal ligger granne med Göteborg kan vi ses fysiskt för uppstarten om du föredrar det — det påverkar inte leveranstiden.",
  },
  {
    slug: "partille",
    namn: "Partille",
    iNamn: "i Partille",
    region: "Västra Götaland",
    title: "Webbutveckling i Partille",
    description:
      "Webbutveckling i Partille för företag som vill synas online. Moderna hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Driver du företag i Partille och vill ha en hemsida som matchar kvaliteten på det du erbjuder? Jag bygger moderna sajter för lokala företag som vill synas och växa.",
      "Du slipper krångel med stora byråer. Istället får du en personlig utvecklare, ett fast pris och en mindre sajt som normalt byggs på under en vecka från godkänd design.",
    ],
    poanger: [
      {
        rubrik: "Lokalt och personligt",
        text: "Strax öster om Göteborg — vi kan träffas på plats eller sköta allt smidigt på distans.",
      },
      {
        rubrik: "Allt ingår",
        text: "Domän, hosting, SSL och första månadens support — du behöver inte fundera på tekniken.",
      },
      {
        rubrik: "Syns på Google",
        text: "Lokal SEO som gör det lättare för Partilleborna att hitta ditt företag när de söker.",
      },
    ],
    narliggande: ["Sävedalen", "Jonsered", "Göteborg", "Lerum", "Öjersjö"],
    leveransDetalj:
      "Partilleföretag brukar köra hela processen digitalt med löpande delade förslag — men vill du ses är det bara en kort resa från Göteborg.",
  },
  {
    slug: "kungsbacka",
    namn: "Kungsbacka",
    iNamn: "i Kungsbacka",
    region: "Halland",
    title: "Webbutveckling i Kungsbacka",
    description:
      "Webbutveckling i Kungsbacka för lokala företag i norra Halland. Snabba, moderna hemsidor i Next.js till fast pris.",
    intro: [
      "Kungsbacka är en av Sveriges snabbast växande kommuner med ett livaktigt näringsliv. Jag hjälper företag här att få en hemsida som tar vara på tillväxten istället för att hålla tillbaka den.",
      "Oavsett om du är ny eller vill modernisera en gammal sajt får du en snabb, professionell lösning till fast pris — och en utvecklare du faktiskt når.",
    ],
    poanger: [
      {
        rubrik: "Norra Halland",
        text: "Jag jobbar med företag i hela Kungsbacka-området och längs Västkusten.",
      },
      {
        rubrik: "Byggt för tillväxt",
        text: "Sajter som skalar med ditt företag — lägg till sidor, produkter och funktioner när du växer.",
      },
      {
        rubrik: "Mobilen först",
        text: "Majoriteten av dina kunder surfar i mobilen. Din sajt byggs för att se perfekt ut där.",
      },
    ],
    narliggande: ["Onsala", "Fjärås", "Anneberg", "Åsa", "Frillesås"],
    leveransDetalj:
      "Företag i Kungsbacka-området får samma tempo oavsett om vi ses på plats längs Västkusten eller kör allt via videomöte.",
  },
  {
    slug: "lerum",
    namn: "Lerum",
    iNamn: "i Lerum",
    region: "Västra Götaland",
    title: "Webbutveckling i Lerum",
    description:
      "Webbutveckling i Lerum för lokala företag. Moderna, snabba hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Lerum har många små och medelstora företag som förtjänar en hemsida i toppklass. Jag bygger moderna sajter för lokala verksamheter som vill sticka ut och nå fler kunder.",
      "Du jobbar direkt med utvecklaren från start till mål. Inga mellanhänder, inga överraskningar — bara en snabb och snygg hemsida till ett fast pris.",
    ],
    poanger: [
      {
        rubrik: "I Lerums närhet",
        text: "Längs Göteborg–Alingsås-stråket — enkelt att samarbeta oavsett om du vill ses eller köra digitalt.",
      },
      {
        rubrik: "För småföretagaren",
        text: "Prisvärda lösningar anpassade för mindre företag som vill ha proffsig kvalitet utan storbyrå-pris.",
      },
      {
        rubrik: "Enkelt att uppdatera",
        text: "Admin-panel så att du själv kan hantera innehållet — utan att kunna en rad kod.",
      },
    ],
    narliggande: ["Gråbo", "Floda", "Stenkullen", "Sjövik", "Partille"],
    leveransDetalj:
      "Längs Göteborg–Alingsås-stråket kör vi oftast helt digitalt — du får designförslag löpande och kan ge snabb feedback mellan varven.",
  },
  {
    slug: "boras",
    namn: "Borås",
    iNamn: "i Borås",
    region: "Västra Götaland",
    title: "Webbutveckling i Borås",
    description:
      "Webbutveckling i Borås för företag i Sjuhärad. Moderna, snabba hemsidor i Next.js till fast pris — normalt 3–7 arbetsdagars bygge.",
    intro: [
      "Borås är navet i Sjuhärad med en stark tradition av handel och entreprenörskap. Jag bygger moderna hemsidor för Boråsföretag som vill ta sin närvaro online till nästa nivå.",
      "Från e-handel till företagspresentationer — du får en snabb, konverteringsoptimerad sajt och en personlig utvecklare som finns där genom hela projektet.",
    ],
    poanger: [
      {
        rubrik: "För Sjuhärad",
        text: "Jag hjälper företag i Borås med omnejd att synas och sälja bättre på nätet.",
      },
      {
        rubrik: "Stark på e-handel",
        text: "Med Borås handelstradition i ryggen bygger jag nätbutiker med Stripe som faktiskt säljer.",
      },
      {
        rubrik: "Helt på distans",
        text: "Hela processen kan skötas digitalt med videomöten och delade förslag — smidigt och snabbt.",
      },
    ],
    narliggande: ["Fristad", "Sandared", "Dalsjöfors", "Viskafors", "Ulricehamn"],
    leveransDetalj:
      "E-handelsprojekt — vanliga i handelsstaden Borås — tar ofta någon dag extra för Stripe-koppling och produktuppläggning, med tydlig tidsplan från start.",
  },
  {
    slug: "skara",
    namn: "Skara",
    iNamn: "i Skara",
    region: "Västra Götaland",
    title: "Webbutveckling i Skara",
    description:
      "Webbutveckling i Skara för lokala företag i Skaraborg. Moderna, snabba hemsidor i Next.js till fast pris.",
    intro: [
      "Skara är en av Sveriges äldsta städer med ett stadigt lokalt näringsliv. Jag bygger moderna hemsidor för företag här som vill kombinera lokal förankring med en professionell närvaro online.",
      "Du får en utvecklare som tar sig tid, ett fast pris utan dolda kostnader och en mindre sajt som normalt byggs på några arbetsdagar från godkänd design.",
    ],
    poanger: [
      {
        rubrik: "Mitt i Skaraborg",
        text: "Tillsammans med Skövde-sidan täcker jag företag i hela Skaraborgsregionen.",
      },
      {
        rubrik: "Lokal förankring online",
        text: "Sajter som lyfter fram din lokala koppling och bygger förtroende hos Skaraborna.",
      },
      {
        rubrik: "Snabbt och prisvärt",
        text: "Fast pris, tydlig process och normalt 3–7 arbetsdagars bygge från godkänd design.",
      },
    ],
    narliggande: ["Axvall", "Varnhem", "Skövde", "Götene", "Vara"],
    leveransDetalj:
      "För Skaraföretag kombineras uppstart via video med snabba avstämningar per telefon — smidigt även mitt i skörde- eller högsäsong.",
  },
];

export function getOrt(slug: string): Ort | undefined {
  return orter.find((o) => o.slug === slug);
}

// Lokal FAQ per ort — byggd från ortens egen data så varje sida får
// unik, djup text (bättre indexering) och kan visa FAQ-rich-results i Google.
export function getOrtFaq(ort: Ort): { q: string; a: string }[] {
  const grannar = ort.narliggande.slice(0, 3).join(", ");
  return [
    {
      q: `Vad kostar en hemsida ${ort.iNamn}?`,
      a: `Jag erbjuder ungefärliga prisnivåer på 2 000 kr, 4 000 kr och från 6 000 kr för större lösningar. Slutpriset beror på projektets omfattning och dina krav. Alla priser är exklusive moms, och du får alltid en fast offert innan vi börjar. Priset är detsamma oavsett om du sitter ${ort.iNamn} eller i någon av grannkommunerna.`,
    },
    {
      q: `Hur lång tid tar det att bygga en hemsida ${ort.iNamn}?`,
      a: `En mindre hemsida byggs normalt på 3–7 arbetsdagar från godkänd design och komplett material. Större webbplatser kan ta längre tid. Du jobbar direkt med utvecklaren, så vi slipper mellanhänder. ${ort.leveransDetalj}`,
    },
    {
      q: `Bygger du hemsidor åt företag utanför ${ort.namn}?`,
      a: `Ja. Förutom ${ort.namn} hjälper jag företag i bland annat ${grannar} och övriga ${ort.region}. Hela processen kan skötas digitalt med videomöten och delade förslag, så avståndet spelar ingen roll.`,
    },
    {
      q: `Kommer min hemsida synas på Google?`,
      a: `Ingen kan garantera placeringar på Google, men alla sajter jag bygger har en teknisk grund för att hittas: snabb laddtid, tydlig sidstruktur, strukturerad data och innehåll som speglar lokala sökningar som "${ort.title.toLowerCase()}". Det ger goda förutsättningar att hittas av kunder ${ort.iNamn}.`,
    },
  ];
}
