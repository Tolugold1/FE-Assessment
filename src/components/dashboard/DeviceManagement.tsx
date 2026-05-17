import { Monitor, ChevronDown, Zap, Plug, Power, CircleDot, CircleOff, Send, Inbox, Download, MailOpen, Mail } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { DraggableCards } from '../ui/DraggableCards'
import { deviceCards } from '../../data/mock'

export function DeviceManagement() {
  return (
    <Card>
      <SectionHeader
        icon={<Monitor className="size-[18px]" />}
        title="Device Management Dashboard"
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

      <div className="p-5 space-y-5">
        <DraggableCards
          storageKey="snaarp.deviceMgmt.order"
          cards={deviceCards}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MiniPair
            a={{ icon: <Plug className="size-4 text-emerald-500" />, label: 'Plugged', value: '1,923' }}
            b={{ icon: <Power className="size-4 text-rose-500" />, label: 'Unplugged', value: '1,913' }}
          />
          <MiniPair
            a={{ icon: <CircleDot className="size-4 text-emerald-500" />, label: 'Active', value: '592' }}
            b={{ icon: <CircleOff className="size-4 text-ink-400" />, label: 'Offline', value: '3,836' }}
          />
          <MiniPair
            a={{ icon: <Send className="size-4 text-brand-500" />, label: 'Sent', value: '592' }}
            b={{ icon: <Inbox className="size-4 text-amber-500" />, label: 'Received', value: '3,836' }}
          />
          <div className="rounded-xl border border-ink-200 p-4">
            <div className="flex items-center gap-2 text-ink-500 text-sm">
              <Download className="size-4" />
              <span>Number of Downloads</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-ink-900">316</p>
            <p className="mt-1 text-xs text-ink-400">↑ 23% Compared to last week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-ink-100">
          <BreakdownGroup
            items={[
              { label: 'Windows', value: '1,403 devices', color: 'bg-sky-500' },
              { label: 'Mac', value: '632 devices', color: 'bg-ink-700' },
              { label: 'Linux', value: '1,801 devices', color: 'bg-amber-500' },
            ]}
          />
          <BreakdownGroup
            items={[
              { label: 'Organizations', value: '1,403 users', color: 'bg-brand-500' },
              { label: 'Departments', value: '632 users', color: 'bg-violet-500' },
              { label: 'Groups', value: '1,801 users', color: 'bg-emerald-500' },
            ]}
          />
          <BreakdownGroup
            items={[
              { label: 'Read',   value: '1,403 emails', color: 'bg-emerald-500', icon: <MailOpen className="size-3.5" /> },
              { label: 'Unread', value: '632 emails',   color: 'bg-rose-500',    icon: <Mail className="size-3.5" /> },
            ]}
          />
        </div>
      </div>
    </Card>
  )
}

type MiniStat = { icon: React.ReactNode; label: string; value: string }

function MiniPair({ a, b }: { a: MiniStat; b: MiniStat }) {
  return (
    <div className="rounded-xl border border-ink-200 grid grid-cols-2 divide-x divide-ink-100">
      <Mini stat={a} />
      <Mini stat={b} />
    </div>
  )
}

function Mini({ stat }: { stat: MiniStat }) {
  return (
    <div className="p-3.5">
      <div className="flex items-center gap-2 text-ink-500 text-xs">
        {stat.icon}
        <span>{stat.label}</span>
      </div>
      <p className="mt-2 text-xl font-semibold text-ink-900">{stat.value}</p>
    </div>
  )
}

type BreakdownItem = { label: string; value: string; color: string; icon?: React.ReactNode }

function BreakdownGroup({ items }: { items: BreakdownItem[] }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          <span className={`size-2.5 rounded-sm ${item.color}`} />
          <div className="text-xs">
            <div className="text-ink-700 font-medium flex items-center gap-1">
              {item.icon}
              {item.label}
            </div>
            <div className="text-ink-400">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
