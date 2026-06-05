import {aviouslySwap} from '~/lib/aviously'

/**
 * Site copy for the single snarky voice. See CONTEXT.md → "Aviously Voice".
 *
 * One voice ships now ("aviously"), but the Record/Voice shape is the seam
 * ("The Hook") left in place so additional voices/personas can return later
 * without rewriting content.
 */
export type VoiceKey = 'aviously'

/**
 * A unit of copy authored with the canonical "obviously". `pinned` forces the
 * aviously swap on regardless of the global hook (proper-name puns).
 */
export type Copy = {text: string; pinned?: boolean}

export type Voice = {
  key: VoiceKey
  label: string
  hero: {
    title: Copy
    subhead: Copy
  }
  about: Copy
  workBadge: Copy
}

export const aviously: Voice = {
  key: 'aviously',
  label: 'Aviously',
  hero: {
    title: {text: "Hi, obviously I'm Avi.", pinned: true},
    subhead: {
      text: 'A fully-formed AI-assisted human who builds solutions that work and cares how they turn out. Obviously.',
    },
  },
  about: {
    text: 'I build real things and use the robots without letting them write the personality. Obviously.',
  },
  workBadge: {text: 'Open to interesting challenges.'},
}

export const voices: Record<VoiceKey, Voice> = {aviously}
export const defaultVoice = aviously

/** Render a Copy unit through the hook. Pinned copy always renders swapped. */
export function renderCopy(copy: Copy, hookEnabled = true): string {
  return aviouslySwap(copy.text, copy.pinned || hookEnabled)
}
