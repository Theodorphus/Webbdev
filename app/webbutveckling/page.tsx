import type { Metadata } from "next";
import Link from "next/link";
import { orter } from "./orter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

// Indexsida för de lokala landningssidorna. Utan den ger /webbutveckling 404
// trots att undersidorna finns — dålig intern länkning och trasig brödsmula.
export const metadata: Metadata = {
  title: "Webbutveckling i Västsverige — alla orter",
  description:
    "Webbutveckling för företag i Göteborg, Borås, Skövde och fler orter i Västsverige. Snabba, moderna hemsidor i Next.js till fast pris — leverans på 3–7 dagar.",
  alternates: { canonical: "/webbutveckling" },
  openGraph: {
    title: "Webbutveckling i Västsverige — Webbdev Studio",
    description:
      "Webbutveckling för företag i Göteborg, Borås, Skövde och fler orter i Västsverige. Fast pris, leverans på 3–7 dagar.",
    url: `${SITE_URL}/webbutveckling`,
  },
};

export default function WebbutvecklingIndexPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-28">
      {/* Bakgrundsglöd — matchar ortssidornas känsla */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-24">
        {/* Brödsmula */}
        <nav className="mb-8 text-xs text-white/40" aria-label="Brödsmula">
          <Link href="/" className="transition-colors hover:text-white/70">
            Hem
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-white/60">Webbutveckling</span>
        </nav>

        <h1 className="font-display max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
          Webbutveckling i Västsverige
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
          Jag bygger snabba, moderna hemsidor för företag i hela Västsverige —
          med bas i Göteborg och kunder från Skaraborg till Halland. Välj din
          ort nedan för lokal information, eller hör av dig direkt så tar vi
          det därifrån.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {orter.map((o) => (
            <Link
              key={o.slug}
              href={`/webbutveckling/${o.slug}`}
              className="card-spotlight rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5"
            >
              <h2 className="font-display text-base font-bold text-white/90">
                Webbutveckling {o.iNamn}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {o.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-violet-950/40 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-white">
            Ser du inte din ort?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Hela processen kan skötas digitalt — videomöten, delade
            designförslag och löpande avstämningar. Jag hjälper företag i hela
            Sverige, oavsett var du sitter.
          </p>
          <Link
            href="/#kontakt"
            className="btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:scale-[1.02] hover:bg-indigo-500"
          >
            Få en gratis analys
          </Link>
        </div>

        <div className="mt-12 text-sm text-white/50">
          <Link href="/" className="transition-colors hover:text-indigo-300">
            ← Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
