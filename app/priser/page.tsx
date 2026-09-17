import type { Metadata } from 'next';
import PriserContent from './PriserContent';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.webbdev.se';

export const metadata: Metadata = {
  title: 'Priser — vad kostar en hemsida?',
  description:
    'Vägledande paketpriser från 2 000 kr exklusive moms. Fast offert för överenskommen omfattning. Räkna ut ett ungefärligt pris direkt med priskalkylatorn — exakt offert inom 24 timmar.',
  alternates: { canonical: '/priser' },
  openGraph: {
    title: 'Priser — Webbdev Studio',
    description:
      'Vägledande paketpriser från 2 000 kr exklusive moms. Fast offert för överenskommen omfattning. Räkna ut ditt pris direkt med priskalkylatorn.',
    url: `${SITE_URL}/priser`,
  },
};

export default function PriserPage() {
  return <PriserContent />;
}
