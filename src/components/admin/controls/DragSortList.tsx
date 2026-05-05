'use client'

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    border: '1px solid #ebebeb',
    background: '#fff',
  }
  return (
    <div ref={setNodeRef} style={style}>
      <button type="button" {...attributes} {...listeners} style={{ cursor: 'grab', padding: '4px 8px', fontFamily: 'Montserrat', fontSize: 9, color: '#666', border: 'none', background: '#f5f5f5' }}>
        ⋮⋮
      </button>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

interface DragSortListProps<T extends { id: string }> {
  items: T[]
  onReorder: (items: T[]) => void
  renderItem: (item: T, index: number) => React.ReactNode
}

export function DragSortList<T extends { id: string }>({ items, onReorder, renderItem }: DragSortListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex(x => x.id === active.id)
    const newIndex = items.findIndex(x => x.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <SortRow key={item.id} id={item.id}>
            {renderItem(item, index)}
          </SortRow>
        ))}
      </SortableContext>
    </DndContext>
  )
}
