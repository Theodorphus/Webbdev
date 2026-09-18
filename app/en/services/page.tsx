import type { Metadata } from 'next';
import TjansterContent from '../../tjanster/TjansterContent';

export const metadata: Metadata = {
  title: 'Website design & development services',
  description: 'Thoughtful website design, development, content management and online stores for your business.',
  alternates: { canonical: '/en/services', languages: { 'sv-SE': '/tjanster', 'en-US': '/en/services' } },
};

export default function Page() { return <TjansterContent />; }
