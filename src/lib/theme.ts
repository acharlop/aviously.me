// Flip the site theme and persist it. The pre-paint reader lives in
// src/components/ThemeInit.astro; this is the only writer.
export function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
  document.documentElement.dataset.theme = next
  localStorage.setItem('theme', next)
}
