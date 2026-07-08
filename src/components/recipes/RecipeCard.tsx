import { Link } from 'react-router-dom'
import { Clock, Heart } from 'lucide-react'
import type { Recipe } from '../../lib/types'
import { DIFFICULTY_META, tagLabel } from '../../lib/recipeMeta'
import { useFavorites } from '../../store/favorites-context'
import RecipeCover from './RecipeCover'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite('recipe', recipe.id)

  return (
    <li className="relative">
      <Link
        to={`/retete/${recipe.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40"
      >
        <RecipeCover recipe={recipe} className="h-28" />
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-base font-semibold text-ink">{recipe.title}</h3>
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} strokeWidth={2} aria-hidden="true" /> {recipe.totalTimeMin} min
            </span>
            <span aria-hidden="true">·</span>
            <span>{DIFFICULTY_META[recipe.difficulty].label}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {recipe.isUserRecipe && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                rețeta mea
              </span>
            )}
            {recipe.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-sunk px-2 py-0.5 text-[11px] text-ink-soft">
                {tagLabel(t)}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite('recipe', recipe.id)}
        aria-label={fav ? 'Scoate de la favorite' : 'Adaugă la favorite'}
        className={`absolute right-3 top-3 rounded-full bg-surface/90 p-1.5 shadow-sm transition-colors ${
          fav ? 'text-berry' : 'text-muted hover:text-ink'
        }`}
      >
        <Heart size={16} strokeWidth={2} fill={fav ? 'currentColor' : 'none'} />
      </button>
    </li>
  )
}
