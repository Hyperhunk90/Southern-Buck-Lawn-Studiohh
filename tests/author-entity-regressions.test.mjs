import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('blog posts link the visible byline and author box to the owner page', async () => {
  const source = await read('src/app/blog/[slug]/page.tsx');

  assert.match(source, /by\{' '\}[\s\S]*?<Link href="\/about"[\s\S]*?\{SITE\.owner\}/);
  assert.match(source, /aria-label=\{`About \$\{SITE\.owner\}`\}/);
  assert.match(source, /src="\/images\/sbl-project-photo-11\.webp"/);
  assert.match(source, /owner-operated Southern Buck Lawn from Walker since June 2024/);
  assert.match(source, /About Michael/);
});

test('blog and business structured data share one stable owner entity', async () => {
  const [blogSource, businessSource] = await Promise.all([
    read('src/app/blog/[slug]/page.tsx'),
    read('src/components/BusinessJsonLd.tsx'),
  ]);

  for (const source of [blogSource, businessSource]) {
    assert.match(source, /'@type': 'Person'/);
    assert.match(source, /'@id': `\$\{SITE\.url\}\/about#owner`/);
    assert.match(source, /url: `\$\{SITE\.url\}\/about`/);
  }

  assert.match(businessSource, /foundingDate: '2024-06'/);
});

test('sitemap records the author and entity content update date', async () => {
  const source = await read('src/app/sitemap.ts');

  assert.match(source, /LAST_CONTENT_UPDATE = new Date\('2026-09-04'\)/);
});
