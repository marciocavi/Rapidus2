'use client';

import { useState } from 'react';

import { useSiteConfig } from '@/context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import Skeleton from '@/app/components/Skeleton';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig, isLoading } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [activeSection, setActiveSection] = useState<keyof SiteConfig['sections']>('hero');
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
    try {
      const success = await saveConfig();
      if (success) {
        setMessage('✅ Configuração salva com sucesso!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Erro ao salvar configuração');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Erro inesperado ao salvar');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
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

  const sections = [
    { id: 'hero', label: 'Hero', icon: '🏠', description: 'Seção principal do site' },
    { id: 'features', label: 'Features', icon: '⭐', description: 'Diferenciais e características' },
    { id: 'services', label: 'Services', icon: '🛠️', description: 'Serviços oferecidos' },
    { id: 'parceiros', label: 'Parceiros', icon: '🤝', description: 'Logos dos parceiros' },
    { id: 'instagram', label: 'Instagram', icon: '📸', description: 'Posts do Instagram' },
    { id: 'blog', label: 'Blog', icon: '📝', description: 'Artigos do blog' },
    { id: 'cta', label: 'CTA', icon: '📢', description: 'Call to action' },
    { id: 'stats', label: 'Stats', icon: '📊', description: 'Estatísticas e números' },
    { id: 'header', label: 'Header', icon: '🔝', description: 'Cabeçalho e navegação' },
    { id: 'footer', label: 'Footer', icon: '🔻', description: 'Rodapé e links' },
    { id: 'advanced', label: 'Avançado', icon: '⚙️', description: 'Configurações avançadas' }
  ] as const;

  const renderSectionConfig = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Seção Hero</h3>
                <p className="text-sm text-blue-600">Configurações da seção principal do site</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.hero?.enabled || false}
                  onChange={() => handleSectionToggle('hero')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-800">Conteúdo</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
                  <input
                    type="text"
                    value={config.content.hero.title || ''}
                    onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                  <textarea
                    value={config.content.hero.subtitle || ''}
                    onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Botão Primário</label>
                  <input
                    type="text"
                    value={config.content.hero.primaryButton || ''}
                    onChange={(e) => handleContentChange('hero', 'primaryButton', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Botão Secundário</label>
                  <input
                    type="text"
                    value={config.content.hero.secondaryButton || ''}
                    onChange={(e) => handleContentChange('hero', 'secondaryButton', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem do Banner</label>
                  <input
                    type="url"
                    value={config.content.hero.bannerImage || ''}
                    onChange={(e) => handleContentChange('hero', 'bannerImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texto Alternativo do Banner</label>
                  <input
                    type="text"
                    value={config.content.hero.bannerAlt || ''}
                    onChange={(e) => handleContentChange('hero', 'bannerAlt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-blue-500"
                    placeholder="Descrição da imagem para acessibilidade"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-800">Estilo</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cor do Botão Primário</label>
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
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tamanho do Título</label>
                  <input
                    type="text"
                    value={config.theme.fontSize.h1}
                    onChange={(e) => handleFontSizeChange('h1', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="3rem"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fonte Principal</label>
                  <select
                    value={config.theme.font}
                    onChange={(e) => handleThemeChange('font', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  >
                    {fontOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-green-800">Seção Features</h3>
                <p className="text-sm text-green-600">Configurações dos diferenciais e características</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.features?.enabled || false}
                  onChange={() => handleSectionToggle('features')}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
                <input
                  type="text"
                  value={config.content.features.title}
                  onChange={(e) => handleContentChange('features', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {config.content.features.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Feature {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                      <input
                        type="text"
                        value={item.icon || ''}
                        onChange={(e) => {
                          const newItems = [...config.content.features.items];
                          newItems[index] = { ...item, icon: e.target.value };
                          handleContentChange('features', 'items', newItems);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                        placeholder="⚡"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newItems = [...config.content.features.items];
                          newItems[index] = { ...item, title: e.target.value };
                          handleContentChange('features', 'items', newItems);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => {
                          const newItems = [...config.content.features.items];
                          newItems[index] = { ...item, description: e.target.value };
                          handleContentChange('features', 'items', newItems);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Seção Services</h3>
                <p className="text-sm text-purple-600">Configurações dos serviços oferecidos</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.services?.enabled || false}
                  onChange={() => handleSectionToggle('services')}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
                <input
                  type="text"
                  value={config.content.services.title}
                  onChange={(e) => handleContentChange('services', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {config.content.services.items.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Serviço {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                      <input
                        type="text"
                        value={service.title || ''}
                        onChange={(e) => {
                          const newItems = [...config.content.services.items];
                          newItems[index] = { ...service, title: e.target.value };
                          handleContentChange('services', 'items', newItems);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                      <textarea
                        value={service.description || ''}
                        onChange={(e) => {
                          const newItems = [...config.content.services.items];
                          newItems[index] = { ...service, description: e.target.value };
                          handleContentChange('services', 'items', newItems);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const newItems = [...config.content.services.items];
                              const newFeatures = [...service.features];
                              newFeatures[featureIndex] = e.target.value;
                              newItems[index] = { ...service, features: newFeatures };
                              handleContentChange('services', 'items', newItems);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [...config.content.services.items];
                              const newFeatures = service.features.filter((_, i) => i !== featureIndex);
                              newItems[index] = { ...service, features: newFeatures };
                              handleContentChange('services', 'items', newItems);
                            }}
                            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = [...config.content.services.items];
                          const newFeatures = [...service.features, ''];
                          newItems[index] = { ...service, features: newFeatures };
                          handleContentChange('services', 'items', newItems);
                        }}
                        className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                      >
                        Adicionar Característica
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'parceiros':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-orange-800">Seção Parceiros</h3>
                <p className="text-sm text-orange-600">Configurações dos logos dos parceiros</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.parceiros?.enabled || false}
                  onChange={() => handleSectionToggle('parceiros')}
                  className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
                <input
                  type="text"
                  value={config.content.parceiros.title}
                  onChange={(e) => handleContentChange('parceiros', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logos dos Parceiros</label>
                <div className="space-y-2">
                  {config.content.parceiros.logos.map((logo, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={logo}
                        onChange={(e) => {
                          const newLogos = [...config.content.parceiros.logos];
                          newLogos[index] = e.target.value;
                          handleContentChange('parceiros', 'logos', newLogos);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
                        placeholder="Nome do parceiro"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newLogos = config.content.parceiros.logos.filter((_, i) => i !== index);
                          handleContentChange('parceiros', 'logos', newLogos);
                        }}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newLogos = [...config.content.parceiros.logos, ''];
                      handleContentChange('parceiros', 'logos', newLogos);
                    }}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Adicionar Parceiro
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instagram':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-pink-800">Seção Instagram</h3>
                <p className="text-sm text-pink-600">Configurações dos posts do Instagram</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.instagram?.enabled || false}
                  onChange={() => handleSectionToggle('instagram')}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
                <input
                  type="text"
                  value={config.content.instagram.title}
                  onChange={(e) => handleContentChange('instagram', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={config.content.instagram.subtitle}
                  onChange={(e) => handleContentChange('instagram', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posts do Instagram</label>
                <div className="space-y-2">
                  {config.content.instagram.posts.map((post, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">Post {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Legenda</label>
                          <input
                            type="text"
                            value={post.caption || ''}
                            onChange={(e) => {
                              const newPosts = [...config.content.instagram.posts];
                              newPosts[index] = { ...post, caption: e.target.value };
                              handleContentChange('instagram', 'posts', newPosts);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                          <input
                            type="url"
                            value={post.image || ''}
                            onChange={(e) => {
                              const newPosts = [...config.content.instagram.posts];
                              newPosts[index] = { ...post, image: e.target.value };
                              handleContentChange('instagram', 'posts', newPosts);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 bg-white"
                            placeholder="https://exemplo.com/imagem.jpg"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newPosts = config.content.instagram.posts.filter((_, i) => i !== index);
                          handleContentChange('instagram', 'posts', newPosts);
                        }}
                        className="mt-3 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remover Post
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newPosts = [...config.content.instagram.posts, { caption: '', image: '' }];
                      handleContentChange('instagram', 'posts', newPosts);
                    }}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Adicionar Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">Seção Blog</h3>
                <p className="text-sm text-indigo-600">Configurações dos artigos do blog</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.blog?.enabled || false}
                  onChange={() => handleSectionToggle('blog')}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
                <input
                  type="text"
                  value={config.content.blog.title}
                  onChange={(e) => handleContentChange('blog', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={config.content.blog.subtitle}
                  onChange={(e) => handleContentChange('blog', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artigos do Blog</label>
                <div className="space-y-2">
                  {config.content.blog.articles.map((article, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">Artigo {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                          <input
                            type="text"
                            value={article.title || ''}
                            onChange={(e) => {
                              const newArticles = [...config.content.blog.articles];
                              newArticles[index] = { ...article, title: e.target.value };
                              handleContentChange('blog', 'articles', newArticles);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                          <input
                            type="text"
                            value={article.category || ''}
                            onChange={(e) => {
                              const newArticles = [...config.content.blog.articles];
                              newArticles[index] = { ...article, category: e.target.value };
                              handleContentChange('blog', 'articles', newArticles);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resumo</label>
                        <textarea
                          value={article.excerpt || ''}
                          onChange={(e) => {
                            const newArticles = [...config.content.blog.articles];
                            newArticles[index] = { ...article, excerpt: e.target.value };
                            handleContentChange('blog', 'articles', newArticles);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                          rows={3}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                          <input
                            type="text"
                            value={article.date}
                            onChange={(e) => {
                              const newArticles = [...config.content.blog.articles];
                              newArticles[index] = { ...article, date: e.target.value };
                              handleContentChange('blog', 'articles', newArticles);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                            placeholder="15 de Janeiro, 2025"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                          <input
                            type="url"
                            value={article.image}
                            onChange={(e) => {
                              const newArticles = [...config.content.blog.articles];
                              newArticles[index] = { ...article, image: e.target.value };
                              handleContentChange('blog', 'articles', newArticles);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
                            placeholder="https://exemplo.com/imagem.jpg"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newArticles = config.content.blog.articles.filter((_, i) => i !== index);
                          handleContentChange('blog', 'articles', newArticles);
                        }}
                        className="mt-3 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remover Artigo
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newArticles = [...config.content.blog.articles, { 
                        title: '', 
                        category: '', 
                        excerpt: '', 
                        date: '', 
                        image: '' 
                      }];
                      handleContentChange('blog', 'articles', newArticles);
                    }}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Adicionar Artigo
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-teal-800">Seção CTA</h3>
                <p className="text-sm text-teal-600">Configurações da chamada para ação</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.cta?.enabled || false}
                  onChange={() => handleSectionToggle('cta')}
                  className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input
                  type="text"
                  value={config.content.cta.title}
                  onChange={(e) => handleContentChange('cta', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                <textarea
                  value={config.content.cta.subtitle}
                  onChange={(e) => handleContentChange('cta', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Botão Primário</label>
                  <input
                    type="text"
                    value={config.content.cta.primaryButton}
                    onChange={(e) => handleContentChange('cta', 'primaryButton', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Botão Secundário</label>
                  <input
                    type="text"
                    value={config.content.cta.secondaryButton}
                    onChange={(e) => handleContentChange('cta', 'secondaryButton', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-cyan-800">Seção Stats</h3>
                <p className="text-sm text-cyan-600">Configurações das estatísticas e números</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.sections.stats?.enabled || false}
                  onChange={() => handleSectionToggle('stats')}
                  className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estatísticas</label>
                <div className="space-y-2">
                  {config.content.stats.items.map((stat, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 mb-3">Estatística {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const newItems = [...config.content.stats.items];
                              newItems[index] = { ...stat, value: e.target.value };
                              handleContentChange('stats', 'items', newItems);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 bg-white"
                            placeholder="150+"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newItems = [...config.content.stats.items];
                              newItems[index] = { ...stat, label: e.target.value };
                              handleContentChange('stats', 'items', newItems);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 bg-white"
                            placeholder="Projetos Entregues"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = config.content.stats.items.filter((_, i) => i !== index);
                          handleContentChange('stats', 'items', newItems);
                        }}
                        className="mt-3 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remover Estatística
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...config.content.stats.items, { value: '', label: '' }];
                      handleContentChange('stats', 'items', newItems);
                    }}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Adicionar Estatística
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'header':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl shadow-lg">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-1">Seção Header</h3>
                <p className="text-sm text-blue-700 font-medium">Configurações do cabeçalho e navegação</p>
              </div>
              <label className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-md border border-blue-200">
                <input
                  type="checkbox"
                  checked={config.sections.header?.enabled || false}
                  onChange={() => handleSectionToggle('header')}
                  className="w-5 h-5 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 shadow-sm"
                />
                <span className="text-sm font-semibold text-blue-800">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-6">
              {/* Logo Configuration */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">🎨</span>
                  Logo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Texto do Logo</label>
                    <input
                      type="text"
                      value={config.header?.logo?.text || 'Rapidus'}
                      onChange={(e) => {
                        const newHeader = { ...config.header };
                        if (!newHeader) return;
                        newHeader.logo = { ...newHeader.logo, text: e.target.value } as any;
                        updateConfig({ header: newHeader as any });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">URL da Imagem do Logo</label>
                    <input
                      type="url"
                      value={config.header?.logo?.image || ''}
                      onChange={(e) => {
                        const newHeader = { ...config.header };
                        if (!newHeader) return;
                        newHeader.logo = { ...newHeader.logo, image: e.target.value } as any;
                        updateConfig({ header: newHeader as any });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                      placeholder="https://exemplo.com/logo.png"
                    />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={config.header?.logo?.useImage || false}
                      onChange={(e) => {
                        const newHeader = { ...config.header };
                        if (!newHeader) return;
                        newHeader.logo = { ...newHeader.logo, useImage: e.target.checked } as any;
                        updateConfig({ header: newHeader as any });
                      }}
                      className="w-5 h-5 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 shadow-sm"
                    />
                    <span className="text-sm font-semibold text-blue-800">Usar imagem em vez de texto</span>
                  </label>
                </div>
              </div>

              {/* Menu Configuration */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 text-green-600">📋</span>
                  Menu de Navegação
                </h4>
                <div className="space-y-4">
                  {config.header?.menu?.items?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const newHeader = { ...config.header };
                          if (!newHeader?.menu?.items) return;
                          const newItems = [...newHeader.menu.items];
                          newItems[index] = { ...item, label: e.target.value };
                          newHeader.menu = { ...newHeader.menu, items: newItems };
                          updateConfig({ header: newHeader as any });
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-inner bg-white text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                        placeholder="Nome do menu"
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => {
                          const newHeader = { ...config.header };
                          if (!newHeader?.menu?.items) return;
                          const newItems = [...newHeader.menu.items];
                          newItems[index] = { ...item, url: e.target.value };
                          newHeader.menu = { ...newHeader.menu, items: newItems };
                          updateConfig({ header: newHeader as any });
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-inner bg-white text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                        placeholder="URL ou #seção"
                      />
                      <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200">
                        <input
                          type="checkbox"
                          checked={item.enabled}
                          onChange={(e) => {
                            const newHeader = { ...config.header };
                            if (!newHeader?.menu?.items) return;
                            const newItems = [...newHeader.menu.items];
                            newItems[index] = { ...item, enabled: e.target.checked };
                            newHeader.menu = { ...newHeader.menu, items: newItems };
                            updateConfig({ header: newHeader as any });
                          }}
                          className="w-4 h-4 text-green-600 bg-white border-2 border-green-300 rounded focus:ring-green-500 focus:ring-2 shadow-sm"
                        />
                        <span className="text-xs font-semibold text-gray-600">Ativo</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const newHeader = { ...config.header };
                          if (!newHeader?.menu?.items) return;
                          const newItems = newHeader.menu.items.filter((_, i) => i !== index);
                          newHeader.menu = { ...newHeader.menu, items: newItems };
                          updateConfig({ header: newHeader as any });
                        }}
                        className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newHeader = { ...config.header };
                      if (!newHeader?.menu?.items) return;
                      const newItems = [...newHeader.menu.items, { label: '', url: '', enabled: true }];
                      newHeader.menu = { ...newHeader.menu, items: newItems };
                      updateConfig({ header: newHeader as any });
                    }}
                    className="w-full px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
                  >
                    ➕ Adicionar Item do Menu
                  </button>
                </div>
              </div>

              {/* Login Button Configuration */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 text-purple-600">🔐</span>
                  Botão de Login
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={config.header?.loginButton?.enabled || false}
                        onChange={(e) => {
                          const newHeader = { ...config.header };
                          if (!newHeader) return;
                          newHeader.loginButton = { ...newHeader.loginButton, enabled: e.target.checked } as any;
                          updateConfig({ header: newHeader as any });
                        }}
                        className="w-5 h-5 text-purple-600 bg-white border-2 border-purple-300 rounded focus:ring-purple-500 focus:ring-2 shadow-sm"
                      />
                      <span className="text-sm font-semibold text-purple-800">Habilitar botão de login</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Texto do Botão</label>
                    <input
                      type="text"
                      value={config.header?.loginButton?.text || 'Login'}
                      onChange={(e) => {
                        const newHeader = { ...config.header };
                        if (!newHeader) return;
                        newHeader.loginButton = { ...newHeader.loginButton, text: e.target.value } as any;
                        updateConfig({ header: newHeader as any });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">URL do Login</label>
                    <input
                      type="text"
                      value={config.header?.loginButton?.url || '/login'}
                      onChange={(e) => {
                        const newHeader = { ...config.header };
                        if (!newHeader) return;
                        newHeader.loginButton = { ...newHeader.loginButton, url: e.target.value } as any;
                        updateConfig({ header: newHeader as any });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Header Theme Configuration */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 text-indigo-600">🎨</span>
                  Cores do Header
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cor de Fundo</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.header?.backgroundColor || '#0a0a0a'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.backgroundColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-12 border-2 border-gray-300 rounded-lg shadow-inner cursor-pointer hover:shadow-md transition-all duration-200"
                      />
                      <input
                        type="text"
                        value={config.theme.header?.backgroundColor || '#0a0a0a'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.backgroundColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cor do Texto</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.header?.textColor || '#ffffff'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.textColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-12 border-2 border-gray-300 rounded-lg shadow-inner cursor-pointer hover:shadow-md transition-all duration-200"
                      />
                      <input
                        type="text"
                        value={config.theme.header?.textColor || '#ffffff'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.textColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Cor da Borda</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.header?.borderColor || '#374151'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.borderColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-12 border-2 border-gray-300 rounded-lg shadow-inner cursor-pointer hover:shadow-md transition-all duration-200"
                      />
                      <input
                        type="text"
                        value={config.theme.header?.borderColor || '#374151'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.header) newTheme.header = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.header.borderColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner bg-gray-50 text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl shadow-lg">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Seção Footer</h3>
                <p className="text-sm text-gray-700 font-medium">Configurações do rodapé e links</p>
              </div>
              <label className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-md border border-gray-200">
                <input
                  type="checkbox"
                  checked={config.sections.footer?.enabled || false}
                  onChange={() => handleSectionToggle('footer')}
                  className="w-5 h-5 text-gray-600 bg-white border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 shadow-sm"
                />
                <span className="text-sm font-semibold text-gray-800">Habilitar seção</span>
              </label>
            </div>

            <div className="space-y-6">
              {/* Social Media Configuration */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3 text-pink-600">📱</span>
                  Redes Sociais
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(config.footer?.socialMedia || {}).map(([key, social]) => (
                    <div key={key} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-bold text-gray-800 capitalize text-lg">{key}</h5>
                        <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200">
                          <input
                            type="checkbox"
                            checked={social.enabled}
                            onChange={(e) => {
                              const newFooter = { ...config.footer };
                              if (!newFooter?.socialMedia) return;
                              (newFooter.socialMedia as any)[key] = { ...social, enabled: e.target.checked };
                              updateConfig({ footer: newFooter as any });
                            }}
                            className="w-4 h-4 text-pink-600 bg-white border-2 border-pink-300 rounded focus:ring-pink-500 focus:ring-2 shadow-sm"
                          />
                          <span className="text-xs font-semibold text-gray-600">Ativo</span>
                        </label>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                          <input
                            type="text"
                            value={social.label}
                            onChange={(e) => {
                              const newFooter = { ...config.footer };
                              if (!newFooter?.socialMedia) return;
                              (newFooter.socialMedia as any)[key] = { ...social, label: e.target.value };
                              updateConfig({ footer: newFooter as any });
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-inner bg-white text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                            placeholder="Label da rede social"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
                          <input
                            type="url"
                            value={social.url}
                            onChange={(e) => {
                              const newFooter = { ...config.footer };
                              if (!newFooter?.socialMedia) return;
                              (newFooter.socialMedia as any)[key] = { ...social, url: e.target.value };
                              updateConfig({ footer: newFooter as any });
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-inner bg-white text-gray-800 font-medium transition-all duration-200 hover:shadow-md"
                            placeholder="URL da rede social"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copyright Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Direitos Autorais</h4>
                <input
                  type="text"
                  value={config.footer?.copyright || '© 2025 Rapidus. Todos os direitos reservados.'}
                  onChange={(e) => {
                    const newFooter = { ...config.footer };
                    if (!newFooter) return;
                    newFooter.copyright = e.target.value;
                    updateConfig({ footer: newFooter as any });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Footer Links Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Links do Footer</h4>
                <div className="space-y-2">
                  {Object.entries(config.footer?.links || {}).map(([key, link]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const newFooter = { ...config.footer };
                          if (!newFooter?.links) return;
                          (newFooter.links as any)[key] = { ...link, label: e.target.value };
                          updateConfig({ footer: newFooter as any });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Texto do link"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newFooter = { ...config.footer };
                          if (!newFooter?.links) return;
                          (newFooter.links as any)[key] = { ...link, url: e.target.value };
                          updateConfig({ footer: newFooter as any });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="URL do link"
                      />
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={link.enabled}
                          onChange={(e) => {
                            const newFooter = { ...config.footer };
                            if (!newFooter?.links) return;
                            (newFooter.links as any)[key] = { ...link, enabled: e.target.checked };
                            updateConfig({ footer: newFooter as any });
                          }}
                          className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-xs text-gray-600">Ativo</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Theme Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Cores do Footer</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor de Fundo</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.footer?.backgroundColor || '#111827'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.backgroundColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.theme.footer?.backgroundColor || '#111827'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.backgroundColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor do Texto</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.footer?.textColor || '#9ca3af'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.textColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.theme.footer?.textColor || '#9ca3af'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.textColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cor da Borda</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={config.theme.footer?.borderColor || '#374151'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.borderColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.theme.footer?.borderColor || '#374151'}
                        onChange={(e) => {
                          const newTheme = { ...config.theme };
                          if (!newTheme.footer) newTheme.footer = { backgroundColor: '', textColor: '', borderColor: '' };
                          newTheme.footer.borderColor = e.target.value;
                          updateConfig({ theme: newTheme });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Configurações Avançadas</h3>
                <p className="text-sm text-purple-600">Rastreamento, chat e SEO</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Tracking Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Códigos de Rastreamento</h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={config.advanced?.tracking?.googleAnalytics?.enabled || false}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.tracking) return;
                          newAdvanced.tracking.googleAnalytics = { ...newAdvanced.tracking.googleAnalytics, enabled: e.target.checked };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Google Analytics</span>
                    </label>
                    <input
                      type="text"
                      value={config.advanced?.tracking?.googleAnalytics?.id || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.tracking) return;
                        newAdvanced.tracking.googleAnalytics = { ...newAdvanced.tracking.googleAnalytics, id: e.target.value };
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={config.advanced?.tracking?.facebookPixel?.enabled || false}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.tracking) return;
                          newAdvanced.tracking.facebookPixel = { ...newAdvanced.tracking.facebookPixel, enabled: e.target.checked };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Facebook Pixel</span>
                    </label>
                    <input
                      type="text"
                      value={config.advanced?.tracking?.facebookPixel?.id || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.tracking) return;
                        newAdvanced.tracking.facebookPixel = { ...newAdvanced.tracking.facebookPixel, id: e.target.value };
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="123456789012345"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={config.advanced?.tracking?.googleTagManager?.enabled || false}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.tracking) return;
                          newAdvanced.tracking.googleTagManager = { ...newAdvanced.tracking.googleTagManager, enabled: e.target.checked };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Google Tag Manager</span>
                    </label>
                    <input
                      type="text"
                      value={config.advanced?.tracking?.googleTagManager?.id || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.tracking) return;
                        newAdvanced.tracking.googleTagManager = { ...newAdvanced.tracking.googleTagManager, id: e.target.value };
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Chat Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Chat de Suporte</h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={config.advanced?.chat?.whatsapp?.enabled || false}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.whatsapp = { ...newAdvanced.chat.whatsapp, enabled: e.target.checked };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={config.advanced?.chat?.whatsapp?.number || ''}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.whatsapp = { ...newAdvanced.chat.whatsapp, number: e.target.value };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="5511999999999"
                      />
                      <input
                        type="text"
                        value={config.advanced?.chat?.whatsapp?.message || ''}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.whatsapp = { ...newAdvanced.chat.whatsapp, message: e.target.value };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Mensagem padrão"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        checked={config.advanced?.chat?.liveChat?.enabled || false}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.liveChat = { ...newAdvanced.chat.liveChat, enabled: e.target.checked };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Live Chat</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={config.advanced?.chat?.liveChat?.provider || ''}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.liveChat = { ...newAdvanced.chat.liveChat, provider: e.target.value };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="tawk, intercom, etc"
                      />
                      <input
                        type="text"
                        value={config.advanced?.chat?.liveChat?.id || ''}
                        onChange={(e) => {
                          const newAdvanced = { ...config.advanced };
                          if (!newAdvanced?.chat) return;
                          newAdvanced.chat.liveChat = { ...newAdvanced.chat.liveChat, id: e.target.value };
                          updateConfig({ advanced: newAdvanced as any });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="ID do chat"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Configuration */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-4">Configurações de SEO</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={config.advanced?.seo?.metaTitle || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.seo) return;
                        newAdvanced.seo.metaTitle = e.target.value;
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Título da página"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={config.advanced?.seo?.metaDescription || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.seo) return;
                        newAdvanced.seo.metaDescription = e.target.value;
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                      placeholder="Descrição da página"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={config.advanced?.seo?.metaKeywords || ''}
                      onChange={(e) => {
                        const newAdvanced = { ...config.advanced };
                        if (!newAdvanced?.seo) return;
                        newAdvanced.seo.metaKeywords = e.target.value;
                        updateConfig({ advanced: newAdvanced as any });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="palavra-chave1, palavra-chave2, palavra-chave3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Seção {activeSection}</h3>
                <p className="text-sm text-gray-600">Configurações específicas desta seção</p>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(config.sections as any)[activeSection]?.enabled || false}
                  onChange={() => handleSectionToggle(activeSection)}
                  className="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                />
                <span className="text-sm font-medium text-gray-700">Habilitar seção</span>
              </label>
            </div>

            <div className="p-8 text-center text-gray-500">
              <p>Configurações específicas para a seção {activeSection} serão implementadas em breve.</p>
              <p className="text-sm mt-2">Por enquanto, você pode habilitar/desabilitar esta seção.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
          Painel Administrativo
        </h1>
        <p className="text-zinc-400">Configure e personalize seu site</p>
        
        {/* Status Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg transition-all duration-300 ${
            message.includes('✅') 
              ? 'bg-green-900/20 border border-green-700 text-green-300' 
              : 'bg-red-900/20 border border-red-700 text-red-300'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Seções */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-zinc-100">Seções</h2>
            <div className="space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }
                  `}
                  aria-label={`Configurar seção ${section.label}`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <div>
                    <div className="font-medium">{section.label}</div>
                    <div className="text-xs opacity-75">{section.description}</div>
                  </div>
                  <div className="ml-auto">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.sections[section.id]?.enabled || false}
                        onChange={() => handleSectionToggle(section.id)}
                        className="sr-only"
                        aria-label={`Habilitar/desabilitar seção ${section.label}`}
                      />
                      <div className={`
                        w-11 h-6 rounded-full transition-colors duration-200
                        ${config.sections[section.id]?.enabled 
                          ? 'bg-blue-600' 
                          : 'bg-zinc-700'
                        }
                      `}>
                        <div className={`
                          w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 mt-0.5
                          ${config.sections[section.id]?.enabled 
                            ? 'translate-x-5' 
                            : 'translate-x-0.5'
                          }
                        `} />
                      </div>
                    </label>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-zinc-100">
                Configuração - {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => window.open('/', '_blank')}
                  aria-label="Abrir site em nova aba"
                >
                  Ver Site
                </Button>
                <Button
                  onClick={handleSave}
                  isLoading={isSaving}
                  disabled={isSaving}
                  className="min-w-[120px]"
                  aria-label="Salvar configurações"
                >
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {renderSectionConfig()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
