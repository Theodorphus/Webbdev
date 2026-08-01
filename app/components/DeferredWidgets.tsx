'use client';

import dynamic from 'next/dynamic';

// Chatt-widgeten och exit-intent-rutan behövs aldrig före interaktion.
// ssr: false + dynamic import håller dem utanför initialbundeln på varje
// route (bloggen, integritetspolicyn m.fl.) — de laddas efter hydrering.
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });
const ExitIntent = dynamic(() => import('./ExitIntent'), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <Chatbot />
      <ExitIntent />
    </>
  );
}
