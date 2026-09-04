#!/usr/bin/env node
/**
 * Decode job photos into public/images/*.webp before Next build.
 * Accepts either:
 *   public/images/b64/<name>.webp.b64
 *   public/images/b64/<name>.webp.b64.part00 + .part01 + ...
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const b64Dir = path.join(root, 'public', 'images', 'b64');
const outDir = path.join(root, 'public', 'images');

if (!fs.existsSync(b64Dir)) {
  console.log('decode-job-photos: no b64 dir, skip');
  process.exit(0);
}

const names = new Set();
for (const name of fs.readdirSync(b64Dir)) {
  if (name.endsWith('.webp.b64')) {
    names.add(name.replace(/\.webp\.b64$/, ''));
  } else if (/\.webp\.b64\.part\d+$/.test(name)) {
    names.add(name.replace(/\.webp\.b64\.part\d+$/, ''));
  }
}

function isCompleteWebp(buffer) {
  if (buffer.length < 12) return false;
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return false;
  }

  // A WebP's RIFF size excludes the first eight bytes. Reject truncated
  // base64 sources before they can overwrite a valid tracked image.
  return buffer.readUInt32LE(4) + 8 === buffer.length;
}

for (const base of names) {
  const single = path.join(b64Dir, `${base}.webp.b64`);
  let raw = '';
  if (fs.existsSync(single)) {
    raw = fs.readFileSync(single, 'utf8');
  } else {
    const parts = fs
      .readdirSync(b64Dir)
      .filter((n) => n.startsWith(`${base}.webp.b64.part`))
      .sort();
    if (!parts.length) continue;
    raw = parts.map((p) => fs.readFileSync(path.join(b64Dir, p), 'utf8')).join('');
  }
  raw = raw.replace(/\s+/g, '');
  const outPath = path.join(outDir, `${base}.webp`);
  const decoded = Buffer.from(raw, 'base64');
  if (!isCompleteWebp(decoded)) {
    const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath) : null;
    if (existing && isCompleteWebp(existing)) {
      console.warn(`skipped incomplete base64 source for ${base}.webp; kept valid tracked image`);
      continue;
    }
    throw new Error(`Incomplete WebP source for ${base}.webp and no valid output is available.`);
  }

  fs.writeFileSync(outPath, decoded);
  console.log('decoded', `${base}.webp`, fs.statSync(outPath).size);
}
