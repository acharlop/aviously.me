import {expect, test} from '@playwright/test'

const pages = ['/', '/about/', '/work/', '/experience/', '/open-source/', '/contact/']

for (const path of pages) {
  test(`${path} renders`, async ({page}) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page).toHaveTitle(/Avi Charlop/)
  })
}

test('blog is not linked in navigation', async ({page}) => {
  await page.goto('/')
  await expect(page.locator('nav a[href*="/blog"]')).toHaveCount(0)
})

test('rss feed is served', async ({page}) => {
  const response = await page.request.get('/rss.xml')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('<rss')
})

test('robots.txt is served', async ({page}) => {
  const response = await page.request.get('/robots.txt')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('Sitemap')
})
