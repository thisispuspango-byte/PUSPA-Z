'use client'

import React, { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Settings2, GripVertical, Eye, EyeOff, RotateCcw } from 'lucide-react'

type WidgetItem = {
  id: string
  label: string
  component: React.ReactNode
  required?: boolean
}

type DashboardLayoutProps = {
  widgets: WidgetItem[]
}

const STORAGE_KEY = 'puspa-dashboard-layout'
const HIDDEN_KEY = 'puspa-dashboard-hidden'

function SortableItem({ 
  widget, 
  isEditMode,
  isHidden,
  onToggleHide
}: { 
  widget: WidgetItem
  isEditMode: boolean
  isHidden: boolean
  onToggleHide: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget.id, disabled: !isEditMode || widget.required })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!isEditMode && isHidden) return null

  return (
    <div ref={setNodeRef} style={style} className={`relative ${isEditMode ? 'mb-4 border-2 border-dashed border-primary/20 rounded-xl p-2 bg-background/50' : 'mb-4'}`}>
      {isEditMode && (
        <div className="flex items-center justify-between bg-muted/50 p-2 mb-2 rounded-lg">
          <div className="flex items-center gap-2">
            {!widget.required && (
              <div {...attributes} {...listeners} className="cursor-grab hover:bg-muted p-1 rounded">
                <GripVertical size={16} className="text-muted-foreground" />
              </div>
            )}
            <span className="text-sm font-semibold">{widget.label}</span>
            {widget.required && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">Diperlukan</span>}
          </div>
          {!widget.required && (
            <Button id="dashboard-layout-Button-1" variant="ghost" size="sm" onClick={() => onToggleHide(widget.id)} className="h-7 px-2">
              {isHidden ? <EyeOff size={14} className="text-muted-foreground" /> : <Eye size={14} />}
            </Button>
          )}
        </div>
      )}
      <div className={isHidden && isEditMode ? 'opacity-30 pointer-events-none' : ''}>
        {widget.component}
      </div>
    </div>
  )
}

export function DashboardLayout({ widgets }: DashboardLayoutProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [order, setOrder] = useState<string[]>([])
  const [hidden, setHidden] = useState<string[]>([])

  useEffect(() => {
    const savedOrder = localStorage.getItem(STORAGE_KEY)
    const savedHidden = localStorage.getItem(HIDDEN_KEY)
    
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder)
      // Ensure required items are at the top, and merge with new widgets
      const defaultIds = widgets.map(w => w.id)
      const validOrder = parsedOrder.filter((id: string) => defaultIds.includes(id))
      const missing = defaultIds.filter(id => !validOrder.includes(id))
      // eslint-disable-next-line
      setOrder([...validOrder, ...missing])
    } else {
      setOrder(widgets.map(w => w.id))
    }

    if (savedHidden) setHidden(JSON.parse(savedHidden))
  }, [widgets])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        const newOrder = arrayMove(items, oldIndex, newIndex)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder))
        return newOrder
      })
    }
  }

  const toggleHide = (id: string) => {
    setHidden(prev => {
      const newHidden = prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
      localStorage.setItem(HIDDEN_KEY, JSON.stringify(newHidden))
      return newHidden
    })
  }

  const resetLayout = () => {
    setOrder(widgets.map(w => w.id))
    setHidden([])
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(HIDDEN_KEY)
  }

  if (order.length === 0) return null

  // Sort widgets based on order
  const orderedWidgets = [...widgets].sort((a, b) => {
    // Required items always at the top
    if (a.required && !b.required) return -1
    if (!a.required && b.required) return 1
    return order.indexOf(a.id) - order.indexOf(b.id)
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        {isEditMode ? (
          <div className="flex gap-2">
            <Button id="dashboard-layout-Button-2" variant="outline" size="sm" onClick={resetLayout} className="gap-2">
              <RotateCcw size={14} /> Reset Asal
            </Button>
            <Button id="dashboard-layout-Button-3" variant="default" size="sm" onClick={() => setIsEditMode(false)} className="gap-2">
              Selesai Menyusun
            </Button>
          </div>
        ) : (
          <Button id="dashboard-layout-Button-4" variant="outline" size="sm" onClick={() => setIsEditMode(true)} className="gap-2">
            <Settings2 size={14} /> Susun Semula
          </Button>
        )}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
          {orderedWidgets.map(widget => (
            <SortableItem 
              key={widget.id} 
              widget={widget} 
              isEditMode={isEditMode}
              isHidden={hidden.includes(widget.id)}
              onToggleHide={toggleHide}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
