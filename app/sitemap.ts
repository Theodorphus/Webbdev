import type { MetadataRoute } from "next";
import { orter } from "./webbutveckling/orter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webbdev.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Lokala landningssidor — viktiga för lokal SEO.
    ...orter.map((o) => ({
      url: `${SITE_URL}/webbutveckling/${o.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/integritetspolicy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
