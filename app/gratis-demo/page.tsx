import type { Metadata } from 'next';
import DemoContent from './DemoContent';

export const metadata: Metadata = {
  title: 'Gratis demo av din nya hemsida',
  description: 'Se möjligheterna för ditt företag. Välj stil och berätta vad du behöver så tar Webbdev Studio fram ett gratis designförslag för din startsida. Utan köpkrav.',
  alternates: { canonical: '/gratis-demo' },
  openGraph: {
    title: 'Hur skulle din nya hemsida kunna se ut?',
    description: 'Begär ett personligt designförslag för din startsida. Gratis och utan köpkrav.',
    url: '/gratis-demo',
  },
};

export default function DemoPage() {
  return <DemoContent />;
}
