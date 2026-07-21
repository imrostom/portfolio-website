import type { ImageMetadata } from 'astro';
import { experiences } from '../data/experience';

/**
 * Company logos for the experience timeline.
 *
 * Files live in `src/assets/companies/` and are bound to a role by its `logo`
 * field naming the file explicitly — the same convention as project banners
 * (see `projectCovers.ts`), and for the same reason: the filename survives into
 * the emitted URL (`/_astro/<name>.<hash>.webp`), so a descriptive name like
 * `tixpi-logistics-moving-company-logo.png` is a Google Images relevance signal
 * that a bare slug would throw away.
 *
 * `eager: true` resolves the modules at build time so the card can read the
 * intrinsic width/height synchronously for the correct aspect ratio.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/companies/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true },
);

const byFilename = new Map<string, ImageMetadata>();

for (const [path, module] of Object.entries(modules)) {
  byFilename.set(path.split('/').pop()!, module.default);
}

const byId = new Map<string, ImageMetadata>();

for (const job of experiences) {
  const logo = job.logo ? byFilename.get(job.logo) : undefined;
  if (logo) byId.set(job.id, logo);
}

/** Returns the logo for a role id, or `undefined` when the role has none. */
export function getCompanyLogo(id: string): ImageMetadata | undefined {
  return byId.get(id);
}
