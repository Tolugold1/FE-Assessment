import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { useMemo } from 'react'
import type { MetricCard as MetricCardType } from '../../data/mock'
import { MetricCard } from './MetricCard'
import { usePersistedOrder } from '../../hooks/usePersistedOrder'
import { cn } from '../../lib/cn'

type DraggableCardsProps = {
  storageKey: string
  cards: MetricCardType[]
  /** Tailwind grid-cols classes. Default is a 4-column responsive grid. */
  gridClassName?: string
}

export function DraggableCards({
  storageKey,
  cards,
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4',
}: DraggableCardsProps) {
  const defaultOrder = useMemo(() => cards.map((c) => c.id), [cards])
  const [order, setOrder] = usePersistedOrder(storageKey, defaultOrder)

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
      <Droppable droppableId={storageKey} direction="horizontal">
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
