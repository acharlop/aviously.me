// Shared class strings for the app area, all driven by the ledger tokens in
// src/styles/global.css. Rectangles only: no radius, no shadow.
export const mono = 'font-[family-name:var(--font-mono)]'

// Mono uppercase label: the ledger's chips, meta, and status text.
export const label = `${mono} text-[length:var(--text-sm)] uppercase tracking-[var(--tracking-mono)]`

// Ink-on-paper rectangle; flips to paper-on-ink on hover.
export const button = `${label} inline-flex items-center justify-center border border-[var(--text)] bg-transparent px-3 py-2 text-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] disabled:opacity-60`

// Paper-on-ink rectangle: the selected state of a button group.
export const buttonInk = `${label} inline-flex items-center justify-center border border-[var(--text)] bg-[var(--text)] px-3 py-2 text-[var(--bg)]`

// Accent fill: the one primary action on a screen.
export const buttonAccent = `${label} inline-flex items-center justify-center border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 font-bold text-[var(--on-accent)] disabled:opacity-60`

// Borderless input with a 1px bottom rule that becomes 1.5px accent on focus.
// Padding absorbs the extra half pixel so the field does not shift.
export const input = `w-full border-b border-[var(--line)] bg-transparent px-0 pt-2 pb-[8.5px] text-[var(--text)] outline-none placeholder:text-[var(--faint)] focus:border-b-[1.5px] focus:border-[var(--accent)] focus:pb-2`

// Mono link in the ink band.
export const bandLink = `${label} text-[var(--paper-muted)] hover:text-[var(--paper)]`
