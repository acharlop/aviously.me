import {expect, test} from '@playwright/test'

test('header navigation reaches every page', async ({page, isMobile}) => {
  const links = [
    {label: 'About', path: '/about/'},
    {label: 'Work', path: '/work/'},
    {label: 'Experience', path: '/experience/'},
    {label: 'Open Source', path: '/open-source/'},
    {label: 'Contact', path: '/contact/'},
  ]

  for (const {label, path} of links) {
    await page.goto('/')
    if (isMobile) {
      // The menu listener is a deferred module script; retry until it has attached.
      await expect(async () => {
        await page.locator('[data-menu-toggle]').click()
        await expect(page.locator('[data-mobile-panel]')).toBeVisible({timeout: 1000})
      }).toPass()
      await page.locator('[data-mobile-panel]').getByRole('link', {name: label}).click()
    } else {
      await page.locator('header nav.desktop-nav').getByRole('link', {name: label}).click()
    }
    // Wait for the navigation to actually commit before asserting content —
    // the h1 check alone can pass against the previous page (every page has
    // one), leaving the click's navigation in flight when the next goto('/')
    // starts, which webkit reports as "interrupted by another navigation".
    await expect(page).toHaveURL(path)
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
