// Regenerate the default social preview using the site's fonts and ledger tokens.
// Usage: bun scripts/make-og.ts
import {readFile} from 'node:fs/promises'
import {chromium} from '@playwright/test'
import {site} from '../src/data/site'

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[character]!,
  )

let css = (await readFile('src/styles/global.css', 'utf8')).replace("@import 'tailwindcss';", '')
for (const match of css.matchAll(/url\('\/fonts\/([^']+)'\)/g)) {
  const font = await readFile(`public/fonts/${match[1]}`)
  css = css.replace(match[0], `url('data:font/woff2;base64,${font.toString('base64')}')`)
}

const browser = await chromium.launch()
try {
  const page = await browser.newPage({viewport: {width: 1200, height: 630}, deviceScaleFactor: 1})
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${css}
    body { width:1200px; height:630px; background:var(--paper); color:var(--ink); }
    .og-band { background:var(--ink); color:var(--paper); padding:55px 64px 48px; }
    .og-name { color:var(--paper); margin:0; font-family:var(--font-display); font-size:110px; font-weight:700; line-height:.9; letter-spacing:-.04em; text-transform:uppercase; }
    .og-role { margin:26px 0 0; color:var(--accent); font-family:var(--font-mono); font-size:24px; line-height:1.4; }
    .og-body { padding:36px 64px; }
    .og-section { border-bottom:1.5px solid var(--ink); }
    .og-chip { display:inline-block; background:var(--accent); padding:5px 12px; font-family:var(--font-mono); font-size:20px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
    .og-tagline { margin:23px 0 0; max-width:1000px; font-family:var(--font-mono); font-size:24px; line-height:1.55; }
  </style></head><body>
    <header class="og-band"><h1 class="og-name">${escapeHtml(site.name)}</h1><p class="og-role">${escapeHtml(site.role)}</p></header>
    <main class="og-body"><div class="og-section"><span class="og-chip">${escapeHtml(new URL(site.url).hostname)}</span></div><p class="og-tagline">${escapeHtml(site.tagline)}</p></main>
  </body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({path: 'public/og.png'})
  console.log('wrote public/og.png (1200 × 630)')
} finally {
  await browser.close()
}
