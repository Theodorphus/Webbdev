'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const windowWithIdle = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let scheduled = false;
    let taskId: number | undefined;

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      if (windowWithIdle.requestIdleCallback) {
        taskId = windowWithIdle.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      } else {
        taskId = window.setTimeout(() => setReady(true), 2000);
      }
    };

    schedule();

    return () => {
      if (taskId === undefined) return;
      if (windowWithIdle.cancelIdleCallback) windowWithIdle.cancelIdleCallback(taskId);
      else window.clearTimeout(taskId);
    };
  }, []);

  return ready ? <Chatbot /> : null;
}
