/**
 * Build-time asset generation.
 *
 * Produces the OpenGraph image and the PWA icons from the same data the site
 * renders, so they cannot drift out of sync with the pages.
 *
 * This deliberately does NOT write the résumé PDF. `public/Md Rostom Ali.pdf`
 * is a real CV supplied by hand; generating over that path would destroy it on
 * the next build.
 *
 * Run via `npm run generate:assets` (wired into `prebuild`).
 */
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

import { site, contact } from '../src/data/site.ts';
import { ogCards, ogCardPath, HEADING_MAX } from '../src/data/ogCards.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

/* -------------------------------------------------------------------------- */
/* OpenGraph image                                                             */
/* -------------------------------------------------------------------------- */

/* Portrait geometry, shared between the SVG ring and the composite step so the
   photo and its ring can never drift apart. */
const AVATAR_R = 128;
const AVATAR_CX = 1000;
const AVATAR_CY = 300;
const PROFILE = 'src/assets/md-rostom-ali-senior-full-stack-engineer.png';

/** Escape text for safe interpolation into SVG markup. */
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function ogSvg({ heading = site.name, subject = site.role } = {}) {
  const chips = ['Laravel', 'Node.js', 'Vue & Nuxt', 'AWS', 'AI Integration'];

  // Lay the chips out manually — SVG has no flow layout.
  let x = 80;
  const chipMarkup = chips
    .map((label) => {
      // ~0.53em average advance at 18px, plus 22px padding each side.
      const width = Math.round(label.length * 9.6) + 44;
      const markup = `
        <g transform="translate(${x}, 468)">
          <rect width="${width}" height="46" rx="23" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
          <text x="${width / 2}" y="29" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" fill="#dbe3ee" text-anchor="middle">${esc(label)}</text>
        </g>`;
      x += width + 12;
      return markup;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111a2b"/>
      <stop offset="100%" stop-color="#1c2840"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow3" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="50%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <ellipse cx="180" cy="90" rx="440" ry="360" fill="url(#glow1)"/>
  <ellipse cx="1060" cy="200" rx="380" ry="320" fill="url(#glow2)"/>
  <ellipse cx="820" cy="620" rx="420" ry="300" fill="url(#glow3)"/>

  <!-- Monogram -->
  <rect x="80" y="72" width="76" height="76" rx="20" fill="url(#accent)"/>
  <text x="118" y="122" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff" text-anchor="middle">RA</text>

  <text x="176" y="122" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="#a3b0c6">${esc(contact.website.replace(/^https?:\/\//, ''))}</text>

  <!-- Name and role -->
  <text x="80" y="286" font-family="Inter, Helvetica, Arial, sans-serif" font-size="82" font-weight="700" fill="#f3f6fa" letter-spacing="-2">${esc(heading)}</text>
  <text x="80" y="348" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" font-weight="600" fill="url(#accent)">${esc(subject)}</text>

  <text x="80" y="410" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" fill="#a3b0c6">${esc(`${site.yearsExperience}+ years building SaaS, commerce and AI-powered systems`)}</text>

  ${chipMarkup}

  <!-- Portrait halo and ring; the photo is composited over this -->
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="${AVATAR_R + 46}" fill="url(#glow2)" opacity="0.55"/>
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="${AVATAR_R + 7}" fill="none" stroke="url(#accent)" stroke-width="3"/>
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="${AVATAR_R + 16}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.5"/>

  <!-- Availability -->
  <circle cx="90" cy="576" r="7" fill="#34d399"/>
  <text x="108" y="583" font-family="Inter, Helvetica, Arial, sans-serif" font-size="20" fill="#a3b0c6">${esc(`${contact.availability} · ${contact.locationShort}`)}</text>

  <rect x="0" y="622" width="1200" height="8" fill="url(#accent)"/>
</svg>`;
}

/** Circular crop of the profile photo, sized to the ring in the SVG. */
async function circularPortrait() {
  const file = path.join(root, PROFILE);
  if (!existsSync(file)) {
    console.warn(`  ! ${PROFILE} not found — OG card rendered without a portrait`);
    return null;
  }
  const size = AVATAR_R * 2;
  // `dest-in` keeps only the pixels under the white circle, giving a true
  // alpha-cut round crop rather than a square with rounded corners drawn on top.
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${AVATAR_R}" cy="${AVATAR_R}" r="${AVATAR_R}" fill="#fff"/></svg>`,
  );
  return sharp(file)
    .resize(size, size, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function generateImages() {
  // Rendered once and reused across every card — same photo, same size, so
  // decoding the 1254px source per card would be pure waste.
  const portrait = await circularPortrait();
  const composite = portrait
    ? [{ input: portrait, left: AVATAR_CX - AVATAR_R, top: AVATAR_CY - AVATAR_R }]
    : [];

  await mkdir(path.join(publicDir, 'og'), { recursive: true });

  const written = [];
  for (const card of ogCards) {
    if (card.heading.length > HEADING_MAX) {
      console.warn(
        `  ! OG heading "${card.heading}" is ${card.heading.length} chars; over ~${HEADING_MAX} it overflows the 1200px card`,
      );
    }
    const out = ogCardPath(card).replace(/^\//, '');
    // `palette: false` keeps it truecolor — the large gradients band badly once
    // quantised to 256 colours.
    await sharp(Buffer.from(ogSvg({ heading: card.heading, subject: card.subject })))
      .composite(composite)
      .png({ palette: false, compressionLevel: 9 })
      .toFile(path.join(publicDir, out));
    written.push(out);
  }

  /*
    Square portrait for the Person structured data — Google wants a square or
    portrait image there, not the 1200x630 social card. Generating it here keeps
    personSchema() synchronous: it just points at a stable public path. JPEG
    because a 1200px photographic PNG is ~1.5 MB against ~150 KB.
  */
  const profile = path.join(root, PROFILE);
  if (existsSync(profile)) {
    await sharp(profile)
      .resize(1200, 1200, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(publicDir, 'portrait.jpg'));
    written.push('portrait.jpg');
  }

  // Square mark reused for both touch icons.
  const iconSvg =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="55%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="256" y="268" font-family="Inter, Helvetica, Arial, sans-serif" font-size="216" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="central" letter-spacing="-8">RA</text>
</svg>`);

  await sharp(iconSvg).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(iconSvg).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  return [...written, 'icon-512.png', 'apple-touch-icon.png'];
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  const images = await generateImages();
  console.log(`✔ generated ${images.join(', ')}`);
}

main().catch((error) => {
  console.error('Asset generation failed:', error);
  process.exitCode = 1;
});
