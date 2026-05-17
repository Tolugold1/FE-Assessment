import { useState } from 'react'
import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Share2, BarChart3, LineChart } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { fileSharingData } from '../../data/mock'
import { useElementSize } from '../../hooks/useElementSize'
import { cn } from '../../lib/cn'

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
              barCategoryGap="20%"
            >
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="#94a3b8" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="#94a3b8" />
              <Tooltip
                cursor={{ fill: 'rgba(79,107,237,0.06)' }}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="public" fill="#4f6bed" radius={[3, 3, 0, 0]} name="Public" />
              <Bar dataKey="anyoneWithLink" fill="#7c8ff2" radius={[3, 3, 0, 0]} name="Anyone with link" />
              <Bar dataKey="withinOrg" fill="#c7cffa" radius={[3, 3, 0, 0]} name="Within Organisation" />
            </BarChart>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-500">
          <LegendDot color="#4f6bed" label="Public" />
          <LegendDot color="#7c8ff2" label="Anyone with link" />
          <LegendDot color="#c7cffa" label="Within Organisation" />
        </div>
      </div>
    </Card>
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
