// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

/**
 * The canonical origin for the deployed site.
 * Swap this single constant when the production domain is final — it drives
 * canonical URLs, sitemap.xml, robots.txt and every absolute OpenGraph URL.
 */
const SITE = 'https://rostomali.online';

/**
 * Per-page sitemap weighting, ranked by how much each page matters to someone
 * landing cold — rather than giving every page the same value, which tells a
 * crawler nothing.
 *
 * @type {Record<string, { priority: number, changefreq: ChangeFreqEnum }>}
 */
const SITEMAP_RULES = {
  '/': { priority: 1.0, changefreq: ChangeFreqEnum.WEEKLY },
  '/projects': { priority: 0.9, changefreq: ChangeFreqEnum.WEEKLY },
  '/experience': { priority: 0.8, changefreq: ChangeFreqEnum.MONTHLY },
  '/resume': { priority: 0.8, changefreq: ChangeFreqEnum.MONTHLY },
  '/skills': { priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY },
  '/contact': { priority: 0.6, changefreq: ChangeFreqEnum.YEARLY },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',

  build: {
    // Emit `/about.html` rather than `/about/index.html` so `trailingSlash: 'never'`
    // resolves identically across static hosts.
    format: 'file',
    inlineStylesheets: 'auto',
  },

  // Warm the client-router cache for links as they enter the viewport.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      optimizedFallbacks: true,
    },
    {
      name: 'Space Grotesk',
      cssVariable: '--font-grotesk',
      provider: fontProviders.google(),
      weights: [500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      optimizedFallbacks: true,
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-monospace', 'monospace'],
      optimizedFallbacks: true,
    },
  ],

  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      lastmod: new Date(),
      // A separate image sitemap for the project banners; @astrojs/sitemap
      // cannot emit <image:image> entries itself.
      customSitemaps: [`${SITE}/sitemap-images.xml`],
      serialize: (item) => {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        return {
          ...item,
          ...(SITEMAP_RULES[path] ?? { priority: 0.5, changefreq: ChangeFreqEnum.MONTHLY }),
        };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
