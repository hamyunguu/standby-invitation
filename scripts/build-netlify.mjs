import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceUrl = 'https://hamyunguu.github.io/standby-invitation';
const configuredUrl = process.env.SITE_URL || process.env.URL;

if (!configuredUrl) {
  throw new Error('Set SITE_URL for a local build; Netlify provides URL automatically.');
}

const siteUrl = new URL(configuredUrl);
if (!['https:', 'http:'].includes(siteUrl.protocol) || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  throw new Error('SITE_URL or URL must be an http(s) site origin without a path.');
}

const targetUrl = siteUrl.origin;
const output = 'dist';
rmSync(output, { recursive: true, force: true });
mkdirSync(join(output, 'assets'), { recursive: true });

for (const file of ['index.html', 'share.html', 'share-2026.html']) {
  const source = readFileSync(file, 'utf8');
  if ([...source.matchAll(/https:\/\/hamyunguu\.github\.io\/standby-invitation/g)].length !== 3) {
    throw new Error(`Expected canonical, og:url, and og:image in ${file}`);
  }
  writeFileSync(join(output, file), source.replaceAll(sourceUrl, targetUrl));
}

for (const file of [
  'styles.css',
  'script.js',
  'assets/invitation-front-figma-20261015.png',
  'assets/invitation-back-standby.png',
  'assets/share-thumbnail-2026-kuid.png',
]) {
  cpSync(file, join(output, file));
}

console.log(`Prepared ${output}/ for ${targetUrl}`);
