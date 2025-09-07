'use client';

import { useState } from 'react';

import { useSiteConfig } from '@/context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig, isLoading } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'content' | 'images'>('general');

  const handleSectionToggle = (section: keyof SiteConfig['sections']) => {
    const currentSection = config.sections[section];
    if (!currentSection) return;
    
    updateConfig({
      sections: {
        ...config.sections,
        [section]: {
          ...currentSection,
          enabled: !currentSection.enabled
        }
      }
    });
  };

  const handleThemeChange = (key: keyof SiteConfig['theme'], value: string) => {
    updateConfig({
      theme: {
        ...config.theme,
        [key]: value
      }
    });
  };

  const handleFontSizeChange = (key: keyof SiteConfig['theme']['fontSize'], value: string) => {
    updateConfig({
      theme: {
        ...config.theme,
        fontSize: {
          ...config.theme.fontSize,
          [key]: value
        }
      }
    });
  };

  const handleContentChange = (section: keyof SiteConfig['content'], field: string, value: unknown) => {
    updateConfig({
      content: {
        ...config.content,
        [section]: {
          ...config.content[section],
          [field]: value
        }
      }
    });
  };

  const handleSave = async () => {
    const success = await saveConfig();
    if (success) {
      setMessage('Configuração salva com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Erro ao salvar configuração');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' }
  ];

  const tabs = [
    { id: 'general', label: 'Configurações Gerais', icon: '⚙️' },
    { id: 'sections', label: 'Seções do Site', icon: '📋' },
    { id: 'content', label: 'Conteúdo', icon: '📝' },
    { id: 'images', label: 'Imagens', icon: '🖼️' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Painel Administrativo Completo</h1>
          
          {message && (
            <div className={`p-4 mb-4 rounded-md ${
              message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'general' && (
            <div className="space-y-8">
              {/* Tema */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurações de Tema</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cores */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor Primária
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.theme.primary}
                          onChange={(e) => handleThemeChange('primary', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.primary}
                          onChange={(e) => handleThemeChange('primary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#0b2743"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor Secundária
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.theme.secondary}
                          onChange={(e) => handleThemeChange('secondary', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.secondary}
                          onChange={(e) => handleThemeChange('secondary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#2AAA48"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor dos Botões
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.theme.button}
                          onChange={(e) => handleThemeChange('button', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.button}
                          onChange={(e) => handleThemeChange('button', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#2E6BD6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor de Fundo
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.theme.background}
                          onChange={(e) => handleThemeChange('background', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.background}
                          onChange={(e) => handleThemeChange('background', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#0a0a0a"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cor do Texto
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.theme.text}
                          onChange={(e) => handleThemeChange('text', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.text}
                          onChange={(e) => handleThemeChange('text', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Fontes */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fonte Principal
                      </label>
                      <select
                        value={config.theme.font}
                        onChange={(e) => handleThemeChange('font', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {fontOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamanho H1
                      </label>
                      <input
                        type="text"
                        value={config.theme.fontSize.h1}
                        onChange={(e) => handleFontSizeChange('h1', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="3rem"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamanho H2
                      </label>
                      <input
                        type="text"
                        value={config.theme.fontSize.h2}
                        onChange={(e) => handleFontSizeChange('h2', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="2.25rem"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamanho H3
                      </label>
                      <input
                        type="text"
                        value={config.theme.fontSize.h3}
                        onChange={(e) => handleFontSizeChange('h3', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1.5rem"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamanho do Corpo
                      </label>
                      <input
                        type="text"
                        value={config.theme.fontSize.body}
                        onChange={(e) => handleFontSizeChange('body', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1rem"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Seções do Site</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(config.sections).map(([section, { enabled }]) => (
                  <div key={section} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      id={section}
                      checked={enabled}
                      onChange={() => handleSectionToggle(section as keyof SiteConfig['sections'])}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={section} className="text-sm font-medium text-gray-700 capitalize">
                      {section}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Conteúdo das Seções</h2>
              
              {/* Hero Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seção Hero</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={config.content.hero.title}
                      onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                    <input
                      type="text"
                      value={config.content.hero.subtitle}
                      onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Botão Primário</label>
                    <input
                      type="text"
                      value={config.content.hero.primaryButton}
                      onChange={(e) => handleContentChange('hero', 'primaryButton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Botão Secundário</label>
                    <input
                      type="text"
                      value={config.content.hero.secondaryButton}
                      onChange={(e) => handleContentChange('hero', 'secondaryButton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seção Features</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={config.content.features.title}
                      onChange={(e) => handleContentChange('features', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {config.content.features.items.map((item, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-2">Item {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                          <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => {
                              const newItems = [...config.content.features.items];
                              newItems[index] = { ...item, icon: e.target.value };
                              handleContentChange('features', 'items', newItems);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...config.content.features.items];
                              newItems[index] = { ...item, title: e.target.value };
                              handleContentChange('features', 'items', newItems);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...config.content.features.items];
                              newItems[index] = { ...item, description: e.target.value };
                              handleContentChange('features', 'items', newItems);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Seção CTA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={config.content.cta.title}
                      onChange={(e) => handleContentChange('cta', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                    <textarea
                      value={config.content.cta.subtitle}
                      onChange={(e) => handleContentChange('cta', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Botão Primário</label>
                    <input
                      type="text"
                      value={config.content.cta.primaryButton}
                      onChange={(e) => handleContentChange('cta', 'primaryButton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Botão Secundário</label>
                    <input
                      type="text"
                      value={config.content.cta.secondaryButton}
                      onChange={(e) => handleContentChange('cta', 'secondaryButton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Gerenciamento de Imagens</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Sistema de Imagens em Desenvolvimento
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Em breve você poderá:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Fazer upload de logos dos parceiros</li>
                        <li>Gerenciar thumbnails do blog</li>
                        <li>Configurar posts do Instagram</li>
                        <li>Definir imagem de fundo do hero</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Logos dos Parceiros</h3>
                  <div className="space-y-2">
                    {config.images.logos.map((logo, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{logo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Thumbnails do Blog</h3>
                  <div className="space-y-2">
                    {config.images.blogThumbnails.map((thumb, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{thumb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
            
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Ver Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}