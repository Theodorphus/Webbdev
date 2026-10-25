import type { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';
import { sharedOpenGraph } from '../lib/metadata';

export const metadata: Metadata = {
  title: 'Portfolio — hemsidor jag har byggt',
  description:
    'Kundprojekt från Webbdev Studio: e-handel, plattformar och företagswebbplatser byggda i Next.js. Se förhandsvisningar av varje sajt och besök den live.',
  alternates: { canonical: '/portfolio', languages: { 'sv-SE': '/portfolio', 'en-US': '/en/portfolio' } },
  openGraph: {
    ...sharedOpenGraph(),
    title: 'Portfolio — Webbdev Studio',
    description:
      'Kundprojekt: e-handel, plattformar och företagswebbplatser byggda i Next.js. Se förhandsvisningar och besök sajterna live.',
    url: '/portfolio',
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
