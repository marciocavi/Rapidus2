'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import ColorPicker from '../ColorPicker';
import { Panel, Toggle } from '../ui';

type HeaderConfig = NonNullable<SiteConfig['header']>;
type HeaderMenuItem = HeaderConfig['menu']['items'][number];
type HeaderTheme = NonNullable<SiteConfig['theme']['header']>;

export default function HeaderAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.header ?? { enabled: true, position: 9 };

  const headerConfig: HeaderConfig = {
    logo: { text: 'Rapidus', image: '', useImage: false },
    menu: { items: [] },
    loginButton: { enabled: true, text: 'Entrar', url: '/login' },
    ...(config.header ?? {}),
  };

  const headerTheme: HeaderTheme = {
    backgroundColor: '#0b2743',
    textColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.1)',
    ...(config.theme?.header ?? {}),
  };

  const updateHeader = (partial: Partial<HeaderConfig>) => {
    updateConfig({
      header: {
        ...headerConfig,
        ...partial,
      },
      sections: {
        ...config.sections,
        header: {
          ...section,
        },
      },
    });
  };

  const updateTheme = (patch: Partial<HeaderTheme>) => {
    updateConfig({
      theme: {
        ...config.theme,
        header: {
          ...headerTheme,
          ...patch,
        },
      },
      sections: {
        ...config.sections,
        header: {
          ...section,
          style: {
            ...(section.style as Record<string, unknown> | undefined ?? {}),
            ...patch,
          },
        },
      },
    });
  };

  const updateLogo = (patch: Partial<HeaderConfig['logo']>) => {
    updateHeader({
      logo: {
        ...headerConfig.logo,
        ...patch,
      },
    });
  };

  const menuItems = headerConfig.menu.items ?? [];

  const updateMenuItem = (index: number, patch: Partial<HeaderMenuItem>) => {
    const next = menuItems.map((item, i) => (i === index ? { ...item, ...patch } : item));
    updateHeader({
      menu: {
        items: next,
      },
    });
  };

  const addMenuItem = () => {
    updateHeader({
      menu: {
        items: [
          ...menuItems,
          { label: 'Nova seção', url: '#', enabled: true },
        ],
      },
    });
  };

  const removeMenuItem = (index: number) => {
    updateHeader({
      menu: {
        items: menuItems.filter((_, i) => i !== index),
      },
    });
  };

  const toggleMenuItem = (index: number) => {
    const item = menuItems[index];
    updateMenuItem(index, { enabled: !(item?.enabled ?? true) });
  };

  const updateLoginButton = (patch: Partial<HeaderConfig['loginButton']>) => {
    updateHeader({
      loginButton: {
        ...headerConfig.loginButton,
        ...patch,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Identidade</h3>}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Texto do logo</label>
              <input
                type="text"
                value={headerConfig.logo.text ?? ''}
                onChange={(e) => updateLogo({ text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Logo (URL)</label>
              <input
                type="text"
                value={headerConfig.logo.image ?? ''}
                onChange={(e) => updateLogo({ image: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={headerConfig.logo.useImage ?? false} onChange={(checked) => updateLogo({ useImage: checked })} />
            <span className="text-sm text-slate-300">Usar imagem em vez de texto</span>
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Menu</h3>}>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className="space-y-3 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400">Item #{index + 1}</span>
                <div className="flex items-center gap-2">
                  <Toggle checked={item.enabled ?? true} onChange={() => toggleMenuItem(index)} />
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Rótulo</label>
                  <input
                    type="text"
                    value={item.label ?? ''}
                    onChange={(e) => updateMenuItem(index, { label: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">URL</label>
                  <input
                    type="text"
                    value={item.url ?? ''}
                    onChange={(e) => updateMenuItem(index, { url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMenuItem}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <Plus className="w-4 h-4" />
            Adicionar item
          </button>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Botão de login</h3>}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Toggle checked={headerConfig.loginButton.enabled ?? true} onChange={(checked) => updateLoginButton({ enabled: checked })} />
            <span className="text-sm text-slate-300">Exibir botão</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Texto</label>
              <input
                type="text"
                value={headerConfig.loginButton.text ?? ''}
                onChange={(e) => updateLoginButton({ text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">URL</label>
              <input
                type="text"
                value={headerConfig.loginButton.url ?? ''}
                onChange={(e) => updateLoginButton({ url: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Cores</h3>}>
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="block text-xs text-slate-400 mb-1">Fundo</span>
            <ColorPicker value={headerTheme.backgroundColor} onChange={(color) => updateTheme({ backgroundColor: color })} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 mb-1">Texto</span>
            <ColorPicker value={headerTheme.textColor} onChange={(color) => updateTheme({ textColor: color })} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 mb-1">Borda</span>
            <ColorPicker value={headerTheme.borderColor} onChange={(color) => updateTheme({ borderColor: color })} />
          </div>
        </div>
      </Panel>
    </div>
  );
}
