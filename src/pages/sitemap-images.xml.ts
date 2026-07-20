import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { projects } from '../data/projects';
import { getProjectCover } from '../utils/projectCovers';
import portrait from '../assets/md-rostom-ali-senior-full-stack-engineer.png';
import { site } from '../data/site';

/**
 * Image sitemap for the project banners.
 *
 * `@astrojs/sitemap` can only emit `url`/`lastmod`/`changefreq`/`priority`, so
 * `<image:image>` entries have to be produced separately. This file is listed in
 * the sitemap index via `customSitemaps` in astro.config.mjs.
 *
 * Every banner is resolved through `getImage()` — the same pipeline the cards
 * use — so the URLs here are the real content-hashed files that ship, not
 * guesses at what the build might emit.
 */

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site: origin }) => {
  const base = origin ?? new URL(site.url);
  const pageUrl = new URL('/projects', base).href;

  const images: { loc: string; title: string; caption: string }[] = [];

  for (const project of projects) {
    const cover = getProjectCover(project.slug);
    if (!cover) continue;

    // Widest variant: search engines should index the best available version.
    const optimised = await getImage({
      src: cover,
      width: Math.min(cover.width, 900),
      format: 'webp',
    });

    images.push({
      loc: new URL(optimised.src, base).href,
      title: `${project.name} — ${project.tagline}`,
      caption: project.description,
    });
  }

  /*
    896 is the widest variant Portrait.astro requests, so this points at a file
    the build genuinely emits. Any other width would make Astro emit an extra
    asset that exists only for this sitemap.
  */
  const portraitImage = await getImage({ src: portrait, width: 896, format: 'webp' });
  const homeImages = [
    {
      loc: new URL(portraitImage.src, base).href,
      title: `${site.name} — ${site.role}`,
      caption: site.description,
    },
  ];

  const renderImages = (list: typeof images) =>
    list
      .map(
        (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`,
      )
      .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(new URL('/', base).href)}</loc>
${renderImages(homeImages)}
  </url>
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${renderImages(images)}
  </url>
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
