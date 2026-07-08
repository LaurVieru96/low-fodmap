import type { PatientView } from '../../lib/patient'

// Patient recommendation pill — deliberately OFF the FODMAP traffic-light
// palette: accent (recommended), neutral (avoid), berry outline (conflict).
// Meaning is carried by text + glyph, never colour alone.
const META: Record<PatientView, { label: string; glyph: string; cls: string }> = {
  recommended: { label: 'Recomandat', glyph: '✓', cls: 'bg-accent-soft text-accent' },
  avoid: { label: 'De evitat', glyph: '✕', cls: 'bg-sunk text-ink-soft' },
  conflict: {
    label: 'Conflict FODMAP',
    glyph: '⚠',
    cls: 'border border-berry/40 text-berry',
  },
}

interface PatientBadgeProps {
  view: PatientView
  /** Row variant: glyph only, meaning kept in the accessible label. */
  compact?: boolean
}

export default function PatientBadge({ view, compact = false }: PatientBadgeProps) {
  const m = META[view]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.cls}`}
      title={m.label}
      aria-label={`Pentru tine: ${m.label}`}
    >
      <span aria-hidden="true">{m.glyph}</span>
      {!compact && m.label}
    </span>
  )
}
