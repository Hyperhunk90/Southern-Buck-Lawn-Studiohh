import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

test('lead forms do not include a hidden company honeypot that password managers can autofill', () => {
  const forms = [
    'src/components/QuoteForm.tsx',
    'src/components/ContactForm.tsx',
    'src/app/property-preservation-reo-services/ReoForm.tsx',
  ];

  for (const path of forms) {
    const source = read(path);
    assert.doesNotMatch(source, /name=["']company["']/i, `${path} must not expose the old company honeypot`);
    assert.doesNotMatch(source, /honeypot/i, `${path} must not retain honeypot behavior`);
  }

  const leadRoute = read('src/app/api/lead/route.ts');
  assert.doesNotMatch(leadRoute, /raw\.company\b/);
  assert.doesNotMatch(leadRoute, /honeypot/i);
  assert.doesNotMatch(leadRoute, /return NextResponse\.json\(\{ ok: true \}\)[\s\S]{0,80}ALLOWED_TYPES/);

  const reoForm = read('src/app/property-preservation-reo-services/ReoForm.tsx');
  assert.match(reoForm, /name="firmName"[\s\S]{0,80}autoComplete="organization"/);
  assert.match(reoForm, /name="phone"[\s\S]{0,80}autoComplete="tel"/);
  assert.match(reoForm, /name="address"[\s\S]{0,80}autoComplete="street-address"/);
});

test('homepage business schema avoids unsupported and self-serving review markup', () => {
  const schema = read('src/components/BusinessJsonLd.tsx');
  assert.match(schema, /'@type': 'LocalBusiness'/);
  assert.doesNotMatch(schema, /LandscapingBusiness/);
  assert.doesNotMatch(schema, /aggregateRating/);
  assert.doesNotMatch(schema, /'@type': 'Review'/);
  assert.doesNotMatch(schema, /\breview:/);
});

test('the review request uses the verified GBP review link and neutral language', () => {
  const site = read('src/data/site.ts');
  const badges = read('src/components/ReviewBadgeBar.tsx');
  assert.match(site, /googleReview: 'https:\/\/g\.page\/r\/Cf_J1ApLyF3gEBE\/review'/);
  assert.match(badges, /Share an honest Google review/);
  assert.doesNotMatch(badges, /discount|incentive|five-star|5-star/i);
});

test('website assistant does not promise out-of-route Baton Rouge or Gonzales coverage', () => {
  const chat = read('src/app/api/chat/route.ts');
  assert.match(chat, /Walker, Denham Springs, and Watson/);
  assert.match(chat, /Baton Rouge and Gonzales are not home markets/);
});

test('gallery proof stays honest and sends service intent without a placeholder address', () => {
  const gallery = read('src/components/GalleryClient.tsx');
  assert.match(gallery, /Photo from our work/);
  assert.match(gallery, /See \{project\.serviceLabel\} service/);
  assert.doesNotMatch(gallery, /location=\$\{encodeURIComponent\(activeProject\.location\)\}/);
});

test('lead clients require an explicit API success payload', () => {
  for (const path of [
    'src/components/QuoteForm.tsx',
    'src/components/ContactForm.tsx',
    'src/app/property-preservation-reo-services/ReoForm.tsx',
  ]) {
    assert.match(read(path), /result\?\.ok !== true/, path);
  }
});

test('HTML cache lifetime is bounded and business facts match the owner confirmation', () => {
  assert.match(read('src/app/layout.tsx'), /export const revalidate = 300/);
  assert.match(read('next.config.mjs'), /expireTime: 300/);
  assert.match(read('src/data/site.ts'), /Monday – Sunday.*6:00 AM – 6:30 PM/);
  assert.match(read('src/app/about/page.tsx'), /since June 2024/);
  assert.doesNotMatch(read('src/app/page.tsx'), /since 2013/i);
  for (const path of ['src/components/Footer.tsx', 'src/app/quote/page.tsx', 'src/app/contact/page.tsx']) {
    assert.match(read(path), /SITE\.hours\.map/, `${path} must use the confirmed central hours`);
    assert.doesNotMatch(read(path), /Mon&ndash;Fri|Sat 6AM|Sun 7AM/, path);
  }
});

test('business-age copy never revives 2013 while preserving the separate electrical background', () => {
  const businessFactSources = [
    'src/app/page.tsx',
    'src/app/about/page.tsx',
    'src/app/landscape-lighting/page.tsx',
    'src/app/landscape-lighting/LightingStory.tsx',
    'src/components/BusinessJsonLd.tsx',
  ];

  for (const path of businessFactSources) {
    assert.doesNotMatch(read(path), /\bsince 2013\b/i, `${path} must not claim a 2013 business start`);
  }

  assert.match(read('src/app/landscape-lighting/LightingStory.tsx'), /13 years of industrial electrical background/);
});

test('legacy URLs reported as 404s in Search Console redirect to current equivalents', () => {
  const config = read('next.config.mjs');
  assert.match(config, /source: '\/index\.html', destination: '\/', permanent: true/);
  assert.match(config, /source: '\/about-us', destination: '\/about', permanent: true/);
  assert.match(config, /source: '\/services\/lawn-care-maintenance', destination: '\/services\/lawn-mowing', permanent: true/);
  assert.match(config, /source: '\/walker', destination: '\/service-areas\/walker', permanent: true/);
  assert.match(config, /source: '\/services\/property-preservation', destination: '\/property-preservation-reo-services', permanent: true/);
});

test('prebuild never replaces a valid tracked WebP with an incomplete base64 payload', () => {
  const decoder = read('scripts/decode-job-photos.mjs');
  assert.match(decoder, /function isCompleteWebp\(buffer\)/);
  assert.match(decoder, /buffer\.readUInt32LE\(4\) \+ 8 === buffer\.length/);
  assert.match(decoder, /kept valid tracked image/);
  assert.match(decoder, /Incomplete WebP source/);
});
