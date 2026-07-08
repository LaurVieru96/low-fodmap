import type { Food } from '../../lib/types'
import { GROUP_META } from '../../lib/fodmap'
import StatusBadge from '../StatusBadge'

interface FoodRowProps {
  food: Food
  onSelect: (food: Food) => void
}

export default function FoodRow({ food, onSelect }: FoodRowProps) {
  const groups = food.groups.map((g) => GROUP_META[g].short).join(', ')
  const sub = [food.serving, groups].filter(Boolean).join(' · ')

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(food)}
        className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left transition-colors hover:border-accent/40 hover:bg-sunk/40"
      >
        <span className="text-2xl" aria-hidden="true">
          {food.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink">{food.nameRo}</span>
          {sub && <span className="block truncate text-xs text-muted">{sub}</span>}
        </span>
        <StatusBadge status={food.status} />
      </button>
    </li>
  )
}
