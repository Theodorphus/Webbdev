import Link from 'next/link';
import type { Lang } from '../i18n/dictionary';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.webbdev.se';

export type Crumb = { name: string; href?: string };

/**
 * Brödsmula med BreadcrumbList-schema. Startsidan läggs till automatiskt;
 * skicka bara leden efter den. Sista ledet är sidan själv och saknar länk.
 */
export default function Breadcrumbs({ items, lang = 'sv', className = '' }: { items: Crumb[]; lang?: Lang; className?: string }) {
  const crumbs: Crumb[] = [{ name: lang === 'sv' ? 'Hem' : 'Home', href: lang === 'sv' ? '/' : '/en' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.href && { item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}` }),
    })),
  };

  return (
    <nav aria-label={lang === 'sv' ? 'Brödsmula' : 'Breadcrumb'} className={`text-xs text-muted ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, i) => (
          <li key={crumb.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-foreground">
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
