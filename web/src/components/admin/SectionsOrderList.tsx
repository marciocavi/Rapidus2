'use client';

import { useState, useMemo } from 'react';
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable,
  arrayMove as dndArrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { arrayMove, updatePositions } from '@/lib/reorder';

export type SectionItem = { 
  id: string; 
  label: string; 
  enabled: boolean; 
  position: number;
  key: string;
};

interface SortableRowProps {
  item: SectionItem;
  index: number;
  onArrowUp: () => void;
  onArrowDown: () => void;
}

function SortableRow({ item, index, onArrowUp, onArrowDown }: SortableRowProps) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  } as const;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="flex items-center justify-between rounded-xl bg-slate-800/50 p-3 mb-2 border border-slate-600/30"
    >
      <div className="flex items-center gap-3">
        <button 
          aria-label="arrastar" 
          {...attributes} 
          {...listeners} 
          className="cursor-grab px-2 text-slate-400 hover:text-white transition-colors"
        >
          ≡
        </button>
        <span className="text-slate-100 font-medium">{item.label}</span>
        <div className={`w-2 h-2 rounded-full ${
          item.enabled ? 'bg-green-500' : 'bg-slate-600'
        }`} />
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onArrowUp} 
          aria-label="mover acima" 
          className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
          disabled={index === 0}
        >
          ↑
        </button>
        <button 
          onClick={onArrowDown} 
          aria-label="mover abaixo" 
          className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
          disabled={index === 0} // Will be fixed with proper length
        >
          ↓
        </button>
        <span className="text-xs text-slate-400 min-w-[3rem] text-center">
          pos: {index + 1}
        </span>
      </div>
    </div>
  );
}

interface SectionsOrderListProps {
  initial: SectionItem[];
  onSave?: (items: SectionItem[]) => Promise<void>;
}

export function SectionsOrderList({ initial, onSave }: SectionsOrderListProps) {
  const [items, setItems] = useState<SectionItem[]>(
    [...initial].sort((a, b) => a.position - b.position)
  );
  
  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { distance: 5 } 
    })
  );

  const ids = useMemo(() => items.map(i => i.id), [items]);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    
    setItems(prev => {
      const moved = dndArrayMove(prev, oldIndex, newIndex);
      return updatePositions(moved);
    });
  }

  function move(indexFrom: number, indexTo: number) {
    if (indexTo < 0 || indexTo >= items.length) return;
    
    setItems(prev => {
      const moved = arrayMove(prev, indexFrom, indexTo);
      return updatePositions(moved);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Ordem das Seções</h3>
        <p className="text-sm text-slate-400">Arraste para reordenar ou use as setas</p>
      </div>
      
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={onDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <SortableRow
              key={item.id}
              item={item}
              index={idx}
              onArrowUp={() => move(idx, idx - 1)}
              onArrowDown={() => move(idx, idx + 1)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <SaveBar items={items} onSave={onSave} />
    </div>
  );
}

interface SaveBarProps {
  items: SectionItem[];
  onSave?: (items: SectionItem[]) => Promise<void>;
}

function SaveBar({ items, onSave }: SaveBarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSave() {
    if (!onSave) return;
    
    setIsSaving(true);
    setMessage('');
    
    try {
      await onSave(items);
      setMessage('Ordem salva com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Erro ao salvar ordem. Tente novamente.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-end space-y-2">
      {message && (
        <div className={`text-sm ${
          message.includes('sucesso') ? 'text-green-400' : 'text-red-400'
        }`}>
          {message}
        </div>
      )}
      <button 
        onClick={handleSave} 
        disabled={isSaving}
        className="rounded-lg px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
            Salvando...
          </>
        ) : (
          'Salvar ordem'
        )}
      </button>
    </div>
  );
}
