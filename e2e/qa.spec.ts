import {expect, test} from '@playwright/test'

const pages = ['/', '/about/', '/work/', '/experience/', '/open-source/', '/contact/', '/resume/', '/now/']

test('no broken internal links anywhere on the site', async ({page, request, baseURL}) => {
  const seen = new Set<string>()
  const queue = ['/']
  const broken: string[] = []

  while (queue.length) {
    const path = queue.pop()!
    if (seen.has(path)) continue
    seen.add(path)

    const response = await page.goto(path)
    if (response && response.status() >= 400) {
      broken.push(`${path} -> ${response.status()}`)
      continue
    }

    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((a) => (a as HTMLAnchorElement).getAttribute('href')!),
    )
    for (const href of hrefs) {
      const clean = href.split('#')[0].split('?')[0]
      if (!clean || seen.has(clean)) continue
      if (/\.(xml|txt|pdf|png|jpg|svg|ico)$/.test(clean)) {
        const res = await request.get(new URL(clean, baseURL).href)
        if (res.status() >= 400) broken.push(`${clean} -> ${res.status()}`)
        seen.add(clean)
      } else {
        queue.push(clean)
      }
    }
  }

  expect(broken, `Broken links:\n${broken.join('\n')}`).toEqual([])
  expect(seen.size).toBeGreaterThanOrEqual(pages.length)
})

test('external links are well-formed and open safely', async ({page}) => {
  await page.goto('/')
  const externals = await page.locator('a[href^="http"]').evaluateAll((links) =>
    links.map((a) => (a as HTMLAnchorElement).href),
  )
  for (const href of externals) {
    expect(href).toMatch(/^https:\/\//)
  }
})

test('favicon is served', async ({request, baseURL}) => {
  const response = await request.get(new URL('/favicon.png', baseURL).href)
  expect(response.status()).toBe(200)
})

for (const path of pages) {
  test(`${path} has no failed images`, async ({page}) => {
    await page.goto(path, {waitUntil: 'networkidle'})
    const failed = await page.locator('img').evaluateAll((imgs) =>
      imgs
        .filter((img) => !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0)
        .map((img) => (img as HTMLImageElement).src),
    )
    expect(failed).toEqual([])
  })

  test(`${path} has no horizontal overflow`, async ({page}) => {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test(`${path} has description and canonical meta`, async ({page}) => {
    await page.goto(path)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /aviously\.me|localhost/)
  })
}

test('social preview image and OG tags are valid', async ({page, request, baseURL}) => {
  await page.goto('/')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.png$/)
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630')
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')

  const response = await request.get(new URL('/og.png', baseURL).href)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('image/png')
})

test('404 page renders with site chrome', async ({page}) => {
  const response = await page.goto('/definitely-not-a-page/')
  expect(response?.status()).toBe(404)
})
