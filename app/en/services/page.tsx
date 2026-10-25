import type { Metadata } from 'next';
import TjansterContent from '../../tjanster/TjansterContent';
import { sharedOpenGraph } from '../../lib/metadata';

export const metadata: Metadata = {
  title: 'Website design & development services',
  description: 'Thoughtful website design, development, content management and online stores for your business.',
  alternates: { canonical: '/en/services', languages: { 'sv-SE': '/tjanster', 'en-US': '/en/services' } },
  openGraph: {
    ...sharedOpenGraph('en'),
    title: 'Services — Webbdev Studio',
    description: 'Thoughtful website design, development, content management and online stores for your business.',
    url: '/en/services',
  },
};

export default function Page() { return <TjansterContent />; }
