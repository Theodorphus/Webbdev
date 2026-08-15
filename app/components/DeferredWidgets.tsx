'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LanguageProvider } from '../i18n/LanguageProvider';

// Chatt-widgeten och exit-intent-rutan behövs aldrig före interaktion.
// ssr: false + dynamic import håller dem utanför initialbundeln på varje
// route (bloggen, integritetspolicyn m.fl.), och idle-grinden nedan skjuter
// upp själva hämtningen tills huvudtråden är ledig.
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });
const ExitIntent = dynamic(() => import('./ExitIntent'), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  // Widgetarna ligger i layouten, utanför sidans egen provider, så de måste
  // läsa språket ur routen själva — annars svarar chatten på svenska på /en.
  const lang = pathname?.startsWith('/en') ? 'en' : 'sv';

  useEffect(() => {
    const windowWithIdle = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let taskId: number | undefined;

    if (windowWithIdle.requestIdleCallback) {
      taskId = windowWithIdle.requestIdleCallback(() => setReady(true), { timeout: 2500 });
    } else {
      taskId = window.setTimeout(() => setReady(true), 2000);
    }

    return () => {
      if (taskId === undefined) return;
      if (windowWithIdle.cancelIdleCallback) windowWithIdle.cancelIdleCallback(taskId);
      else window.clearTimeout(taskId);
    };
  }, []);

  if (!ready) return null;

  return (
    <LanguageProvider lang={lang}>
      <Chatbot />
      <ExitIntent />
    </LanguageProvider>
  );
}
