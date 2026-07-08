import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Heart, Users } from 'lucide-react'
import { getRecipeById } from '../data/recipes'
import { DIFFICULTY_META, MEAL_META, tagLabel } from '../lib/recipeMeta'
import { STATUS_META } from '../lib/status'
import { useFavorites } from '../store/favorites-context'
import { useUserRecipes } from '../store/userRecipes-context'

export default function RecipeDetailPage() {
  const { id } = useParams()
  const { userRecipes } = useUserRecipes()
  const { isFavorite, toggleFavorite } = useFavorites()

  const recipe = (id ? getRecipeById(id) : undefined) ?? userRecipes.find((r) => r.id === id)

  if (!recipe) {
    return (
      <div>
        <Link
          to="/retete"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Înapoi la rețete
        </Link>
        <h1 className="mt-4 text-2xl text-ink">Rețeta nu există</h1>
      </div>
    )
  }

  const fav = isFavorite('recipe', recipe.id)

  return (
    <div className="max-w-2xl">
      <Link
        to="/retete"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        Înapoi la rețete
      </Link>

      <div
        className="mt-4 flex h-40 items-center justify-center rounded-3xl bg-sunk text-7xl"
        aria-hidden="true"
      >
        {MEAL_META[recipe.mealType].emoji}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {MEAL_META[recipe.mealType].label}
          </p>
          <h1 className="mt-1 text-3xl text-ink">{recipe.title}</h1>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite('recipe', recipe.id)}
          aria-label={fav ? 'Scoate de la favorite' : 'Adaugă la favorite'}
          className={`shrink-0 rounded-full border border-line p-2.5 transition-colors ${
            fav ? 'text-berry' : 'text-muted hover:bg-sunk'
          }`}
        >
          <Heart size={20} strokeWidth={2} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={16} strokeWidth={2} aria-hidden="true" />
          {recipe.totalTimeMin} min
          {recipe.activeTimeMin ? ` (${recipe.activeTimeMin} min activ)` : ''}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users size={16} strokeWidth={2} aria-hidden="true" />
          {recipe.servings} porții
        </span>
        <span>{DIFFICULTY_META[recipe.difficulty].label}</span>
      </div>

      {recipe.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {recipe.tags.map((t) => (
            <span key={t} className="rounded-full bg-sunk px-2.5 py-1 text-xs text-ink-soft">
              {tagLabel(t)}
            </span>
          ))}
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-lg text-ink">Ingrediente</h2>
        <ul className="mt-3 space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex gap-3 text-ink-soft">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: ing.status ? STATUS_META[ing.status].color : 'var(--color-line)',
                }}
                aria-hidden="true"
              />
              {ing.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg text-ink">Preparare</h2>
        <ol className="mt-3 space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed text-ink-soft">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {recipe.sourceUrl && (
        <p className="mt-8 text-xs text-muted">
          Adaptat după{' '}
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline"
          >
            sursa originală
          </a>
          .
        </p>
      )}
    </div>
  )
}
