// src/pages/admin/sections/Services.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Star } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import TextStylePicker from '../TextStylePicker';
import ImageUpload from '../ImageUpload';
import ColorPicker from '../ColorPicker';
import ColumnsPicker from '../ColumnsPicker';
import AnimationPicker from '../AnimationPicker';
import { Panel } from '../ui';

export default function ServicesAdmin() {
  const { config, updateConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'preview'>('content');

  const servicesConfig = config.sections.services || {
    enabled: true,
    position: 2,
    content: { items: [] },
    style: {}
  };

  const updateServicesContent = (key: string, value: any) => {
    updateConfig({
      ...config,
      sections: {
        ...config.sections,
        services: {
          ...servicesConfig,
          content: {
            ...servicesConfig.content,
            [key]: value
          }
        }
      }
    });
  };

  const updateServicesStyle = (key: string, value: any) => {
    updateConfig({
      ...config,
      sections: {
        ...config.sections,
        services: {
          ...servicesConfig,
          style: {
            ...servicesConfig.style,
            [key]: value
          }
        }
      }
    });
  };

  const updateTextStyle = (field: string, style: any) => {
    updateServicesStyle(field, style);
  };

  const addService = () => {
    const currentItems = servicesConfig.content?.items || [];
    const newService = {
      title: `Serviço ${currentItems.length + 1}`,
      description: "Descrição do serviço",
      price: "R$ 99/mês",
      icon: "⚡",
      link: "",
      featured: false
    };
    
    updateServicesContent('items', [...currentItems, newService]);
  };

  const updateService = (index: number, key: string, value: any) => {
    const currentItems = servicesConfig.content?.items || [];
    const updatedItems = currentItems.map((item, i) => 
      i === index ? { ...item, [key]: value } : item
    );
    updateServicesContent('items', updatedItems);
  };

  const removeService = (index: number) => {
    const currentItems = servicesConfig.content?.items || [];
    const updatedItems = currentItems.filter((_, i) => i !== index);
    updateServicesContent('items', updatedItems);
  };

  const toggleFeatured = (index: number) => {
    const currentItems = servicesConfig.content?.items || [];
    const updatedItems = currentItems.map((item, i) => 
      i === index ? { ...item, featured: !item.featured } : item
    );
    updateServicesContent('items', updatedItems);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Configuração Services</h2>
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
                  value={servicesConfig.content?.title || ''}
                  onChange={(e) => updateServicesContent('title', e.target.value)}
                  placeholder="Ex: Nossos Serviços"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={servicesConfig.content?.subtitle || ''}
                  onChange={(e) => updateServicesContent('subtitle', e.target.value)}
                  placeholder="Ex: Soluções completas para você"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={servicesConfig.content?.description || ''}
                  onChange={(e) => updateServicesContent('description', e.target.value)}
                  placeholder="Ex: Conheça nossos serviços e escolha o que melhor atende suas necessidades"
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
                  value={servicesConfig.content?.columns || 3}
                  onChange={(value) => updateServicesContent('columns', value)}
                  label="Número de Colunas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tipo de Exibição
                </label>
                <select
                  value={servicesConfig.content?.displayType || 'cards'}
                  onChange={(e) => updateServicesContent('displayType', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                >
                  <option value="cards">Cards</option>
                  <option value="lista">Lista</option>
                  <option value="slider">Slider</option>
                </select>
              </div>
            </div>
          </Panel>

          {/* Services List */}
          <Panel>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Serviços</h3>
              <button
                onClick={addService}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>

            <div className="space-y-4">
              {(servicesConfig.content?.items || []).map((item, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                  <div className="flex items-start space-x-4">
                    {/* Drag Handle */}
                    <div className="flex-shrink-0 pt-2">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-white">
                            Serviço {index + 1}
                          </h4>
                          {item.featured && (
                            <span className="flex items-center space-x-1 text-xs text-yellow-400">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Destaque</span>
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleFeatured(index)}
                          className={`p-1 rounded transition-colors ${
                            item.featured 
                              ? 'text-yellow-400 hover:text-yellow-300' 
                              : 'text-slate-400 hover:text-yellow-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => updateService(index, 'title', e.target.value)}
                            placeholder="Título do serviço"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Preço
                          </label>
                          <input
                            type="text"
                            value={item.price || ''}
                            onChange={(e) => updateService(index, 'price', e.target.value)}
                            placeholder="R$ 99/mês"
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
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          placeholder="Descrição detalhada do serviço"
                          rows={2}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Ícone (emoji)
                          </label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => updateService(index, 'icon', e.target.value)}
                            placeholder="🚀"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Link
                          </label>
                          <input
                            type="url"
                            value={item.link || ''}
                            onChange={(e) => updateService(index, 'link', e.target.value)}
                            placeholder="https://exemplo.com"
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Imagem (opcional)
                          </label>
                          <ImageUpload
                            value={item.image || ''}
                            onChange={(value) => updateService(index, 'image', value)}
                            placeholder="Upload de imagem"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex-shrink-0 pt-2">
                      <button
                        onClick={() => removeService(index)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {(!servicesConfig.content?.items || servicesConfig.content.items.length === 0) && (
                <div className="text-center py-8 text-slate-400">
                  <p>Nenhum serviço adicionado ainda.</p>
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
            value={servicesConfig.style?.titleStyle || {}}
            onChange={(style) => updateTextStyle('titleStyle', style)}
            label="Estilo do Título"
            previewText={servicesConfig.content?.title || "Nossos Serviços"}
          />

          <TextStylePicker
            value={servicesConfig.style?.subtitleStyle || {}}
            onChange={(style) => updateTextStyle('subtitleStyle', style)}
            label="Estilo do Subtítulo"
            previewText={servicesConfig.content?.subtitle || "Soluções completas para você"}
          />

          <TextStylePicker
            value={servicesConfig.style?.descriptionStyle || {}}
            onChange={(style) => updateTextStyle('descriptionStyle', style)}
            label="Estilo da Descrição"
            previewText={servicesConfig.content?.description || "Conheça nossos serviços"}
          />

          <TextStylePicker
            value={servicesConfig.style?.itemTitleStyle || {}}
            onChange={(style) => updateTextStyle('itemTitleStyle', style)}
            label="Estilo do Título dos Serviços"
            previewText="Serviço Exemplo"
          />

          <TextStylePicker
            value={servicesConfig.style?.itemDescriptionStyle || {}}
            onChange={(style) => updateTextStyle('itemDescriptionStyle', style)}
            label="Estilo da Descrição dos Serviços"
            previewText="Descrição detalhada do serviço"
          />

          <TextStylePicker
            value={servicesConfig.style?.priceStyle || {}}
            onChange={(style) => updateTextStyle('priceStyle', style)}
            label="Estilo do Preço"
            previewText="R$ 99/mês"
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
                  value={servicesConfig.style?.cardStyle || 'elevated'}
                  onChange={(e) => updateServicesStyle('cardStyle', e.target.value)}
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
                  value={servicesConfig.style?.hoverEffect || 'scale'}
                  onChange={(e) => updateServicesStyle('hoverEffect', e.target.value)}
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
                  value={servicesConfig.style?.animationType || 'fade'}
                  onChange={(value) => updateServicesStyle('animationType', value)}
                  label="Animação"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cor de Fundo
                </label>
                <ColorPicker
                  value={servicesConfig.style?.backgroundColor || 'transparent'}
                  onChange={(color) => updateServicesStyle('backgroundColor', color)}
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
            <div className="text-sm text-slate-400 mb-2">Preview da Seção Services:</div>
            <div className="bg-white rounded-lg p-6 min-h-[400px]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {servicesConfig.content?.title || "Nossos Serviços"}
                </h2>
                <p className="text-gray-600">
                  {servicesConfig.content?.description || "Conheça nossos serviços"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(servicesConfig.content?.items || []).slice(0, 3).map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="text-2xl mb-2">{item.icon || "⚡"}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.title || `Serviço ${index + 1}`}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description || "Descrição do serviço"}
                    </p>
                    {item.price && (
                      <div className="text-lg font-bold text-blue-600 mb-2">
                        {item.price}
                      </div>
                    )}
                    {item.featured && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Destaque
                      </span>
                    )}
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
