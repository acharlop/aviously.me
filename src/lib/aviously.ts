/**
 * The obviously↔aviously swap. See CONTEXT.md → "The Hook".
 *
 * Copy is authored with the canonical word "obviously". When the hook is
 * enabled the swap renders it as the signature pun "aviously". Pinned copy
 * (proper-name puns like the hero title) always renders swapped, regardless
 * of the global toggle.
 */
export function aviouslySwap(text: string, enabled = true): string {
  if (!enabled) return text
  return text.replace(/Obviously/g, 'Aviously').replace(/obviously/g, 'aviously')
}
