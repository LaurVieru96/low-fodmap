import Sheet from '../Sheet'
import { useProfile } from '../../store/profile-context'
import { GROUP_META } from '../../lib/fodmap'
import type { FodmapGroup } from '../../lib/types'
import { PHASE_ORDER, PHASE_META, TOLERANCE_ORDER, TOLERANCE_META } from '../../lib/profileMeta'

const GROUP_KEYS = Object.keys(GROUP_META) as FodmapGroup[]

export default function ProfileSheet() {
  const { profile, setPhase, setTolerance, resetProfile, sheetOpen, closeSheet } = useProfile()

  return (
    <Sheet open={sheetOpen} onClose={closeSheet} title="Profilul meu">
      <div className="pr-6">
        <h2 className="font-display text-xl font-semibold text-ink">Profilul meu</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Spune-i aplicației unde ești în dietă și ce toleri — recolorează alimentele pentru tine.
        </p>

        <div className="mt-5 rounded-xl border border-line bg-sunk/50 px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Cum funcționează
          </p>
          <ol className="flex flex-col gap-1.5 text-sm leading-relaxed text-ink-soft">
            <li className="flex gap-2.5">
              <span className="font-mono text-xs font-semibold text-accent">1</span>
              <span>Spune în ce fază ești.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="font-mono text-xs font-semibold text-accent">2</span>
              <span>Bifează ce subgrupe toleri — le afli testând, în faza de reintroducere.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="font-mono text-xs font-semibold text-accent">3</span>
              <span>
                Pornește <span className="font-medium text-ink">„Pentru mine"</span> în pagina
                Alimente — semaforul se recolorează după tine.
              </span>
            </li>
          </ol>
          <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-xs leading-relaxed text-muted">
            <span className="mt-0.5 shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              pentru tine
            </span>
            <span>
              Un aliment 🔴/🟡 devine verde doar când <strong className="font-semibold text-ink-soft">toate</strong>{' '}
              subgrupele lui vinovate sunt tolerate de tine. Verdele nu se schimbă niciodată.
            </span>
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Faza dietei</p>
          <div className="flex flex-col gap-1.5 sm:flex-row">
            {PHASE_ORDER.map((ph) => {
              const active = profile.phase === ph
              return (
                <button
                  key={ph}
                  type="button"
                  onClick={() => setPhase(ph)}
                  aria-pressed={active}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line bg-surface text-ink-soft hover:bg-sunk'
                  }`}
                >
                  {PHASE_META[ph].label}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {PHASE_META[profile.phase].desc}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Ce toleri</p>
          <ul className="flex flex-col gap-3">
            {GROUP_KEYS.map((g) => {
              const current = profile.tolerances[g]
              return (
                <li key={g}>
                  <div className="font-display text-sm font-semibold text-ink">
                    {GROUP_META[g].label}
                  </div>
                  <div className="mt-1.5 flex gap-1.5">
                    {TOLERANCE_ORDER.map((t) => {
                      const active = current === t
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTolerance(g, t)}
                          aria-pressed={active}
                          className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                            active
                              ? 'border-accent bg-accent text-paper'
                              : 'border-line bg-surface text-muted hover:bg-sunk'
                          }`}
                        >
                          {TOLERANCE_META[t].label}
                        </button>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <button
          type="button"
          onClick={resetProfile}
          className="mt-6 text-sm text-muted underline underline-offset-2 transition-colors hover:text-ink"
        >
          Resetează profilul
        </button>
      </div>
    </Sheet>
  )
}
