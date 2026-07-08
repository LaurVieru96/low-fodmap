import { useState } from 'react'
import { Heart, ShoppingBasket } from 'lucide-react'
import type { Food } from '../../lib/types'
import { CONFIDENCE_LABEL, GROUP_META } from '../../lib/fodmap'
import { STATUS_META } from '../../lib/status'
import { useFavorites } from '../../store/favorites-context'
import { useShopping } from '../../store/shopping-context'
import { useProfile } from '../../store/profile-context'
import { personalStatus } from '../../lib/personalStatus'
import { patientView } from '../../lib/patient'
import { getPatientRec } from '../../data/patient'
import Sheet from '../Sheet'
import StatusBadge from '../StatusBadge'
import PatientBadge from '../patient/PatientBadge'
import ServingDial from '../ServingDial'

interface FoodDetailSheetProps {
  food: Food | null
  onClose: () => void
}

export default function FoodDetailSheet({ food, onClose }: FoodDetailSheetProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addItem } = useShopping()
  const { profile } = useProfile()
  const [addedId, setAddedId] = useState<string | null>(null)
  const fav = food ? isFavorite('food', food.id) : false

  const personal = food && profile.personalized ? personalStatus(food, profile.tolerances) : null
  const shownStatus = personal ? personal.status : (food?.status ?? 'green')
  const unlocked = personal?.unlocked ?? false

  const patientRec = food ? getPatientRec(food.id) : undefined
  const pView = food && patientRec ? patientView(food.status, patientRec.stance) : null

  return (
    <Sheet open={food !== null} onClose={onClose} title={food?.nameRo}>
      {food && (
        <div className="pr-6">
          <div className="flex items-start gap-3">
            <span className="text-4xl" aria-hidden="true">
              {food.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-semibold text-ink">{food.nameRo}</h2>
              {food.nameEn && <p className="text-sm text-muted">{food.nameEn}</p>}
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge status={shownStatus} />
              {unlocked && (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  pentru tine
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            {food.dial ? (
              <>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Cadranul de porție
                </p>
                <ServingDial stops={food.dial} />
              </>
            ) : (
              food.serving && (
                <div className="rounded-xl bg-sunk px-4 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                    Porție sigură
                  </span>
                  <div className="font-mono text-lg text-ink">{food.serving}</div>
                </div>
              )
            )}
          </div>

          {food.groups.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Subgrupe FODMAP
              </p>
              <div className="flex flex-wrap gap-2">
                {food.groups.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                    title={GROUP_META[g].label}
                  >
                    {GROUP_META[g].short}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pView && patientRec && (
            <div
              className={`mt-5 rounded-xl border px-4 py-3 ${
                pView === 'conflict'
                  ? 'border-berry/30 bg-berry-soft/40'
                  : 'border-accent/20 bg-accent-soft/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <PatientBadge view={pView} />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  pentru tine
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{patientRec.reason}</p>
              {pView === 'conflict' && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {patientRec.stance === 'recommended'
                    ? 'Raportul îl recomandă, dar dieta low-FODMAP îl evită.'
                    : 'Dieta low-FODMAP îl permite, dar raportul îl evită.'}
                  {patientRec.fodmapNote ? ` ${patientRec.fodmapNote}` : ''}
                </p>
              )}
              {pView !== 'conflict' && patientRec.fodmapNote && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {patientRec.fodmapNote}
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Sursă: raport derivat din analize, nu din laborator. Nu e sfat medical.
              </p>
            </div>
          )}

          {unlocked && (
            <div className="mt-5 rounded-xl border border-accent/20 bg-accent-soft/40 px-4 py-3">
              <p className="text-sm leading-relaxed text-ink-soft">
                <span className="font-semibold text-ink">
                  {STATUS_META[food.status].label} la Monash
                </span>
                {' din cauza: '}
                {food.groups.map((g) => GROUP_META[g].short).join(', ')}. Tu{' '}
                {food.groups.length > 1 ? 'le tolerezi' : 'o tolerezi'} → verde pentru tine.
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Presupune porții normale; stacking-ul și porțiile mari tot contează.
              </p>
            </div>
          )}

          {food.note && <p className="mt-5 leading-relaxed text-ink-soft">{food.note}</p>}

          {(food.confidence !== 'monash' || food.flag) && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
              {food.flag ?? CONFIDENCE_LABEL[food.confidence]}
            </p>
          )}

          <button
            type="button"
            onClick={() => toggleFavorite('food', food.id)}
            className={`btn-ghost mt-6 w-full ${fav ? 'text-berry' : ''}`}
          >
            <Heart size={18} strokeWidth={2} fill={fav ? 'currentColor' : 'none'} />
            {fav ? 'Salvat la favorite' : 'Adaugă la favorite'}
          </button>
          <button
            type="button"
            onClick={() => {
              addItem(food.nameRo, food.category)
              setAddedId(food.id)
            }}
            className={`btn-ghost mt-2 w-full ${addedId === food.id ? 'text-accent' : ''}`}
          >
            <ShoppingBasket size={18} strokeWidth={2} />
            {addedId === food.id ? 'Adăugat la cumpărături' : 'Adaugă la cumpărături'}
          </button>
        </div>
      )}
    </Sheet>
  )
}
