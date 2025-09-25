// src/pages/admin/sections/Hero.tsx
'use client';

import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import TextStylePicker from '../TextStylePicker';
import ImageUpload from '../ImageUpload';
import ColorPicker from '../ColorPicker';
import HeightPicker from '../HeightPicker';
import LayoutPicker from '../LayoutPicker';
import AnimationPicker from '../AnimationPicker';
import { Panel } from '../ui';

export default function HeroAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'preview'>('content');

  const heroConfig = config.sections.hero || {
    enabled: true,
    position: 0,
    content: {},
    style: {}
  };

  const updateHeroContent = (key: string, value: any) => {
    updateConfig({
      ...config,
      sections: {
        ...config.sections,
        hero: {
          ...heroConfig,
          content: {
            ...heroConfig.content,
            [key]: value
          }
        }
      }
    });
  };

  const updateHeroStyle = (key: string, value: any) => {
    updateConfig({
      ...config,
      sections: {
        ...config.sections,
        hero: {
          ...heroConfig,
          style: {
            ...heroConfig.style,
            [key]: value
          }
        }
      }
    });
  };

  const updateTextStyle = (field: string, style: any) => {
    updateHeroStyle(field, style);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Configuração Hero</h2>
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
            <h3 className="text-lg font-medium text-white mb-4">Textos</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={heroConfig.content?.title || ''}
                  onChange={(e) => updateHeroContent('title', e.target.value)}
                  placeholder="Digite o título principal"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={heroConfig.content?.subtitle || ''}
                  onChange={(e) => updateHeroContent('subtitle', e.target.value)}
                  placeholder="Digite o subtítulo"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={heroConfig.content?.description || ''}
                  onChange={(e) => updateHeroContent('description', e.target.value)}
                  placeholder="Digite a descrição"
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Legenda (opcional)
                </label>
                <input
                  type="text"
                  value={heroConfig.content?.caption || ''}
                  onChange={(e) => updateHeroContent('caption', e.target.value)}
                  placeholder="Ex: Novidade, Promoção, etc."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>
            </div>
          </Panel>

          {/* Botões */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Botões</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Botão Principal</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Texto</label>
                  <input
                    type="text"
                    value={heroConfig.content?.primaryButton || ''}
                    onChange={(e) => updateHeroContent('primaryButton', e.target.value)}
                    placeholder="Ex: Começar Agora"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Link</label>
                  <input
                    type="url"
                    value={heroConfig.content?.primaryButtonLink || ''}
                    onChange={(e) => updateHeroContent('primaryButtonLink', e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Ícone (emoji)</label>
                  <input
                    type="text"
                    value={heroConfig.content?.primaryButtonIcon || ''}
                    onChange={(e) => updateHeroContent('primaryButtonIcon', e.target.value)}
                    placeholder="🚀"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Botão Secundário</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Texto</label>
                  <input
                    type="text"
                    value={heroConfig.content?.secondaryButton || ''}
                    onChange={(e) => updateHeroContent('secondaryButton', e.target.value)}
                    placeholder="Ex: Saiba Mais"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Link</label>
                  <input
                    type="url"
                    value={heroConfig.content?.secondaryButtonLink || ''}
                    onChange={(e) => updateHeroContent('secondaryButtonLink', e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Ícone (emoji)</label>
                  <input
                    type="text"
                    value={heroConfig.content?.secondaryButtonIcon || ''}
                    onChange={(e) => updateHeroContent('secondaryButtonIcon', e.target.value)}
                    placeholder="📖"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>
          </Panel>

          {/* Mídia */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Mídia</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Imagem Principal
                </label>
                <ImageUpload
                  value={heroConfig.content?.image || ''}
                  onChange={(value) => updateHeroContent('image', value)}
                  placeholder="Upload da imagem principal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Imagem de Fundo
                </label>
                <ImageUpload
                  value={heroConfig.content?.backgroundImage || ''}
                  onChange={(value) => updateHeroContent('backgroundImage', value)}
                  placeholder="Upload da imagem de fundo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Vídeo de Fundo (URL)
                </label>
                <input
                  type="url"
                  value={heroConfig.content?.backgroundVideo || ''}
                  onChange={(e) => updateHeroContent('backgroundVideo', e.target.value)}
                  placeholder="https://exemplo.com/video.mp4"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>
            </div>
          </Panel>

          {/* Layout */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Layout</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Altura da Seção
                </label>
                <HeightPicker
                  value={heroConfig.content?.height || '100%'}
                  onChange={(value) => updateHeroContent('height', value)}
                  label="Altura da Seção"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Layout
                </label>
                <LayoutPicker
                  value={heroConfig.content?.layout || 'centralizado'}
                  onChange={(value) => updateHeroContent('layout', value)}
                  label="Layout"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Animação
                </label>
                <AnimationPicker
                  value={heroConfig.content?.animation || 'entrada'}
                  onChange={(value) => updateHeroContent('animation', value)}
                  label="Animação"
                />
              </div>
            </div>
          </Panel>
        </div>
      )}

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-6">
          {/* Estilos de Texto */}
          <TextStylePicker
            value={heroConfig.style?.titleStyle || {}}
            onChange={(style) => updateTextStyle('titleStyle', style)}
            label="Estilo do Título"
            previewText={heroConfig.content?.title || "Título Principal"}
          />

          <TextStylePicker
            value={heroConfig.style?.subtitleStyle || {}}
            onChange={(style) => updateTextStyle('subtitleStyle', style)}
            label="Estilo do Subtítulo"
            previewText={heroConfig.content?.subtitle || "Subtítulo Impactante"}
          />

          <TextStylePicker
            value={heroConfig.style?.descriptionStyle || {}}
            onChange={(style) => updateTextStyle('descriptionStyle', style)}
            label="Estilo da Descrição"
            previewText={heroConfig.content?.description || "Descrição detalhada"}
          />

          <TextStylePicker
            value={heroConfig.style?.buttonStyle || {}}
            onChange={(style) => updateTextStyle('buttonStyle', style)}
            label="Estilo dos Botões"
            previewText={heroConfig.content?.primaryButton || "Botão Principal"}
          />

          {heroConfig.content?.caption && (
            <TextStylePicker
              value={heroConfig.style?.captionStyle || {}}
              onChange={(style) => updateTextStyle('captionStyle', style)}
              label="Estilo da Legenda"
              previewText={heroConfig.content?.caption}
            />
          )}

          {/* Cores dos Botões */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Cores dos Botões</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Botão Principal</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor de Fundo</label>
                  <ColorPicker
                    value={heroConfig.style?.primaryButtonColor || '#3b82f6'}
                    onChange={(color) => updateHeroStyle('primaryButtonColor', color)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor do Texto</label>
                  <ColorPicker
                    value={heroConfig.style?.primaryButtonTextColor || '#ffffff'}
                    onChange={(color) => updateHeroStyle('primaryButtonTextColor', color)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor Hover</label>
                  <ColorPicker
                    value={heroConfig.style?.primaryButtonHoverColor || '#2563eb'}
                    onChange={(color) => updateHeroStyle('primaryButtonHoverColor', color)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Botão Secundário</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor de Fundo</label>
                  <ColorPicker
                    value={heroConfig.style?.secondaryButtonColor || 'transparent'}
                    onChange={(color) => updateHeroStyle('secondaryButtonColor', color)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor do Texto</label>
                  <ColorPicker
                    value={heroConfig.style?.secondaryButtonTextColor || '#3b82f6'}
                    onChange={(color) => updateHeroStyle('secondaryButtonTextColor', color)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Cor Hover</label>
                  <ColorPicker
                    value={heroConfig.style?.secondaryButtonHoverColor || '#f1f5f9'}
                    onChange={(color) => updateHeroStyle('secondaryButtonHoverColor', color)}
                  />
                </div>
              </div>
            </div>
          </Panel>

          {/* Fundo */}
          <Panel>
            <h3 className="text-lg font-medium text-white mb-4">Fundo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cor de Fundo
                </label>
                <ColorPicker
                  value={heroConfig.style?.backgroundColor || 'transparent'}
                  onChange={(color) => updateHeroStyle('backgroundColor', color)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gradiente de Fundo
                </label>
                <input
                  type="text"
                  value={heroConfig.style?.backgroundGradient || ''}
                  onChange={(e) => updateHeroStyle('backgroundGradient', e.target.value)}
                  placeholder="Ex: 135deg, #667eea 0%, #764ba2 100%"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Opacidade do Fundo (0-1)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={heroConfig.style?.backgroundOpacity || 0.8}
                  onChange={(e) => updateHeroStyle('backgroundOpacity', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-slate-400 mt-1">
                  {heroConfig.style?.backgroundOpacity || 0.8}
                </div>
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
            <div className="text-sm text-slate-400 mb-2">Preview da Seção Hero:</div>
            <div className="bg-white rounded-lg p-6 min-h-[400px]">
              {/* Aqui seria renderizado o componente Hero real */}
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {heroConfig.content?.title || "Título Principal"}
                </h1>
                <h2 className="text-xl text-gray-600">
                  {heroConfig.content?.subtitle || "Subtítulo Impactante"}
                </h2>
                <p className="text-gray-500">
                  {heroConfig.content?.description || "Descrição detalhada"}
                </p>
                <div className="flex gap-4 justify-center">
                  {heroConfig.content?.primaryButton && (
                    <button className="px-6 py-2 bg-blue-500 text-white rounded">
                      {heroConfig.content.primaryButton}
                    </button>
                  )}
                  {heroConfig.content?.secondaryButton && (
                    <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded">
                      {heroConfig.content.secondaryButton}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
