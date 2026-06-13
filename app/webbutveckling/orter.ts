// Ortsdata för lokala landningssidor (/webbutveckling/[ort]).
// Varje ort har UNIKT innehåll — Google straffar nära-dubbletter, så
// rubriker, brödtext och FAQ skiljer sig genuint åt mellan orterna.

export type Ort = {
  slug: string;
  namn: string; // "Göteborg"
  iNamn: string; // "i Göteborg" / "i Skövde"
  region: string;
  title: string;
  description: string;
  intro: string[];
  /** Lokala anledningar att välja oss — unika per ort. */
  poanger: { rubrik: string; text: string }[];
  /** Närliggande områden/orter att nämna naturligt för long-tail. */
  narliggande: string[];
};

export const orter: Ort[] = [
  {
    slug: "goteborg",
    namn: "Göteborg",
    iNamn: "i Göteborg",
    region: "Västra Götaland",
    title: "Webbutveckling i Göteborg",
    description:
      "Webbutveckling i Göteborg för företag som vill synas och sälja. Snabba, moderna hemsidor i Next.js till fast pris — leverans på 3–7 dagar.",
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
        text: "Hemsidor optimerade för lokala sökningar så att kunder i Göteborgsområdet hittar just dig på Google.",
      },
      {
        rubrik: "Snabb leverans",
        text: "Din nya hemsida är live på 3–7 arbetsdagar. Inget väntande i månader som hos större byråer.",
      },
    ],
    narliggande: ["Hisingen", "Mölndal", "Partille", "Kungsbacka", "Lerum"],
  },
  {
    slug: "skovde",
    namn: "Skövde",
    iNamn: "i Skövde",
    region: "Västra Götaland",
    title: "Webbutveckling i Skövde",
    description:
      "Webbutveckling i Skövde för företag i Skaraborg. Moderna, snabba hemsidor i Next.js till fast pris — leverans på 3–7 dagar.",
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
        text: "Du vet exakt vad det kostar från start, och sajten är live på 3–7 arbetsdagar.",
      },
    ],
    narliggande: ["Skara", "Falköping", "Tibro", "Mariestad", "Lidköping"],
  },
];

export function getOrt(slug: string): Ort | undefined {
  return orter.find((o) => o.slug === slug);
}
