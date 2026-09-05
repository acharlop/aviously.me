import {expect, test} from '@playwright/test'

// The private /app learning area. Unauthenticated, it must show the sign-in gate
// (the island hydrates client-side and Convex reports no session), and it must
// never be indexed or listed in the sitemap.
test('/app shows the sign-in gate when unauthenticated', async ({page}) => {
  const response = await page.goto('/app')
  expect(response?.status()).toBe(200)

  // Island hydrates and renders the sign-in form.
  await expect(page.getByRole('heading', {name: 'Sign in'})).toBeVisible()
  await expect(page.getByText('Private learning area.')).toBeVisible()
  await expect(page.locator('input[name="email"]')).toBeVisible()
  await expect(page.locator('input[name="password"]')).toBeVisible()
})

// The sign-in screen sits under the app's ink band and takes the ledger type
// ramp. The site's unlayered h1 rule beats Tailwind utilities, so the title
// size is asserted against the resolved --text-xl token at both widths.
test('/app sign-in wears the ledger tokens', async ({page}) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'))
  await page.goto('/app')
  const title = page.getByRole('heading', {name: 'Sign in'})
  await expect(title).toBeVisible()

  const band = page.locator('header.app-band')
  await expect(band).toBeVisible()
  const bandStyle = await band.evaluate((el) => {
    const cs = getComputedStyle(el)
    return {bg: cs.backgroundColor, color: cs.color, radius: cs.borderRadius, shadow: cs.boxShadow}
  })
  expect(bandStyle).toEqual({bg: 'rgb(17, 17, 17)', color: 'rgb(244, 242, 236)', radius: '0px', shadow: 'none'})

  for (const width of [1440, 390]) {
    await page.setViewportSize({width, height: 900})
    const measured = await title.evaluate((el) => {
      const probe = document.createElement('div')
      probe.style.fontSize = 'var(--text-xl)'
      document.body.append(probe)
      const expected = getComputedStyle(probe).fontSize
      probe.remove()
      const cs = getComputedStyle(el)
      return {size: cs.fontSize, expected, weight: cs.fontWeight, transform: cs.textTransform}
    })
    expect(measured.size, `h1 font-size at ${width}`).toBe(measured.expected)
    expect(measured.weight).toBe('700')
    expect(measured.transform).toBe('uppercase')
  }

  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', {name: 'Toggle color theme'}).click()
  await expect(html).toHaveAttribute('data-theme', 'dark')
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')
})

test('/app is marked noindex', async ({page}) => {
  await page.goto('/app')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})

test('/app is absent from the sitemap', async ({page}) => {
  const index = await page.request.get('/sitemap-index.xml')
  expect(index.status()).toBe(200)
  // Follow each referenced sitemap and assert no /app URL appears anywhere.
  const urls = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  for (const sitemapUrl of urls) {
    const sm = await page.request.get(sitemapUrl)
    expect(await sm.text()).not.toContain('/app')
  }
})
