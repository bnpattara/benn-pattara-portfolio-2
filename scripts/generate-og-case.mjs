/**
 * Renders public/og/{slug}.jpg (1200×630) from public/og/{slug}.html
 * Run: node scripts/generate-og-case.mjs stylect
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: node scripts/generate-og-case.mjs <slug>');
  process.exit(1);
}

const htmlPath = path.join(__dirname, `../public/og/${slug}.html`);
const outPath = path.join(__dirname, `../public/og/${slug}.jpg`);

if (!fs.existsSync(htmlPath)) {
  console.error('Missing', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({
  path: outPath,
  type: 'jpeg',
  quality: 92,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await browser.close();

console.log('Wrote', outPath);
