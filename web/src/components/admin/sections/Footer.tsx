'use client';

import React from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import ColorPicker from '../ColorPicker';
import { Panel, Toggle } from '../ui';

type FooterConfig = NonNullable<SiteConfig['footer']>;

type FooterTheme = NonNullable<SiteConfig['theme']['footer']>;

const SOCIAL_KEYS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'twitter', label: 'Twitter' },
] as const;

const LINK_KEYS = [
  { key: 'privacyPolicy', label: 'Política de Privacidade' },
  { key: 'termsOfUse', label: 'Termos de Uso' },
  { key: 'contact', label: 'Contato' },
] as const;

export default function FooterAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const section = config.sections.footer ?? { enabled: true, position: 10 };

  const footerConfig: FooterConfig = {
    socialMedia: {
      instagram: { enabled: true, url: '', label: 'Instagram' },
      whatsapp: { enabled: true, url: '', label: 'WhatsApp' },
      linkedin: { enabled: false, url: '', label: 'LinkedIn' },
      facebook: { enabled: false, url: '', label: 'Facebook' },
      twitter: { enabled: false, url: '', label: 'Twitter' },
    },
    copyright: '© Rapidus',
    links: {
      privacyPolicy: { enabled: true, url: '/privacidade', label: 'Privacidade' },
      termsOfUse: { enabled: true, url: '/termos', label: 'Termos' },
      contact: { enabled: true, url: '/contato', label: 'Contato' },
    },
    ...(config.footer ?? {}),
  };

  const footerTheme: FooterTheme = {
    backgroundColor: '#0b2743',
    textColor: '#ffffff',
    borderColor: 'rgba(255,255,255,0.1)',
    ...(config.theme?.footer ?? {}),
  };

  const updateFooter = (nextFooter: FooterConfig) => {
    updateConfig({
      footer: nextFooter,
      sections: {
        ...config.sections,
        footer: {
          ...section,
        },
      },
    });
  };

  const updateFooterTheme = (patch: Partial<FooterTheme>) => {
    const nextTheme = {
      ...config.theme,
      footer: {
        ...footerTheme,
        ...patch,
      },
    };
    updateConfig({
      theme: nextTheme,
      sections: {
        ...config.sections,
        footer: {
          ...section,
          style: {
            ...(section.style as Record<string, unknown> | undefined ?? {}),
            ...patch,
          },
        },
      },
    });
  };

  const updateSocial = <K extends keyof FooterConfig['socialMedia']>(key: K, patch: Partial<FooterConfig['socialMedia'][K]>) => {
    updateFooter({
      ...footerConfig,
      socialMedia: {
        ...footerConfig.socialMedia,
        [key]: {
          ...footerConfig.socialMedia[key],
          ...patch,
        },
      },
    });
  };

  const updateLink = <K extends keyof FooterConfig['links']>(key: K, patch: Partial<FooterConfig['links'][K]>) => {
    updateFooter({
      ...footerConfig,
      links: {
        ...footerConfig.links,
        [key]: {
          ...footerConfig.links[key],
          ...patch,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <Panel header={<h3 className="text-lg font-semibold text-white">Informações principais</h3>}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Copyright</label>
            <input
              type="text"
              value={footerConfig.copyright ?? ''}
              onChange={(e) => updateFooter({ ...footerConfig, copyright: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
            />
          </div>
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Redes sociais</h3>}>
        <div className="space-y-4">
          {SOCIAL_KEYS.map(({ key, label }) => {
            const item = footerConfig.socialMedia[key];
            return (
              <div key={key} className="space-y-2 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{label}</span>
                  <Toggle checked={item.enabled ?? false} onChange={(checked) => updateSocial(key, { enabled: checked })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Rótulo</label>
                    <input
                      type="text"
                      value={item.label ?? ''}
                      onChange={(e) => updateSocial(key, { label: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">URL</label>
                    <input
                      type="text"
                      value={item.url ?? ''}
                      onChange={(e) => updateSocial(key, { url: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Links úteis</h3>}>
        <div className="space-y-4">
          {LINK_KEYS.map(({ key, label }) => {
            const item = footerConfig.links[key];
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-3">
                  <Toggle checked={item.enabled ?? false} onChange={(checked) => updateLink(key, { enabled: checked })} />
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Rótulo</label>
                  <input
                    type="text"
                    value={item.label ?? ''}
                    onChange={(e) => updateLink(key, { label: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">URL</label>
                  <input
                    type="text"
                    value={item.url ?? ''}
                    onChange={(e) => updateLink(key, { url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel header={<h3 className="text-lg font-semibold text-white">Cores</h3>}>
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="block text-xs text-slate-400 mb-1">Fundo</span>
            <ColorPicker value={footerTheme.backgroundColor} onChange={(color) => updateFooterTheme({ backgroundColor: color })} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 mb-1">Texto</span>
            <ColorPicker value={footerTheme.textColor} onChange={(color) => updateFooterTheme({ textColor: color })} />
          </div>
          <div>
            <span className="block text-xs text-slate-400 mb-1">Borda</span>
            <ColorPicker value={footerTheme.borderColor} onChange={(color) => updateFooterTheme({ borderColor: color })} />
          </div>
        </div>
      </Panel>
    </div>
  );
}
