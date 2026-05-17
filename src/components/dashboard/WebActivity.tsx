import { Globe } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { webActivity } from '../../data/mock'

export function WebActivity() {
  return (
    <Card>
      <SectionHeader
        icon={<Globe className="size-[18px]" />}
        title="Web Activity"
        right={
          <button className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 hover:bg-ink-50">
            Month
            <svg className="size-3" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        }
      />

      <div className="px-5 pt-3">
        <p className="text-xs text-ink-400 mb-3">
          View your comprehensive organizational web report
        </p>
      </div>

      <ul className="px-5 pb-5 space-y-3.5">
        {webActivity.map((row) => (
          <li key={row.site} className="flex items-center gap-3 text-sm">
            <span
              className="size-7 rounded-md grid place-items-center text-white text-xs font-medium shrink-0"
              style={{ background: row.color }}
              aria-hidden="true"
            >
              {row.site[0]}
            </span>
            <span className="w-24 text-ink-700">{row.site}</span>
            <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${row.pct}%` }}
              />
            </div>
            <span className="text-xs text-ink-500 w-10 text-right">{row.pct}%</span>
            <span className="text-xs text-ink-500 w-32 text-right">{row.duration}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
