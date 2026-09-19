'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, type ReactNode } from 'react';

export default function ImageViewer({ src, alt, width, height, children, className = '' }: {
  src: string; alt: string; width: number; height: number; children: ReactNode; className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const titleId = useId();

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
  }, []);

  function open() {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  return <>
    <button ref={trigger} type="button" onClick={open} className={`cursor-zoom-in ${className}`} aria-haspopup="dialog" aria-label={`Förstora: ${alt}`}>{children}</button>
    <dialog ref={dialog} aria-labelledby={titleId} className="case-image-dialog" onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }} onClose={() => { restoreScroll(); trigger.current?.focus(); }}>
      <div className="case-image-dialog-content">
        <div className="case-image-dialog-header">
          <p id={titleId} className="text-sm font-medium">{alt}</p>
          <button type="button" onClick={() => dialog.current?.close()} className="shrink-0 rounded-full border border-foreground/20 px-4 py-3 text-sm hover:bg-surface-raised">Stäng ×</button>
        </div>
        <div className="case-image-dialog-scroll" tabIndex={0} role="region" aria-label="Förstorad bild, scrolla för att se hela">
          <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 95vw, 1400px" className="h-auto w-full" />
        </div>
      </div>
    </dialog>
  </>;
}
