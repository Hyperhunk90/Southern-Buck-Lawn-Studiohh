import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

// Read the assembled data, including service records extracted into their own
// modules. Type-only imports disappear during transpilation; runtime imports
// are restricted to this site's data directory.
function loadDataModule(path) {
  const compiled = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const sandbox = {
    exports: {},
    require: (name) => {
      assert.match(name, /^@\/data\/[a-z0-9-]+$/, `Unexpected data import: ${name}`);
      return loadDataModule(`src/${name.slice(2)}.ts`);
    },
  };
  vm.runInNewContext(compiled, sandbox, { filename: path });
  return sandbox.exports;
}

test('service and location topic clusters reference only real blog posts', () => {
  const { SERVICES } = loadDataModule('src/data/services.ts');
  const { LOCATIONS } = loadDataModule('src/data/locations.ts');
  const { POSTS } = loadDataModule('src/data/blog.ts');
  const blogSlugs = new Set(POSTS.map((post) => post.slug));
  const serviceGroups = SERVICES.map((service) => service.relatedPostSlugs);
  const locationGroups = LOCATIONS.map((location) => location.relatedPostSlugs);

  assert.equal(serviceGroups.length, 4, 'every service should define a related-post cluster');
  assert.equal(locationGroups.length, 5, 'every location should define a related-post cluster');

  for (const group of [...serviceGroups, ...locationGroups]) {
    assert.ok(Array.isArray(group), 'every record should define a related-post cluster');
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
