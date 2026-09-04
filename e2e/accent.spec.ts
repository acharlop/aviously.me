import {expect, test, type Page} from '@playwright/test'

// Accent picker (#44): six swatches in the header set --accent site-wide,
// persist in localStorage, survive reloads and view-transition navigation,
// and never touch the resume sheet or the print palette.

const rootAccent = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim())

test('picking an accent applies it site-wide and survives reload and navigation', async ({page}) => {
  await page.goto('/')
  const picker = page.getByRole('group', {name: 'Accent colour'})
  await expect(picker.getByRole('button')).toHaveCount(6)
  expect(await rootAccent(page)).toBe('#4dffb4')
  await expect(picker.getByRole('button', {name: 'Accent: mint'})).toHaveAttribute('aria-pressed', 'true')

  // The click listener is a deferred module script; retry until it has attached.
  const yellow = picker.getByRole('button', {name: 'Accent: yellow'})
  await expect(async () => {
    await yellow.click()
    await expect(yellow).toHaveAttribute('aria-pressed', 'true', {timeout: 1000})
  }).toPass()
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(picker.getByRole('button', {name: 'Accent: mint'})).toHaveAttribute('aria-pressed', 'false')
  expect(await page.evaluate(() => localStorage.getItem('accent'))).toBe('yellow')

  await page.reload()
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(page.getByRole('button', {name: 'Accent: yellow'})).toHaveAttribute('aria-pressed', 'true')

  // A view-transition navigation replaces <html>'s attributes; the accent has to come back.
  await page.goto('/about/')
  await page.getByRole('link', {name: 'Avi Charlop home'}).click()
  await expect(page).toHaveURL('/')
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(page.getByRole('button', {name: 'Accent: yellow'})).toHaveAttribute('aria-pressed', 'true')

  // Both themes share the accent.
  await page.locator('[data-theme-toggle]').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/)
  expect(await rootAccent(page)).toBe('#e8ff3a')
})

test('the picker is keyboard operable', async ({page}) => {
  await page.goto('/')
  const cyan = page.getByRole('button', {name: 'Accent: cyan'})
  await expect(async () => {
    await cyan.focus()
    await page.keyboard.press('Enter')
    await expect(cyan).toHaveAttribute('aria-pressed', 'true', {timeout: 1000})
  }).toPass()
  expect(await rootAccent(page)).toBe('#2ee6ff')

  const lilac = page.getByRole('button', {name: 'Accent: lilac'})
  await lilac.focus()
  await page.keyboard.press('Space')
  await expect(lilac).toHaveAttribute('aria-pressed', 'true')
  expect(await rootAccent(page)).toBe('#c9a6ff')
})

test('the resume sheet and the print palette ignore the picked accent', async ({page}) => {
  await page.goto('/resume/')
  await page.evaluate(() => localStorage.setItem('accent', 'orange'))
  await page.reload()
  expect(await rootAccent(page)).toBe('#ff6a1a')
  const sheetAccent = () =>
    page.evaluate(() => getComputedStyle(document.querySelector('.sheet')!).getPropertyValue('--accent').trim())
  expect(await sheetAccent()).toBe('#4dffb4')

  await page.emulateMedia({media: 'print'})
  expect(await rootAccent(page)).toBe('#4dffb4')
  expect(await sheetAccent()).toBe('#4dffb4')
})
