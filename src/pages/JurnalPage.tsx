import { useState } from 'react'
import { NotebookPen, Plus, Trash2 } from 'lucide-react'
import { useReintro } from '../store/reintro-context'
import { GROUP_META } from '../lib/fodmap'
import { TOLERANCE_META } from '../lib/profileMeta'
import { verdictToTolerance } from '../lib/reintro'
import { getFoodById } from '../data/foods'
import ChallengeCard from '../components/reintro/ChallengeCard'
import NewChallengeSheet from '../components/reintro/NewChallengeSheet'
import VerdictBadge from '../components/reintro/VerdictBadge'

export default function JurnalPage() {
  const { challenges, deleteChallenge } = useReintro()
  const [sheetOpen, setSheetOpen] = useState(false)

  const active = challenges.filter((c) => c.status === 'active')
  const completed = challenges.filter((c) => c.status === 'completed')

  return (
    <div className="mx-auto max-w-2xl">
      <header>
        <h1 className="font-display text-3xl font-semibold text-ink">Jurnal de reintroducere</h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Faza 2 a dietei: reintroduci câte o subgrupă FODMAP pe rând — 3 zile cu doză crescătoare — și
          notezi simptomele. Așa afli exact ce toleri și în ce cantitate.
        </p>
        <p className="mt-2 text-sm text-muted">
          Verdictul fiecărei provocări actualizează automat toleranțele din „Pentru mine", care
          recolorează ghidul de alimente. Ideal, reintroducerea se face cu un dietetician — jurnalul te
          ghidează, nu e diagnostic.
        </p>
      </header>

      <button type="button" onClick={() => setSheetOpen(true)} className="btn-primary mt-5">
        <Plus size={18} strokeWidth={2.2} aria-hidden="true" />
        Provocare nouă
      </button>

      {challenges.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-line px-6 py-10 text-center">
          <NotebookPen size={26} strokeWidth={1.75} className="mx-auto text-muted" aria-hidden="true" />
          <p className="mt-3 font-semibold text-ink">Nicio provocare încă</p>
          <p className="mt-1 text-sm text-muted">
            Începe prima când ești pe fond low-FODMAP stabil de câteva săptămâni.
          </p>
        </div>
      )}

      {active.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            În desfășurare
          </h2>
          <div className="space-y-4">
            {active.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Încheiate
          </h2>
          <div className="space-y-2">
            {completed.map((c) => {
              const food = c.foodId ? getFoodById(c.foodId) : undefined
              const setTo = c.verdict ? TOLERANCE_META[verdictToTolerance(c.verdict)].label : null
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                >
                  {food && (
                    <span className="text-xl" aria-hidden="true">
                      {food.emoji}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-ink">{c.foodName}</span>
                      {c.verdict && <VerdictBadge verdict={c.verdict} />}
                    </div>
                    <span className="block text-xs text-muted">
                      {GROUP_META[c.group].label}
                      {setTo ? ` · „Pentru mine": ${setTo}` : ''}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteChallenge(c.id)}
                    aria-label="Șterge din jurnal"
                    className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-sunk"
                  >
                    <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <NewChallengeSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}
