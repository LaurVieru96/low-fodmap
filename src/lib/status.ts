export type FodmapStatus = 'green' | 'amber' | 'red'

export interface StatusMeta {
  /** Short Romanian label shown to the user. */
  label: string
  /** Solid status color (dots, dial fills). */
  color: string
  /** Tinted background for pills/rows. */
  soft: string
  /** Darkened status color for legible text on `soft`. */
  ink: string
}

export const STATUS_META: Record<FodmapStatus, StatusMeta> = {
  green: {
    label: 'Permis',
    color: 'var(--color-green)',
    soft: 'var(--color-green-soft)',
    ink: 'var(--color-green-ink)',
  },
  amber: {
    label: 'Cu limită',
    color: 'var(--color-amber)',
    soft: 'var(--color-amber-soft)',
    ink: 'var(--color-amber-ink)',
  },
  red: {
    label: 'De evitat',
    color: 'var(--color-red)',
    soft: 'var(--color-red-soft)',
    ink: 'var(--color-red-ink)',
  },
}
