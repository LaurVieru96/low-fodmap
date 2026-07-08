import { useState } from 'react'
import type { FodmapStatus } from '../lib/status'
import { STATUS_META } from '../lib/status'
import StatusBadge from './StatusBadge'

/**
 * Interactive hero: the single non-obvious truth of the diet — the SAME food
 * shifts green → amber → red as the serving grows — made draggable instead of
 * read. The track carries the status gradient (semantic), the thumb is the
 * accent control (you), and the readout announces the status in words for
 * screen readers, not just color.
 */
interface HeroFood {
  id: string
  nameRo: string
  emoji: string
  groupLabel: string
  /** Green while grams ≤ greenMax, amber up to amberMax, red beyond. */
  greenMax: number
  amberMax: number
  max: number
  /** Household measure for the current amount (first hint whose upTo ≥ grams). */
  hints: { upTo: number; text: string }[]
}

// Thresholds derive from each food's `dial` in src/data/foods.ts.
const heroFoods: HeroFood[] = [
  {
    id: 'avocado',
    nameRo: 'Avocado',
    emoji: '🥑',
    groupLabel: 'poliol · sorbitol',
    greenMax: 60,
    amberMax: 100,
    max: 150,
    hints: [
      { upTo: 60, text: '~1/3 fruct' },
      { upTo: 100, text: '~1/2 fruct' },
      { upTo: Infinity, text: 'spre un fruct întreg' },
    ],
  },
  {
    id: 'cartof-dulce',
    nameRo: 'Cartof dulce',
    emoji: '🍠',
    groupLabel: 'poliol · manitol',
    greenMax: 75,
    amberMax: 112,
    max: 160,
    hints: [
      { upTo: 75, text: '1/2 cană' },
      { upTo: 112, text: '~3/4 cană' },
      { upTo: Infinity, text: '1 cană sau mai mult' },
    ],
  },
  {
    id: 'miere',
    nameRo: 'Miere',
    emoji: '🍯',
    groupLabel: 'fructoză în exces',
    greenMax: 7,
    amberMax: 27,
    max: 35,
    hints: [
      { upTo: 7, text: '1 linguriță' },
      { upTo: 27, text: '~1 lingură' },
      { upTo: Infinity, text: '2+ linguri (≥ 28 g)' },
    ],
  },
]

function statusFor(food: HeroFood, grams: number): FodmapStatus {
  if (grams <= food.greenMax) return 'green'
  if (grams <= food.amberMax) return 'amber'
  return 'red'
}

function hintFor(food: HeroFood, grams: number): string {
  const hit = food.hints.find((h) => grams <= h.upTo)
  return hit ? hit.text : food.hints[food.hints.length - 1].text
}

const greenStart = (food: HeroFood) => Math.round(food.greenMax * 0.6)

export default function ServingExplorer() {
  const [foodIdx, setFoodIdx] = useState(0)
  const [grams, setGrams] = useState(() => greenStart(heroFoods[0]))
  const [touched, setTouched] = useState(false)

  const food = heroFoods[foodIdx]
  const status = statusFor(food, grams)
  const meta = STATUS_META[status]

  const gPct = (food.greenMax / food.max) * 100
  const aPct = (food.amberMax / food.max) * 100
  const trackBg = `linear-gradient(90deg, var(--color-green) 0 ${gPct}%, var(--color-amber) ${gPct}% ${aPct}%, var(--color-red) ${aPct}% 100%)`

  function pickFood(i: number) {
    setFoodIdx(i)
    setGrams(greenStart(heroFoods[i]))
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-4xl transition-colors duration-300"
          style={{ background: meta.soft }}
          aria-hidden="true"
        >
          {food.emoji}
        </span>
        <div className="min-w-0">
          <div className="font-display text-lg font-semibold text-ink">{food.nameRo}</div>
          <div className="text-sm text-muted">{food.groupLabel}</div>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="mt-4 inline-flex rounded-full border border-line bg-sunk/40 p-0.5">
        {heroFoods.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => pickFood(i)}
            aria-pressed={i === foodIdx}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              i === foodIdx ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            <span aria-hidden="true">{f.emoji}</span>
            {f.nameRo}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-semibold text-ink">{grams}</span>
        <span className="font-mono text-lg text-muted">g</span>
        <span className="ml-auto text-sm text-ink-soft">{hintFor(food, grams)}</span>
      </div>

      <div className="relative mt-3">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full"
          style={{ background: trackBg }}
        />
        <input
          type="range"
          min={1}
          max={food.max}
          step={1}
          value={grams}
          onChange={(e) => {
            setGrams(Number(e.target.value))
            setTouched(true)
          }}
          className="serving-range relative block w-full"
          aria-label={`Mărimea porției pentru ${food.nameRo}, în grame`}
          aria-valuetext={`${grams} grame — ${meta.label}`}
        />
      </div>

      <div className="relative mt-1 h-4">
        <span
          className="absolute -translate-x-1/2 font-mono text-[10px] text-muted"
          style={{ left: `${gPct}%` }}
        >
          {food.greenMax} g
        </span>
        <span
          className="absolute -translate-x-1/2 font-mono text-[10px] text-muted"
          style={{ left: `${aPct}%` }}
        >
          {food.amberMax} g
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        {!touched && (
          <span className="mr-1.5 animate-pulse font-mono text-accent" aria-hidden="true">
            ← trage →
          </span>
        )}
        Același aliment, altă culoare. Porția e cea care mută semaforul.
      </p>
    </div>
  )
}
