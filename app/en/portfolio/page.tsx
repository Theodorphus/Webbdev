import type { Metadata } from 'next';
import PortfolioContent from '../../portfolio/PortfolioContent';
import { sharedOpenGraph } from '../../lib/metadata';

export const metadata: Metadata = {
  title: 'Portfolio — selected websites',
  description: 'Explore websites, online stores and platforms created by Webbdev Studio.',
  alternates: { canonical: '/en/portfolio', languages: { 'sv-SE': '/portfolio', 'en-US': '/en/portfolio' } },
  openGraph: {
    ...sharedOpenGraph('en'),
    title: 'Portfolio — Webbdev Studio',
    description: 'Explore websites, online stores and platforms created by Webbdev Studio.',
    url: '/en/portfolio',
  },
};

export default function Page() { return <PortfolioContent />; }
