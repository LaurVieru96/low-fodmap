import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl text-ink sm:text-4xl">{title}</h1>
      {children && (
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{children}</p>
      )}
    </header>
  )
}
