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

test('experience renders as ledger rows', async ({page}) => {
  await page.goto('/experience/')

  const experience = page.locator('section[aria-label="Professional experience"]')
  await expect(experience.locator('.section-chip')).toHaveText('Experience')
  await expect(experience.locator('.ledger-row')).toHaveCount(7)
  await expect(experience.locator('.triangle-list')).toHaveCount(7)
  await expect(experience.locator('[class*="timeline"]')).toHaveCount(0)

  const education = page.locator('section[aria-label="Education"]')
  await expect(education.locator('.section-chip')).toHaveText('Education')
  await expect(education.locator('.ledger-row')).toHaveCount(2)
})

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
  // Production builds carry CF_TURNSTILE_SITE_KEY; a local build without it must
  // render the form offline rather than post unverified messages.
  if ((await form.getAttribute('data-turnstile')) === 'ready') {
    await expect(form.locator('.cf-turnstile')).toHaveAttribute('data-sitekey', /.+/)
    await expect(form.locator('button[type="submit"]')).toBeEnabled()
  } else {
    await expect(form).toHaveAttribute('data-turnstile', 'missing')
    await expect(form.locator('button[type="submit"]')).toBeDisabled()
    await expect(page.locator('[data-form-unconfigured]')).toBeVisible()
  }
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
