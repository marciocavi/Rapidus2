// src/pages/admin/sections/Features.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import TextStylePicker from '../TextStylePicker';
import ImageUpload from '../ImageUpload';
import ColorPicker from '../ColorPicker';
import ColumnsPicker from '../ColumnsPicker';
import DisplayTypePicker from '../DisplayTypePicker';
import AnimationPicker from '../AnimationPicker';
import { Panel } from '../ui';

export default function FeaturesAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'preview'>('content');

  const featuresConfig = config.sections.features || {
    enabled: true,
    position: 1,
    content: { items: [] },
    style: {}
  };

  const applyFeaturesUpdate = ({
    contentPatch,
    stylePatch
  }: {
    contentPatch?: Record<string, unknown>;
    stylePatch?: Record<string, unknown>;
  }) => {
    const baseContent =
      (featuresConfig.content as Record<string, unknown> | undefined) ??
      (config.content?.features as Record<string, unknown> | undefined) ??
      { items: [] };
    const baseStyle = (featuresConfig.style as Record<string, unknown> | undefined) ?? {};

    const nextSection = {
      ...featuresConfig,
      content: contentPatch ? { ...baseContent, ...contentPatch } : baseContent,
      style: stylePatch ? { ...baseStyle, ...stylePatch } : baseStyle
    };

    const payload: Partial<SiteConfig> = {
      sections: {
        ...config.sections,
        features: nextSection
      }
    };

    if (contentPatch && Object.keys(contentPatch).length > 0) {
      payload.content = {
        ...config.content,
        features: {
          ...(config.content?.features ?? {}),
          ...contentPatch
        }
      };
    }

    updateConfig(payload);
  };

  const updateFeaturesContent = (key: string, value: unknown) => {
    applyFeaturesUpdate({ contentPatch: { [key]: value } });
  };

  const updateFeaturesStyle = (key: string, value: unknown) => {
    applyFeaturesUpdate({ stylePatch: { [key]: value } });
  };

  const updateTextStyle = (field: string, style: unknown) => {
    applyFeaturesUpdate({ stylePatch: { [field]: style } });
  };

  const addFeature = () => {
    const currentItems = featuresConfig.content?.items || [];
    const newFeature = {
      title: `Funcionalidade ${currentItems.length + 1}`,
      description: "Descrição da funcionalidade",
      icon: "⚡",
      link: ""
    };
    
    updateFeaturesContent('items', [...currentItems, newFeature]);
  };

  const updateFeature = (index: number, key: string, value: any) => {
    const currentItems = featuresConfig.content?.items || [];
    const updatedItems = currentItems.map((item, i) => 
      i === index ? { ...item, [key]: value } : item
    );
    updateFeaturesContent('items', updatedItems);
  };

  const removeFeature = (index: number) => {
    const currentItems = featuresConfig.content?.items || [];
    const updatedItems = currentItems.filter((_, i) => i !== index);
    updateFeaturesContent('items', updatedItems);
  };

  const moveFeature = (fromIndex: number, toIndex: number) => {
    const currentItems = featuresConfig.content?.items || [];
    const newItems = [...currentItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    updateFeaturesContent('items', newItems);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Configuração Features</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Conteúdo
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'style'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Estilo
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Textos */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Textos da Seção</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={featuresConfig.content?.title || ''}
                  onChange={(e) => updateFeaturesContent('title', e.target.value)}
                  placeholder="Ex: Nossas Funcionalidades"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={featuresConfig.content?.subtitle || ''}
                  onChange={(e) => updateFeaturesContent('subtitle', e.target.value)}
                  placeholder="Ex: Descubra o que nos torna únicos"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={featuresConfig.content?.description || ''}
                  onChange={(e) => updateFeaturesContent('description', e.target.value)}
                  placeholder="Ex: Explore as principais características que fazem a diferença"
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>
            </div>
          </Panel>

          {/* Layout */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Layout</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Número de Colunas
                </label>
                <ColumnsPicker
                  value={featuresConfig.content?.columns || 3}
                  onChange={(value) => updateFeaturesContent('columns', value)}
                  label="Número de Colunas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo de Exibição
                </label>
                <DisplayTypePicker
                  value={featuresConfig.content?.displayType || 'grid'}
                  onChange={(value) => updateFeaturesContent('displayType', value)}
                  label="Tipo de Exibição"
                />
              </div>
            </div>
          </Panel>

          {/* Features List */}
          <Panel>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Funcionalidades</h3>
              <button
                onClick={addFeature}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>

            <div className="space-y-4">
              {(featuresConfig.content?.items || []).map((item, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                  <div className="flex items-start space-x-4">
                    {/* Drag Handle */}
                    <div className="flex-shrink-0 pt-2">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => updateFeature(index, 'title', e.target.value)}
                            placeholder="Título da funcionalidade"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Ícone (emoji)
                          </label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            placeholder="🚀"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Descrição
                        </label>
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          placeholder="Descrição detalhada da funcionalidade"
                          rows={2}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Imagem (opcional)
                          </label>
                          <ImageUpload
                            value={item.image || ''}
                            onChange={(value) => updateFeature(index, 'image', value)}
                            placeholder="Upload de imagem"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Link (opcional)
                          </label>
                          <input
                            type="url"
                            value={item.link || ''}
                            onChange={(e) => updateFeature(index, 'link', e.target.value)}
                            placeholder="https://exemplo.com"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex-shrink-0 pt-2">
                      <button
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {(!featuresConfig.content?.items || featuresConfig.content.items.length === 0) && (
                <div className="text-center py-8 text-slate-400">
                  <p>Nenhuma funcionalidade adicionada ainda.</p>
                  <p className="text-sm">Clique em &quot;Adicionar&quot; para começar.</p>
                </div>
              )}
            </div>
          </Panel>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-6">
          {/* Estilos de Texto */}
          <TextStylePicker
            value={featuresConfig.style?.titleStyle || {}}
            onChange={(style) => updateTextStyle('titleStyle', style)}
            label="Estilo do Título"
            previewText={featuresConfig.content?.title || "Nossas Funcionalidades"}
          />

          <TextStylePicker
            value={featuresConfig.style?.subtitleStyle || {}}
            onChange={(style) => updateTextStyle('subtitleStyle', style)}
            label="Estilo do Subtítulo"
            previewText={featuresConfig.content?.subtitle || "Descubra o que nos torna únicos"}
          />

          <TextStylePicker
            value={featuresConfig.style?.descriptionStyle || {}}
            onChange={(style) => updateTextStyle('descriptionStyle', style)}
            label="Estilo da Descrição"
            previewText={featuresConfig.content?.description || "Explore as principais características"}
          />

          <TextStylePicker
            value={featuresConfig.style?.itemTitleStyle || {}}
            onChange={(style) => updateTextStyle('itemTitleStyle', style)}
            label="Estilo do Título dos Itens"
            previewText="Funcionalidade Exemplo"
          />

          <TextStylePicker
            value={featuresConfig.style?.itemDescriptionStyle || {}}
            onChange={(style) => updateTextStyle('itemDescriptionStyle', style)}
            label="Estilo da Descrição dos Itens"
            previewText="Descrição detalhada da funcionalidade"
          />

          {/* Estilo dos Cards */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Estilo dos Cards</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Estilo do Card
                </label>
                <select
                  value={featuresConfig.style?.cardStyle || 'elevated'}
                  onChange={(e) => updateFeaturesStyle('cardStyle', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                >
                  <option value="flat">Flat</option>
                  <option value="elevated">Elevated</option>
                  <option value="outlined">Outlined</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Efeito Hover
                </label>
                <select
                  value={featuresConfig.style?.hoverEffect || 'scale'}
                  onChange={(e) => updateFeaturesStyle('hoverEffect', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                >
                  <option value="scale">Scale</option>
                  <option value="glow">Glow</option>
                  <option value="shadow">Shadow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Animação
                </label>
                <AnimationPicker
                  value={featuresConfig.style?.animationType || 'fade'}
                  onChange={(value) => updateFeaturesStyle('animationType', value)}
                  label="Animação"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cor de Fundo
                </label>
                <ColorPicker
                  value={featuresConfig.style?.backgroundColor || 'transparent'}
                  onChange={(color) => updateFeaturesStyle('backgroundColor', color)}
                />
              </div>
            </div>
          </Panel>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <Panel>
          <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
          <div className="border border-slate-600 rounded-lg p-4 bg-slate-800/50">
            <div className="text-sm text-slate-400 mb-2">Preview da Seção Features:</div>
            <div className="bg-white rounded-lg p-6 min-h-[400px]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {featuresConfig.content?.title || "Nossas Funcionalidades"}
                </h2>
                <p className="text-gray-600">
                  {featuresConfig.content?.description || "Explore as principais características"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(featuresConfig.content?.items || []).slice(0, 3).map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl mb-2">{item.icon || "⚡"}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.title || `Funcionalidade ${index + 1}`}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description || "Descrição da funcionalidade"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
