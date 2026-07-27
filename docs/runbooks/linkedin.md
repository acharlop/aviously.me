# Runbook: sync LinkedIn with the site

LinkedIn's official API does **not** allow editing profile fields (headline,
website, experience) — the only member-grantable write scope is
`w_member_social` (publishing posts). Unofficial browser automation with saved
credentials violates LinkedIn's ToS and risks an account restriction, so
profile updates stay human-applied. This runbook makes that a 10-minute
paste job instead of re-writing anything.

## Source of truth

`src/data/experience.ts` + `src/data/site.ts`. Never write LinkedIn copy by
hand — regenerate it:

```sh
bun scripts/linkedin-copy.ts
```

The output is one block per LinkedIn field/section, in the order you'll meet
them in the UI.

## Profile audit — 2026-07-27

Read live from linkedin.com/in/acharlop. Work top-down; the first four are the
ones that actually cost interviews.

**Missing entirely — add:**

1. **Vionlabs (Team Lead, Feb 2025 – Feb 2026) is not on the profile at all.**
   The most recent role, the only explicit lead title, and the one the About
   section already brags about. Biggest single gap.
2. **Closer (Contract Full-Stack Engineer, May 2026 – Present)** — no current
   role is listed, so the profile reads as unemployed since 2024.
3. **About section is empty.** Paste the ABOUT block.
4. **Education section is empty.** Neither Ironhack nor CCNY is listed.
5. **Skills: only 11, and mostly wrong ones** ("Process Automation" is the
   top-weighted skill). Paste the SKILLS block — recruiter search filters on
   these. Keep the Angular _Passed LinkedIn Skill Assessment_ badge.

**Worth keeping / already good on LinkedIn:**

- **Headline** is currently "Integrating tech and empowering deep meaningful
  connections". It is genuinely distinctive but reads as community/coaching,
  not senior engineer, and it is what recruiters see in search results.
  Replace the headline with the HEADLINE block, but the old line is a good fit
  for the **WhoCards** role description or the closing line of About — don't
  just delete it.
- **TzConnect** entry (Nov 2022 – Jan 2023, Berlin) with the CIRCA link — keep
  as its own position; the resume now carries it as a Freelance bullet.
- **Tech Consulting (Owner & Lead Consultant, 2013 – 2019)** and the two
  **IT Technician** roles (2010 – 2013) — off the resume by design, but they
  explain the pre-2016 timeline on LinkedIn. Leave them.
- Net2phone's four sub-roles are richer than the resume's single entry.
  Keep them; the resume deliberately collapses them.

**Reconcile — profile and resume disagreed:**

| Field              | LinkedIn                  | Now on resume                                  |
| ------------------ | ------------------------- | ---------------------------------------------- |
| collect.AI dates   | Aug 2023 – Sep 2024       | matched to LinkedIn                            |
| Takt Digital dates | Jul 2016 – Jan 2017       | matched to LinkedIn                            |
| Net2phone dates    | Jan 2017 – Dec 2022       | matched to LinkedIn                            |
| collect.AI title   | Senior Frontend Developer | Senior Frontend **Engineer** — change LinkedIn |
| Net2phone name     | "Net2Phone" / "net2phone" | "Net2phone" — pick one, apply to both          |
| WhoCards title     | Chief Technology Officer  | **Co-founder** — change LinkedIn               |

**Also:** set **Open to work** (recruiters-only visibility), and set Location
from the LOCATION block.

## Steps (manual)

1. Run the script above; keep the terminal beside the browser.
2. linkedin.com/in/acharlop → **Contact info → Website**: paste the URL block
   (`https://aviously.me`, type Portfolio). _(This is TODO.md item 1 / issue #11.)_
3. Pencil icon on the intro card → **Headline** and **Location**: paste those
   blocks.
4. **About** section → paste the About block.
5. **Skills** → paste the Skills block (see the audit above; this section is
   currently near-empty and it drives recruiter search).
6. **Experience**: for each `EXPERIENCE —` block, edit (or add) the position and
   paste Title / Company / Dates / Location / Description. Bullets paste fine
   as plain `•` lines. Net2phone sub-roles: LinkedIn supports multiple
   positions under one company — the script marks each with `↳`.
7. **Education**: paste the two education blocks.
8. Skip anything that would _lose_ LinkedIn-only detail (recommendations,
   media attachments); this runbook only pushes text content.

## Steps (assisted browser)

The Claude-in-Chrome extension can drive your **already-logged-in** browser
while you watch — no stored credentials, you approve what happens. In a Claude
Code session:

> open my LinkedIn profile in Chrome and walk through
> docs/runbooks/linkedin.md with me, filling each section from
> `bun scripts/linkedin-copy.ts`

Supervise the session and click Save yourself where it matters. If LinkedIn
shows a checkpoint/captcha, stop and finish by hand.

## When to re-run

Any time `experience.ts` changes materially (new role, reworded bullets).
The resume exports (`/resume.md` etc.) update automatically on deploy;
LinkedIn is the only surface that needs this manual push.

## Posting the site announcement (optional, API-able)

Publishing a _post_ announcing aviously.me is the one thing the API can do
(OAuth `w_member_social`), but for a one-off it's faster to post by hand.
