import { Users, MapPin } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { activeCountries } from '../../data/mock'

const FLAG_EMOJI: Record<string, string> = {
  gb: '🇬🇧',
  ng: '🇳🇬',
  ae: '🇦🇪',
  ca: '🇨🇦',
  us: '🇺🇸',
}

export function ActiveUsers() {
  return (
    <Card>
      <SectionHeader
        icon={<Users className="size-[18px]" />}
        title="Active Users"
        right={
          <button className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 hover:bg-ink-50">
            Month
            <svg className="size-3" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        }
      />

      <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Lightweight map stand-in. A real implementation would use Mapbox or
            Leaflet; that was out of scope for the timeframe. */}
        <div className="relative rounded-xl bg-ink-50 border border-ink-100 h-64 overflow-hidden">
          <svg viewBox="0 0 300 220" className="absolute inset-0 size-full opacity-40">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="300" height="220" fill="url(#grid)" />
            <path
              d="M30 60 Q 80 50 120 70 T 250 65 L 260 120 Q 200 130 150 110 T 40 130 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="0.5"
            />
          </svg>

          <Pin x="35%" y="32%" label="Bisley" />
          <Pin x="60%" y="55%" label="Chisom" highlight />
          <Pin x="34%" y="78%" label="Samuel" red />
        </div>

        <ul className="space-y-3.5">
          {activeCountries.map((c) => (
            <li key={c.code} className="flex items-center gap-3 text-sm">
              <span className="text-xl leading-none" aria-hidden="true">
                {FLAG_EMOJI[c.flag]}
              </span>
              <span className="w-44 text-ink-700">{c.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
              <span className="text-xs text-ink-500 w-8 text-right">{c.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

type PinProps = { x: string; y: string; label: string; red?: boolean; highlight?: boolean }

function Pin({ x, y, label, red, highlight }: PinProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full text-xs"
      style={{ left: x, top: y }}
    >
      {highlight ? (
        <div className="mb-1 rounded-md bg-emerald-500 text-white px-2 py-0.5 shadow">
          {label}
        </div>
      ) : (
        <div className="mb-1 rounded-md bg-white border border-ink-200 px-2 py-0.5 shadow-sm text-ink-700">
          {label}
        </div>
      )}
      <MapPin
        className={red ? 'text-rose-500' : 'text-brand-500'}
        strokeWidth={2.5}
        fill={red ? '#fb7185' : '#4f6bed'}
        color="white"
      />
    </div>
  )
}
