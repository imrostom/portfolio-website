import type { APIRoute } from 'astro';

/**
 * Generated rather than static so the sitemap URL always tracks the configured
 * `site` origin — a hardcoded robots.txt silently rots when the domain changes.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://rostomali.online');
  const sitemap = new URL('/sitemap-index.xml', origin).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    /*
      Deliberately no Disallow. `/_astro/` holds the optimised images listed in
      sitemap-images.xml as well as the CSS and JS Googlebot needs to render the
      page — blocking it made the image sitemap inert. The only other candidate,
      /404, is already noindex, and disallowing it would stop Google seeing that.
    */
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
