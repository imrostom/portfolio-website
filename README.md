# Md Rostom Ali — Portfolio

A static, light-themed portfolio site for a Senior Full Stack Engineer, built with Astro 7, Tailwind
CSS v4 and TypeScript. No UI framework and no animation library — the entire site ships about 8 KB of
JavaScript, gzipped.

## Stack

| Concern     | Choice                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Framework   | Astro 7 (static output, zero hydration)                                                          |
| Styling     | Tailwind CSS v4 via `@tailwindcss/vite`, semantic CSS custom properties                          |
| Animation   | CSS transitions + `IntersectionObserver`. No animation library.                                  |
| Icons       | `astro-icon` with Lucide and Simple Icons, inlined as SVG                                        |
| Fonts       | Astro's built-in font pipeline — Inter, Space Grotesk, JetBrains Mono, self-hosted and preloaded |
| Transitions | View Transitions API via `<ClientRouter />`                                                      |
| SEO         | Canonical URLs, OpenGraph, Twitter cards, JSON-LD, page + image sitemaps, generated `robots.txt` |

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| Script                    | What it does                                         |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Dev server with HMR                                  |
| `npm run build`           | Generates assets, typechecks, then builds to `dist/` |
| `npm run preview`         | Serves the production build locally                  |
| `npm run check`           | `astro check` — TypeScript and template diagnostics  |
| `npm run generate:assets` | Regenerates the OG image, PWA icons and résumé PDF   |
| `npm run check:covers`    | Lists which projects still lack a banner image       |
| `npm run format`          | Prettier across the repo                             |

## Editing content

All copy lives in `src/data/` as typed modules — no CMS, no markdown frontmatter to keep in sync.

| File            | Contents                                                           |
| --------------- | ------------------------------------------------------------------ |
| `site.ts`       | Identity, contact details, navigation, socials, stats, tech ticker |
| `experience.ts` | Employment history, education, achievements                        |
| `projects.ts`   | Projects with case studies, metrics and links                      |
| `skills.ts`     | Skill groups and proficiency levels                                |
| `about.ts`      | About-page narrative, journey timeline, focus areas, principles    |
| `languages.ts`  | Language proficiency and collaboration notes                       |
| `resume.ts`     | Résumé summary and section navigation                              |

**Personalising a deployment** comes down to two places:

1. `src/data/site.ts` — the `site` and `contact` objects.
2. `astro.config.mjs` — the `SITE` constant, which drives canonical URLs, the sitemap, `robots.txt`
   and every absolute OpenGraph URL.

`contact.phone` is intentionally nullable: leave it `null` and the phone row is omitted from the
contact page and the JSON-LD rather than rendered as a placeholder.

## Generated assets

`npm run generate:assets` (run automatically before every build) produces:

- `public/og.png` — 1200×630 social card for the home page
- `public/og/*.png` — one card per page, defined in `src/data/ogCards.ts`
- `public/portrait.jpg` — square portrait used as `Person.image` in the JSON-LD
- `public/apple-touch-icon.png`, `public/icon-512.png` — PWA icons

These are gitignored because they are reproducible from source.

**The résumé PDF is not generated.** `public/Md Rostom Ali.pdf` is a real CV, committed to the repo.
The generator deliberately writes no PDF — an earlier version derived its output filename from
`site.resumePath`, which would have overwritten that file on every build. `resumePath` is
percent-encoded (`/Md%20Rostom%20Ali.pdf`) because the filename contains spaces.

## Project banner images

Each project declares its banner via the `image` field in `src/data/projects.ts`,
naming a file in `src/assets/projects/`. Filenames are descriptive rather than
slug-shaped (`tixpi-logistics-operations-platform.png`) because the name carries
into the emitted URL and is a Google Images relevance signal. A file named after
the slug still works with no data edit. Without either, the card falls back to a
generated gradient cover, so the grid never has a hole in it.

Images go through `astro:assets`: converted to WebP, emitted at three widths
with a `srcset`, content-hashed, and given intrinsic dimensions so they cannot
cause layout shift. Use 16:9 at 1600×900 or larger. `npm run check:covers`
lists what is still missing and flags files whose name matches no project.

## Architecture

```
src/
├── components/
│   ├── layout/     Header, Footer, Backdrop, Cursor, NoScriptFallback, BackToTop
│   ├── seo/        SEO.astro — meta tags and JSON-LD
│   ├── ui/         Button, Card, Badge, Section, SectionHeading, Marquee, Counter, CopyButton
│   └── *.astro     ProjectCard, Timeline, Portrait
├── assets/
│   └── projects/   Project banner images, named by slug (see its README)
├── data/           All site content as typed modules
├── layouts/        BaseLayout (document shell), PageLayout (inner-page header)
├── pages/          One file per route, plus robots.txt.ts
├── scripts/        Client behaviour, one module per concern
├── sections/       Composed page sections
├── styles/         global.css — design tokens, utilities, keyframes
└── utils/          cn.ts, seo.ts
```

### Client-side behaviour

`src/scripts/index.ts` registers every behaviour through `lifecycle.ts`, which re-runs modules on
`astro:page-load` and tears them down on `astro:before-swap`. This matters because the
view-transition router swaps the document without a reload — without teardown, observers and
listeners would leak on every navigation.

