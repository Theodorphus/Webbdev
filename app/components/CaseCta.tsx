'use client';

import Link from 'next/link';
import { trackConversion } from '../lib/analytics';

export default function CaseCta({ slug }: { slug: string }) {
  return <section className="mt-16 rounded-2xl border border-white/10 bg-accent/10 p-8 text-center sm:p-12"><h2 className="font-display text-3xl font-semibold">Vad skulle en ny hemsida göra för ditt företag?</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/65">Utforska en designriktning i demobyggaren eller berätta om ditt projekt. Du får ett första samtal utan köpkrav.</p><div className="mt-7 flex flex-wrap justify-center gap-4"><Link href="/gratis-demo" onClick={() => trackConversion('case_cta_clicked', { case: slug, destination: 'demo' })} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-[#7773ff]">Prova gratis demo ↗</Link><Link href="/#kontakt" onClick={() => trackConversion('case_cta_clicked', { case: slug, destination: 'contact' })} className="rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/5">Berätta om ditt projekt</Link></div></section>;
}
