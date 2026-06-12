import {expect, test} from '@playwright/test'

test('header navigation reaches every page', async ({page, isMobile}) => {
  const links = ['About', 'Work', 'Experience', 'Open Source', 'Contact']

  for (const label of links) {
    await page.goto('/')
    if (isMobile) {
      await page.locator('[data-menu-toggle]').click()
      await page.locator('[data-mobile-panel]').getByRole('link', {name: label}).click()
    } else {
      await page.locator('header nav.desktop-nav').getByRole('link', {name: label}).click()
    }
    await expect(page.locator('h1').first()).toBeVisible()
  }
})

test('work index links to a project detail page', async ({page}) => {
  await page.goto('/work/')
  const firstProject = page.locator('main a[href^="/work/"]').first()
  await firstProject.click()
  await expect(page).toHaveURL(/\/work\/.+/)
  await expect(page.locator('h1').first()).toBeVisible()
})

test('footer has social links', async ({page}) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer.getByRole('link', {name: 'GitHub'})).toHaveAttribute('href', /github\.com/)
  await expect(footer.getByRole('link', {name: 'LinkedIn'})).toHaveAttribute('href', /linkedin\.com/)
})

test('404 for unknown route', async ({page}) => {
  const response = await page.goto('/this-page-does-not-exist/')
  expect(response?.status()).toBe(404)
})
