# Project banner images

Drop a banner here named after the project's `slug` in `src/data/projects.ts`.
No code change is needed — the card picks it up automatically, and falls back to
the generated gradient cover when no file is present.

## Naming

The filename (without extension) must match the slug exactly:

| Project                      | Slug                     | File                         |
| ---------------------------- | ------------------------ | ---------------------------- |
| Tixpi                        | `tixpi`                  | `tixpi.jpg`                  |
| Inilabs School Express       | `inilabs-school-express` | `inilabs-school-express.jpg` |
| Green Survey & Feedback Form | `green-survey-feedback`  | `green-survey-feedback.jpg`  |

Accepted extensions: `.jpg` `.jpeg` `.png` `.webp` `.avif`

## Specs

- **Aspect ratio 16:9** — the card crops to this, so anything else loses edges.
- **1600×900 or larger.** Astro downscales and generates responsive variants;
  it will not upscale, so a smaller source stays soft on retina screens.
- Ship the highest-quality original you have. Compression happens at build time
  and is served as AVIF/WebP with a JPEG fallback — pre-compressing just throws
  away quality Astro would have kept.

## Why this folder and not `public/`

Files here go through `astro:assets`: automatic format conversion, responsive
`srcset`, content-hashed filenames for long-term caching, and intrinsic
dimensions baked in so images never cause layout shift. Anything in `public/` is
copied verbatim with none of that.
