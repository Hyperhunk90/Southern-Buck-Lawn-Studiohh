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

test('legacy URLs reported as 404s in Search Console redirect to current equivalents', () => {
  const config = read('next.config.mjs');
  assert.match(config, /source: '\/index\.html', destination: '\/', permanent: true/);
  assert.match(config, /source: '\/about-us', destination: '\/about', permanent: true/);
  assert.match(config, /source: '\/services\/lawn-care-maintenance', destination: '\/services\/lawn-mowing', permanent: true/);
  assert.match(config, /source: '\/walker', destination: '\/service-areas\/walker', permanent: true/);
  assert.match(config, /source: '\/services\/property-preservation', destination: '\/property-preservation-reo-services', permanent: true/);
});
