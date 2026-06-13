import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Plus, Trash2 } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDragSort } from '../../hooks/useDragSort';
import { ResumeSection, ResumeSectionType } from '../../types/resume';
import { DragHandle } from '../common/DragHandle';
import { Button } from '../common/Button';

const FIXED_SECTION_IDS: ResumeSectionType[] = ['summary', 'work', 'education', 'skills', 'projects'];

interface ModuleSidebarProps {
  sections: ResumeSection[];
  activeSectionId: ResumeSectionType;
  onSelect: (sectionId: ResumeSectionType) => void;
  onSorted: (sections: ResumeSection[]) => void;
  onToggle: (sectionId: ResumeSectionType) => void;
  onAddCustomSection: (title: string) => void;
  onDeleteCustomSection: (sectionId: string) => void;
}

export function ModuleSidebar({
  sections,
  activeSectionId,
  onSelect,
  onSorted,
  onToggle,
  onAddCustomSection,
  onDeleteCustomSection,
}: ModuleSidebarProps) {
  const { items, onDragEnd } = useDragSort(sections, onSorted);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    const title = newTitle.trim();
    if (title) {
      onAddCustomSection(title);
      setNewTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAdd();
    } else if (event.key === 'Escape') {
      setIsAdding(false);
      setNewTitle('');
    }
  };

  const isCustomSection = (sectionId: ResumeSectionType) => {
    return !FIXED_SECTION_IDS.includes(sectionId);
  };

  return (
    <aside className="border border-[var(--border)] bg-[var(--surface)] p-4">
      <div>
        <h2 className="font-display text-xl font-semibold">模块顺序</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">拖拽左侧把手调整预览顺序。</p>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div className="mt-4 space-y-2" ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((section, index) => (
                <Draggable draggableId={section.id} index={index} key={section.id}>
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={`flex items-center gap-2 border px-2 py-2 transition group ${activeSectionId === section.id
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                          : 'border-[var(--border)] bg-[var(--bg)]'
                        }`}
                    >
                      <DragHandle dragHandleProps={dragProvided.dragHandleProps} />
                      <button
                        className="min-w-0 flex-1 truncate text-left text-sm font-semibold"
                        type="button"
                        onClick={() => onSelect(section.id)}
                      >
                        {section.title}
                      </button>
                      {isCustomSection(section.id) ? (
                        <button
                          type="button"
                          className="opacity-0 transition group-hover:opacity-100 text-[var(--muted)] hover:text-red-500"
                          onClick={() => onDeleteCustomSection(section.id)}
                          aria-label={`删除 ${section.title} 模块`}
                        >
                          <Trash2 size={14} aria-hidden />
                        </button>
                      ) : null}
                      <Switch
                        checked={section.enabled}
                        onChange={() => onToggle(section.id)}
                        className={`relative inline-flex h-6 w-10 shrink-0 rounded-full border border-[var(--border)] transition ${section.enabled ? 'bg-[var(--accent)]' : 'bg-[var(--surface-alt)]'
                          }`}
                        aria-label={`${section.title} 启用状态`}
                      >
                        <span
                          className={`mt-0.5 h-5 w-5 rounded-full bg-[var(--surface)] transition ${section.enabled ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                        />
                      </Switch>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-4">
        {isAdding ? (
          <div className="space-y-2 border border-[var(--border)] bg-[var(--bg)] p-3">
            <input
              type="text"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              placeholder="输入模块标题，如：证书、专利..."
              value={newTitle}
              autoFocus
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-2">
              <Button className="min-h-8 px-3 py-1 text-xs" onClick={handleAdd} disabled={!newTitle.trim()}>
                添加
              </Button>
              <Button className="min-h-8 px-3 py-1 text-xs" variant="ghost" onClick={() => { setIsAdding(false); setNewTitle(''); }}>
                取消
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full"
            icon={<Plus size={16} aria-hidden />}
            onClick={() => setIsAdding(true)}
          >
            添加自定义模块
          </Button>
        )}
      </div>
    </aside>
  );
}

