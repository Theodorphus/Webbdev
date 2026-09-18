import type { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.webbdev.se';

export const metadata: Metadata = {
  title: 'Portfolio — hemsidor jag har byggt',
  description:
    'Kundprojekt från Webbdev Studio: e-handel, plattformar och företagswebbplatser byggda i Next.js. Se förhandsvisningar av varje sajt och besök den live.',
  alternates: { canonical: '/portfolio', languages: { 'sv-SE': '/portfolio', 'en-US': '/en/portfolio' } },
  openGraph: {
    title: 'Portfolio — Webbdev Studio',
    description:
      'Kundprojekt: e-handel, plattformar och företagswebbplatser byggda i Next.js. Se förhandsvisningar och besök sajterna live.',
    url: `${SITE_URL}/portfolio`,
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
