/**
 * Reports which projects have a banner image and which still fall back to the
 * generated gradient cover, and flags files that match no project.
 *
 * Run with `npm run check:covers`.
 */
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/assets/projects');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const files = existsSync(dir) ? readdirSync(dir) : [];
const bySlug = new Map();
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) continue;
  bySlug.set(path.basename(file, ext), file);
}

const byFilename = new Map();
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (EXTS.has(ext)) byFilename.set(file, file);
}

/** Explicit `image` field wins; otherwise fall back to `<slug>.<ext>`. */
const resolve = (p) => (p.image && byFilename.has(p.image) ? p.image : bySlug.get(p.slug));

const withCover = projects.filter((p) => resolve(p));
const missing = projects.filter((p) => !resolve(p));
const used = new Set(projects.map(resolve).filter(Boolean));
const orphans = [...byFilename.keys()].filter((f) => !used.has(f)).map((f) => [f, f]);

console.log(`\n  ${withCover.length}/${projects.length} projects have a banner\n`);

if (withCover.length) {
  for (const p of withCover) {
    console.log(`  ✔ ${p.name.padEnd(30)} ${resolve(p)}`);
  }
  console.log('');
}

if (missing.length) {
  console.log('  Missing — these render the generated gradient cover:');
  for (const p of missing) {
    console.log(`  · ${p.name.padEnd(30)} expects  ${p.image ?? p.slug + '.jpg'}`);
  }
  console.log('');
}

if (orphans.length) {
  console.log('  ⚠ Files matching no project (check the filename against the slug):');
  for (const [file] of orphans) console.log(`    ${file}  →  not referenced by any project`);
  console.log('');
}
