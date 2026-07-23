import {defineConfig, devices} from '@playwright/test'

// Local runs build + preview the site; CI post-deploy runs pass BASE_URL
// (the Vercel deployment URL) and skip the web server.
const baseURL = process.env.BASE_URL ?? 'http://localhost:4321'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', {open: 'never'}]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    // Stop Vercel injecting its toolbar overlay on preview deployment URLs;
    // it intercepts pointer events and breaks click-based tests. The bypass
    // header gets CI past Deployment Protection (Vercel SSO) on preview URLs —
    // without it every request is answered with Vercel's login page.
    extraHTTPHeaders: {
      'x-vercel-skip-toolbar': '1',
      ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET
        ? {
            'x-vercel-protection-bypass':
              process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
          }
        : {}),
    },
  },
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'mobile-safari', use: {...devices['iPhone 14']}},
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'bun run build && bun run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
