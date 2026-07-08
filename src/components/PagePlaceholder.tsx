import PageHeader from './PageHeader'

interface PagePlaceholderProps {
  eyebrow: string
  title: string
  intro: string
  phase: string
  points: string[]
}

/** Consistent, informative stub for pages whose full build lands in a later phase. */
export default function PagePlaceholder({
  eyebrow,
  title,
  intro,
  phase,
  points,
}: PagePlaceholderProps) {
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={title}>
        {intro}
      </PageHeader>
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          În construcție · {phase}
        </p>
        <ul className="mt-4 space-y-2.5">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed text-ink-soft">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
