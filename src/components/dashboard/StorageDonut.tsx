type Props = { used: number }

/**
 * Minimal donut showing storage utilisation. Built by hand with SVG so we don't
 * pull recharts into a tiny static piece.
 */
export function StorageDonut({ used }: Props) {
  const radius = 42
  const stroke = 12
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - used / 100)

  // Segments are evocative of the design — exact percentages aren't important
  // because the only number the user sees is the centre figure.
  const segments = [
    { color: '#3b82f6', portion: 0.30 },
    { color: '#a855f7', portion: 0.20 },
    { color: '#22c55e', portion: 0.10 },
    { color: '#f97316', portion: 0.10 },
    { color: '#ec4899', portion: 0.05 },
    { color: '#0ea5e9', portion: 0.05 },
  ]

  let cumulative = 0

  return (
    <div className="relative size-32 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90">
        {/* track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        {segments.map((seg, i) => {
          const segLen = circumference * seg.portion
          const dash = `${segLen} ${circumference - segLen}`
          const dashOffset = circumference - cumulative
          cumulative += segLen + 2 // tiny gap between segments
          return (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          )
        })}
        {/* dashed inner ring as in the design */}
        <circle
          cx="60"
          cy="60"
          r={radius - stroke}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle
          cx="60"
          cy="60"
          r={radius - stroke}
          fill="none"
          stroke="transparent"
          strokeWidth={stroke - 2}
          strokeDasharray={`${circumference * (used / 100)} ${circumference}`}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-xl font-semibold text-ink-900 leading-none">{used}%</p>
          <p className="text-[11px] text-ink-400 mt-1">Used</p>
        </div>
      </div>
    </div>
  )
}
