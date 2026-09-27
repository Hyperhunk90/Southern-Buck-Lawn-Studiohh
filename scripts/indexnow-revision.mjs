import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const site = 'https://southernbucklawn.com';
export const key = 'ebfef7aab80048eb802244a625e0795e';

// Hash source bytes, not Git metadata: Hostinger can build an exported checkout
// without .git. The workflow calculates exactly the same revision independently.
export function sourceRevision() {
  const files = ['package.json', 'package-lock.json', 'next.config.mjs',
    'scripts/indexnow-revision.mjs', `public/${key}.txt`];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files.push(relative(root, path));
    }
  }
  walk(join(root, 'src'));
  const hash = createHash('sha256');
  for (const path of files.sort()) {
    const bytes = readFileSync(join(root, path));
    hash.update(`${path}\0${bytes.length}\0`);
    hash.update(bytes);
  }
  return hash.digest('hex');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const revision = sourceRevision();
  if (process.argv.includes('--write')) {
    writeFileSync(join(root, 'public/indexnow-deployment.json'),
      JSON.stringify({ revision }) + '\n', 'utf8');
  }
  console.log(`IndexNow source revision: ${revision}`);
}
