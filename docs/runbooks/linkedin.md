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

## Steps (manual)

1. Run the script above; keep the terminal beside the browser.
2. linkedin.com/in/acharlop → **Contact info → Website**: paste the URL block
   (`https://aviously.me`, type Portfolio). *(This is TODO.md item 1 / issue #11.)*
3. Pencil icon on the intro card → **Headline**: paste the headline block.
4. **About** section → paste the About block.
5. **Experience**: for each `EXPERIENCE —` block, edit (or add) the position and
   paste Title / Company / Dates / Location / Description. Bullets paste fine
   as plain `•` lines. Net2phone sub-roles: LinkedIn supports multiple
   positions under one company — the script marks each with `↳`.
6. **Education**: paste the two education blocks.
7. Skip anything that would *lose* LinkedIn-only detail (recommendations,
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

Publishing a *post* announcing aviously.me is the one thing the API can do
(OAuth `w_member_social`), but for a one-off it's faster to post by hand.
