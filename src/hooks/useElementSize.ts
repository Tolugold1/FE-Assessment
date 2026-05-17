import { useEffect, useRef, useState } from 'react'

/**
 * Measures the rendered size of an element. We do this manually instead of
 * relying on recharts' ResponsiveContainer because, with React 19 + recharts 3,
 * the container can land in a measurement loop where width/height oscillate
 * between -1 and the actual size — a known interaction between StrictMode and
 * recharts' internal ResizeObserver.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr) return
      // Round to whole pixels so we don't fire on subpixel jitter.
      const next = { width: Math.round(cr.width), height: Math.round(cr.height) }
      setSize((prev) =>
        prev.width === next.width && prev.height === next.height ? prev : next,
      )
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}
