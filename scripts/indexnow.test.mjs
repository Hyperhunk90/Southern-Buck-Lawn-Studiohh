import test from 'node:test';
import assert from 'node:assert/strict';
import { sitemapUrls, submitUrls, validateUrls, verifyKey } from './indexnow.mjs';
import { key, site } from './indexnow-revision.mjs';

test('canonical URLs are deduplicated and external, private, and tracking URLs are rejected', () => {
  assert.deepEqual(validateUrls([site, `${site}/`, `${site}/about`]), [`${site}/`, `${site}/about`]);
  for (const value of ['https://example.com/', 'http://southernbucklawn.com/',
    `${site}/api/lead`, `${site}/about?utm_source=foo`, `${site}/about#section`,
    'https://user@southernbucklawn.com/']) {
    assert.throws(() => validateUrls([value]));
  }
});

test('only a populated same-host sitemap can be submitted', () => {
  assert.deepEqual(sitemapUrls(`<urlset><url><loc>${site}/about</loc></url></urlset>`), [`${site}/about`]);
  assert.throws(() => sitemapUrls('<html>Error</html>'));
  assert.throws(() => sitemapUrls('<urlset></urlset>'));
  assert.throws(() => sitemapUrls('<urlset><loc>https://example.com/</loc></urlset>'));
});

test('a 200 HTML fallback or mismatched key does not pass ownership verification', async () => {
  await assert.rejects(verifyKey(async () => new Response(key, { headers: { 'content-type': 'text/html' } })));
  await assert.rejects(verifyKey(async () => new Response('wrong key')));
  await verifyKey(async () => new Response(key, { headers: { 'content-type': 'text/plain; charset=utf-8' } }));
});

test('the bulk request names the correct host and ownership file', async () => {
  const status = await submitUrls([`${site}/about`], async (url, request) => {
    assert.equal(url, 'https://api.indexnow.org/indexnow');
    assert.equal(request.method, 'POST');
    assert.equal(request.redirect, 'error');
    assert.deepEqual(JSON.parse(request.body), {
      host: 'southernbucklawn.com', key, keyLocation: `${site}/${key}.txt`, urlList: [`${site}/about`],
    });
    return new Response('', { status: 200 });
  });
  assert.equal(status, 200);
});

test('202 remains pending and API rejection remains a failure', async () => {
  assert.equal(await submitUrls([site], async () => new Response('', { status: 202 })), 202);
  for (const status of [400, 403, 422, 429, 500]) {
    await assert.rejects(submitUrls([site], async () => new Response('rejected', { status })),
      new RegExp(`HTTP ${status}`));
  }
});

test('an invalid batch never reaches the network', async () => {
  const unexpected = async () => { throw new Error('NETWORK MUST NOT RUN'); };
  await assert.rejects(submitUrls([], unexpected), /1 to 10,000/);
  await assert.rejects(submitUrls(Array.from({ length: 10001 }, (_, n) => `${site}/page-${n}`), unexpected), /1 to 10,000/);
  await assert.rejects(submitUrls(['https://example.com'], unexpected), /Refusing/);
});
