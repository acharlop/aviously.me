import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'

export default defineConfig({
  site: 'https://aviously.me',
  output: 'static',
  integrations: [
    mdx(),
    react(),
    // The private /app learning area must never appear in the sitemap.
    sitemap({filter: (page) => !page.includes('/app')}),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Astro's base tsconfig sets `jsx: preserve`, which makes esbuild fall back
    // to the classic React.createElement transform for .tsx islands (throws
    // "React is not defined"). Force the automatic runtime for React files.
    esbuild: {jsx: 'automatic', jsxImportSource: 'react'},
  },
})
