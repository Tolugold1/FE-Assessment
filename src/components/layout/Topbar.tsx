import { Bell, Search, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const AGENT_CODE = '0365o2j37742y3b38'

export function Topbar() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard.writeText(AGENT_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <header className="flex items-center gap-4 px-6 lg:px-8 py-4 bg-[#f6f7fb] sticky top-0 z-10">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for users, groups or settings"
          className="w-full rounded-full bg-white border border-ink-200 pl-10 pr-4 py-2.5 text-sm placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="relative size-10 grid place-items-center rounded-full bg-white border border-ink-200 hover:border-ink-400 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-ink-500" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-ink-500">Agent Code:</span>
          <span className="font-medium text-ink-900">{AGENT_CODE}</span>
          <button
            onClick={copyCode}
            aria-label="Copy agent code"
            className="p-1 rounded hover:bg-ink-100 text-ink-400 hover:text-ink-700"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
