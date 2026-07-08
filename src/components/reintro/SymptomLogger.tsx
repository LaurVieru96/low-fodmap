import { useState } from 'react'
import type { DayLog, Severity, Symptom } from '../../lib/reintro'
import { SEVERITY_META, SEVERITY_ORDER, SYMPTOM_META, SYMPTOM_ORDER } from '../../lib/reintro'

interface SymptomLoggerProps {
  existing?: DayLog
  onSave: (symptoms: Partial<Record<Symptom, Severity>>, note: string) => void
}

/** One test day's log: a 0–3 severity scale per symptom (monochrome accent, not
   traffic colors) plus an optional note. */
export default function SymptomLogger({ existing, onSave }: SymptomLoggerProps) {
  const [symptoms, setSymptoms] = useState<Partial<Record<Symptom, Severity>>>(
    existing?.symptoms ?? {},
  )
  const [note, setNote] = useState(existing?.note ?? '')
  const [saved, setSaved] = useState(false)

  const setSeverity = (s: Symptom, v: Severity) => {
    setSymptoms((prev) => ({ ...prev, [s]: v }))
    setSaved(false)
  }

  return (
    <div>
      <div className="space-y-1.5">
        {SYMPTOM_ORDER.map((s) => {
          const current = symptoms[s] ?? 0
          return (
            <div key={s} className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink-soft">{SYMPTOM_META[s].label}</span>
              <div className="flex gap-1" role="group" aria-label={`Severitate: ${SYMPTOM_META[s].label}`}>
                {SEVERITY_ORDER.map((v) => {
                  const active = current === v
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSeverity(s, v)}
                      aria-pressed={active}
                      title={SEVERITY_META[v].label}
                      className={`h-7 w-8 rounded-md text-xs font-semibold transition-colors ${
                        active ? 'bg-accent text-paper' : 'border border-line text-muted hover:bg-sunk'
                      }`}
                    >
                      {SEVERITY_META[v].short}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="Notă (opțional): ce ai mâncat, cât, cum te-ai simțit…"
        className="mt-3 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />

      <button
        type="button"
        onClick={() => {
          onSave(symptoms, note.trim())
          setSaved(true)
        }}
        className="btn-primary mt-3 w-full"
      >
        {saved ? 'Salvat ✓' : 'Salvează ziua'}
      </button>
    </div>
  )
}
