import { appendFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { key, root, site, sourceRevision } from './indexnow-revision.mjs';

const endpoint = 'https://api.indexnow.org/indexnow';
const keyLocation = `${site}/${key}.txt`;

export function validateUrls(urls) {
  return [...new Set(urls.map((value) => {
    const url = new URL(value);
    if (url.origin !== site || url.username || url.password || url.hash ||
        url.search || url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      throw new Error(`Refusing a noncanonical or private URL: ${value}`);
    }
    return url.href;
  }))];
}

export function sitemapUrls(xml) {
  if (!/<urlset(?:\s|>)/.test(xml)) throw new Error('Expected a sitemap urlset.');
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) =>
    match[1].replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => entities[name]));
  if (!urls.length) throw new Error('The sitemap contains no URLs.');
  return validateUrls(urls);
}

async function getText(url, fetcher = fetch) {
  const response = await fetcher(url, {
    redirect: 'error',
    headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'SouthernBuckLawn-IndexNow/1.0' },
    signal: AbortSignal.timeout(20000),
  });
  if (response.status !== 200) throw new Error(`${url}: HTTP ${response.status}`);
  return { response, text: await response.text() };
}

export async function verifyKey(fetcher = fetch) {
  const local = readFileSync(join(root, 'public', `${key}.txt`), 'utf8').trim();
  if (local !== key) throw new Error('The local key file does not match the configured key.');
  const result = await getText(keyLocation, fetcher);
  if (!result.response.headers.get('content-type')?.startsWith('text/plain') ||
      result.text.trim() !== key) {
    throw new Error('The live key must be plain text containing only the IndexNow key.');
  }
  console.log(`Key verified: HTTP 200, text/plain, matching contents at ${keyLocation}`);
}

async function waitForDeployment() {
  const expected = sourceRevision();
  const deadline = Date.now() + 15 * 60 * 1000;
  console.log(`Waiting for production source revision: ${expected}`);
  while (true) {
    try {
      // A unique query also bypasses hosting/CDN caches of pre-deployment 404s.
      const { text } = await getText(`${site}/indexnow-deployment.json?revision=${expected}&check=${Date.now()}`);
      const actual = JSON.parse(text).revision;
      if (actual === expected) {
        console.log(`Production deployment verified: ${expected}`);
        return;
      }
      console.log(`Hostinger is still serving an earlier deployment: ${actual}`);
    } catch (error) {
      console.log(`Waiting for the production deployment: ${error.message}`);
    }
    if (Date.now() >= deadline) {
      throw new Error('Deployment did not become live within 15 minutes; no URLs were submitted.');
    }
    await delay(30000);
  }
}

export async function submitUrls(urls, fetcher = fetch) {
  const urlList = validateUrls(urls);
  if (!urlList.length || urlList.length > 10000) {
    throw new Error('Each IndexNow request must contain 1 to 10,000 URLs.');
  }
  const response = await fetcher(endpoint, {
    method: 'POST', redirect: 'error',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 200 && response.status !== 202) {
    const detail = (await response.text()).slice(0, 400);
    throw new Error(`IndexNow HTTP ${response.status}: ${detail}`);
  }
  return response.status;
}

async function main() {
  const args = process.argv.slice(2);
  const flags = new Set(['--dry-run', '--wait-for-deploy']);
  for (const arg of args) {
    if (arg.startsWith('--') && !flags.has(arg)) throw new Error(`Unknown option: ${arg}`);
  }
  if (args.includes('--wait-for-deploy')) {
    // Check an existing URL first so TLS/DNS failures do not look like a slow deployment.
    await getText(`${site}/robots.txt`);
    await waitForDeployment();
  }
  await verifyKey();

  const explicit = args.filter((arg) => !flags.has(arg));
  const urls = explicit.length ? validateUrls(explicit)
    : sitemapUrls((await getText(`${site}/sitemap.xml`)).text);
  console.log(`Canonical URLs (${urls.length}):\n${urls.join('\n')}`);
  if (args.includes('--dry-run')) {
    console.log('Dry run complete. No IndexNow submission was sent.');
    return;
  }

  // Sequential batches obey the protocol's 10,000-URL limit. A 202 is recorded
  // as pending, never described as completed ownership validation.
  const results = [];
  for (let offset = 0; offset < urls.length; offset += 10000) {
    const batch = urls.slice(offset, offset + 10000);
    const status = await submitUrls(batch);
    results.push({ count: batch.length, status });
    console.log(`IndexNow HTTP ${status}: ${batch.length} URLs ${status === 200
      ? 'submitted successfully' : 'received; key validation pending'}.`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `## IndexNow\n\nKey file: verified (HTTP 200, matching plain text).\n\n` +
      results.map(({ count, status }) => `- ${count} URLs: HTTP ${status}${status === 202
        ? ' — key validation pending' : ' — submitted successfully'}.`).join('\n') +
      '\n\nReceipt does not guarantee crawling, indexing, or ranking.\n');
  }
  if (results.some(({ status }) => status === 202)) {
    console.log('::warning::IndexNow received the URLs; ownership validation is pending.');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
