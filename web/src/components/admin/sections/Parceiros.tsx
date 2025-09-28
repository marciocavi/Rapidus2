'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Panel } from '../ui';

type ParceirosContent = { title?: string; subtitle?: string; logos?: string[]; [key: string]: unknown };

export default function ParceirosAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.parceiros ?? { enabled: true, position: 4 };
  const currentContent: ParceirosContent = {
    ...((config.content?.parceiros as ParceirosContent) ?? { title: '', subtitle: '', logos: [] }),
    ...((section.content as ParceirosContent | undefined) ?? {}),
  };

  const updateParceiros = (content: ParceirosContent) => {
    updateConfig({
      sections: {
        ...config.sections,
        parceiros: {
          ...section,
          content,
        },
      },
      content: {
        ...config.content,
        parceiros: content as SiteConfig['content']['parceiros'],
      },
    });
  };

  const handleFieldChange = (key: keyof ParceirosContent, value: string | string[]) => {
    updateParceiros({
      ...currentContent,
      [key]: value,
    });
  };

  const logos = Array.isArray(currentContent.logos) ? currentContent.logos : [];

  const updateLogo = (index: number, value: string) => {
    const next = logos.map((logo, i) => (i === index ? value : logo));
    handleFieldChange('logos', next);
  };

  const addLogo = () => {
    handleFieldChange('logos', [...logos, `Parceiro ${logos.length + 1}`]);
  };

  const removeLogo = (index: number) => {
    handleFieldChange('logos', logos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Parceiros</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Ex: Nossos Parceiros"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtítulo</label>
            <textarea
              value={currentContent.subtitle ?? ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Descrição curta sobre os parceiros"
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Logos</h3>}>
        <div className="space-y-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={logo}
                onChange={(e) => updateLogo(index, e.target.value)}
                placeholder="Nome ou URL do parceiro"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => removeLogo(index)}
                className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addLogo}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar parceiro
          </button>
        </div>
      </Panel>
    </div>
  );
}
