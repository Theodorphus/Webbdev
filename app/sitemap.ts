import type { MetadataRoute } from "next";
import { orter } from "./webbutveckling/orter";
import { customerCases } from "./portfolio/cases";
import { posts } from "./blogg/posts";
import { routes } from "./i18n/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webbdev.se";

// Senast meningsfullt ändrat innehåll per sida (ISO-datum). Uppdatera datumet
// när sidans innehåll faktiskt ändras — ett lastmod som alltid är "idag"
// lär Google att ignorera fältet helt.
const updated = {
  home: "2026-10-25",
  tjanster: "2026-10-25",
  portfolio: "2026-09-20",
  priser: "2026-09-20",
  gratisDemo: "2026-09-20",
  webbutveckling: "2026-10-25",
  orter: "2026-10-25",
  cases: "2026-09-18",
  integritetspolicy: "2026-10-02",
} as const;

type Entry = MetadataRoute.Sitemap[number];

/** Svensk sida + ev. engelsk motsvarighet, med hreflang åt båda hållen. */
function page(path: string, lastModified: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry[] {
  const en = routes[path as keyof typeof routes];
  const entry = (url: string): Entry => ({
    url: `${SITE_URL}${url === "/" ? "" : url}`,
    lastModified,
    changeFrequency,
    priority,
    ...(en && {
      alternates: { languages: { "sv-SE": `${SITE_URL}${path === "/" ? "" : path}`, "en-US": `${SITE_URL}${en}` } },
    }),
  });
  return en ? [entry(path), { ...entry(en), priority: Math.round((priority - 0.1) * 10) / 10 }] : [entry(path)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.reduce((latest, p) => ((p.updated ?? p.published) > latest ? p.updated ?? p.published : latest), "");
  return [
    ...page("/", updated.home, 1),
    ...page("/portfolio", updated.portfolio, 0.8),
    ...customerCases.map((item) => page(`/portfolio/${item.slug}`, updated.cases, 0.8)).flat(),
    ...page("/priser", updated.priser, 0.8),
    ...page("/tjanster", updated.tjanster, 0.7),
    ...page("/gratis-demo", updated.gratisDemo, 0.8),
    // Lokala landningssidor — viktiga för lokal SEO.
    ...page("/webbutveckling", updated.webbutveckling, 0.7),
    ...orter.map((o) => page(`/webbutveckling/${o.slug}`, updated.orter, 0.8)).flat(),
    // Blogg — index + inlägg.
    ...page("/blogg", latestPost, 0.7, "weekly"),
    ...posts.map((p) => page(`/blogg/${p.slug}`, p.updated ?? p.published, 0.6)).flat(),
    ...page("/integritetspolicy", updated.integritetspolicy, 0.3, "yearly"),
  ];
}
