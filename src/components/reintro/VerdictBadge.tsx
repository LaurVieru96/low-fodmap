import type { Verdict } from '../../lib/reintro'
import { VERDICT_META } from '../../lib/reintro'

/** Accent/neutral/berry — never traffic colors, which stay reserved for FODMAP status. */
const STYLE: Record<Verdict, string> = {
  tolerated: 'bg-accent-soft text-accent',
  partial: 'bg-sunk text-ink-soft',
  'not-tolerated': 'border border-berry/40 text-berry',
}

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLE[verdict]}`}
    >
      {VERDICT_META[verdict].label}
    </span>
  )
}
