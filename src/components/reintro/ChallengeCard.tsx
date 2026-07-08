import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import type { Challenge, Verdict } from '../../lib/reintro'
import { DOSE_STEPS, VERDICT_META, VERDICT_ORDER } from '../../lib/reintro'
import { GROUP_META } from '../../lib/fodmap'
import { getFoodById } from '../../data/foods'
import { useReintro } from '../../store/reintro-context'
import SymptomLogger from './SymptomLogger'

function firstUnloggedDay(c: Challenge): number {
  const next = DOSE_STEPS.find((s) => !c.days.some((d) => d.day === s.day))
  return (next ?? DOSE_STEPS[DOSE_STEPS.length - 1]).day
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { logDay, setVerdict, deleteChallenge } = useReintro()
  const [day, setDay] = useState(() => firstUnloggedDay(challenge))
  const [verdictOpen, setVerdictOpen] = useState(false)
  const [choice, setChoice] = useState<Verdict | null>(null)
  const [vNote, setVNote] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const food = challenge.foodId ? getFoodById(challenge.foodId) : undefined
  const existing = challenge.days.find((d) => d.day === day)
  const step = DOSE_STEPS.find((s) => s.day === day) ?? DOSE_STEPS[0]
  const groupLabel = GROUP_META[challenge.group].label

  return (
    <article className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
            {groupLabel}
          </span>
          <div className="mt-2 flex items-center gap-2">
            {food && (
              <span className="text-2xl" aria-hidden="true">
                {food.emoji}
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-ink">{challenge.foodName}</h3>
          </div>
        </div>
        <button
          type="button"
          onClick={() => (confirmDelete ? deleteChallenge(challenge.id) : setConfirmDelete(true))}
          onBlur={() => setConfirmDelete(false)}
          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-semibold transition-colors ${
            confirmDelete ? 'bg-berry-soft text-berry' : 'text-muted hover:bg-sunk'
          }`}
          aria-label="Șterge provocarea"
        >
          {confirmDelete ? 'Sigur?' : <Trash2 size={16} strokeWidth={2} aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {DOSE_STEPS.map((s) => {
          const logged = challenge.days.some((d) => d.day === s.day)
          const active = s.day === day
          return (
            <button
              key={s.day}
              type="button"
              onClick={() => setDay(s.day)}
              className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                active ? 'border-accent bg-accent-soft' : 'border-line hover:bg-sunk'
              }`}
            >
              <span className="block text-xs font-semibold text-ink">Ziua {s.day}</span>
              <span className="block text-[10px] text-muted">{s.label}</span>
              {logged && <span className="mt-0.5 block text-[10px] font-semibold text-accent">notat</span>}
            </button>
          )
        })}
      </div>

      <p className="mt-3 text-xs text-muted">{step.hint}</p>

      <div className="mt-3">
        <SymptomLogger
          key={`${challenge.id}-${day}`}
          existing={existing}
          onSave={(symptoms, note) => logDay(challenge.id, day, symptoms, note)}
        />
      </div>

      <div className="mt-5 border-t border-line pt-4">
        {!verdictOpen ? (
          <button type="button" onClick={() => setVerdictOpen(true)} className="btn-ghost w-full">
            Încheie cu verdict
          </button>
        ) : (
          <div>
            <p className="text-sm font-semibold text-ink">Cum ai tolerat {groupLabel.toLowerCase()}?</p>
            <p className="mt-0.5 text-xs text-muted">
              Ai notat {challenge.days.length}/3 zile. Verdictul actualizează automat „Pentru mine".
            </p>
            <div className="mt-3 space-y-2">
              {VERDICT_ORDER.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setChoice(v)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    choice === v ? 'border-accent bg-accent-soft' : 'border-line hover:bg-sunk'
                  }`}
                >
                  <span
                    className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                      choice === v ? 'border-accent bg-accent' : 'border-line'
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-ink">{VERDICT_META[v].label}</span>
                    <span className="block text-xs text-muted">{VERDICT_META[v].desc}</span>
                  </span>
                </button>
              ))}
            </div>
            <textarea
              value={vNote}
              onChange={(e) => setVNote(e.target.value)}
              rows={2}
              placeholder="Notă (opțional): pragul la care apar simptome…"
              className="mt-3 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setVerdictOpen(false)
                  setChoice(null)
                }}
                className="btn-ghost flex-1"
              >
                Renunță
              </button>
              <button
                type="button"
                disabled={!choice}
                onClick={() => choice && setVerdict(challenge.id, choice, vNote.trim())}
                className="btn-primary flex-1 disabled:opacity-40"
              >
                Salvează verdictul
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
