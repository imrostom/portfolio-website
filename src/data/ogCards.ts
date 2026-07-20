import { site } from './site.ts';
import { projects } from './projects.ts';

/**
 * Per-page OpenGraph cards.
 *
 * Consumed by BOTH `scripts/generate-assets.mjs` (which renders the images) and
 * `src/components/seo/SEO.astro` (which points each page at its own card), so
 * the two can never drift. Pages therefore need no `image` prop — the card is
 * resolved from the canonical pathname.
 */
export type OgCard = {
  /** Canonical pathname, trailing slash already stripped. */
  path: string;
  /** Output name under `public/og/`, or null for the root card at `/og.png`. */
  file: string | null;
  /** Large headline. Keep short — see HEADING_MAX below. */
  heading: string;
  /** Supporting line beneath the headline. */
  subject: string;
  /** Becomes og:image:alt and twitter:image:alt. */
  alt: string;
};

/**
 * The headline renders at 82px with tight tracking, which fits about this many
 * characters inside 1200px. The generator warns rather than silently overflowing.
 */
export const HEADING_MAX = 22;

export const ogCards: OgCard[] = [
  {
    path: '/',
    // null keeps the home card at /og.png, so site.ogImage, the webmanifest and
    // .gitignore all stay as they are.
    file: null,
    heading: site.name,
    subject: site.role,
    alt: `${site.name} — ${site.role}`,
  },
  {
    path: '/projects',
    file: 'projects',
    heading: 'Projects',
    subject: `${projects.length} products shipped to production`,
    alt: `${projects.length} projects by ${site.name}`,
  },
  {
    path: '/experience',
    file: 'experience',
    heading: 'Experience',
    subject: `${site.yearsExperience}+ years across SaaS, logistics and commerce`,
    alt: `${site.yearsExperience}+ years of experience — ${site.name}`,
  },
  {
    path: '/skills',
    file: 'skills',
    heading: 'Skills',
    subject: 'Laravel · Node.js · Vue · Nuxt · AWS',
    alt: `Technical skills — ${site.name}`,
  },
  {
    path: '/resume',
    file: 'resume',
    heading: 'Resume',
    subject: `${site.role} · ${site.yearsExperience}+ years`,
    alt: `Résumé — ${site.name}`,
  },
  {
    path: '/contact',
    file: 'contact',
    heading: 'Get in touch',
    subject: 'Available for remote opportunities',
    alt: `Contact ${site.name}`,
  },
];

/** Card for a canonical pathname, or undefined to fall back to `site.ogImage`. */
export function ogCardFor(pathname: string): OgCard | undefined {
  const normalised = pathname.replace(/\/+$/, '') || '/';
  return ogCards.find((card) => card.path === normalised);
}

/** Public URL a card resolves to. */
export function ogCardPath(card: OgCard): string {
  return card.file ? `/og/${card.file}.png` : site.ogImage;
}
