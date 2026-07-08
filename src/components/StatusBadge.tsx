import type { FodmapStatus } from '../lib/status'
import { STATUS_META } from '../lib/status'

export default function StatusBadge({ status }: { status: FodmapStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: meta.soft, color: meta.ink }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: meta.color }}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  )
}
