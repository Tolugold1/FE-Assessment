import { Cloud, ChevronDown, Zap, HardDrive } from 'lucide-react'
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

      {/* 4-column layout. We use items-start on the outer grid and pin Storage
          + col-4 with self-stretch so they fill the cards' height while the
          Note card itself stays compact at the top of column 4. */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        {/* Metric cards — 2×2 in cols 1–2, draggable */}
        <div className="lg:col-span-2">
          <DraggableCards
            storageKey="snaarp.cloudNetwork.order"
            cards={cloudNetworkCards}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-3"
          />
        </div>

        {/* Storage — col 3 */}
        <div className="lg:self-stretch rounded-xl border border-ink-200 p-5 flex flex-col">
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

        {/* Col 4: Note on top (natural height), spacer, Upgrade button bottom-right */}
        <div className="lg:self-stretch flex flex-col gap-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="flex items-start gap-2.5">
              <AlertBadge />
              <div>
                <p className="text-sm font-medium text-ink-900">Note</p>
                <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                  You've almost reached your limit. You have used 80% of your
                  available storage. Upgrade plan to access more space.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-end">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-brand-500 text-brand-600 bg-white text-sm font-medium px-4 py-2 hover:bg-brand-50 transition-colors">
              <Zap className="size-3.5" />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function AlertBadge() {
  // Filled amber circle with a white exclamation — matches the design.
  // Lucide's AlertCircle is a hollow outline, so we build it instead.
  return (
    <span
      aria-hidden="true"
      className="grid place-items-center size-5 rounded-full bg-amber-400 text-white text-xs font-bold shrink-0 leading-none"
    >
      !
    </span>
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
