import { Activity, ChevronDown, Zap } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { DraggableCards } from '../ui/DraggableCards'
import { productivityCards } from '../../data/mock'

export function ProductivityReport() {
  return (
    <Card>
      <SectionHeader
        icon={<Activity className="size-[18px]" />}
        title="Productivity Report"
        right={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 rounded-md bg-brand-500 text-white text-sm font-medium px-3 py-1.5 hover:bg-brand-600">
              <Zap className="size-3.5" />
              Upgrade Plan
            </button>
            <ChevronDown className="size-5 text-ink-400" />
          </div>
        }
      />
      <div className="p-5">
        <DraggableCards storageKey="snaarp.productivity.order" cards={productivityCards} />
      </div>
    </Card>
  )
}
