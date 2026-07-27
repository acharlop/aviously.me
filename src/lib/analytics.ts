// Client-side PostHog bootstrap for the public portfolio.
//
// Loaded from Layout.astro as a bundled `<script>`, so it ships as a deferred
// module and never blocks render. AppLayout.astro (the private /app area) does
// not use Layout.astro, so nothing here ever runs behind Convex auth.
//
// Traffic goes through the first-party `/ingest` reverse proxy configured in
// vercel.json, so ad-blockers that filter `*.i.posthog.com` don't silently
// erase the numbers. `ui_host` keeps "open in PostHog" links pointing at the
// real EU app.
import posthog from 'posthog-js'

const KEY = import.meta.env.PUBLIC_POSTHOG_KEY

// Vercel rewrites only exist on Vercel, so allow a direct host for local
// experiments. Unset in every deployed environment — the proxy is the default.
const API_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || '/ingest'
const UI_HOST = 'https://eu.posthog.com'

function shouldTrack(): boolean {
  if (!KEY) return false
  // Honour Do Not Track / Global Privacy Control before the SDK does anything.
  const nav = navigator as Navigator & {msDoNotTrack?: string; globalPrivacyControl?: boolean}
  if (nav.doNotTrack === '1' || nav.msDoNotTrack === '1' || nav.globalPrivacyControl === true) return false
  if ((window as {doNotTrack?: string}).doNotTrack === '1') return false
  return true
}

if (shouldTrack()) {
  posthog.init(KEY, {
    api_host: API_HOST,
    ui_host: UI_HOST,
    defaults: '2025-05-24',

    // Astro does client-side nav on some routes; catch those too.
    capture_pageview: 'history_change',
    capture_pageleave: true,

    // Anonymous visitors stay anonymous — no person record is created unless
    // something explicitly calls identify(). Nothing on the site does.
    person_profiles: 'identified_only',

    // Cookieless: nothing is written to localStorage or document.cookie, so no
    // consent banner is owed and visitors aren't linked across page loads.
    persistence: 'memory',

    // Belt-and-braces alongside shouldTrack() above.
    respect_dnt: true,

    // Heatmaps on: click/rageclick coordinates and scroll depth per page, sent
    // as $heatmap events. Positions only — no element content beyond what
    // autocapture already sends, and no replay.
    capture_heatmaps: true,

    // Explicitly off: no replay, no surveys, no error autocapture.
    disable_session_recording: true,
    disable_surveys: true,
    capture_exceptions: false,

    // Autocapture records that *an* element was clicked (tag, css class, text
    // of the element). Never the value typed into an input — posthog-js strips
    // those. Kept on because it's the whole point of installing this.
    autocapture: true,
    // Don't collect arbitrary element attributes (data-*, hrefs of inputs...)
    // that could carry content we didn't intend to send.
    mask_all_element_attributes: true,
  })
}
