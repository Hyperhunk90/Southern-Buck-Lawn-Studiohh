#!/usr/bin/env node
/**
 * Decode base64 job photos into public/images/*.webp before Next build.
 * Source: public/images/b64/<name>.webp.b64
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

for (const name of fs.readdirSync(b64Dir)) {
  if (!name.endsWith('.webp.b64')) continue;
  const outName = name.replace(/\.b64$/, '');
  const outPath = path.join(outDir, outName);
  const raw = fs.readFileSync(path.join(b64Dir, name), 'utf8').replace(/\s+/g, '');
  fs.writeFileSync(outPath, Buffer.from(raw, 'base64'));
  console.log('decoded', outName, fs.statSync(outPath).size);
}
