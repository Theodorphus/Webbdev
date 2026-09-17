'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

export default function BeforeAfter({ before, after, label }: { before: string; after: string; label: string }) {
  const [position, setPosition] = useState(50);
  const id = useId();
  return <figure className="overflow-hidden rounded-2xl border border-white/15 bg-[#101019]">
    <div className="relative aspect-[2.15/1] overflow-hidden bg-white focus-within:ring-4 focus-within:ring-inset focus-within:ring-accent-light">
      <Image src={after} alt={`${label} – efter omarbetningen`} fill sizes="(max-width: 1280px) 95vw, 1200px" className="object-cover object-top" priority />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src={before} alt={`${label} – före omarbetningen`} fill sizes="(max-width: 1280px) 95vw, 1200px" className="object-cover object-top" priority /></div>
      <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white">Före</span><span className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white">Efter</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-xl" style={{ left: `${position}%` }}><span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-accent text-white shadow-xl">↔</span></div>
      <input id={id} type="range" min={0} max={100} value={position} onChange={e => setPosition(Number(e.target.value))} aria-label={`Jämför före och efter: ${label}`} aria-valuetext={`${position} procent av före-bilden visas`} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
    <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-white/65"><label htmlFor={id}>Dra över bilden eller använd piltangenterna för att jämföra.</label><div className="flex gap-3"><button type="button" onClick={() => setPosition(100)} className="text-accent-light hover:text-white">Visa före</button><button type="button" onClick={() => setPosition(0)} className="text-accent-light hover:text-white">Visa efter</button></div></figcaption>
  </figure>;
}
