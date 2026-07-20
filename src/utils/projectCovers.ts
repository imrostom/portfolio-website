import type { ImageMetadata } from 'astro';
import { projects } from '../data/projects';

/**
 * Banner images for project cards.
 *
 * Files live in `src/assets/projects/` and are bound to a project one of two
 * ways, in order:
 *
 *  1. The project's `image` field names the file explicitly. Preferred, because
 *     it frees the filename from the slug — and the filename survives into the
 *     emitted URL (`/_astro/<name>.<hash>.webp`), which Google Images reads as a
 *     relevance signal. `tixpi-logistics-operations-platform.webp` says more
 *     than `tixpi.webp`.
 *  2. Otherwise the filename must equal the slug, so a plain file drop still
 *     works with no data edit.
 *
 * `eager: true` resolves the modules at build time so the card can read the
 * intrinsic width/height synchronously.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** Filename (with extension) → image, and basename → image for the slug path. */
const byFilename = new Map<string, ImageMetadata>();
const byBasename = new Map<string, ImageMetadata>();

for (const [path, module] of Object.entries(modules)) {
  const filename = path.split('/').pop()!;
  byFilename.set(filename, module.default);
  byBasename.set(filename.replace(/\.[^.]+$/, ''), module.default);
}

const bySlug = new Map<string, ImageMetadata>();

for (const project of projects) {
  const explicit = project.image ? byFilename.get(project.image) : undefined;
  const cover = explicit ?? byBasename.get(project.slug);
  if (cover) bySlug.set(project.slug, cover);
}

/** Returns the banner for a slug, or `undefined` to use the generated cover. */
export function getProjectCover(slug: string): ImageMetadata | undefined {
  return bySlug.get(slug);
}

/** Image filenames present on disk — used by the check script. */
export const availableFilenames = (): string[] => [...byFilename.keys()];
