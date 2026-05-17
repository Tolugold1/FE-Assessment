import { forwardRef, type HTMLAttributes } from 'react'
import {
  Users,
  UsersRound,
  Upload,
  Building2,
  Mail,
  MailOpen,
  Clock,
  CalendarDays,
  Globe,
  Smartphone,
  AppWindow,
  ArrowDownRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import type { MetricCard as MetricCardType } from '../../data/mock'
import { cn } from '../../lib/cn'

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  groups: UsersRound,
  upload: Upload,
  building: Building2,
  mail: Mail,
  'mail-open': MailOpen,
  clock: Clock,
  calendar: CalendarDays,
  globe: Globe,
  devices: Smartphone,
  apps: AppWindow,
}

type MetricCardProps = {
  card: MetricCardType
  dragging?: boolean
} & HTMLAttributes<HTMLDivElement>

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  function MetricCard({ card, dragging, className, ...rest }, ref) {
    const Icon = ICONS[card.icon] ?? Users
    const trendIsUp = card.trend === 'up'
    const TrendIcon = trendIsUp ? ArrowUpRight : ArrowDownRight

    // Sparkline path (purely decorative) — direction matches trend
    const sparkline = trendIsUp
      ? 'M0 28 C 20 26, 40 18, 60 14 S 100 6, 120 4'
      : 'M0 6 C 20 8, 40 16, 60 18 S 100 26, 120 28'

    return (
      <div
        ref={ref}
        className={cn(
          'group relative bg-white rounded-xl border border-ink-200 p-4 transition-shadow',
          dragging ? 'shadow-lg ring-1 ring-brand-500/40' : 'hover:shadow-sm',
          className,
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-ink-500 text-sm">
              <Icon className="size-4" strokeWidth={1.7} />
              <span>{card.label}</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-ink-900">{card.value}</p>
            <div className="mt-1.5 flex items-center gap-1 text-xs">
              <TrendIcon
                className={cn(
                  'size-3.5',
                  trendIsUp ? 'text-emerald-500' : 'text-rose-500',
                )}
              />
              <span className={cn(trendIsUp ? 'text-emerald-600' : 'text-rose-600')}>
                {card.delta}
              </span>
              <span className="text-ink-400 ml-1">Compared to last week</span>
            </div>
          </div>

          <svg viewBox="0 0 120 32" className="w-20 h-10 shrink-0" aria-hidden="true">
            <defs>
              <linearGradient id={`spark-${card.id}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={trendIsUp ? '#10b981' : '#f43f5e'} stopOpacity="0.25" />
                <stop offset="100%" stopColor={trendIsUp ? '#10b981' : '#f43f5e'} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${sparkline} L 120 32 L 0 32 Z`}
              fill={`url(#spark-${card.id})`}
            />
            <path
              d={sparkline}
              fill="none"
              stroke={trendIsUp ? '#10b981' : '#f43f5e'}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    )
  },
)
