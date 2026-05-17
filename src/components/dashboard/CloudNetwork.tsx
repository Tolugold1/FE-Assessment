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

      {/* 4-column layout from the design:
            col 1+2 → 2×2 grid of metric cards
            col 3   → Storage panel
            col 4   → Note panel */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <DraggableCards
            storageKey="snaarp.cloudNetwork.order"
            cards={cloudNetworkCards}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full"
          />
        </div>

        {/* Storage */}
        <div className="rounded-xl border border-ink-200 p-4">
          <div className="flex items-center gap-2 text-ink-500 text-sm mb-4">
            <HardDrive className="size-4" strokeWidth={1.7} />
            <span>Storage</span>
          </div>
          <div className="flex items-start gap-4">
            <StorageDonut used={80} />
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <Legend color="#3b82f6" label="Files" />
              <Legend color="#a855f7" label="Folders" />
              <Legend color="#22c55e" label="Videos" />
              <Legend color="#f97316" label="Apps" />
              <Legend color="#ec4899" label="Audios" />
              <Legend color="#0ea5e9" label="Miscellaneous" />
              <li className="col-span-2 flex items-center gap-2 text-ink-700">
                <span className="size-2.5 rounded-sm bg-ink-200" />
                <span>Available Space</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Note */}
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
          <button className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-500 text-white text-sm font-medium px-3 py-1.5 hover:bg-brand-600 transition-colors">
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
    <li className="flex items-center gap-2 text-ink-700">
      <span className="size-2.5 rounded-sm" style={{ background: color }} />
      <span>{label}</span>
    </li>
  )
}
