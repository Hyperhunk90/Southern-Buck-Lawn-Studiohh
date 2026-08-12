import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

const requiredFiles = [
  'src/app/gallery/page.tsx',
  'src/components/GalleryClient.tsx',
  'src/data/projects.ts',
  'src/app/property-preservation-reo-services/page.tsx',
  'src/app/property-preservation-reo-services/ReoForm.tsx',
  'src/components/ChatWidget.tsx',
  'src/app/api/chat/route.ts',
  'public/images/southern-buck-lawn-mascot-waving.png',
];

test('requested live-repo features and mascot asset are present', () => {
  for (const path of requiredFiles) {
    assert.equal(existsSync(join(root, path)), true, `${path} should exist`);
  }
});

test('navigation and sitemap expose the gallery and REO pages', () => {
  const navbar = read('src/components/Navbar.tsx');
  const footer = read('src/components/Footer.tsx');
  const sitemap = read('src/app/sitemap.ts');
  const site = read('src/data/site.ts');
  assert.match(navbar, /href="\/gallery"/);
  assert.match(footer, /href="\/gallery"/);
  assert.match(sitemap, /\/gallery/);
  assert.match(sitemap, /\/property-preservation-reo-services/);
  assert.match(site, /Property Preservation & REO/);
});

test('BUCKIE is mounted and chat API has production request boundaries', () => {
  const layout = read('src/app/layout.tsx');
  const route = read('src/app/api/chat/route.ts');
  assert.match(layout, /<ChatWidget\s*\/>/);
  assert.match(route, /MAX_BODY_BYTES/);
  assert.match(route, /MAX_HISTORY_MESSAGES/);
  assert.match(route, /GEMINI_API_KEY/);
  assert.match(route, /Invalid request origin/);
  assert.match(route, /MAX_GLOBAL_REQUESTS_PER_HOUR/);
  assert.match(route, /MAX_CLIENT_REQUESTS_PER_WINDOW/);
  assert.match(route, /Too many chat requests/);
  assert.doesNotMatch(route, /if \(!origin\) return true/);
  assert.doesNotMatch(route, /NextResponse\.json\(\{\s*error:\s*error\.message/);
});

test('REO submission contract is accepted by secured lead API', () => {
  const form = read('src/app/property-preservation-reo-services/ReoForm.tsx');
  const leadRoute = read('src/app/api/lead/route.ts');
  assert.match(form, /propertyType:\s*'Commercial'/);
  assert.match(form, /companyName:\s*form\.firmName/);
  assert.match(form, /type:\s*'REO \/ Property Preservation Lead'/);
  assert.match(leadRoute, /'REO \/ Property Preservation Lead'/);
});

test('REO call action uses central business data, not a hard-coded number', () => {
  const hero = read('src/app/property-preservation-reo-services/ReoHeroContent.tsx');
  assert.match(hero, /SITE\.phoneHref/);
  assert.match(hero, /SITE\.phone/);
  assert.doesNotMatch(hero, /369-0971/);
});
