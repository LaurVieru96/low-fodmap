import type { FodmapStatus } from '../lib/status'
import { STATUS_META } from '../lib/status'
import type { DialStop } from '../lib/types'

const FILL: Record<FodmapStatus, string> = {
  green: 'var(--color-green)',
  amber: 'var(--color-amber)',
  red: 'var(--color-red)',
}

interface ServingDialProps {
  stops: DialStop[]
  caption?: string
}

/**
 * The signature element: shows how one food's FODMAP status shifts as the
 * serving grows (green → amber → red). This is the single non-obvious truth
 * of the diet, so it gets a dedicated, reusable visualization.
 */
export default function ServingDial({ stops, caption }: ServingDialProps) {
  const label = stops
    .map((s) => `${s.grams}: ${STATUS_META[s.status].label.toLowerCase()}`)
    .join(', ')

  return (
    <figure className="m-0">
      <div className="flex gap-1" role="img" aria-label={`Porție — ${label}`}>
        {stops.map((s, i) => (
          <div
            key={i}
            className="h-2.5 flex-1 rounded-full"
            style={{ background: FILL[s.status] }}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {stops.map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <div className="font-mono text-[13px] font-medium text-ink">{s.grams}</div>
            {s.note && <div className="text-[11px] text-muted">{s.note}</div>}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
