// Blogginlägg — SEO-innehåll som rankar på frågor folk faktiskt googlar.
// Varje inlägg har unik, djup text (Google indexerar hellre djupa sidor)
// och egen metadata. Lägg till fler objekt i listan över tid.

export type BlogSection = {
  rubrik: string;
  /** Stycken (brödtext). Renderas som <p> i tur och ordning. */
  stycken: string[];
  /** Valfri punktlista efter styckena. */
  punkter?: string[];
};

export type Post = {
  slug: string;
  title: string;
  /** Meta-description (~150–160 tecken) + ingress överst på sidan. */
  description: string;
  /** ISO-datum, t.ex. "2026-06-17". Visas och används i JSON-LD. */
  published: string;
  /** Lästid i minuter (visas som "x min läsning"). */
  readingMinutes: number;
  /** Kort etikett/kategori, t.ex. "Guide". */
  tag: string;
  sections: BlogSection[];
};

export const posts: Post[] = [
  {
    slug: "vad-kostar-en-hemsida",
    title: "Vad kostar en hemsida 2026? Komplett prisguide",
    description:
      "Vad kostar det att bygga en hemsida 2026? Här är en ärlig genomgång av priser för enkla sajter, e-handel och webbyråer — och vad du faktiskt får för pengarna.",
    published: "2026-06-17",
    readingMinutes: 6,
    tag: "Prisguide",
    sections: [
      {
        rubrik: "Kort svar: vad kostar en hemsida?",
        stycken: [
          "En enkel men professionell hemsida kostar vanligtvis mellan 5 000 och 25 000 kronor 2026, beroende på omfattning. En större e-handel eller skräddarsydd lösning landar ofta mellan 25 000 och 100 000 kronor. Priset styrs av hur mycket som ska byggas, hur unik designen är och vem som bygger den.",
          "Men priset säger inte allt. En billig hemsida som inte syns på Google eller laddar långsamt kostar dig kunder varje dag — då är den dyr i längden. En genomtänkt sajt till fast pris är ofta den bästa affären.",
        ],
      },
      {
        rubrik: "Prisnivåer — vad du får för pengarna",
        stycken: [
          "Här är de vanligaste prisnivåerna på den svenska marknaden och vad de typiskt innebär:",
        ],
        punkter: [
          "Mallbaserad sajt (Wix, Squarespace): 0–5 000 kr. Du bygger själv i en mall. Billigt men generiskt, ofta långsamt och svårt att ranka på Google.",
          "Frilansare / mindre studio: 5 000–25 000 kr. Skräddarsydd design, modern teknik och personlig kontakt. Bäst pris-för-värde för de flesta småföretag.",
          "Webbyrå: 25 000–100 000+ kr. Mer resurser och processer, men också mer overhead — du betalar för säljare, projektledare och kontor.",
          "Enterprise / e-handel: 100 000 kr och uppåt. Komplexa system, integrationer och löpande förvaltning.",
        ],
      },
      {
        rubrik: "Vad påverkar priset mest?",
        stycken: [
          "Tre saker driver kostnaden mer än något annat: antal sidor och funktioner, hur unik designen ska vara, och om sajten behöver en backend (inloggning, bokning, betalning, admin-panel). En ensidig presentationssajt är snabb att bygga. En bokningsplattform med Stripe-betalningar och automatiserade mejl tar längre tid och kostar mer.",
          "Ett vanligt misstag är att stirra sig blind på lägsta pris. Fråga i stället: laddar sajten snabbt, är den byggd för att synas på Google, och är den enkel att uppdatera? Det avgör om hemsidan tjänar in sig själv.",
        ],
      },
      {
        rubrik: "Löpande kostnader att räkna med",
        stycken: [
          "Utöver bygget tillkommer oftast en del löpande kostnader. De är vanligtvis små, men bra att känna till från start:",
        ],
        punkter: [
          "Domän: ca 100–200 kr per år.",
          "Webbhotell / hosting: 0–200 kr per månad (moderna sajter kan ofta hostas gratis eller billigt).",
          "Underhåll och uppdateringar: varierar — en del tar betalt löpande, andra bygger sajter du själv kan uppdatera.",
        ],
      },
      {
        rubrik: "Fast pris eller timdebitering?",
        stycken: [
          "Timdebitering låter ofta billigt i offerten men kan skena iväg — du vet inte slutnotan förrän projektet är klart. Fast pris ger dig trygghet: du vet exakt vad det kostar innan vi börjar, utan dolda avgifter.",
          "På Webbdev Studio jobbar jag alltid med fast pris och tydlig leverans på 3–7 arbetsdagar. Du får en modern, snabb hemsida byggd i samma teknik som de snabbaste sajterna på nätet — till ett pris du känner till på förhand.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
