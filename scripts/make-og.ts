// Regenerate the default social preview using the site's fonts and ledger tokens.
// Usage: bun scripts/make-og.ts
//
// Design: a paper card with an ink frame, the name set very large in the display
// face, one accent square tucked behind the first letter (the highlighter, as a
// mark), and the hostname in mono at the foot. Nothing else: share cards already
// print the page title and description under the image, and the image is shown
// small, so the name has to be the whole picture.
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
    body { position:relative; box-sizing:border-box; width:1200px; height:630px; margin:0; padding:64px 72px; border:12px solid var(--ink); background:var(--paper); color:var(--ink); }
    .og-name { position:absolute; left:72px; top:50%; margin:0; transform:translateY(-58%); font-family:var(--font-display); font-size:168px; font-weight:700; line-height:1; letter-spacing:-.04em; white-space:nowrap; }
    .og-name::before { content:''; position:absolute; z-index:-1; left:-.08em; top:-.1em; width:.5em; height:.5em; background:var(--accent); }
    .og-host { position:absolute; left:72px; bottom:56px; margin:0; font-family:var(--font-mono); font-size:30px; line-height:1; }
  </style></head><body>
    <h1 class="og-name">${escapeHtml(site.name)}</h1>
    <p class="og-host">${escapeHtml(new URL(site.url).hostname)}</p>
  </body></html>`)
  await page.evaluate(() => document.fonts.ready)
  const nameWidth = await page.locator('.og-name').evaluate((element) => element.getBoundingClientRect().width)
  if (nameWidth > 1200 - 2 * 72) throw new Error(`name overflows the card: ${Math.round(nameWidth)}px`)
  await page.screenshot({path: 'public/og.png'})
  console.log('wrote public/og.png (1200 × 630)')
} finally {
  await browser.close()
}
