import { useEffect, useState } from 'react'

/**
 * Remembers the order of a list of ids in localStorage so the user's
 * rearrangement of dashboard cards survives reloads.
 */
export function usePersistedOrder(storageKey: string, defaultOrder: string[]) {
  const [order, setOrder] = useState<string[]>(() => {
    if (typeof window === 'undefined') return defaultOrder
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return defaultOrder
      const parsed = JSON.parse(raw) as string[]
      // Defensive: if the persisted list drifts from the default (ids
      // added/removed across releases) fall back to the default.
      const sameMembers =
        parsed.length === defaultOrder.length &&
        parsed.every((id) => defaultOrder.includes(id))
      return sameMembers ? parsed : defaultOrder
    } catch {
      return defaultOrder
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(order))
    } catch {
      // storage full / private mode — silently ignore
    }
  }, [storageKey, order])

  return [order, setOrder] as const
}
