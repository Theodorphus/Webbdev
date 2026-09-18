import type { Metadata } from 'next';
import PortfolioContent from '../../portfolio/PortfolioContent';

export const metadata: Metadata = {
  title: 'Portfolio — selected websites',
  description: 'Explore websites, online stores and platforms created by Webbdev Studio.',
  alternates: { canonical: '/en/portfolio', languages: { 'sv-SE': '/portfolio', 'en-US': '/en/portfolio' } },
};

export default function Page() { return <PortfolioContent />; }