Each module bails out cheaply when its markup is absent, so page-specific behaviour (project
filtering, résumé scroll-spy) costs nothing on pages that don't use it.

### Progressive enhancement

Content is never gated behind JavaScript:

- Scroll-reveal elements are unhidden by a `<noscript>` stylesheet if JS never runs.
- Count-up statistics render their **final** value server-side; the script only animates from zero on
  scroll entry.
- Project filtering only toggles `hidden` — the full list is always in the HTML for crawlers.
- The custom cursor hides the native one only after it successfully initialises, so a script failure
  leaves a usable pointer.

### Colour tokens

The site is **light-only**. There is no theme toggle, no `.dark` class and no theme-switching
JavaScript — `color-scheme: light` is declared once in `global.css`, so the rendering is identical
regardless of the visitor's OS setting. Tailwind's built-in `dark:` variant is deliberately
neutralised (`@custom-variant dark (&:where(.__never-dark))`) so a stray `dark:` utility can never
activate.

Two token families, kept apart:

| Family                                 | Job                                                      | Constraint                        |
| -------------------------------------- | -------------------------------------------------------- | --------------------------------- |
| `--primary` `--secondary` `--accent`   | **On-background** — text and icons read against the page | Must clear 4.5:1 on every surface |
| `--fill-from` `--fill-via` `--fill-to` | **Behind white** — buttons, monograms, active chips      | Must clear 4.5:1 against white    |

These pull in opposite directions, and collapsing them into one family is what previously let a
**1.81:1** primary button ship. Anything white sits on should use the `brand-fill` utility, never
the `--primary`/`--accent` tints.

Surfaces are layered so cards read as raised: the page is faintly tinted (`#f4f7fb`), tinted section
bands sit one step deeper, and cards are pure white with a hairline border and soft shadow. A pure
white page would leave white cards with nothing to separate against.

`--primary` is blue-700 rather than the brief's blue-600 — blue-600 lands at 4.48:1 on the tinted
section band. The brief blue survives as `--fill-from`, where brand colour is most visible.

### Accessibility

- All 27 text/surface/fill combinations verified at ≥ 4.5:1.
- `prefers-reduced-motion` disables transforms, looping decoration, parallax and the custom cursor.
- No self-scored proficiency bars: skills are listed as grouped chips, so nothing implies a precision
  that isn't real.
- Skip link, visible focus rings, one `<h1>` per page, and labelled landmarks throughout.

## Content accuracy

`src/data/experience.ts` exports an **empty `education` array** on purpose. The résumé page, the
generated PDF and the JSON-LD all omit the section entirely while it is empty, rather than display
anything unverified. Populate it when real credentials are available and every surface picks it up.

## Search Console

`src/data/site.ts` exports a `verification` object. Paste the code Google (or Bing) gives you
and redeploy; unset values emit no markup at all.

```ts
export const verification = { google: null, bing: null };
```

`robots.txt` deliberately contains **no `Disallow`**. `/_astro/` holds both the optimised
images listed in `sitemap-images.xml` and the CSS/JS Googlebot renders with — blocking it made
the image sitemap inert.

## Sitemaps

Two sitemaps are listed in `sitemap-index.xml`, which `robots.txt` points at:

| File                 | Contents                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `sitemap-0.xml`      | The 6 pages, weighted by importance (`SITEMAP_RULES` in astro.config.mjs) |
| `sitemap-images.xml` | The 20 project banners, with title and caption, for Google Images         |

`@astrojs/sitemap` cannot emit `<image:image>` entries, so `src/pages/sitemap-images.xml.ts`
generates them. It resolves each banner through `getImage()` — the same pipeline the cards use — so
the URLs are the real content-hashed files that ship rather than a guess at the build output.

## Deploying

The build is fully static; `dist/` can be served by any host.

```bash
npm run build && npm run preview
```

Before going live, set the production domain in `astro.config.mjs` (`SITE`) and in
`src/data/site.ts` (`site.url`).

### The host must try the `.html` extension

`build.format: 'file'` pairs with `trailingSlash: 'never'`, so the output is flat —
`dist/projects.html`, **not** `dist/projects/index.html`. A host that only tries `$uri` and
`$uri/` will miss every route and fall through to whatever its fallback is; if that fallback is
`/index.html`, every URL silently renders the homepage.

Netlify and Vercel resolve this automatically. nginx needs `$uri.html` in the chain:

```nginx
root /var/www/rostomali.online/dist;
index index.html;

# trailingSlash: 'never' — one canonical URL per page
rewrite ^/(.*)/$ /$1 permanent;

error_page 404 /404.html;

location / {
    try_files $uri $uri.html $uri/ =404;
}
```

`=404` rather than `/404.html` as the fallback: paired with `error_page`, it serves the 404 page
with a real 404 status. Using `/404.html` directly would serve that page at 200 and tell crawlers
the URL is valid.

Apache needs `Options +MultiViews`, or an equivalent `RewriteRule`.

Note that `npm run preview` does **not** catch this — Astro's preview server resolves
`format: 'file'` routes itself, so it passes even against a server config that would fail.

## Licence

Source code MIT. Written content, résumé and personal branding are © Md Rostom Ali.
