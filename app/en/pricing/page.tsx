import type { Metadata } from 'next';
import PriserContent from '../../priser/PriserContent';

export const metadata: Metadata = {
  title: 'Pricing — a clear scope and a fixed quote',
  description: 'Explore website packages and estimate your budget. Personal contact and a fixed quote for the agreed scope.',
  alternates: { canonical: '/en/pricing', languages: { 'sv-SE': '/priser', 'en-US': '/en/pricing' } },
};

export default function Page() { return <PriserContent />; }
