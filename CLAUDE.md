# aviously.me

Personal site. Astro 5 + Tailwind 4, MDX content, Playwright e2e, deployed on Vercel. Use bun.

## Commands

- `bun run build` — astro check + build (run before pushing)
- `bun run e2e` — Playwright tests
- `bun run dev` — dev server

## Issue workflow

Labels flow: `triage` → `ready-for-agent` / `ready-for-human` / `blocked` → `in-progress` → `needs-review`. Triager scopes and labels, coder implements `ready-for-agent` issues on a branch with a PR (`closes #N`), reviewer reviews. Agents never merge PRs.

## Sessions

One goal per session. If work spans multiple goals or the session is getting long (approaching ~200K tokens), don't keep going: file the remaining work as GitHub issues or write a HANDOFF.md, then pick it up in a fresh session.
