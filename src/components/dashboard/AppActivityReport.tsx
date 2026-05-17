import { Globe, ArrowUpDown } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { appActivity } from '../../data/mock'

const APP_COLORS: Record<string, string> = {
  chrome: '#4285F4',
  youtube: '#FF0000',
  teams: '#6264A7',
  whatsapp: '#25D366',
  opera: '#FF1B2D',
  instagram: '#E1306C',
}

export function AppActivityReport() {
  return (
    <Card>
      <SectionHeader
        icon={<Globe className="size-[18px]" />}
        title="App Activity Report"
        right={
          <div className="flex items-center gap-2">
            <Filter label="All Organization" />
            <Filter label="Month" />
          </div>
        }
      />

      <div className="px-5 pt-3">
        <p className="text-xs text-ink-400 mb-3">
          View your comprehensive organizational app report
        </p>
      </div>

      <div className="overflow-x-auto px-2 pb-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-500 bg-ink-50">
              <Th>Application</Th>
              <Th>Total Users</Th>
              <Th>Total Number of Hours</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {appActivity.map((row, i) => (
              <tr key={i} className="border-b border-ink-100 last:border-0">
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-2 text-ink-700">
                    <span
                      className="size-2.5 rounded-sm"
                      style={{ background: APP_COLORS[row.color] ?? '#94a3b8' }}
                    />
                    {row.app}
                  </span>
                </td>
                <td className="px-3 py-3 text-ink-700">{row.users}</td>
                <td className="px-3 py-3 text-ink-500">{row.hours}</td>
                <td className="px-3 py-3 text-ink-500">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 font-medium">
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className="size-3 text-ink-400" />
      </span>
    </th>
  )
}

function Filter({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 hover:bg-ink-50">
      {label}
      <svg className="size-3" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
