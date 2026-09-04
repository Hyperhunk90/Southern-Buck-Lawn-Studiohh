import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

function relatedSlugGroups(source) {
  return [...source.matchAll(/relatedPostSlugs:\s*\[([\s\S]*?)\]/g)].map((match) =>
    [...match[1].matchAll(/'([^']+)'/g)].map((slugMatch) => slugMatch[1]),
  );
}

test('service and location topic clusters reference only real blog posts', () => {
  const services = read('src/data/services.ts');
  const locations = read('src/data/locations.ts');
  const blog = read('src/data/blog.ts');
  const blogSlugs = new Set([...blog.matchAll(/^\s{4}slug:\s*'([^']+)',/gm)].map((match) => match[1]));
  const serviceGroups = relatedSlugGroups(services);
  const locationGroups = relatedSlugGroups(locations);

  assert.equal(serviceGroups.length, 4, 'every service should define a related-post cluster');
  assert.equal(locationGroups.length, 4, 'every location should define a related-post cluster');

  for (const group of [...serviceGroups, ...locationGroups]) {
    assert.ok(group.length > 0, 'related-post clusters should not be empty');
    assert.equal(new Set(group).size, group.length, 'a cluster should not repeat a guide');
    for (const slug of group) {
      assert.equal(blogSlugs.has(slug), true, `related guide ${slug} must exist in src/data/blog.ts`);
    }
  }
});

test('service and location pages render server-side crawlable guide links', () => {
  for (const path of ['src/app/services/[slug]/page.tsx', 'src/app/service-areas/[slug]/page.tsx']) {
    const source = read(path);
    assert.match(source, /relatedPostSlugs\.flatMap/);
    assert.match(source, /href=\{`\/blog\/\$\{post\.slug\}`\}/);
    assert.match(source, /Local Lawn Guides/);
  }
});

test('service proof uses only exact project service tags and identifies actual work', () => {
  const source = read('src/app/services/[slug]/page.tsx');

  assert.match(source, /PROJECTS\.filter\(\(project\) => project\.serviceSlug === service\.slug\)/);
  assert.match(source, /Actual \{service\.title\} Job Photos/);
  assert.match(source, /Actual job photo/);
  assert.match(source, /href="\/gallery"/);
});

test('location pages rely on FaqSection as the only FAQ schema source', () => {
  const source = read('src/app/service-areas/[slug]/page.tsx');

  assert.match(source, /<FaqSection/);
  assert.doesNotMatch(source, /faqJsonLd/);
  assert.doesNotMatch(source, /'@type': 'FAQPage'/);
});
