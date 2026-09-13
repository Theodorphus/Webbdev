import type { Dict } from '../i18n/dictionary';

// Slugen är samtidigt nyckeln i dictionary (arbete.projekt) — lägger man till
// ett projekt här utan att skriva texten på båda språken blir det ett typfel.
export type ProjectSlug = keyof Dict['arbete']['projekt'];

export type Project = {
  slug: ProjectSlug;
  namn: string;
  url: string;
  /** Skärmdump i /public/work, 1200×1500 (två skärmhöjder — panorerar vid hover). */
  img: string;
  tech: string[];
  /** Stort kort på startsidan. Övriga hamnar i det kompakta rutnätet. */
  featured: boolean;
};

// Ordningen här är ordningen på sidan.
export const projects: Project[] = [
  {
    slug: 'swedensweet',
    namn: 'SwedenSweet',
    url: 'https://swedensweet.vercel.app/',
    img: '/work/swedensweet.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    slug: 'ockerocement',
    namn: 'Öckerö Cementgjuteri',
    url: 'https://ockerocement.vercel.app/',
    img: '/work/ockerocement.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    // Skärmdumpen är tagen en bit ner på sidan (programsektionerna) i stället
    // för på hero-bilden — mer representativ som thumbnail.
    slug: 'erotikmassan',
    namn: 'Erotikmässan',
    url: 'https://www.erotikmassan.com/',
    img: '/work/erotikmassan.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    slug: 'oddsverket',
    namn: 'Oddsverket',
    url: 'https://oddsverket.se/',
    img: '/work/oddsverket.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    slug: 'karla',
    namn: 'Karla Cleaning Crew',
    url: 'https://karlacleaningcrew.se/',
    img: '/work/karla.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    slug: 'wildkull',
    namn: 'Wildkull Payroll',
    url: 'https://www.wildkullpayroll.se/',
    img: '/work/wildkull.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: true,
  },
  {
    slug: 'konstbyte',
    namn: 'Konstbyte',
    url: 'https://www.konstbyte.se/',
    img: '/work/konstbyte.webp',
    tech: ['Next.js', 'Prisma', 'Stripe', 'AI'],
    featured: false,
  },
  {
    slug: 'andreRoslund',
    namn: 'André Roslund',
    url: 'https://www.andre-roslund.se/',
    img: '/work/andre-roslund.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: false,
  },
  {
    slug: 'flexleague',
    namn: 'FlexLeague',
    url: 'https://flex-league.vercel.app/',
    img: '/work/flexleague.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: false,
  },
  {
    slug: 'bolagdirekt',
    namn: 'Bolagdirekt',
    url: 'https://bolagdirekt.vercel.app/',
    img: '/work/bolagdirekt.webp',
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

/** Domännamnet som visas i webbläsarramens adressfält. */
export function domain(url: string) {
  return new URL(url).hostname.replace(/^www\./, '');
}
