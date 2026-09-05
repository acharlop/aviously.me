import {expect, test, type Page} from '@playwright/test'

// Accent picker (#44): a trigger in the header opens a flyout of six swatches
// that set --accent site-wide, persist in localStorage, survive reloads and
// view-transition navigation, and never touch the resume sheet or the print
// palette.

// Swatches live in a flyout that closes on pick, so pressed-state checks use
// CSS locators (role queries skip hidden elements).
const swatch = (page: Page, name: string) => page.locator(`[data-accent-swatch="${name}"]`)

const rootAccent = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim())

// The click listener is a deferred module script; retry until it has attached.
const openPicker = async (page: Page) => {
  const trigger = page.getByRole('button', {name: 'Choose accent colour'})
  await expect(async () => {
    if ((await trigger.getAttribute('aria-expanded')) !== 'true') await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true', {timeout: 1000})
  }).toPass()
  return page.getByRole('group', {name: 'Accent colour'})
}

test('picking an accent applies it site-wide and survives reload and navigation', async ({page}) => {
  await page.goto('/')
  const picker = await openPicker(page)
  await expect(picker.getByRole('button')).toHaveCount(6)
  expect(await rootAccent(page)).toBe('#4dffb4')
  await expect(picker.getByRole('button', {name: 'Accent: mint'})).toHaveAttribute('aria-pressed', 'true')

  const yellow = picker.getByRole('button', {name: 'Accent: yellow'})
  await yellow.click()
  await expect(swatch(page, 'yellow')).toHaveAttribute('aria-pressed', 'true')
  // Picking closes the flyout and hands focus back to the trigger.
  await expect(picker).toBeHidden()
  await expect(page.getByRole('button', {name: 'Choose accent colour'})).toHaveAttribute('aria-expanded', 'false')
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(swatch(page, 'mint')).toHaveAttribute('aria-pressed', 'false')
  expect(await page.evaluate(() => localStorage.getItem('accent'))).toBe('yellow')

  await page.reload()
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(swatch(page, 'yellow')).toHaveAttribute('aria-pressed', 'true')

  // A view-transition navigation replaces <html>'s attributes; the accent has to come back.
  await page.goto('/about/')
  await page.getByRole('link', {name: 'Avi Charlop home'}).click()
  await expect(page).toHaveURL('/')
  expect(await rootAccent(page)).toBe('#e8ff3a')
  await expect(swatch(page, 'yellow')).toHaveAttribute('aria-pressed', 'true')

  // Both themes share the accent.
  await page.locator('[data-theme-toggle]').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/)
  expect(await rootAccent(page)).toBe('#e8ff3a')
})

test('the picker is keyboard operable', async ({page}) => {
  await page.goto('/')
  await openPicker(page)
  // Opening moves focus to the current swatch.
  await expect(page.getByRole('button', {name: 'Accent: mint'})).toBeFocused()
  const cyan = page.getByRole('button', {name: 'Accent: cyan'})
  await cyan.focus()
  await page.keyboard.press('Enter')
  await expect(swatch(page, 'cyan')).toHaveAttribute('aria-pressed', 'true')
  expect(await rootAccent(page)).toBe('#2ee6ff')

  await openPicker(page)
  const lilac = page.getByRole('button', {name: 'Accent: lilac'})
  await lilac.focus()
  await page.keyboard.press('Space')
  await expect(swatch(page, 'lilac')).toHaveAttribute('aria-pressed', 'true')
  expect(await rootAccent(page)).toBe('#c9a6ff')

  // Escape closes without changing anything.
  await openPicker(page)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('group', {name: 'Accent colour'})).toBeHidden()
  await expect(page.getByRole('button', {name: 'Choose accent colour'})).toBeFocused()
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
