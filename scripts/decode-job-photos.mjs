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
  fs.writeFileSync(outPath, Buffer.from(raw, 'base64'));
  console.log('decoded', `${base}.webp`, fs.statSync(outPath).size);
}
