// Regenerate the default social preview using the site's fonts and ledger tokens.
// Usage: bun scripts/make-og.ts
//
// Design: the resume sheet's masthead at poster size. Ink card, the name set
// one word per uppercase line in the display face, the role in accent mono, and
// the hostname in bold mono at the foot. Every string comes from
// src/data/site.ts (name, role, url) and the colours from the tokens in
// src/styles/global.css; edit those, rerun this, commit the PNG. Nothing else: share cards already
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
    body { position:relative; box-sizing:border-box; width:1200px; height:630px; margin:0; padding:64px; background:var(--ink); color:var(--paper); }
    .og-name { margin:0; font-family:var(--font-display); font-size:220px; font-weight:700; line-height:var(--leading-display); letter-spacing:var(--tracking-display); text-transform:uppercase; color:var(--paper); }
    .og-foot { position:absolute; left:64px; right:64px; bottom:60px; display:flex; align-items:flex-end; justify-content:space-between; gap:40px; }
    .og-foot p { margin:0; font-family:var(--font-mono); line-height:1; }
    .og-role { font-size:24px; letter-spacing:var(--tracking-mono); text-transform:uppercase; color:var(--accent); }
    .og-host { font-size:44px; font-weight:700; color:var(--paper); }
  </style></head><body>
    <h1 class="og-name">${site.name.split(/\s+/).map(escapeHtml).join('<br>')}</h1>
    <div class="og-foot"><p class="og-role">${escapeHtml(site.role)}</p><p class="og-host">${escapeHtml(new URL(site.url).hostname)}</p></div>
  </body></html>`)
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.evaluate(() => {
    const name = document.querySelector('.og-name')!.getBoundingClientRect()
    const foot = document.querySelector('.og-foot')!.getBoundingClientRect()
    const line = document.createRange()
    line.selectNodeContents(document.querySelector('.og-name')!)
    const widest = Math.max(...Array.from(line.getClientRects(), (rect) => rect.width))
    return {widest, gap: foot.top - name.bottom}
  })
  if (overflow.widest > 1200 - 2 * 64) throw new Error(`name overflows the card: ${Math.round(overflow.widest)}px`)
  if (overflow.gap < 24) throw new Error(`name runs into the foot: ${Math.round(overflow.gap)}px gap`)
  await page.screenshot({path: 'public/og.png'})
  console.log('wrote public/og.png (1200 × 630)')
} finally {
  await browser.close()
}
