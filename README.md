# aviously.me

Avi's personal site and public workbench.

The current direction is **Old-School Service, Modern Tools**: custom tools for busy businesses, built by an AI-assisted human who can understand duct-tape work and build the thing.

## Stack

- Bun
- TanStack Start
- React
- Convex
- PostHog

## Local Development

```sh
bun install
bun run dev
```

The web app runs on `http://localhost:3000`.

Convex is scaffolded but optional for the first static slice:

```sh
bun run dev:convex
```

Copy the generated Convex URL into `.env.local` as `VITE_CONVEX_URL`.

## Project Notes

- Domain language lives in `CONTEXT.md`.
- Architecture notes live in `docs/architecture.md`.
- Long-lived technical decisions live in `docs/adr/`.
- Session continuation notes live in `HANDOFF.md` when present.
