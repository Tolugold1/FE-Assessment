import { Cloud, ChevronDown, AlertTriangle, Zap, HardDrive } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { DraggableCards } from '../ui/DraggableCards'
import { cloudNetworkCards } from '../../data/mock'
import { StorageDonut } from './StorageDonut'

export function CloudNetwork() {
  return (
    <Card className="overflow-hidden">
      <SectionHeader
        icon={<Cloud className="size-[18px]" />}
        title="Cloud Network"
        right={
          <button className="text-ink-400 hover:text-ink-700" aria-label="Collapse section">
            <ChevronDown className="size-5" />
          </button>
        }
      />

      {/* 4-column × 2-row layout from the design:
            cols 1–2 row 1+2 → 2×2 grid of metric cards (draggable)
            col 3   row 1+2 → Storage card (donut + 3-col legend)
            col 4   row 1   → Note (amber)
            col 4   row 2   → standalone outlined Upgrade Plan button */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-[auto_auto] gap-4">
        {/* Metric cards — span 2 cols × 2 rows */}
        <div className="lg:col-span-2 lg:row-span-2">
          <DraggableCards
            storageKey="snaarp.cloudNetwork.order"
            cards={cloudNetworkCards}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full"
          />
        </div>

        {/* Storage — spans 2 rows */}
        <div className="lg:row-span-2 rounded-xl border border-ink-200 p-5 flex flex-col">
          <div className="flex items-center gap-2 text-ink-500 text-sm">
            <HardDrive className="size-4" strokeWidth={1.7} />
            <span>Storage</span>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <StorageDonut used={80} />
          </div>

          <ul className="grid grid-cols-3 gap-x-3 gap-y-2 text-[11px] text-ink-700">
            <Legend color="#3b82f6" label="Files" />
            <Legend color="#a855f7" label="Folders" />
            <Legend color="#22c55e" label="Videos" />
            <Legend color="#f97316" label="Apps" />
            <Legend color="#ec4899" label="Audios" />
            <Legend color="#0ea5e9" label="Miscellaneous" />
            <li className="col-span-3 flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-ink-200" />
              <span>Available Space</span>
            </li>
          </ul>
        </div>

        {/* Note — row 1 only */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="size-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-ink-900">Note</p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                You've almost reached your limit. You have used 80% of your
                available storage. Upgrade plan to access more space.
              </p>
            </div>
          </div>
        </div>

        {/* Standalone outlined Upgrade Plan button — row 2 */}
        <div className="flex items-end justify-end">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-brand-500 text-brand-600 bg-white text-sm font-medium px-4 py-2 hover:bg-brand-50 transition-colors">
            <Zap className="size-3.5" />
            Upgrade Plan
          </button>
        </div>
      </div>
    </Card>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="size-2.5 rounded-sm shrink-0" style={{ background: color }} />
      <span className="truncate">{label}</span>
    </li>
  )
}
