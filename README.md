# aviously.me

Personal portfolio and technical writing site for Avi Charlop.

The site is built as a static Astro project with TypeScript, Tailwind CSS, MDX content, typed content collections, RSS, sitemap generation, dark mode, and reusable components for portfolio, experience, open source, blog, and contact pages.

## Local Development

```bash
bun install
bun run dev
```

Astro will print the local development URL, usually `http://localhost:4321`.

## Build

```bash
bun run build
bun run preview
```

`bun run build` runs `astro check` and `astro build`.

## Content

Project case studies live in:

```text
src/content/projects/
```

Blog posts live in:

```text
src/content/blog/
```

Blog posts use MDX frontmatter. Starter posts are marked `draft: true`, so they are visible as draft outlines in the site but excluded from the RSS feed.

Shared profile, navigation, experience, and open-source data live in:

```text
src/data/
```

## Adding A Blog Post

1. Create a new `.mdx` file in `src/content/blog/`.
2. Add frontmatter with `title`, `slug`, `description`, `publishedDate`, `draft`, `tags`, and `readingTime`.
3. Set `draft: false` only when the post is ready to be treated as published.

## Deployment

The project is static and can be deployed to Vercel, Netlify, Cloudflare Pages, or static hosting.

Recommended build command:

```bash
bun run build
```

Recommended output directory:

```text
dist
```
