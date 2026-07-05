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

test('/app is marked noindex', async ({page}) => {
  await page.goto('/app')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
})

test('/app is absent from the sitemap', async ({page}) => {
  const index = await page.request.get('/sitemap-index.xml')
  expect(index.status()).toBe(200)
  // Follow each referenced sitemap and assert no /app URL appears anywhere.
  const urls = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1],
  )
  for (const sitemapUrl of urls) {
    const sm = await page.request.get(sitemapUrl)
    expect(await sm.text()).not.toContain('/app')
  }
})
