import {expect, test} from '@playwright/test'

const pages = ['/', '/about/', '/work/', '/experience/', '/open-source/', '/contact/', '/resume/', '/now/']

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

test('llms.txt is served', async ({page}) => {
  const response = await page.request.get('/llms.txt')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('aviously.me')
})

test('contact form posts to a real backend', async ({page}) => {
  await page.goto('/contact/')
  const form = page.locator('form.contact-form')
  await expect(form).toHaveAttribute('action', '/api/contact')
  await expect(form).toHaveAttribute('method', 'post')
  await expect(form.locator('input[name="email"]')).toHaveAttribute('required', '')
  await expect(form.locator('.cf-turnstile')).toHaveAttribute('data-sitekey', /.+/)
})

test('contact page shows success notice after redirect', async ({page}) => {
  await page.goto('/contact/?sent=true')
  await expect(page.locator('[data-form-success]')).toBeVisible()
  await page.goto('/contact/')
  await expect(page.locator('[data-form-success]')).toBeHidden()
})

test('robots.txt is served', async ({page}) => {
  const response = await page.request.get('/robots.txt')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('Sitemap')
})
