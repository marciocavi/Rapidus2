'use client';

import React from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import ColorPicker from '../ColorPicker';
import { Panel } from '../ui';

type CtaContent = SiteConfig['content']['cta'];

type CtaStyle = NonNullable<NonNullable<SiteConfig['sections']['cta']>['style']>;

export default function CTAAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.cta ?? { enabled: true, position: 7 };
  const currentContent: CtaContent = {
    ...(config.content?.cta ?? { title: '', subtitle: '', primaryButton: '', secondaryButton: '' }),
    ...((section.content as CtaContent | undefined) ?? {}),
  };
  const currentStyle: CtaStyle = {
    ...(section.style as CtaStyle | undefined ?? {}),
  };

  const applyUpdate = ({ content, style }: { content?: Partial<CtaContent>; style?: Partial<CtaStyle>; }) => {
    const nextContent: CtaContent = {
      ...currentContent,
      ...(content ?? {}),
    };
    const nextStyle: CtaStyle = {
      ...currentStyle,
      ...(style ?? {}),
    };

    updateConfig({
      sections: {
        ...config.sections,
        cta: {
          ...section,
          content: nextContent,
          style: nextStyle,
        },
      },
      content: {
        ...config.content,
        cta: nextContent,
      },
    });
  };

  const handleContentChange = (key: keyof CtaContent, value: string) => {
    applyUpdate({ content: { [key]: value } as Partial<CtaContent> });
  };

  const handleStyleChange = (key: keyof CtaStyle, value: unknown) => {
    applyUpdate({ style: { [key]: value } as Partial<CtaStyle> });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Chamada Principal (CTA)</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título</label>
            <input
              type="text"
              value={currentContent.title ?? ''}
              onChange={(e) => handleContentChange('title', e.target.value)}
              placeholder="Pronto para transformar seu negócio?"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Subtítulo</label>
            <textarea
              value={currentContent.subtitle ?? ''}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              rows={3}
              placeholder="Mensagem de apoio para reforçar o CTA"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Botões</h3>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200">Primário</h4>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Texto</label>
              <input
                type="text"
                value={currentContent.primaryButton ?? ''}
                onChange={(e) => handleContentChange('primaryButton', e.target.value)}
                placeholder="Solicitar orçamento"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Link</label>
              <input
                type="text"
                value={currentContent.primaryButtonLink ?? ''}
                onChange={(e) => handleContentChange('primaryButtonLink', e.target.value)}
                placeholder="/contato"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="block text-xs text-slate-400 mb-1">Cor</span>
                <ColorPicker
                  value={(currentStyle.primaryButtonColor as string | undefined) ?? '#2E6BD6'}
                  onChange={(color) => handleStyleChange('primaryButtonColor', color)}
                />
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-1">Texto</span>
                <ColorPicker
                  value={(currentStyle.primaryButtonTextColor as string | undefined) ?? '#ffffff'}
                  onChange={(color) => handleStyleChange('primaryButtonTextColor', color)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200">Secundário</h4>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Texto</label>
              <input
                type="text"
                value={currentContent.secondaryButton ?? ''}
                onChange={(e) => handleContentChange('secondaryButton', e.target.value)}
                placeholder="Ver portfólio"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Link</label>
              <input
                type="text"
                value={currentContent.secondaryButtonLink ?? ''}
                onChange={(e) => handleContentChange('secondaryButtonLink', e.target.value)}
                placeholder="/portfolio"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <span className="block text-xs text-slate-400 mb-1">Borda</span>
                <ColorPicker
                  value={(currentStyle.secondaryButtonColor as string | undefined) ?? '#ffffff'}
                  onChange={(color) => handleStyleChange('secondaryButtonColor', color)}
                />
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-1">Texto</span>
                <ColorPicker
                  value={(currentStyle.secondaryButtonTextColor as string | undefined) ?? '#ffffff'}
                  onChange={(color) => handleStyleChange('secondaryButtonTextColor', color)}
                />
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Fundo</h3>}>
        <div className="flex items-center gap-6">
          <div>
            <span className="block text-xs text-slate-400 mb-1">Cor de fundo</span>
            <ColorPicker
              value={(currentStyle.backgroundColor as string | undefined) ?? '#0c2744'}
              onChange={(color) => handleStyleChange('backgroundColor', color)}
            />
          </div>
          <div>
            <span className="block text-xs text-slate-400 mb-1">Cor do texto</span>
            <ColorPicker
              value={(currentStyle.textColor as string | undefined) ?? '#ffffff'}
              onChange={(color) => handleStyleChange('textColor', color)}
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}
