import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { orter, getOrt } from "../orter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webbdev.se";

type Props = { params: Promise<{ ort: string }> };

// Statiskt genererade vid byggtid — en sida per ort.
export function generateStaticParams() {
  return orter.map((o) => ({ ort: o.slug }));
}

// Okända orter ska ge 404, inte renderas on-demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ort: slug } = await params;
  const ort = getOrt(slug);
  if (!ort) return {};
  return {
    title: ort.title,
    description: ort.description,
    alternates: { canonical: `/webbutveckling/${ort.slug}` },
    openGraph: {
      title: `${ort.title} — Webbdev Studio`,
      description: ort.description,
      url: `${SITE_URL}/webbutveckling/${ort.slug}`,
    },
  };
}

export default async function OrtPage({ params }: Props) {
  const { ort: slug } = await params;
  const ort = getOrt(slug);
  if (!ort) notFound();

  // Lokal LocalBusiness-schema för just den här orten.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Webbdev Studio — Webbutveckling ${ort.iNamn}`,
    description: ort.description,
    url: `${SITE_URL}/webbutveckling/${ort.slug}`,
    email: "webbdevstudio@gmail.com",
    telephone: "+46709525822",
    priceRange: "2000–6000 SEK",
    areaServed: [
      { "@type": "City", name: ort.namn },
      ...ort.narliggande.map((n) => ({ "@type": "City", name: n })),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: ort.namn,
      addressRegion: ort.region,
      addressCountry: "SE",
    },
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Bakgrundsglöd — matchar startsidans känsla */}
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
          <span className="text-white/60">Webbutveckling {ort.iNamn}</span>
        </nav>

        {/* Hero */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-400">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          {ort.namn} · {ort.region}
        </div>
        <h1 className="font-display mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          Webbutveckling {ort.iNamn}
        </h1>

        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-white/70">
          {ort.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/#kontakt"
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:bg-indigo-500 hover:scale-[1.02]"
          >
            Få en gratis analys
          </Link>
          <Link
            href="/#priser"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
          >
            Se priser
          </Link>
        </div>

        {/* Lokala fördelar */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {ort.poanger.map((p) => (
            <div
              key={p.rubrik}
              className="card-spotlight rounded-2xl border border-white/8 bg-white/[0.03] p-6"
            >
              <h2 className="font-display text-base font-bold text-white/90">
                {p.rubrik}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Närliggande orter — long-tail-täckning */}
        <div className="mt-16 rounded-2xl border border-white/8 bg-white/[0.02] p-7">
          <h2 className="font-display text-lg font-bold text-white">
            Jag bygger hemsidor i hela {ort.namn}-området
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Förutom {ort.namn} hjälper jag företag i bland annat{" "}
            {ort.narliggande.slice(0, -1).join(", ")} och{" "}
            {ort.narliggande[ort.narliggande.length - 1]}. Oavsett var du sitter
            sköts hela processen smidigt — på plats eller digitalt.
          </p>
        </div>

        {/* Tillbaka till startsidan / övriga orter */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
          <Link href="/" className="transition-colors hover:text-indigo-300">
            ← Till startsidan
          </Link>
          {orter
            .filter((o) => o.slug !== ort.slug)
            .slice(0, 4)
            .map((o) => (
              <Link
                key={o.slug}
                href={`/webbutveckling/${o.slug}`}
                className="transition-colors hover:text-indigo-300"
              >
                Webbutveckling {o.iNamn}
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
