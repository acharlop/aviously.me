// Regenerate public/resume.pdf from the built /resume page.
// Usage: bun run build && bun scripts/make-resume-pdf.ts
// Print a local-only accent variant from astro dev with:
// bun scripts/make-resume-pdf.ts --view primer --out /tmp/resume-primer.pdf
import {chromium} from '@playwright/test'

const PORT = 4399
const args = Bun.argv.slice(2)

function option(name: string) {
  const index = args.indexOf(name)
  if (index === -1) return undefined
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`)
  return value
}

const view = option('--view')
const out = option('--out') ?? 'public/resume.pdf'
const command = view ? 'dev' : 'preview'
const path = view ? `/resume/preview-${view}/` : '/resume/'

const server = Bun.spawn(['bunx', 'astro', command, '--port', String(PORT)], {
  stdout: 'ignore',
  stderr: 'ignore',
})

let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined

try {
  const base = `http://localhost:${PORT}`
  const deadline = Date.now() + 15_000
  while (true) {
    if (Date.now() > deadline) {
      const hint = view ? '' : '; run `bun run build` first'
      throw new Error(`astro ${command} did not serve ${path}${hint}`)
    }
    try {
      const res = await fetch(`${base}${path}`)
      if (res.ok) break
    } catch {}
    await Bun.sleep(250)
  }

  browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${base}${path}`, {waitUntil: 'networkidle'})
  await page.evaluate(() => document.fonts.ready)
  await page.emulateMedia({media: 'print'})
  await page.pdf({
    path: out,
    format: 'Letter',
    preferCSSPageSize: true,
    printBackground: true,
    margin: {top: '0', bottom: '0', left: '0', right: '0'},
  })
  console.log(`wrote ${out}`)
} finally {
  await browser?.close()
  server.kill()
  await server.exited
}
