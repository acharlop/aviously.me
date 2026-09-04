// PARKED (epic #37): /resume now renders the fixed resume sheet and public/resume.pdf
// is a static file. This script still prints with 0.5in margins and will overwrite the
// good PDF with a wrong one; see docs/design/resume-document.md before running it.
// Regenerate public/resume.pdf from the built /resume page.
// Usage: bun run build && bun scripts/make-resume-pdf.ts
// The Download button on /resume only appears when public/resume.pdf is committed.
import {chromium} from '@playwright/test'

const PORT = 4399
const OUT = 'public/resume.pdf'

const preview = Bun.spawn(['bunx', 'astro', 'preview', '--port', String(PORT)], {
  stdout: 'ignore',
  stderr: 'ignore',
})

try {
  const base = `http://localhost:${PORT}`
  const deadline = Date.now() + 15_000
  while (true) {
    if (Date.now() > deadline) throw new Error('astro preview did not serve /resume/; run `bun run build` first')
    try {
      const res = await fetch(`${base}/resume/`)
      if (res.ok) break
    } catch {}
    await Bun.sleep(250)
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${base}/resume/`, {waitUntil: 'networkidle'})
  await page.emulateMedia({media: 'print'})
  await page.pdf({
    path: OUT,
    format: 'Letter',
    printBackground: true,
    margin: {top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in'},
  })
  await browser.close()
  console.log(`wrote ${OUT}`)
} finally {
  preview.kill()
}
