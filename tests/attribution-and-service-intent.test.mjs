import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

test('global analytics captures complete first-touch attribution without overwriting it', () => {
  const source = read('src/components/GaTracker.tsx');

  for (const key of UTM_KEYS) assert.match(source, new RegExp(`['"]${key}['"]`));
  for (const key of ['sbl_landing_page', 'sbl_referrer', 'sbl_campaign']) {
    assert.match(source, new RegExp(`getItem\\('${key}'\\) === null`));
    assert.match(source, new RegExp(`setItem\\('${key}'`));
  }
  assert.match(source, /const storageKey = `sbl_\$\{key\}`/);
  assert.match(source, /captureFirstTouch\(\);[\s\S]{0,160}trackEvent\('page_view'/);
});

test('quote form accepts only known service intent and never treats gallery location as an address', () => {
  const source = read('src/components/QuoteForm.tsx');

  assert.match(source, /type QuoteFormProps = \{[\s\S]*defaultService\?: QuoteService/);
  assert.match(source, /function resolveService\(value: string \| null\): QuoteService \| undefined/);
  assert.match(source, /params\.get\('service'\)/);
  assert.match(source, /pathname\.match\(\/\^\\\/services\\\/\(\[\^\/\]\+\)\\\/\?\$\//);
  assert.doesNotMatch(source, /params\.get\(['"]location['"]\)/);

  for (const slug of ['lawn-mowing', 'weed-control', 'landscape-design', 'commercial-grounds', 'landscape-lighting']) {
    assert.match(source, new RegExp(`['"]${slug}['"]\\s*:`));
  }
});

test('REO leads include the same first-touch attribution fields', () => {
  const source = read('src/app/property-preservation-reo-services/ReoForm.tsx');

  for (const key of UTM_KEYS) assert.match(source, new RegExp(`['"]${key}['"]`));
  for (const field of ['sourcePage', 'landingPage', 'referrer', 'campaign']) {
    assert.match(source, new RegExp(`${field}: attribution\\.${field}`));
  }
  assert.match(source, /sessionStorage\.getItem\(storageKey\) === null/);
});

test('contact leads preserve all five UTM fields even when the contact form mounts first', () => {
  const source = read('src/components/ContactForm.tsx');

  for (const key of UTM_KEYS) assert.match(source, new RegExp(`['"]${key}['"]`));
  assert.match(source, /sessionStorage\.getItem\('sbl_campaign'\)/);
  assert.match(source, /storedCampaign \?\? campaign/);
});

test('lighting quote form remains autofill-safe, API-compatible, and first-touch attributed', () => {
  const source = read('src/app/landscape-lighting/LightingQuoteForm.tsx');

  assert.doesNotMatch(source, /honeypot/i);
  assert.doesNotMatch(source, /name=["']company["']/i);
  assert.doesNotMatch(source, /type=["']hidden["']/i);
  for (const autocomplete of ['name', 'tel', 'email', 'street-address']) {
    assert.match(source, new RegExp(`autoComplete=["']${autocomplete}["']`));
  }

  assert.match(source, /type:\s*'Quote Request'/);
  assert.match(source, /propertyType:\s*'Residential'/);
  assert.match(source, /service:\s*`Landscape Lighting/);
  assert.match(source, /result\?\.ok !== true/);
  for (const field of ['sourcePage', 'landingPage', 'referrer', 'campaign']) {
    assert.match(source, new RegExp(`${field}: form\\.${field}`));
  }
  for (const key of UTM_KEYS) assert.match(source, new RegExp(`['"]${key}['"]`));
  assert.match(source, /sessionStorage\.getItem\(storageKey\) === null/);
  assert.doesNotMatch(source, /sessionStorage\.getItem\('sbl_(?:landing_page|campaign|referrer)'\) \|\|/);
});

test('lighting page uses the confirmed June 2024 business start date', () => {
  for (const path of ['src/app/landscape-lighting/page.tsx', 'src/app/landscape-lighting/LightingStory.tsx']) {
    const source = read(path);
    assert.match(source, /June 2024/);
    assert.doesNotMatch(source, /since 2013/i);
  }
});

test('direct g.page review links have a distinct analytics event', () => {
  const source = read('src/components/GaTracker.tsx');
  assert.match(source, /g\\\.page/);
  assert.match(source, /trackEvent\('google_review_click', common\)/);
});
