import { Mail } from 'lucide-react'
import { Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, SectionHeader } from '../ui/Card'
import { emailBreakdown, totalEmailData } from '../../data/mock'
import { useElementSize } from '../../hooks/useElementSize'

export function EmailCharts() {
  const [ref, { width }] = useElementSize<HTMLDivElement>()

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-5">
      <Card>
        <SectionHeader icon={<Mail className="size-[18px]" />} title="Email Chart" />
        <div className="px-5 py-5">
          <DonutChart
            sent={emailBreakdown.sent}
            received={emailBreakdown.received}
            unsent={emailBreakdown.unsent}
          />
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-ink-500">
            <Dot color="#f59e0b" label="Sent" />
            <Dot color="#4f6bed" label="Received" />
            <Dot color="#e5e7eb" label="Unsent" />
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-ink-400">TOTAL EMAILS SENT</p>
            <p className="text-xl font-semibold text-ink-900">
              {emailBreakdown.total.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader
          icon={<Mail className="size-[18px]" />}
          title="Total Email"
          right={
            <button className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 hover:bg-ink-50">
              Month
              <svg className="size-3" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          }
        />
        <div ref={ref} className="px-5 py-5 w-full h-72 min-w-0">
          {width > 0 && (
            <AreaChart width={width - 40} height={232} data={totalEmailData}>
              <defs>
                <linearGradient id="totalEmailFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4f6bed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4f6bed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="#94a3b8" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#4f6bed"
                strokeWidth={2}
                fill="url(#totalEmailFill)"
              />
            </AreaChart>
          )}
        </div>
      </Card>
    </div>
  )
}

function Dot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2.5 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  )
}

function DonutChart({ sent, received, unsent }: { sent: number; received: number; unsent: number }) {
  const total = sent + received + unsent
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const segments = [
    { value: sent, color: '#f59e0b' },
    { value: received, color: '#4f6bed' },
    { value: unsent, color: '#e5e7eb' },
  ]

  let offset = 0
  return (
    <div className="relative mx-auto size-44">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {segments.map((seg, i) => {
          const len = (seg.value / total) * circumference
          const segOffset = circumference - offset
          offset += len
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={segOffset}
            />
          )
        })}
        <circle
          cx="80"
          cy="80"
          r={radius - 8}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-xs font-medium text-ink-700">Emails</p>
          <p className="text-xs font-medium text-ink-700">Chart</p>
        </div>
      </div>
    </div>
  )
}
