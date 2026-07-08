import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { FodmapGroup } from '../../lib/types'
import { GROUP_META } from '../../lib/fodmap'
import { TOLERANCE_META } from '../../lib/profileMeta'
import { testFoodsForGroup } from '../../lib/reintro'
import { useReintro } from '../../store/reintro-context'
import { useProfile } from '../../store/profile-context'
import Sheet from '../Sheet'
import StatusBadge from '../StatusBadge'

const GROUPS: FodmapGroup[] = ['fructans', 'gos', 'lactose', 'fructose', 'sorbitol', 'mannitol']

interface NewChallengeSheetProps {
  open: boolean
  onClose: () => void
}

/** Guided two-step flow: pick the subgroup to isolate, then a food high in it. */
export default function NewChallengeSheet({ open, onClose }: NewChallengeSheetProps) {
  const { startChallenge } = useReintro()
  const { profile } = useProfile()
  const [group, setGroup] = useState<FodmapGroup | null>(null)
  const [custom, setCustom] = useState('')

  const close = () => {
    setGroup(null)
    setCustom('')
    onClose()
  }

  const begin = (foodId: string | undefined, foodName: string) => {
    if (!group || !foodName.trim()) return
    startChallenge({ group, foodId, foodName: foodName.trim() })
    close()
  }

  return (
    <Sheet open={open} onClose={close} title="Provocare nouă">
      {!group ? (
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Ce subgrupă testezi?</h2>
          <p className="mt-1 text-sm text-muted">
            Testează câte una pe rând — asta e cheia reintroducerii.
          </p>
          <div className="mt-4 space-y-2">
            {GROUPS.map((g) => {
              const tol = profile.tolerances[g]
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-left transition-colors hover:bg-sunk"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{GROUP_META[g].label}</span>
                    <span className="block text-xs text-muted">{GROUP_META[g].desc}</span>
                  </span>
                  {tol !== 'untested' && (
                    <span className="shrink-0 rounded-full bg-sunk px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                      {TOLERANCE_META[tol].label}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setGroup(null)}
            className="mb-3 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} strokeWidth={2} /> Înapoi
          </button>
          <h2 className="font-display text-xl font-semibold text-ink">Alege un aliment-test</h2>
          <p className="mt-1 text-sm text-muted">
            Pentru {GROUP_META[group].label.toLowerCase()}. Alege unul bogat în această subgrupă.
          </p>
          <div className="mt-4 space-y-2">
            {testFoodsForGroup(group).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => begin(f.id, f.nameRo)}
                className="flex w-full items-center gap-3 rounded-xl border border-line px-4 py-3 text-left transition-colors hover:bg-sunk"
              >
                <span className="text-2xl" aria-hidden="true">
                  {f.emoji}
                </span>
                <span className="min-w-0 flex-1 font-semibold text-ink">{f.nameRo}</span>
                <StatusBadge status={f.status} />
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
              Sau alt aliment
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="ex. iaurt normal"
                className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                disabled={!custom.trim()}
                onClick={() => begin(undefined, custom)}
                className="btn-primary shrink-0 disabled:opacity-40"
              >
                Începe
              </button>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  )
}
