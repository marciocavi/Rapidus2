'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Panel, Toggle } from '../ui';

type CarrosselContent = SiteConfig['content']['carrossels'];
type CarrosselItem = CarrosselContent['items'][number];

export default function CarrosselsAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.carrossels ?? { enabled: false, position: 12 };
  const currentContent: CarrosselContent = {
    ...(config.content?.carrossels ?? { title: '', subtitle: '', items: [] }),
    ...((section.content as CarrosselContent | undefined) ?? {}),
  };

  const applyUpdate = (content: CarrosselContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        carrossels: {
          ...section,
          content,
        },
      },
      content: {
        ...config.content,
        carrossels: content,
      },
    });
  };

  const handleFieldChange = (key: keyof CarrosselContent, value: string | CarrosselItem[]) => {
    applyUpdate({
      ...currentContent,
      [key]: value as never,
    });
  };

  const items = Array.isArray(currentContent.items) ? currentContent.items : [];

  const updateItem = (index: number, patch: Partial<CarrosselItem>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item));
    handleFieldChange('items', next);
  };

  const addItem = () => {
    const count = items.length + 1;
    handleFieldChange('items', [
      ...items,
      {
        id: `item-${count}`,
        title: `Carrossel ${count}`,
        description: '',
        image: '',
        link: '',
        enabled: true,
      },
    ]);
  };

  const removeItem = (index: number) => {
    handleFieldChange('items', items.filter((_, i) => i !== index));
  };

  const toggleItem = (index: number) => {
    const item = items[index];
    updateItem(index, { enabled: !(item?.enabled ?? false) });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Carrosséis</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Nossos carrosséis"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtítulo</label>
            <textarea
              value={currentContent.subtitle ?? ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              rows={3}
              placeholder="Explique o conteúdo do carrossel"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Slides</h3>}>
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
                      <label className="block text-xs text-slate-400 mb-1">Título</label>
                      <input
                        type="text"
                        value={item.title ?? ''}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Descrição</label>
                    <textarea
                      value={item.description ?? ''}
                      onChange={(e) => updateItem(index, { description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Imagem (URL)</label>
                      <input
                        type="text"
                        value={item.image ?? ''}
                        onChange={(e) => updateItem(index, { image: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Link</label>
                      <input
                        type="text"
                        value={item.link ?? ''}
                        onChange={(e) => updateItem(index, { link: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                      />
                    </div>
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
            Adicionar slide
          </button>
        </div>
      </Panel>
    </div>
  );
}
