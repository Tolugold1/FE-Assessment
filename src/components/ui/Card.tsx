import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <section className={cn('bg-white rounded-2xl border border-ink-200', className)}>
      {children}
    </section>
  )
}

type SectionHeaderProps = {
  icon?: ReactNode
  title: string
  right?: ReactNode
}

export function SectionHeader({ icon, title, right }: SectionHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
      <div className="flex items-center gap-2">
        {icon && <span className="text-ink-500">{icon}</span>}
        <h2 className="font-semibold text-ink-900">{title}</h2>
      </div>
      {right}
    </header>
  )
}
