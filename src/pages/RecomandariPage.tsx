import { Link } from 'react-router-dom'
import { Pill, HeartPulse, ArrowRight, ShieldAlert } from 'lucide-react'
import { patientProfile } from '../data/patient'
import PageHeader from '../components/PageHeader'

export default function RecomandariPage() {
  if (!patientProfile) {
    return (
      <div>
        <PageHeader eyebrow="profil personal" title="Recomandări">
          Nu e încărcat niciun profil de pacient pe acest dispozitiv.
        </PageHeader>
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Aplicația rulează ca ghid low-FODMAP generic.
        </div>
      </div>
    )
  }

  const p = patientProfile

  return (
    <div className="flex flex-col gap-10">
      <section>
        <PageHeader eyebrow="pentru tine" title="Recomandările tale">
          {p.summary}
        </PageHeader>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.conditions.map((c) => (
            <span
              key={c}
              className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-berry/30 bg-berry-soft/50 p-5">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="shrink-0 text-berry" aria-hidden="true" />
          <h2 className="text-lg text-ink">Informativ, nu sfat medical</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.provenance}</p>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-2xl text-ink">
          <Pill size={22} className="text-accent" aria-hidden="true" />
          Suplimente
        </h2>
        <p className="mt-2 text-sm text-muted">Doze orientative — de confirmat cu medicul.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {p.supplements.map((s) => (
            <div key={s.name} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display font-semibold text-ink">{s.name}</span>
                <span className="shrink-0 font-mono text-xs text-accent">{s.dose}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2 text-2xl text-ink">
          <HeartPulse size={22} className="text-accent" aria-hidden="true" />
          Stil de viață
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {p.lifestyle.map((l) => (
            <div key={l.title} className="rounded-2xl border border-line bg-surface p-4">
              <div className="font-display font-semibold text-ink">{l.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{l.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-accent/20 bg-accent-soft/40 p-5">
        <p className="text-sm leading-relaxed text-ink-soft">
          Recomandările pe alimente apar ca etichete <strong className="text-ink">recomandat</strong>,{' '}
          <strong className="text-ink">de evitat</strong> și{' '}
          <strong className="text-ink">conflict FODMAP</strong> pe fiecare aliment din ghid.
        </p>
        <Link
          to="/alimente"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-ink"
        >
          Vezi alimentele
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}
