# Aviously Architecture

## Product Shape

Aviously is a personal site with a practical business front door. The v1 homepage should make one offer clear: old-school service, modern tools, and practical software plus AI-assisted systems for owner-operated businesses with duct-tape work.

The site should feel like a small interactive world, inspired by Supaplex-era PC games, without making the business message hard to read. The first public experience is a landing page plus an experiential intake shell.

## Application Stack

- **Runtime and package manager**: Bun.
- **Web framework**: TanStack Start with file routes under `src/routes`.
- **Frontend**: React, plain CSS modules/global CSS for the first visual system.
- **Backend/data**: Convex for visitor intake, future contact experiences, and dynamic site data.
- **Analytics**: PostHog through a client provider, disabled unless Vite environment variables are present.

## Content Model

Site copy is organized around **Human Personas**. A persona is not a visual theme or a marketing segment; it is a voice and point of view applied to the same underlying offer.

The v1 default persona is **The Guy**: plainspoken, useful, lightly snarky, and credible enough to make an owner-operated business feel like they found someone who can actually build the thing.

Future personas should reuse the same content keys where possible:

- `guy`
- `seniorDev`
- `projectPartner`
- `businessHelper`
- `human`

This can evolve into an i18n-style routing or content layer later, where each persona behaves like a language.

## First Experience

The first experiential input asks visitors to choose a plain-language business type and describe the duct-tape work holding things together. The initial implementation should not depend on speech-to-text, but the structure should leave room for:

- voice recording,
- transcription,
- tone/filter knobs,
- AI-assisted rewriting,
- saving the original and transformed message.

The job of the interaction is to encourage visitors to think and feel. Lead capture is a side effect, not the main texture.

## Open Questions

- Which business types should ship in the first dropdown?
- Should the intake submit immediately by email, Convex-only storage, or both?
- Which speech-to-text provider should be used first?
- Should tone knobs transform text locally in the browser, through a server function, or through Convex actions?
- How literal can the Supaplex influence be before it creates copyright or clarity problems?
- What music/audio assets are original, licensed, or safe to use?
- Which of Avi's local/GitHub projects should become canonical project entries?

## Deployment Notes

- The `/designs` routes are temporary design exploration pages. Hide, comment out, or remove them before deploying a public version of the site.
