'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Panel } from '../ui';

type StatItem = { value: string; label: string };
type StatsContent = { items?: StatItem[] } & Record<string, unknown>;

export default function StatsAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.stats ?? { enabled: true, position: 8 };
  const currentContent = ({
    ...((config.content?.stats as StatsContent) ?? { items: [] }),
    ...((section.content as StatsContent | undefined) ?? {}),
  }) as StatsContent;

  const applyUpdate = (content: StatsContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        stats: {
          ...section,
          content: content as Record<string, unknown>,
        },
      },
      content: {
        ...config.content,
        stats: content as any,
      },
    });
  };

  const items = Array.isArray(currentContent.items) ? currentContent.items : [];

  const updateItem = (index: number, patch: Partial<StatItem>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    applyUpdate({ ...currentContent, items: next });
  };

  const addItem = () => {
    const count = items.length + 1;
    const value = `${count * 10}+`;
    applyUpdate({
      ...currentContent,
      items: [
        ...items,
        {
          value,
          label: `Indicador ${count}`,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    applyUpdate({ ...currentContent, items: items.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Indicadores</h3>}>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Valor</label>
                <input
                  type="text"
                  value={item.value ?? ''}
                  onChange={(e) => updateItem(index, { value: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-slate-400 mb-1">Rótulo</label>
                  <input
                    type="text"
                    value={item.label ?? ''}
                    onChange={(e) => updateItem(index, { label: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="h-10 px-3 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar indicador
          </button>
        </div>
      </Panel>
    </div>
  );
}
