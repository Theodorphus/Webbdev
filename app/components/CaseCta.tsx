'use client';

import Link from 'next/link';
import { trackConversion } from '../lib/analytics';

export default function CaseCta({ slug }: { slug: string }) {
  return <section className="mt-16 rounded-2xl border border-foreground/10 bg-accent/10 p-8 text-center sm:p-12"><h2 className="font-display text-3xl font-semibold">Vad skulle en ny hemsida göra för ditt företag?</h2><p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70">Jag återkommer inom 24 timmar med frågor och förslag på nästa steg. Du förbinder dig inte till något.</p><div className="mt-7 flex flex-wrap justify-center gap-4"><Link href="/#kontakt" onClick={() => trackConversion('case_cta_clicked', { case: slug, destination: 'contact' })} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent hover:bg-[#7773ff]">Berätta om ditt projekt</Link><Link href="/gratis-demo" onClick={() => trackConversion('case_cta_clicked', { case: slug, destination: 'demo' })} className="rounded-full border border-foreground/20 px-6 py-3 text-sm text-foreground hover:bg-foreground/5">Utforska en designriktning ↗</Link></div></section>;
}
