# Job writeups

Reconstructed from local code in `~/code/` and GitHub (`acharlop` + orgs `whocards`, `closerdao`, `ProjectJHammer`), cross-referenced against `src/data/experience.ts`. Purpose: give you accurate detail to write up each role — the git logs remember what you don't.

Each file: real tech stack, what you actually built (from commit history), and sharper suggested resume bullets. **Verify any specific metric/claim before publishing.**

## Index

| Writeup | Role | Dates | Status |
|---|---|---|---|
| [closer](closer.writeup.md) | Contract Full-Stack @ Closer (closer.earth) | May 2026 – present | 🟢 **ACTIVE** — not in `experience.ts` |
| [ecsfood](ecsfood.writeup.md) | Freelance — WordPress→Astro rebuild | ~May 2026 – present | 🟢 **ACTIVE (in progress)** — not in `experience.ts` |
| [vionlabs](vionlabs.writeup.md) | Team Lead @ Vionlabs | Feb 2025 – Feb 2026 | done (your commits run to Dec 2025) |
| [collect-ai](collect-ai.writeup.md) | Senior Frontend @ collectAI | Aug 2023 – Aug 2024 | done |
| [freelance](freelance.writeup.md) | Freelance — whocards, J3D.AI, Tezos/NFT | Oct 2022 – Jun 2023 | whocards still active (commits to Jun 2026) |
| [net2phone](net2phone.writeup.md) | Eng Lead / Full-Stack @ Net2phone | Feb 2017 – Nov 2022 | done — **source recovered** from external drive (`n2p/`, `LiveNinja/dialer`) |
| [takt-digital](takt-digital.writeup.md) | Software Engineer @ Takt Digital | May 2016 – Jan 2017 | done — **source recovered** from external drive (`old/Takt`) |

## Gaps vs. current `src/data/experience.ts`

The site's experience list is **missing two recent/active engagements**:

1. **Closer (closer.earth)** — substantial 2026 contract work; the `closer-procurement` system (one-click multi-cloud "village" deployment) is a strong, current portfolio piece. **Recommend adding it.**
2. **ECSFood.com** — a smaller WordPress→Astro migration with automated visual-parity testing; could be a standalone line or folded into "Freelance".

Other notes:
- **Vionlabs** end date: "February 2026" is correct — paid through end of Feb even though hands-off work stopped ~December 2025 (where your commits end). Keep Feb 2026.
- **Vionlabs** stack in the resume omits **Drizzle ORM**, **GCP specifics** (Cloud Run, Cloud SQL, Pub/Sub, Eventarc, Secret Manager), **WorkOS SSO**, and the **design-system/Storybook** work — all confirmed in the code and worth adding.
- **Freelance Tezos/NFT** work was more substantial than the resume implies — 200+ commits in tzConnect Berlin's `marina` and real contributions to fxhash `live-minting`.
- **whocards** "two shipping providers" = **Zenfulfillment** (removed `#30`, Jun 2024) → **Egon** (`#29`, Jan 2025), confirmed in git history. Egon routes to regional carriers (DHL/DPD/GLS) by country.

## Method / provenance

- Git ranges and commit counts came from `git log` per repo; "yours" = commits authored by `acharlop` / `avicharlop@gmail.com` / `avi@vionlabs.com` / "Avi Charlop".
- Several top-level dirs (`vionlabs/`, `cai/`, `closer/`, `whocards/`) are workspaces containing multiple nested git repos.
- Net2phone and Takt source was recovered from the external drive at `/Volumes/MIND GEM/stark tower - transfer/code` (`n2p/`, `LiveNinja/`, `old/Takt/`). The Angular component library is confirmed (`n2p-unite-services/webapp`, Angular 5), but the **v2→v9 upgrade endpoint is not** — the archive only reaches Angular 5 (history ends Nov 2018); the v9 work lived in a later repo not on this drive.
