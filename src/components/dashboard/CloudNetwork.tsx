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

      {/* Cloud Network: 2×2 metric cards on the left, a single combined
          "Storage" section card on the right. */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <DraggableCards
          storageKey="snaarp.cloudNetwork.order"
          cards={cloudNetworkCards}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-3"
        />

        <StoragePanel />
      </div>
    </Card>
  )
}

function StoragePanel() {
  return (
    <div className="rounded-xl border border-ink-200 p-5">
      <div className="flex items-center gap-2 text-ink-500 text-sm mb-4">
        <HardDrive className="size-4" strokeWidth={1.7} />
        <span>Storage</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
        {/* Donut */}
        <div className="flex items-center justify-center md:justify-start">
          <StorageDonut used={80} />
        </div>

        {/* Note + Legend + Upgrade button stack */}
        <div className="flex flex-col gap-4">
          {/* Note callout — amber accent stripe on the left edge */}
          <div className="relative rounded-md border border-amber-200 bg-amber-50/80 pl-4 pr-3 py-2.5 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-amber-400"
            />
            <div className="flex items-start gap-2">
              <AlertBadge />
              <div>
                <p className="text-sm font-medium text-amber-700">Note</p>
                <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                  You've almost reached your limit
                  <br />
                  You have used 80% of your available storage. Upgrade
                  plan to access more space.
                </p>
              </div>
            </div>
          </div>

          {/* Legend grid */}
          <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs text-ink-700">
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

          {/* Outlined Upgrade Plan button, bottom-right */}
          <div className="flex justify-end pt-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-brand-500 text-brand-600 bg-white text-sm font-medium px-4 py-2 hover:bg-brand-50 transition-colors">
              <Zap className="size-3.5" />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AlertBadge() {
  return (
    <span
      aria-hidden="true"
      className="grid place-items-center size-5 rounded-full bg-amber-400 text-white text-xs font-bold shrink-0 leading-none mt-0.5"
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
