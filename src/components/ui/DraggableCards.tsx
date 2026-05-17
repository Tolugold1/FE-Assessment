import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { useEffect, useMemo, useState } from 'react'
import type { MetricCard as MetricCardType } from '../../data/mock'
import { MetricCard } from './MetricCard'
import { usePersistedOrder } from '../../hooks/usePersistedOrder'
import { cn } from '../../lib/cn'

type DraggableCardsProps = {
  storageKey: string
  cards: MetricCardType[]
  /** Tailwind grid/flex classes for the cards container. */
  gridClassName?: string
  /**
   * Visual direction at desktop widths. We switch to vertical on mobile
   * automatically — @hello-pangea/dnd treats the placement math as 1D and
   * gets confused if it thinks the row is horizontal while items have
   * actually wrapped onto a new line.
   */
  desktopDirection?: 'horizontal' | 'vertical'
  /** Tailwind media query for the desktop direction. Default is `(min-width: 768px)`. */
  desktopMedia?: string
}

export function DraggableCards({
  storageKey,
  cards,
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4',
  desktopDirection = 'horizontal',
  desktopMedia = '(min-width: 768px)',
}: DraggableCardsProps) {
  const defaultOrder = useMemo(() => cards.map((c) => c.id), [cards])
  const [order, setOrder] = usePersistedOrder(storageKey, defaultOrder)

  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(() => {
    if (typeof window === 'undefined') return desktopDirection
    return window.matchMedia(desktopMedia).matches ? desktopDirection : 'vertical'
  })

  useEffect(() => {
    const mq = window.matchMedia(desktopMedia)
    const update = () => setDirection(mq.matches ? desktopDirection : 'vertical')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [desktopDirection, desktopMedia])

  const byId = useMemo(() => {
    const map = new Map<string, MetricCardType>()
    cards.forEach((c) => map.set(c.id, c))
    return map
  }, [cards])

  function onDragEnd(result: DropResult) {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const next = Array.from(order)
    const [moved] = next.splice(result.source.index, 1)
    next.splice(result.destination.index, 0, moved)
    setOrder(next)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={storageKey} direction={direction}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={gridClassName}
          >
            {order.map((id, index) => {
              const card = byId.get(id)
              if (!card) return null
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(dragProvided, snapshot) => (
                    <MetricCard
                      ref={dragProvided.innerRef}
                      card={card}
                      dragging={snapshot.isDragging}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      className={cn(snapshot.isDragging && 'rotate-[-0.5deg]')}
                    />
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
