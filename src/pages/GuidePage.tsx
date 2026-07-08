import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import ServingExplorer from '../components/ServingExplorer'
import { swaps } from '../data/swaps'

const sources = [
  {
    name: 'Monash FODMAP',
    tag: 'oficial',
    url: 'https://www.monashfodmap.com/',
    desc: 'Universitatea care a creat dieta și testează alimentele în laborator. Aplicația lor e standardul de aur pentru porții.',
  },
  {
    name: 'Lista de alimente Monash',
    tag: 'referință',
    url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/high-and-low-fodmap-foods/',
    desc: 'Listă generală permise / de evitat, direct de pe site — bună pentru o verificare rapidă.',
  },
  {
    name: 'Cleveland Clinic',
    tag: 'medical',
    url: 'https://my.clevelandclinic.org/health/treatments/22466-low-fodmap-diet',
    desc: 'Prezentare medicală clară a dietei și a celor trei faze.',
  },
  {
    name: 'A Little Bit Yummy',
    tag: 'dietetician',
    url: 'https://alittlebityummy.com/',
    desc: 'Ghiduri și rețete verificate de dieteticieni specializați FODMAP.',
  },
]

type AcronymPart = { letter: string; word: string; gloss: string; muted?: boolean }

const acronym: AcronymPart[] = [
  { letter: 'F', word: 'Fermentabili', gloss: 'fermentați în colon' },
  { letter: 'O', word: 'Oligozaharide', gloss: 'fructani, GOS' },
  { letter: 'D', word: 'Dizaharide', gloss: 'lactoză' },
  { letter: 'M', word: 'Monozaharide', gloss: 'fructoză în exces' },
  { letter: 'A', word: 'and', gloss: '„și"', muted: true },
  { letter: 'P', word: 'Polioli', gloss: 'sorbitol, manitol' },
]

const subgroups = [
  { label: 'Fructani', examples: 'grâu, ceapă, usturoi' },
  { label: 'GOS', examples: 'leguminoase, caju, fistic' },
  { label: 'Lactoză', examples: 'lapte, iaurt, brânză proaspătă' },
  { label: 'Fructoză în exces', examples: 'miere, mere, mango' },
  { label: 'Sorbitol', examples: 'mere, avocado, caise' },
  { label: 'Manitol', examples: 'ciuperci, conopidă, pepene roșu' },
]

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

        <ServingExplorer />
      </section>

      <section>
        <h2 className="text-2xl text-ink">Ce sunt FODMAP-urile</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
          FODMAP e un acronim englezesc pentru un grup de carbohidrați cu lanț scurt. Se absorb slab
          în intestinul subțire, sunt fermentați de bacterii și trag apă în intestin — de aici
          balonarea, gazele și durerea la persoanele cu IBS.
        </p>

        <div className="mt-5 rounded-3xl border border-line bg-surface p-5 sm:p-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {acronym.map((a) => (
              <div key={a.word}>
                <dt
                  className={`font-display text-4xl font-semibold leading-none ${
                    a.muted ? 'text-line' : 'text-accent'
                  }`}
                  aria-hidden="true"
                >
                  {a.letter}
                </dt>
                <dd
                  className={`mt-2 font-display text-sm font-semibold ${
                    a.muted ? 'text-muted' : 'text-ink'
                  }`}
                >
                  {a.word}
                </dd>
                <dd className="mt-0.5 text-xs leading-snug text-muted">{a.gloss}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Aceste clase se împart în șase subgrupe. Aplicația îți arată pe fiecare aliment care dintre
          ele e responsabilă:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subgroups.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
              <div className="font-display font-semibold text-ink">{s.label}</div>
              <div className="mt-1 text-sm text-muted">{s.examples}</div>
            </div>
          ))}
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

      <section>
        <h2 className="text-2xl text-ink">Așa nu → Așa da</h2>
        <p className="mt-2 text-ink-soft">Înlocuiri simple care păstrează gustul, fără FODMAP-uri.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {swaps.map((s) => (
            <div
              key={s.avoid.name}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {s.avoid.emoji}
                </span>
                <span className="truncate text-sm text-muted line-through">{s.avoid.name}</span>
              </div>
              <ArrowRight size={18} className="shrink-0 text-accent" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {s.choose.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{s.choose.name}</span>
                  <span className="block text-xs text-muted">{s.why}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-accent/20 bg-accent-soft/50 p-5">
        <h2 className="text-lg text-ink">Regula porției &amp; „stacking"</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          „Low-FODMAP" e o proprietate a porției, nu a alimentului. Mai multe porții „verzi" mâncate
          împreună se pot aduna peste prag (efectul de <em>stacking</em>) — mai ales fructele.
          Combină alimentele limitate cu unele nelimitate (morcov, cartof, orez) și distanțează
          mesele la 2–3 ore.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-ink">De unde vin datele &amp; unde întrebi</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
          Statusurile și porțiile din aplicație urmează <strong className="text-ink">Monash
          University</strong> (Australia) — echipa care a dezvoltat dieta low-FODMAP și testează
          alimentele în laborator. Ei retestează periodic, de aceea gramajele se mai schimbă (de
          asta apare uneori insigna „retestat"). Când ai o întrebare despre un aliment anume, mergi
          la sursă:
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-ink">{s.name}</span>
                <ExternalLink
                  size={14}
                  className="text-muted transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-accent">
                  {s.tag}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </a>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Pentru întrebări despre situația ta, cel mai sigur rămâne un dietetician specializat
          FODMAP.
        </p>
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
          face ideal cu un dietetician specializat, pentru IBS diagnosticat medical. Circa 3 din 4
          persoane se ameliorează, dar nu toată lumea. Faza de eliminare e temporară (2–6
          săptămâni), nu pe viață. Valorile de porție sunt orientative — Monash le retestează
          periodic.
        </p>
      </section>
    </div>
  )
}
