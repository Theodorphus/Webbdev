import { priceTerms } from './lib/business';
import type { Lang } from './i18n/dictionary';

/** FAQ-innehåll (tvåspråkigt) — används av FAQ-sektionen och JSON-LD. */
export const faqByLang: Record<Lang, { q: string; a: string }[]> = {
  sv: [
    {
      q: 'Hur kan det gå så snabbt som 3–7 dagar?',
      a: 'Jag arbetar med en beprövad modern teknikstack (Next.js, Tailwind, Vercel) och en tydlig process. Eftersom designförslaget godkänns innan byggnationen startar försvinner onödiga vändor — jag kan fokusera helt på att bygga klart.',
    },
    {
      q: 'Vad ingår i priset?',
      a: `${priceTerms.sv.vat} ${priceTerms.sv.scope} Det som ingår i valt paket och lanseringen specificeras i offerten.`,
    },
    {
      q: 'Äger jag hemsidan när den är klar?',
      a: 'Ja, till 100 %. All kod, design och innehåll är ditt. Du är aldrig inlåst hos mig — vill du flytta sajten eller ta över driften själv hjälper jag dig med det.',
    },
    {
      q: 'Vad händer om jag vill ändra något efteråt?',
      a: 'Supportperioden som ingår täcker justeringar och fixar (1 månad i Premium, 3 månader i Full Service). Därefter kan du antingen göra ändringar själv via admin-panelen eller höra av dig — mindre ändringar går snabbt.',
    },
    {
      q: 'Behöver jag fixa hosting och domän själv?',
      a: `Jag hjälper dig med domänkoppling, SSL och att sätta upp drift vid lanseringen. ${priceTerms.sv.running}`,
    },
    {
      q: 'Hur fungerar betalningen?',
      a: 'Du betalar en del vid projektstart och resten vid lansering, när du sett och godkänt resultatet. Fakturering sker med vanlig faktura.',
    },
  ],
  en: [
    {
      q: 'How can it be as fast as 3–7 days?',
      a: 'I work with a proven modern tech stack (Next.js, Tailwind, Vercel) and a clear process. Since the design is approved before the build starts, there are no unnecessary back-and-forths — I can focus entirely on finishing the site.',
    },
    {
      q: 'What is included in the price?',
      a: `${priceTerms.en.vat} ${priceTerms.en.scope} Your package and launch setup are specified in the quote.`,
    },
    {
      q: 'Do I own the website when it’s done?',
      a: 'Yes, 100%. All code, design and content is yours. You are never locked in — if you want to move the site or take over hosting yourself, I’ll help you do it.',
    },
    {
      q: 'What if I want to change something afterwards?',
      a: 'The included support period covers tweaks and fixes (1 month with Premium, 3 months with Full Service). After that you can either make changes yourself via the admin panel or reach out — small changes are quick.',
    },
    {
      q: 'Do I need to handle hosting and domain myself?',
      a: `I help with domain setup, SSL and hosting configuration at launch. ${priceTerms.en.running}`,
    },
    {
      q: 'How does payment work?',
      a: 'You pay part at project start and the rest at launch, once you’ve seen and approved the result. Billing is done with a regular invoice.',
    },
  ],
};

/** Svenska FAQ — behålls för server-renderad JSON-LD (schema på svenska). */
export const faqItems = faqByLang.sv;
