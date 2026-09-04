import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const { NextRequest, NextResponse } = require('next/server');
const source = readFileSync(join(process.cwd(), 'src/app/api/lead/route.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

// Execute the real route, replacing only its email provider. The sandbox has no
// network globals and cannot import the real Resend SDK or any other module.
function createRouteHarness() {
  const sends = [];
  let providerError = null;
  class MockResend {
    constructor(apiKey) {
      assert.equal(apiKey, 'mock-api-key');
      this.emails = {
        send: async (payload) => {
          sends.push(payload);
          return {
            data: providerError ? null : { id: 'mock-message' },
            error: providerError,
          };
        },
      };
    }
  }

  const environment = {
    RESEND_API_KEY: 'mock-api-key',
    LEAD_TO_EMAIL: 'owner@example.invalid',
    LEAD_FROM_EMAIL: 'sender@example.invalid',
  };
  const sandbox = {
    exports: {},
    require: (name) => {
      if (name === 'next/server') return { NextRequest, NextResponse };
      if (name === 'resend') return { Resend: MockResend };
      throw new Error(`Unexpected route import: ${name}`);
    },
    process: { env: environment },
    TextDecoder,
    Uint8Array,
    console: { error: () => {} },
  };
  vm.runInNewContext(compiled, sandbox, { filename: 'lead-route.mocked.cjs' });

  return {
    sends,
    environment,
    setProviderError(error) { providerError = error; },
    async invoke(payload, expectedStatus, expectedSendCount = 0) {
      const before = sends.length;
      const request = new NextRequest('http://localhost/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: typeof payload === 'string' ? payload : JSON.stringify(payload),
      });
      const response = await sandbox.exports.POST(request);
      const result = await response.json();
      assert.equal(response.status, expectedStatus, JSON.stringify(result));
      assert.equal(sends.length - before, expectedSendCount);
      return result;
    },
  };
}

const base = {
  name: 'Autofill Test',
  phone: '225-555-0100',
  email: 'TEST@example.invalid',
  address: 'Walker, LA',
  company: 'Browser-filled legacy company',
};

test('quote with a legacy autofilled company field sends, normalizes email, and escapes HTML', async () => {
  const route = createRouteHarness();
  const result = await route.invoke({
    ...base,
    type: 'Quote Request',
    propertyType: 'Residential',
    message: '<script>test</script>',
  }, 200, 1);
  assert.equal(result.ok, true);
  assert.equal(route.sends[0].replyTo, 'test@example.invalid');
  assert.equal(route.sends[0].to, 'owner@example.invalid');
  assert.equal(route.sends[0].from, 'sender@example.invalid');
  assert.match(route.sends[0].text, /Autofill Test/);
  assert.match(route.sends[0].html, /&lt;script&gt;test&lt;\/script&gt;/);
  assert.doesNotMatch(route.sends[0].html, /<script>/);
});

test('landscape-lighting quote payload sends with complete attribution', async () => {
  const route = createRouteHarness();
  const result = await route.invoke({
    type: 'Quote Request',
    name: 'Lighting Lead Test',
    phone: '225-555-0104',
    email: 'lighting@example.invalid',
    address: 'Walker, LA 70785',
    propertyType: 'Residential',
    service: 'Landscape Lighting — Landscape lighting',
    message: 'Lighting interest: Landscape lighting. Best time to reach: Evening.',
    sourcePage: 'https://southernbucklawn.com/landscape-lighting?utm_source=google',
    landingPage: '/landscape-lighting?utm_source=google',
    referrer: 'https://www.google.com/',
    campaign: 'utm_source=google&utm_medium=organic&utm_campaign=gbp',
  }, 200, 1);

  assert.equal(result.ok, true);
  assert.match(route.sends[0].text, /Landscape Lighting — Landscape lighting/);
  assert.match(route.sends[0].text, /First landing page: \/landscape-lighting\?utm_source=google/);
  assert.match(route.sends[0].text, /utm_campaign=gbp/);
});

test('contact message with a legacy autofilled company field sends', async () => {
  const route = createRouteHarness();
  const result = await route.invoke({ ...base, type: 'Contact Message', message: 'Test contact' }, 200, 1);
  assert.equal(result.ok, true);
});

test('REO lead with a legacy autofilled company field sends and retains the real company', async () => {
  const route = createRouteHarness();
  const result = await route.invoke({
    ...base,
    type: 'REO / Property Preservation Lead',
    propertyType: 'Commercial',
    companyName: 'Autofill Test Firm',
  }, 200, 1);
  assert.equal(result.ok, true);
  assert.match(route.sends[0].text, /Company \/ HOA: Autofill Test Firm/);
});

const invalidCases = [
  ['short name', { name: 'A' }],
  ['short phone', { phone: '123' }],
  ['invalid email', { email: 'invalid' }],
  ['missing quote address', { address: '' }],
  ['missing commercial company', { propertyType: 'Commercial' }],
  ['empty contact message', { type: 'Contact Message', message: '' }],
  ['unknown form type', { type: 'Unexpected' }],
];

for (const [label, values] of invalidCases) {
  test(`legacy company field cannot bypass validation: ${label}`, async () => {
    const route = createRouteHarness();
    const result = await route.invoke({ ...base, ...values }, 400);
    assert.equal(typeof result.error, 'string');
  });
}

test('oversized body is rejected without sending', async () => {
  const route = createRouteHarness();
  await route.invoke({ ...base, message: 'x'.repeat(21_000) }, 413);
});

test('malformed JSON is rejected without sending', async () => {
  const route = createRouteHarness();
  await route.invoke('{invalid-json', 400);
});

test('email provider failure is not reported as a successful lead', async () => {
  const route = createRouteHarness();
  route.setProviderError({ name: 'validation_error', message: 'Mock failure' });
  const result = await route.invoke(base, 502, 1);
  assert.notEqual(result.ok, true);
});

test('missing email configuration is rejected without sending', async () => {
  const route = createRouteHarness();
  delete route.environment.RESEND_API_KEY;
  await route.invoke(base, 503);
});
