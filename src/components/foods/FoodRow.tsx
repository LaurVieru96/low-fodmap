import type { Food } from '../../lib/types'
import { GROUP_META } from '../../lib/fodmap'
import { useProfile } from '../../store/profile-context'
import { personalStatus } from '../../lib/personalStatus'
import { patientView } from '../../lib/patient'
import { getPatientRec } from '../../data/patient'
import StatusBadge from '../StatusBadge'
import PatientBadge from '../patient/PatientBadge'

interface FoodRowProps {
  food: Food
  onSelect: (food: Food) => void
}

export default function FoodRow({ food, onSelect }: FoodRowProps) {
  const { profile } = useProfile()
  const groups = food.groups.map((g) => GROUP_META[g].short).join(', ')
  const sub = [food.serving, groups].filter(Boolean).join(' · ')

  const personal = profile.personalized ? personalStatus(food, profile.tolerances) : null
  const shownStatus = personal ? personal.status : food.status
  const unlocked = personal?.unlocked ?? false

  const rec = getPatientRec(food.id)
  const pView = rec ? patientView(food.status, rec.stance) : null

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(food)}
        className="flex h-full w-full items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-left transition-colors hover:border-accent/40 hover:bg-sunk/40"
      >
        <span className="text-2xl" aria-hidden="true">
          {food.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink">{food.nameRo}</span>
          {sub && <span className="block truncate text-xs text-muted">{sub}</span>}
        </span>
        {unlocked && (
          <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            pentru tine
          </span>
        )}
        {pView && (
          <span className="shrink-0">
            <PatientBadge view={pView} compact />
          </span>
        )}
        <StatusBadge status={shownStatus} />
      </button>
    </li>
  )
}
