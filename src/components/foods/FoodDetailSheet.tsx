import { useState } from 'react'
import { Heart, ShoppingBasket } from 'lucide-react'
import type { Food } from '../../lib/types'
import { CONFIDENCE_LABEL, GROUP_META } from '../../lib/fodmap'
import { useFavorites } from '../../store/favorites-context'
import { useShopping } from '../../store/shopping-context'
import Sheet from '../Sheet'
import StatusBadge from '../StatusBadge'
import ServingDial from '../ServingDial'

interface FoodDetailSheetProps {
  food: Food | null
  onClose: () => void
}

export default function FoodDetailSheet({ food, onClose }: FoodDetailSheetProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { addItem } = useShopping()
  const [addedId, setAddedId] = useState<string | null>(null)
  const fav = food ? isFavorite('food', food.id) : false

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
            <StatusBadge status={food.status} />
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
