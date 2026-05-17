import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Receipt,
  User,
  HardDrive,
  Settings,
  Smartphone,
  Activity,
  LineChart,
  LifeBuoy,
} from 'lucide-react'
import { cn } from '../../lib/cn'

const primary = [
  { label: 'Dashboard',           icon: LayoutDashboard, active: true },
  { label: 'Organization & Reg.', icon: Building2 },
  { label: 'Reporting',           icon: BarChart3 },
  { label: 'Billing',             icon: Receipt },
  { label: 'Account',             icon: User },
  { label: 'Storage',             icon: HardDrive },
  { label: 'Settings',            icon: Settings },
  { label: 'Device Management',   icon: Smartphone },
  { label: 'Productivity Report', icon: Activity },
]

const secondary = [
  { label: 'User Panel', icon: LineChart },
  { label: 'Support',    icon: LifeBuoy },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[230px] shrink-0 flex-col bg-white border-r border-ink-200 py-6 px-4 sticky top-0 h-screen">
      <div className="px-3 mb-8">
        <span className="text-2xl font-bold text-ink-900 tracking-tight">Snaarp</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 scroll-thin overflow-y-auto">
        {primary.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}

        <div className="my-6 border-t border-ink-100" />

        {secondary.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="mt-6 flex items-center gap-3 px-3 pt-4 border-t border-ink-100">
        <div className="size-9 rounded-full bg-gradient-to-br from-amber-200 to-rose-300" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-900 truncate">Chidinma Snaarp</p>
          <p className="text-xs text-ink-400 truncate">dim.dawso@example.com</p>
        </div>
      </div>
    </aside>
  )
}

type NavItemProps = {
  label: string
  icon: typeof LayoutDashboard
  active?: boolean
}

function NavItem({ label, icon: Icon, active }: NavItemProps) {
  return (
    <a
      href="#"
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-brand-50 text-brand-600 font-medium'
          : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900',
      )}
    >
      <Icon className="size-[18px]" strokeWidth={active ? 2 : 1.6} />
      <span>{label}</span>
    </a>
  )
}
