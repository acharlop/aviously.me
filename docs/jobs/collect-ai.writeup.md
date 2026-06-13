# Collect.AI — Senior Frontend Engineer

**Dates:** August 2023 – August 2024 (resume). *Your commits in `cai-portal` span into 2024 (repo history 2018→2024-08).*
**Location:** Remote
**Company:** collectAI — a German **debt-collection / receivables-management SaaS** platform.

> Reconstructed from `~/code/cai/cai-portal/` → GitHub `collectai/cai-portal`. You authored **~134 commits** in a large, long-lived monorepo (5,247 commits, ~10+ contributors).

## What it is

`cai-portal` — the customer-facing portal for collectAI's automated dunning / collections platform. Operators manage debtor "claims," letters/messages (email, post via **EPost**, EPC-QR payment codes — German bank-transfer QR), settings, and contact workflows.

**Monorepo workspaces:** `client` (React SPA), `api`, `client-sdk` (published component/SDK package), `styles`, `devproxy`, `e2e`.

## Tech stack (confirmed)

- **React + TypeScript** SPA
- **Redux Toolkit + RTK Query** (`@reduxjs/toolkit`, `react-redux`) for state & data fetching
- **MUI** (`@mui/material`) based internal **component library** documented in **Storybook**
- **React Hook Form** — powering a type-safe **form generator**
- `ace-builds` (Ace editor) for in-app code editing
- **i18n** (i18next migration work)
- CI on **CircleCI** + Docker; later **GitHub Packages** + reusable GitHub Actions

## What you actually did (from commit history)

- **Type-safe form generator** built on React Hook Form + the internal component library (added select-input options, etc.) — standardizing form development across the app
- **Internal component library / SDK**: contributed many components and Storybook stories ("fix all components to show code"), consumer-configurable component props (e.g. Drawer close-icon color), and a **"test and publish SDK" workflow** — this is the package-management modernization (NPM → GitHub Packages) and reusable Actions in the resume
- **UI overhaul work**: confirm-dialog radius/alignment, stable scrollbar gutters, modal polish, loading states, info-icon variants — the design-consistency pass
- **Feature work**: read-only view for operator role, EPost as a mail provider, EPC-QR predefined codes, claims-history email handling, contact-collection linking
- **Build/infra**: CircleCI + Docker cleanup, webpack error fixes, i18n migration bug fixes, IAM policy for CCS

## Suggested resume bullets (sharper)

- Senior frontend engineer on collectAI's React/TypeScript collections portal (a 5k-commit monorepo), authoring ~130 commits across the app, an MUI-based component library, and a published client SDK.
- Built a type-safe form generator on React Hook Form + the internal component library, standardizing form development across the platform.
- Introduced Redux Toolkit + RTK Query to simplify state management and data fetching.
- Drove a UI-consistency overhaul (Storybook-documented components) and modernized package management from NPM to GitHub Packages with reusable GitHub Actions and a publish-and-test SDK pipeline.
