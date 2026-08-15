import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "../posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

type Props = { params: Promise<{ slug: string }> };

// Statiskt genererade vid byggtid — en sida per inlägg.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Okända slugs ska ge 404, inte renderas on-demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blogg/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — Webbdev Studio`,
      description: post.description,
      url: `${SITE_URL}/blogg/${post.slug}`,
      publishedTime: post.published,
      images: [{ url: `${SITE_URL}/opengraph-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // BlogPosting-schema för rik indexering.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    // Rekommenderat av Google för Article-rich results.
    image: `${SITE_URL}/opengraph-image.jpg`,
    url: `${SITE_URL}/blogg/${post.slug}`,
    author: { "@type": "Person", name: "Theodor Håkansson" },
    publisher: {
      "@type": "Organization",
      name: "Webbdev Studio",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogg/${post.slug}`,
    },
  };

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* Bakgrundsglöd */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[110px]" />
      </div>

      <article className="relative mx-auto max-w-3xl px-6 pb-24">
        {/* Brödsmula */}
        <nav className="mb-8 text-xs text-white/40" aria-label="Brödsmula">
          <Link href="/" className="transition-colors hover:text-white/70">
            Hem
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <Link href="/blogg" className="transition-colors hover:text-white/70">
            Blogg
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-white/60">{post.tag}</span>
        </nav>

        {/* Rubrik + meta */}
        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <span className="rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-indigo-400">
            {post.tag}
          </span>
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min läsning</span>
        </div>
        <h1 className="font-display mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-white/70">
          {post.description}
        </p>

        {/* Brödtext */}
        <div className="mt-12 space-y-12">
          {post.sections.map((section) => (
            <section key={section.rubrik}>
              <h2 className="font-display text-2xl font-bold text-white">
                {section.rubrik}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-white/70">
                {section.stycken.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              {section.punkter && (
                <ul className="mt-5 space-y-3">
                  {section.punkter.map((punkt) => (
                    <li
                      key={punkt.slice(0, 24)}
                      className="flex items-start gap-3 text-base leading-relaxed text-white/70"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                      {punkt}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-violet-950/40 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-white">
            Redo för en hemsida som säljer?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Få en gratis analys av din nuvarande sajt — eller ett fast pris på en
            ny. Leverans på 3–7 dagar, inga dolda kostnader.
          </p>
          <Link
            href="/#kontakt"
            className="btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-indigo-900/50 transition-all hover:scale-[1.02] hover:bg-indigo-500"
          >
            Få en gratis analys
          </Link>
        </div>

        {/* Fler inlägg */}
        {others.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-lg font-bold text-white">
              Läs mer
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blogg/${o.slug}`}
                  className="card-spotlight rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/5"
                >
                  <h3 className="font-display text-base font-bold text-white/90">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {o.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-sm text-white/50">
          <Link href="/blogg" className="transition-colors hover:text-indigo-300">
            ← Alla inlägg
          </Link>
        </div>
      </article>
    </main>
  );
}
