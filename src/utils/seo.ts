import { site, contact, company } from '../data/site';
import { experiences } from '../data/experience';
import { skillGroups } from '../data/skills';

/** Resolve a path against the configured origin, producing an absolute URL. */
export function absoluteUrl(path: string, origin: string | URL = site.url): string {
  return new URL(path, origin).toString();
}

/**
 * `Person` structured data. Emitted once, on every page, so search engines get a
 * consistent entity regardless of which page is crawled first.
 */
export function personSchema(origin: string | URL = site.url) {
  const knowsAbout = skillGroups.flatMap((group) => group.skills.map((s) => s.name));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl('/#person', origin),
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: absoluteUrl('/', origin),
    // Square, not the 1200x630 social card: Google wants a portrait for a Person.
    image: absoluteUrl(site.portraitImage, origin),
    email: `mailto:${contact.email}`,
    telephone: contact.whatsapp.number,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode,
    },
    worksFor: {
      '@type': 'Organization',
      name: company.name,
      url: company.url,
    },
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Bengali', alternateName: 'bn' },
    ],
    knowsAbout,
    // `contact.website` is this site's own origin — already the `url` and the
    // `@id` host, so listing it here is noise rather than a signal.
    sameAs: [contact.github, contact.linkedin, contact.codecanyon],
    contactPoint: {
      '@type': 'ContactPoint',
      // A documented value; 'Business enquiries' was free text no consumer knows.
      contactType: 'customer support',
      email: contact.email,
      telephone: contact.whatsapp.number,
      availableLanguage: ['en', 'bn'],
    },
  };
}

/** `WebSite` node, linked to the person as its author. */
export function websiteSchema(origin: string | URL = site.url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website', origin),
    url: absoluteUrl('/', origin),
    name: `${site.name} — ${site.role}`,
    description: site.description,
    inLanguage: site.lang,
    author: { '@id': absoluteUrl('/#person', origin) },
    publisher: { '@id': absoluteUrl('/#person', origin) },
  };
}

/** Employment history as a `ProfilePage`, used on the experience and résumé pages. */
/**
 * Rendered on both /experience and /resume, so the path must be passed in —
 * a hardcoded @id gave two different pages the same node identity.
 */
export function profilePageSchema(path: string, origin: string | URL = site.url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': absoluteUrl(`${path}#profile`, origin),
    mainEntity: {
      '@id': absoluteUrl('/#person', origin),
      '@type': 'Person',
      name: site.name,
      hasOccupation: experiences.map((job) => ({
        '@type': 'Occupation',
        name: job.role,
        occupationLocation: { '@type': 'Place', name: job.location },
        description: job.summary,
      })),
    },
  };
}

/** Breadcrumb trail for any non-home page. */
export function breadcrumbSchema(
  crumbs: { name: string; href: string }[],
  origin: string | URL = site.url,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href, origin),
    })),
  };
}
