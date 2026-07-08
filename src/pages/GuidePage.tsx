import { Link } from 'react-router-dom'
import ServingDial from '../components/ServingDial'
import StatusBadge from '../components/StatusBadge'

const phases = [
  {
    title: 'Eliminare',
    dur: '2–6 săptămâni',
    desc: 'Înlocuiești alimentele high-FODMAP cu alternative sigure. Nu e înfometare — e substituție.',
  },
  {
    title: 'Reintroducere',
    dur: '~6–8 săptămâni',
    desc: 'Testezi câte o subgrupă pe rând ca să afli ce toleri și în ce cantitate.',
  },
  {
    title: 'Personalizare',
    dur: 'pe termen lung',
    desc: 'Eviți doar ce îți declanșează simptome. Restul revine în meniu.',
  },
]

export default function GuidePage() {
  return (
    <div className="flex flex-col gap-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            low-FODMAP · în română
          </p>
          <h1 className="mt-3 text-4xl text-ink sm:text-5xl">
            Ce am voie să mănânc — <span className="text-accent">și în ce cantitate?</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Un ghid pentru sindromul intestinului iritabil, bazat pe metoda Monash. Alimente cu
            semafor și porții sigure, rețete filtrabile și un constructor unde îți compui propriile
            rețete, verificate automat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/alimente" className="btn-primary">
              Vezi alimentele
            </Link>
            <Link to="/retete" className="btn-ghost">
              Rețete
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-4xl" aria-hidden="true">
              🥑
            </span>
            <div className="min-w-0">
              <div className="font-display text-lg font-semibold text-ink">Avocado</div>
              <div className="text-sm text-muted">poliol (sorbitol)</div>
            </div>
            <div className="ml-auto">
              <StatusBadge status="amber" />
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Cadranul de porție
            </p>
            <ServingDial
              stops={[
                { grams: '≤ 60 g', note: '~1/3 fruct', status: 'green' },
                { grams: '~80 g', note: '~1/2 fruct', status: 'amber' },
                { grams: 'mai mult', note: 'fruct întreg', status: 'red' },
              ]}
              caption="Același aliment își schimbă culoarea cu porția — asta e ideea centrală a dietei."
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl text-ink">Dieta în 3 faze</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {phases.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-line bg-surface p-5">
              <div className="font-mono text-xs text-accent">Faza {i + 1}</div>
              <div className="mt-1 font-display text-lg font-semibold text-ink">{p.title}</div>
              <div className="text-sm text-muted">{p.dur}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-2xl border p-5"
        style={{
          borderColor: 'color-mix(in srgb, var(--color-amber) 35%, transparent)',
          background: 'color-mix(in srgb, var(--color-amber-soft) 55%, var(--color-paper))',
        }}
      >
        <p className="text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">Informativ, nu sfat medical.</strong> Dieta low-FODMAP se
          face ideal cu un dietetician specializat, pentru IBS diagnosticat medical. Faza de
          eliminare e temporară (2–6 săptămâni), nu pe viață. Valorile de porție sunt orientative —
          Monash le retestează periodic.
        </p>
      </section>
    </div>
  )
}
