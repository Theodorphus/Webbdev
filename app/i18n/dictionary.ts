// Tvåspråkig ordbok (svenska + engelska) för klient-språkväxlaren.
// All synlig text på sajten bor här så att <LanguageProvider> kan byta
// språk direkt i webbläsaren utan separata URL:er.

export type Lang = 'sv' | 'en';

export const dictionary = {
  sv: {
    nav: {
      tjanster: 'Tjänster',
      processen: 'Process',
      portfolio: 'Portfolio',
      priser: 'Priser',
      omMig: 'Om mig',
      kontakt: 'Kontakta mig',
      meny: 'Meny',
      oppnaMeny: 'Öppna meny',
      stangMeny: 'Stäng meny',
    },
    hero: {
      badge: 'Webbutveckling i Göteborg',
      titel1: 'Hemsidor som',
      titel2: 'faktiskt säljer',
      lokal:
        'Webbutveckling i Göteborg för företag som vill synas. Snabba, moderna hemsidor byggda i Next.js — till fast pris.',
      usp: ['Leverans på 3–7 dagar', 'Fast pris', 'Inga dolda kostnader'],
      ctaPrimar: 'Få en gratis analys',
      ctaSekundar: 'Se hur det funkar',
      stats: [
        { to: 7, prefix: '3–', suffix: ' dagar', label: 'Snabb leverans' },
        { to: 3, prefix: '', suffix: ' år', label: 'Erfarenhet' },
        { to: 100, prefix: '', suffix: '%', label: 'Fast pris' },
      ],
    },
    trust: {
      rubrik: 'Företag jag har byggt för',
    },
    problem: {
      etikett: 'Varför byta?',
      rubrik: 'Kostar din gamla hemsida affärer?',
      items: [
        { label: 'Slöar försäljningen', desc: 'Gamla hemsidor tappar besökare på första sekunden — du förlorar kunder utan att veta om det.' },
        { label: 'Förvirrande UX', desc: 'Dålig navigation gör att kunder inte hittar det de söker och går till konkurrenten.' },
        { label: 'Ser oprofessionell ut', desc: 'En daterad design signalerar att du inte håller dig uppdaterad och skrämmer bort kunder.' },
        { label: 'Dålig laddtid', desc: 'Varje extra sekund laddtid kostar dig konverteringar och Google-ranking.' },
        { label: 'Inte mobilvänlig', desc: '70% av trafiken är mobil. Utan responsiv design förlorar du halva marknaden.' },
        { label: 'Syns inte på Google', desc: 'Utan SEO-optimering hittar ingen dig. Ingen trafik = ingen försäljning.' },
      ],
    },
    tjanster: {
      etikett: 'Det jag levererar',
      rubrik: 'Teknik & tjänster i världsklass',
      items: [
        { title: 'Next.js & React', desc: 'Snabbaste ramverket för moderna, SEO-vänliga hemsidor med server-side rendering.', tag: 'Core' },
        { title: 'Supabase backend', desc: 'Säker databas med realtidsuppdateringar, autentisering och API ur lådan.', tag: 'Backend' },
        { title: 'Admin-panel', desc: 'Hantera allt innehåll själv via ett modernt gränssnitt — ingen kod krävs.', tag: 'CMS' },
        { title: 'Optimerad prestanda', desc: 'Lighthouse-score 95+. Core Web Vitals godkänt. Din sida rankar på Google.', tag: 'SEO' },
        { title: 'Premium design', desc: 'Modernt, iögonfallande och konverteringsoptimerat. Byggt för att imponera.', tag: 'Design' },
        { title: 'Stripe-betalningar', desc: 'Säker e-handel med Stripe. Sälj produkter eller tjänster direkt från hemsidan.', tag: 'E-commerce' },
        { title: 'Fast pris', desc: 'Inget timpris, inga överraskningar. Du vet exakt vad du betalar från dag ett.', tag: 'Pris' },
        { title: '3–7 dagars leverans', desc: 'Från brief till live hemsida på 3–7 arbetsdagar. Snabbt när det gäller.', tag: 'Leverans' },
      ],
    },
    process: {
      etikett: 'Min process',
      rubrik: 'Från idé till live på 5 steg',
      steg: [
        { title: 'Gratis analys', desc: 'Vi börjar med ett samtal om dina mål. Jag analyserar din situation och sätter ihop en strategi.' },
        { title: 'Designförslag', desc: 'Du får ett visuellt förslag som visar exakt hur hemsidan kommer se ut — innan ett tecken kod skrivs.' },
        { title: 'Byggnation', desc: 'Jag bygger med senaste tekniken. Full transparens — du kan följa framgången i realtid.' },
        { title: 'Lansering', desc: 'Din hemsida är live. Jag hanterar domän, SSL och hosting. Du behöver inte göra något.' },
        { title: 'Support', desc: 'Första månaden support ingår gratis. Snabba svar, snabba fixes. Du är aldrig ensam.' },
      ],
      ctaText: 'Redo att komma igång? Det kostar ingenting att höra av sig.',
      ctaLank: 'Boka gratis analys',
    },
    portfolio: {
      etikett: 'Min portfölj',
      rubrik: 'Projekt jag har byggt',
      live: 'Live',
      sida: 'Sida',
    },
    priser: {
      etikett: 'Priser',
      rubrik: 'Välj rätt paket för dig',
      mestPopular: '★ Mest populär',
      komIgang: 'Kom igång',
      paket: [
        { tier: 'Bas', desc: 'Perfekt för att komma igång snabbt', features: ['Responsiv hemsida', '5 sidor', 'Kontaktformulär', 'Mobil-optimerad'] },
        { tier: 'Premium', desc: 'Det mest populära alternativet', features: ['Allt från Bas', 'Upp till 15 sidor', 'Admin-panel för innehåll', 'SEO-optimerad', '1 månads support'] },
        { tier: 'Full Service', desc: 'Komplett lösning med allt inkluderat', features: ['Allt från Premium', 'Obegränsat antal sidor', 'E-handel via Stripe', 'Avancerad admin-panel', '3 månaders support'] },
      ],
    },
    omMig: {
      etikett: 'Om mig',
      rubrik: 'Vem bygger din hemsida?',
      stycken: [
        'Hej, jag heter Theo. Jag bygger snabba, snygga hemsidor för småföretag och egenföretagare som vill synas på riktigt — utan byråpriser och utan krångel.',
        'Hos mig pratar du alltid med personen som faktiskt bygger sidan. Det betyder snabba svar, gott om tid för dina frågor och en sida som blir precis som du tänkt dig — inte en mall som tusen andra använder.',
        'Jag tar varje projekt på allvar och är inte nöjd förrän du är det. Hör av dig så tar vi en förutsättningslös pratstund om din idé.',
      ],
      fakta: [
        { label: 'Utbildning', value: 'Systemvetenskap, GU', tag: 'EDU' },
        { label: 'Erfarenhet', value: '3 år webbutveckling', tag: 'EXP' },
        { label: 'Teknikstack', value: 'Next.js · React · TypeScript', tag: 'TECH' },
        { label: 'Leveranstid', value: '3–7 arbetsdagar', tag: 'SPEED' },
      ],
    },
    faqRubrik: {
      etikett: 'Vanliga frågor',
      rubrik: 'Bra att veta',
    },
    kontakt: {
      etikett: 'Kom igång',
      rubrik: 'Redo för din nya hemsida?',
      ingress: 'Fyll i formuläret nedan så hör jag av mig med en gratis analys.',
      namn: 'Namn',
      namnPlaceholder: 'Ditt namn',
      epost: 'E-post',
      epostPlaceholder: 'namn@foretag.se',
      meddelande: 'Berätta om ditt projekt',
      meddelandePlaceholder: 'Vad behöver du hjälp med? Berätta om ditt företag och dina mål...',
      success: 'Tack! Jag kontaktar dig inom 24 timmar.',
      error: 'Något gick fel — försök igen senare.',
      trust: 'Jag svarar alltid inom 24 timmar · Ingen kostnad · Ingen förpliktelse',
      skickar: 'Skickar...',
      skicka: 'Skicka förfrågan gratis',
      mejlFraga: 'Föredrar du mejl?',
      gdpr1: 'Genom att skicka godkänner du att vi behandlar dina uppgifter enligt vår',
      gdpr2: 'integritetspolicy',
    },
    footer: {
      tagline: 'Modern webbutveckling för företag — snabba, konverteringsoptimerade hemsidor.',
      foretag: 'Företag',
      foretagRader: ['Webbdev Studio — Enskild firma', 'Org.nr: 199507216498', 'Momsregistrerad: Nej'],
      orter: 'Orter',
      kontakt: 'Kontakt',
      integritetspolicy: 'Integritetspolicy',
    },
    sticky: {
      cta: 'Få en gratis analys',
    },
  },

  en: {
    nav: {
      tjanster: 'Services',
      processen: 'Process',
      portfolio: 'Portfolio',
      priser: 'Pricing',
      omMig: 'About',
      kontakt: 'Get in touch',
      meny: 'Menu',
      oppnaMeny: 'Open menu',
      stangMeny: 'Close menu',
    },
    hero: {
      badge: 'Web development in Gothenburg',
      titel1: 'Websites that',
      titel2: 'actually sell',
      lokal:
        'Web development for companies that want to be seen. Fast, modern websites built in Next.js — at a fixed price.',
      usp: ['Delivered in 3–7 days', 'Fixed price', 'No hidden costs'],
      ctaPrimar: 'Get a free analysis',
      ctaSekundar: 'See how it works',
      stats: [
        { to: 7, prefix: '3–', suffix: ' days', label: 'Fast delivery' },
        { to: 3, prefix: '', suffix: ' yrs', label: 'Experience' },
        { to: 100, prefix: '', suffix: '%', label: 'Fixed price' },
      ],
    },
    trust: {
      rubrik: 'Companies I have built for',
    },
    problem: {
      etikett: 'Why switch?',
      rubrik: 'Is your old website costing you business?',
      items: [
        { label: 'Slows down sales', desc: 'Old websites lose visitors in the first second — you lose customers without even knowing it.' },
        { label: 'Confusing UX', desc: "Poor navigation means customers can't find what they're looking for and go to a competitor." },
        { label: 'Looks unprofessional', desc: 'A dated design signals that you are out of touch and scares customers away.' },
        { label: 'Slow load times', desc: 'Every extra second of load time costs you conversions and Google ranking.' },
        { label: 'Not mobile friendly', desc: '70% of traffic is mobile. Without responsive design you lose half the market.' },
        { label: 'Invisible on Google', desc: 'Without SEO, no one finds you. No traffic = no sales.' },
      ],
    },
    tjanster: {
      etikett: 'What I deliver',
      rubrik: 'World-class tech & services',
      items: [
        { title: 'Next.js & React', desc: 'The fastest framework for modern, SEO-friendly websites with server-side rendering.', tag: 'Core' },
        { title: 'Supabase backend', desc: 'Secure database with realtime updates, authentication and an API out of the box.', tag: 'Backend' },
        { title: 'Admin panel', desc: 'Manage all your content yourself through a modern interface — no code required.', tag: 'CMS' },
        { title: 'Optimized performance', desc: 'Lighthouse score 95+. Core Web Vitals passed. Your site ranks on Google.', tag: 'SEO' },
        { title: 'Premium design', desc: 'Modern, eye-catching and conversion-optimized. Built to impress.', tag: 'Design' },
        { title: 'Stripe payments', desc: 'Secure e-commerce with Stripe. Sell products or services straight from your site.', tag: 'E-commerce' },
        { title: 'Fixed price', desc: 'No hourly rate, no surprises. You know exactly what you pay from day one.', tag: 'Price' },
        { title: '3–7 day delivery', desc: 'From brief to live website in 3–7 working days. Fast when it matters.', tag: 'Delivery' },
      ],
    },
    process: {
      etikett: 'My process',
      rubrik: 'From idea to live in 5 steps',
      steg: [
        { title: 'Free analysis', desc: 'We start with a conversation about your goals. I analyze your situation and put together a strategy.' },
        { title: 'Design proposal', desc: 'You get a visual proposal showing exactly how the site will look — before a single line of code is written.' },
        { title: 'Build', desc: 'I build with the latest tech. Full transparency — you can follow the progress in real time.' },
        { title: 'Launch', desc: 'Your website goes live. I handle domain, SSL and hosting. You don’t have to do a thing.' },
        { title: 'Support', desc: 'The first month of support is included free. Fast replies, fast fixes. You are never on your own.' },
      ],
      ctaText: 'Ready to get started? Reaching out costs nothing.',
      ctaLank: 'Book a free analysis',
    },
    portfolio: {
      etikett: 'My portfolio',
      rubrik: 'Projects I have built',
      live: 'Live',
      sida: 'Page',
    },
    priser: {
      etikett: 'Pricing',
      rubrik: 'Choose the right package for you',
      mestPopular: '★ Most popular',
      komIgang: 'Get started',
      paket: [
        { tier: 'Basic', desc: 'Perfect for getting started quickly', features: ['Responsive website', '5 pages', 'Contact form', 'Mobile-optimized'] },
        { tier: 'Premium', desc: 'The most popular option', features: ['Everything in Basic', 'Up to 15 pages', 'Admin panel for content', 'SEO-optimized', '1 month of support'] },
        { tier: 'Full Service', desc: 'Complete solution with everything included', features: ['Everything in Premium', 'Unlimited pages', 'E-commerce via Stripe', 'Advanced admin panel', '3 months of support'] },
      ],
    },
    omMig: {
      etikett: 'About',
      rubrik: 'Who builds your website?',
      stycken: [
        'Hi, I’m Theo. I build fast, good-looking websites for small businesses and sole traders who want to truly stand out — without agency prices and without the hassle.',
        'With me, you always talk to the person actually building your site. That means quick replies, plenty of time for your questions, and a site that turns out exactly as you imagined — not a template a thousand others use.',
        'I take every project seriously and I’m not satisfied until you are. Get in touch and we’ll have a no-obligation chat about your idea.',
      ],
      fakta: [
        { label: 'Education', value: 'Information Systems, GU', tag: 'EDU' },
        { label: 'Experience', value: '3 years web development', tag: 'EXP' },
        { label: 'Tech stack', value: 'Next.js · React · TypeScript', tag: 'TECH' },
        { label: 'Delivery time', value: '3–7 working days', tag: 'SPEED' },
      ],
    },
    faqRubrik: {
      etikett: 'FAQ',
      rubrik: 'Good to know',
    },
    kontakt: {
      etikett: 'Get started',
      rubrik: 'Ready for your new website?',
      ingress: 'Fill in the form below and I’ll get back to you with a free analysis.',
      namn: 'Name',
      namnPlaceholder: 'Your name',
      epost: 'Email',
      epostPlaceholder: 'name@company.com',
      meddelande: 'Tell me about your project',
      meddelandePlaceholder: 'What do you need help with? Tell me about your company and your goals...',
      success: 'Thank you! I’ll be in touch within 24 hours.',
      error: 'Something went wrong — please try again later.',
      trust: 'I always reply within 24 hours · No cost · No obligation',
      skickar: 'Sending...',
      skicka: 'Send your free request',
      mejlFraga: 'Prefer email?',
      gdpr1: 'By submitting, you agree that we process your data according to our',
      gdpr2: 'privacy policy',
    },
    footer: {
      tagline: 'Modern web development for companies — fast, conversion-optimized websites.',
      foretag: 'Company',
      foretagRader: ['Webbdev Studio — Sole proprietorship', 'Reg. no: 199507216498', 'VAT registered: No'],
      orter: 'Locations',
      kontakt: 'Contact',
      integritetspolicy: 'Privacy policy',
    },
    sticky: {
      cta: 'Get a free analysis',
    },
  },
};

// Widenad strukturell typ: härled formen från 'sv' men byt alla literala
// strängar mot 'string' så att både sv och en (med olika värden) matchar.
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dict = Widen<(typeof dictionary)['sv']>;
