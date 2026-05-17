import { useState } from 'react'
import { Users, ArrowUpDown } from 'lucide-react'
import { Card, SectionHeader } from '../ui/Card'
import { onlineUsers } from '../../data/mock'
import { cn } from '../../lib/cn'

const APP_COLORS: Record<string, string> = {
  chrome: '#4285F4',
  instagram: '#E1306C',
  teams: '#6264A7',
  youtube: '#FF0000',
  opera: '#FF1B2D',
  whatsapp: '#25D366',
}

const DEVICE_ICONS: Record<'Windows' | 'Mac' | 'Linux', string> = {
  Windows: '🪟',
  Mac: '',
  Linux: '🐧',
}

export function OnlineUsers() {
  const [filter, setFilter] = useState('All Organization')

  return (
    <Card>
      <SectionHeader
        icon={<Users className="size-[18px]" />}
        title="Online Users"
        right={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-ink-200 px-2.5 py-1 text-xs text-ink-700 bg-white"
          >
            <option>All Organization</option>
            <option>MSBM, Lagos</option>
            <option>MSBM, London</option>
            <option>MSBM, Ottawa</option>
          </select>
        }
      />

      <div className="px-5 pt-3">
        <p className="text-xs text-ink-400 mb-3">View your comprehensive online users</p>
      </div>

      <div className="overflow-x-auto px-2 pb-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-500 bg-ink-50">
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Organization</Th>
              <Th>Device</Th>
              <Th>Current Activity</Th>
              <Th>Time Usage</Th>
            </tr>
          </thead>
          <tbody>
            {onlineUsers.map((u, i) => (
              <tr key={i} className="border-b border-ink-100 last:border-0">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'size-2 rounded-full',
                        u.online ? 'bg-emerald-500' : 'bg-ink-200',
                      )}
                      aria-label={u.online ? 'online' : 'offline'}
                    />
                    <Avatar name={u.name} />
                    <span className="text-ink-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-ink-500">{u.location}</td>
                <td className="px-3 py-3 text-ink-500">{u.organization}</td>
                <td className="px-3 py-3 text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true">{DEVICE_ICONS[u.device]}</span>
                    {u.device}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-sm"
                      style={{ background: APP_COLORS[u.activity.color] ?? '#94a3b8' }}
                    />
                    <span className="text-ink-700">{u.activity.app}</span>
                  </span>
                </td>
                <td className="px-3 py-3 text-ink-500">{u.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 font-medium">
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className="size-3 text-ink-400" />
      </span>
    </th>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  // Deterministic background so avatars don't flicker between renders.
  const palette = ['#fde68a', '#fca5a5', '#a7f3d0', '#bfdbfe', '#ddd6fe', '#fbcfe8']
  const idx = Math.abs([...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % palette.length

  return (
    <span
      className="grid place-items-center size-7 rounded-full text-[10px] font-semibold text-ink-700"
      style={{ background: palette[idx] }}
    >
      {initials}
    </span>
  )
}
