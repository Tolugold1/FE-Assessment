import { useState } from 'react'
import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import type { TooltipContentProps } from 'recharts/types/component/Tooltip'
import { Share2, BarChart3, LineChart } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { fileSharingData } from '../../data/mock'
import { useElementSize } from '../../hooks/useElementSize'
import { cn } from '../../lib/cn'

const SERIES = [
  { key: 'public',         label: 'Public',              color: '#3b50d6' },
  { key: 'anyoneWithLink', label: 'Anyone with link',    color: '#6478e3' },
  { key: 'withinOrg',      label: 'Within Organisation', color: '#a8b3f5' },
] as const

export function FileSharing() {
  const [mode, setMode] = useState<'bar' | 'line'>('bar')
  const [ref, { width }] = useElementSize<HTMLDivElement>()

  return (
    <Card>
      <SectionHeader
        icon={<Share2 className="size-[18px]" />}
        title="File Sharing"
        right={
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-ink-200 p-0.5">
              <button
                aria-label="Bar chart"
                aria-pressed={mode === 'bar'}
                onClick={() => setMode('bar')}
                className={cn(
                  'px-1.5 py-1 rounded',
                  mode === 'bar' ? 'bg-brand-50 text-brand-600' : 'text-ink-400',
                )}
              >
                <BarChart3 className="size-4" />
              </button>
              <button
                aria-label="Line chart"
                aria-pressed={mode === 'line'}
                onClick={() => setMode('line')}
                className={cn(
                  'px-1.5 py-1 rounded',
                  mode === 'line' ? 'bg-brand-50 text-brand-600' : 'text-ink-400',
                )}
              >
                <LineChart className="size-4" />
              </button>
            </div>
            <MonthPicker />
          </div>
        }
      />

      <div className="px-5 pt-3 pb-5 min-w-0">
        <p className="text-xs text-ink-400 mb-4">Keep track of files and how they're shared</p>

        <div ref={ref} className="w-full h-72">
          {width > 0 && (
            <BarChart
              width={width}
              height={288}
              data={fileSharingData}
              barGap={2}
              barCategoryGap="22%"
              margin={{ top: 10, right: 5, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="3 4"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                fontSize={11}
                stroke="#94a3b8"
                dy={4}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={11}
                stroke="#94a3b8"
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />
              <Tooltip
                cursor={{ fill: 'rgba(79,107,237,0.06)' }}
                content={(props) => <MonthTooltip {...props} />}
              />
              {SERIES.map((s) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  fill={s.color}
                  radius={[5, 5, 0, 0]}
                  name={s.label}
                />
              ))}
            </BarChart>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-500">
          {SERIES.map((s) => (
            <LegendDot key={s.key} color={s.color} label={s.label} />
          ))}
        </div>
      </div>
    </Card>
  )
}

function MonthTooltip({ active, label, payload }: TooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null

  // Show the series the cursor is closest to — first entry usually corresponds
  // to the bar under the pointer. Falls back to listing all series.
  const primary = payload[0]
  return (
    <div className="rounded-md bg-ink-700/95 text-white shadow-lg px-3 py-2 text-[11px] leading-tight">
      <div className="font-medium text-white/90 mb-1">{label?.toString().toUpperCase()}</div>
      <div className="flex items-center gap-1.5">
        <span
          className="size-2.5 rounded-sm"
          style={{ background: (primary?.color as string) ?? '#fff' }}
        />
        <span>
          {primary?.name}: <span className="font-medium">{primary?.value}</span>
        </span>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-2.5 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  )
}

function MonthPicker() {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 hover:bg-ink-50">
      Month
      <svg className="size-3" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
