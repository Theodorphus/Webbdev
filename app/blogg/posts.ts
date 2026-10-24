// Blogginlägg — SEO-innehåll som rankar på frågor folk faktiskt googlar.
// Varje inlägg har unik, djup text (Google indexerar hellre djupa sidor)
// och egen metadata. Lägg till fler objekt i listan över tid.

export type BlogSection = {
  rubrik: string;
  /** Stycken (brödtext). Renderas som <p> i tur och ordning. */
  stycken: string[];
  /** Valfri punktlista efter styckena. */
  punkter?: string[];
  /** Valfri intern länk sist i avsnittet, t.ex. till /priser. */
  lank?: { href: string; text: string };
};

export type Post = {
  slug: string;
  title: string;
  /** Meta-description (~150–160 tecken) + ingress överst på sidan. */
  description: string;
  /** ISO-datum, t.ex. "2026-06-17". Visas och används i JSON-LD. */
  published: string;
  /** ISO-datum för senaste innehållsändring, om inlägget uppdaterats efter publicering. */
  updated?: string;
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
    updated: "2026-10-25",
    readingMinutes: 7,
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
          "På Webbdev Studio jobbar jag alltid med fast pris för överenskommen omfattning. Du får en modern, snabb hemsida byggd i samma teknik som de snabbaste sajterna på nätet — till ett pris du känner till på förhand.",
        ],
      },
      {
        rubrik: "Vad kostar det hos Webbdev Studio?",
        stycken: [
          "Mina paket har tre vägledande prisnivåer. Alla priser är exklusive moms, och du får alltid en fast offert för överenskommen omfattning innan arbetet börjar.",
        ],
        punkter: [
          "Bas, cirka 2 000 kr: responsiv hemsida med upp till 5 sidor, kontaktformulär och mobiloptimering.",
          "Premium, cirka 4 000 kr: allt i Bas, upp till 15 sidor, admin-panel där du uppdaterar innehållet själv, SEO-grund och 1 månads support.",
          "Full Service, från cirka 6 000 kr: allt i Premium, fler sidor, e-handel via Stripe, avancerad admin-panel och 3 månaders support.",
          "En mindre webbplats byggs normalt på 3–7 arbetsdagar från godkänd design och komplett material. Löpande kostnader för domän och drift specificeras separat i offerten.",
        ],
        lank: { href: "/priser", text: "Se paketen och räkna på ditt projekt" },
      },
    ],
  },
  {
    slug: "wix-eller-egen-hemsida",
    title: "Wix eller egen hemsida? Så väljer du rätt för ditt företag",
    description:
      "Ska du bygga själv i Wix eller Squarespace, eller låta någon ta fram en egen hemsida? En ärlig jämförelse av kostnad, tid, flexibilitet och synlighet på Google.",
    published: "2026-10-25",
    readingMinutes: 6,
    tag: "Guide",
    sections: [
      {
        rubrik: "Kort svar",
        stycken: [
          "En hemsidesbyggare som Wix eller Squarespace passar bra när du vill komma igång snabbt, har en liten budget och har tid att bygga själv. En egen hemsida passar bättre när hemsidan ska bära en större del av försäljningen, när du vill sticka ut från mallarna eller när du behöver funktioner som inte finns färdiga.",
          "Det finns inget val som är rätt för alla. Det viktiga är att du vet vad du betalar för — i pengar och i tid — och vad hemsidan ska hjälpa dig med.",
        ],
      },
      {
        rubrik: "Fördelar med Wix och andra hemsidesbyggare",
        stycken: [
          "Hemsidesbyggarna har blivit riktigt bra. För många mindre verksamheter räcker de gott, särskilt i början.",
        ],
        punkter: [
          "Låg startkostnad: du betalar en månadsavgift i stället för ett bygge.",
          "Snabbt att komma igång: med en mall kan en enkel sida vara uppe samma dag.",
          "Du gör ändringar själv i ett visuellt gränssnitt.",
          "Hosting, säkerhetsuppdateringar och SSL ingår i abonnemanget.",
        ],
      },
      {
        rubrik: "Nackdelar att känna till",
        stycken: [
          "Det som gör hemsidesbyggarna enkla är också det som begränsar dem. Nackdelarna märks ofta först när verksamheten växer.",
        ],
        punkter: [
          "Mallarna används av tusentals andra företag. Det är svårt att få ett uttryck som känns som ditt eget.",
          "Du är bunden till plattformen. Flyttar du senare behöver sidan i praktiken byggas om.",
          "Månadsavgiften löper så länge sidan finns, och tillägg som bokning eller e-handel kostar ofta extra.",
          "Sidorna laddar ofta mycket kod du inte använder, vilket kan göra dem långsammare på mobilen.",
          "Din egen tid kostar också. Många småföretagare lägger fler timmar än de räknat med på att få mallen att se rätt ut.",
        ],
      },
      {
        rubrik: "Vad du får med en egen hemsida",
        stycken: [
          "En egen hemsida byggs utifrån ditt företag i stället för utifrån en mall. Design, struktur och funktioner anpassas efter vad besökaren ska göra — ringa, boka, köpa eller skicka en förfrågan.",
          "Med modern teknik som Next.js blir sidorna snabba och lätta för sökmotorer att läsa. Du äger koden och innehållet, så du kan byta leverantör eller bygga vidare utan att börja om. Med en admin-panel kan du ändå uppdatera texter och bilder själv.",
          "Nackdelen är en högre kostnad vid starten och att du behöver någon som bygger. Därför är det viktigt att få en fast offert, så att du vet vad det kostar innan arbetet börjar.",
        ],
      },
      {
        rubrik: "Hur påverkar valet synligheten på Google?",
        stycken: [
          "Både Wix-sidor och egna hemsidor kan synas på Google. Plattformen avgör inte ensam din placering — innehållet, hur väl sidan svarar på det folk söker efter och hur snabbt den laddar spelar större roll.",
          "Skillnaden är hur mycket kontroll du har. På en egen hemsida kan sidstruktur, rubriker, laddtid och strukturerad data anpassas fullt ut. Ingen kan garantera en viss placering, men en bra teknisk grund ger innehållet bättre förutsättningar.",
        ],
      },
      {
        rubrik: "Så väljer du",
        stycken: [
          "Ställ dig några frågor innan du bestämmer dig:",
        ],
        punkter: [
          "Hur många av dina kunder hittar dig via nätet i dag — och hur många skulle du vilja att det var?",
          "Har du tid att bygga och underhålla sidan själv, eller hellre lägga tiden på verksamheten?",
          "Behöver du funktioner som bokning, e-handel eller inloggning nu eller inom ett par år?",
          "Vad är det totala priset över tre år, inklusive månadsavgifter och tillägg?",
        ],
        lank: { href: "/priser", text: "Jämför med fasta paketpriser" },
      },
    ],
  },
  {
    slug: "synas-pa-google-lokalt",
    title: "Så syns ditt företag på Google lokalt — en guide för småföretag",
    description:
      "Konkreta steg för att synas när kunder i närheten söker efter det du erbjuder: Google Företagsprofil, en tydlig hemsida, lokala sidor och recensioner.",
    published: "2026-10-25",
    readingMinutes: 7,
    tag: "SEO",
    sections: [
      {
        rubrik: "Varför lokala sökningar är viktiga",
        stycken: [
          "När någon söker på ”elektriker Mölndal” eller ”frisör nära mig” visar Google först en karta med lokala företag och sedan vanliga sökresultat. För många småföretag är det där de nya kunderna finns.",
          "Lokal synlighet bygger på tre saker: att Google vet var du finns och vad du gör, att informationen om dig stämmer överallt och att andra bekräftar att du är bra. Ingen kan garantera en viss placering, men stegen nedan ger dig en stabil grund.",
        ],
      },
      {
        rubrik: "1. Skapa och fyll i din Google Företagsprofil",
        stycken: [
          "Google Företagsprofil (tidigare Google My Business) är gratis och är det som syns i kartan. Den är ofta den enskilt viktigaste åtgärden för lokal synlighet.",
        ],
        punkter: [
          "Välj en huvudkategori som beskriver exakt vad du gör, och komplettera med fler kategorier vid behov.",
          "Fyll i öppettider, telefonnummer, adress eller serviceområde och en länk till din hemsida.",
          "Ladda upp riktiga bilder på verksamheten, lokalen eller ditt arbete.",
          "Skriv en beskrivning med dina tjänster och orten du är verksam i — naturligt, utan att rabbla sökord.",
        ],
      },
      {
        rubrik: "2. Håll namn, adress och telefon konsekvent",
        stycken: [
          "Google jämför uppgifterna om ditt företag på olika ställen: din hemsida, företagsprofilen, Eniro, Hitta.se, sociala medier och branschkataloger. Om namn, adress och telefonnummer skrivs på samma sätt överallt blir det lättare för Google att lita på dem.",
          "Gå igenom de ställen där ditt företag finns listat och rätta gamla adresser och nummer.",
        ],
      },
      {
        rubrik: "3. Ge hemsidan en tydlig lokal koppling",
        stycken: [
          "Din hemsida ska tydligt säga vad du gör och var. Det låter självklart, men många sidor nämner aldrig orten eller tjänsterna med de ord kunderna själva använder.",
        ],
        punkter: [
          "Skriv ut ort och område i rubriker och text där det är naturligt.",
          "Ha en egen sida per tjänst, så att varje sida kan svara på en specifik sökning.",
          "Arbetar du på flera orter kan du ha en sida per ort — men bara med unikt innehåll, inte samma text med ett utbytt ortnamn.",
          "Visa kontaktuppgifter tydligt och lägg till strukturerad data så att sökmotorer förstår vilket företag sidan tillhör.",
        ],
      },
      {
        rubrik: "4. Samla recensioner — och svara på dem",
        stycken: [
          "Recensioner påverkar både hur Google rankar dig och om kunden väljer att höra av sig. Be nöjda kunder om en recension direkt efter ett avslutat uppdrag, och gör det enkelt genom att skicka en direktlänk.",
          "Svara på alla recensioner, även de negativa. Ett sakligt och vänligt svar visar framtida kunder hur du tar hand om dem.",
        ],
      },
      {
        rubrik: "5. Se till att hemsidan fungerar på mobilen",
        stycken: [
          "De flesta lokala sökningar görs i mobilen, ofta när personen behöver hjälp snart. Sidan behöver ladda snabbt, vara lätt att läsa och ha telefonnummer och kontaktknapp lätta att hitta.",
          "Testa din egen sida i mobilen: hittar du hur man kontaktar dig inom några sekunder? Om inte, är det där du ska börja.",
        ],
        lank: { href: "/webbutveckling", text: "Se vilka orter jag arbetar i" },
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
