import { useMemo } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MetricCard as MetricCardType } from '../../data/mock'
import { MetricCard } from './MetricCard'
import { usePersistedOrder } from '../../hooks/usePersistedOrder'
import { cn } from '../../lib/cn'

type DraggableCardsProps = {
  storageKey: string
  cards: MetricCardType[]
  /** Tailwind grid/flex classes for the cards container. */
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

  // PointerSensor with a small activation distance prevents click-vs-drag
  // ambiguity. KeyboardSensor gives us tab + space/arrow keyboard support.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = order.indexOf(active.id as string)
    const to = order.indexOf(over.id as string)
    if (from === -1 || to === -1) return
    setOrder(arrayMove(order, from, to))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div className={gridClassName}>
          {order.map((id) => {
            const card = byId.get(id)
            if (!card) return null
            return <SortableMetricCard key={id} id={id} card={card} />
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}

type SortableMetricCardProps = { id: string; card: MetricCardType }

function SortableMetricCard({ id, card }: SortableMetricCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <MetricCard
      ref={setNodeRef}
      card={card}
      dragging={isDragging}
      style={style}
      className={cn(
        'touch-none select-none cursor-grab active:cursor-grabbing',
        isDragging && 'z-10 rotate-[-0.5deg]',
      )}
      {...attributes}
      {...listeners}
    />
  )
}
