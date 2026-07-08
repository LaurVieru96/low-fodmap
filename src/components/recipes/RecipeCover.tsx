import type { Recipe } from '../../lib/types'
import { MEAL_META } from '../../lib/recipeMeta'

interface RecipeCoverProps {
  recipe: Recipe
  /** Sizing/rounding classes for the cover box (e.g. "h-28", "h-40 rounded-3xl"). */
  className?: string
  emojiClass?: string
}

/** Recipe photo when available, otherwise a warm meal-type gradient with the meal emoji. */
export default function RecipeCover({
  recipe,
  className = '',
  emojiClass = 'text-5xl',
}: RecipeCoverProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={recipe.image ? undefined : { background: MEAL_META[recipe.mealType].cover }}
    >
      {recipe.image ? (
        <img
          src={recipe.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
          <span className={emojiClass}>{MEAL_META[recipe.mealType].emoji}</span>
        </div>
      )}
    </div>
  )
}
