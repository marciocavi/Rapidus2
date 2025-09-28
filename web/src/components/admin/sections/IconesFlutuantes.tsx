'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import ColorPicker from '../ColorPicker';
import { Panel, Toggle } from '../ui';

type FloatingIconsContent = SiteConfig['content']['icones-flutuantes'];
type FloatingIconItem = FloatingIconsContent['items'][number];

export default function IconesFlutuantesAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections['icones-flutuantes'] ?? { enabled: false, position: 14 };
  const currentContent: FloatingIconsContent = {
    ...(config.content?.['icones-flutuantes'] ?? { title: '', items: [] }),
    ...((section.content as FloatingIconsContent | undefined) ?? {}),
  };

  const applyUpdate = (content: FloatingIconsContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        'icones-flutuantes': {
          ...section,
          content,
        },
      },
      content: {
        ...config.content,
        'icones-flutuantes': content,
      },
    });
  };

  const items = Array.isArray(currentContent.items) ? currentContent.items : [];

  const updateItem = (index: number, patch: Partial<FloatingIconItem>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    applyUpdate({ ...currentContent, items: next });
  };

  const addItem = () => {
    const count = items.length + 1;
    applyUpdate({
      ...currentContent,
      items: [
        ...items,
        {
          id: `icon-${count}`,
          name: `Canal ${count}`,
          icon: '🔗',
          url: '',
          color: '#ffffff',
          enabled: true,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    applyUpdate({ ...currentContent, items: items.filter((_, i) => i !== index) });
  };

  const toggleItem = (index: number) => {
    const item = items[index];
    updateItem(index, { enabled: !(item?.enabled ?? true) });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Ícones flutuantes</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => applyUpdate({ ...currentContent, title: e.target.value })}
              placeholder="Redes sociais"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Itens</h3>}>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id ?? index} className="space-y-3 border border-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">ID</label>
                      <input
                        type="text"
                        value={item.id ?? ''}
                        onChange={(e) => updateItem(index, { id: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Nome</label>
                      <input
                        type="text"
                        value={item.name ?? ''}
                        onChange={(e) => updateItem(index, { name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Ícone (emoji)</label>
                      <input
                        type="text"
                        value={item.icon ?? ''}
                        onChange={(e) => updateItem(index, { icon: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Link</label>
                      <input
                        type="text"
                        value={item.url ?? ''}
                        onChange={(e) => updateItem(index, { url: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Cor</label>
                    <ColorPicker
                      value={(item.color as string | undefined) ?? '#ffffff'}
                      onChange={(color) => updateItem(index, { color })}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Toggle checked={item.enabled ?? true} onChange={() => toggleItem(index)} />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar ícone
          </button>
        </div>
      </Panel>
    </div>
  );
}
