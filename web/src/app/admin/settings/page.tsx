'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Palette, 
  Type, 
  Save, 
  Eye,
  Home,
  Star,
  Wrench,
  Heart,
  Instagram,
  FileText,
  Megaphone,
  BarChart3,
  Images,
  Award,
  Share2
} from 'lucide-react';

import { useSiteConfig } from '@/context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Panel, Button, Toggle } from '@/components/admin/ui';
import { SectionsOrderList, SectionItem } from '@/components/admin/SectionsOrderList';
import SectionPreviewBar from '@/components/admin/SectionPreviewBar';
import type { SectionKey } from '@/ui/sections/registry';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [activeSection, setActiveSection] = useState<keyof SiteConfig['sections']>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [isModernUI, setIsModernUI] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [sectionsDnD, setSectionsDnD] = useState(false);
  
  // Estado para preview em tempo real
  const [draftProps, setDraftProps] = useState<Record<string, any>>({});

  // Evitar hydration error
  useEffect(() => {
    setIsClient(true);
    const envFlag = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';
    const localStorageFlag = localStorage.getItem('modern-admin-ui') === 'true';
    setIsModernUI(envFlag || localStorageFlag);
  }, []);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveConfig();
      setMessage('Configurações salvas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Erro ao salvar configurações');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionsReorder = async (items: SectionItem[]) => {
    try {
      const response = await fetch('/api/sections/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: items.map((item, index) => ({
            id: item.id,
            position: index + 1
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save sections order');
      }

      // Update local config with new order
      const newSections = { ...config.sections };
      items.forEach((item, index) => {
        if (newSections[item.key as keyof SiteConfig['sections']]) {
          newSections[item.key as keyof SiteConfig['sections']] = {
            ...newSections[item.key as keyof SiteConfig['sections']],
            enabled: newSections[item.key as keyof SiteConfig['sections']]?.enabled ?? false,
            position: index + 1
          };
        }
      });

      updateConfig({ sections: newSections });
    } catch (error) {
      console.error('Error saving sections order:', error);
      throw error;
    }
  };

  const sections = [
    { key: 'hero' as const, name: 'Hero', icon: Home, description: 'Seção principal do site' },
    { key: 'features' as const, name: 'Features', icon: Star, description: 'Diferenciais e características' },
    { key: 'services' as const, name: 'Services', icon: Wrench, description: 'Serviços oferecidos' },
    { key: 'parceiros' as const, name: 'Parceiros', icon: Heart, description: 'Logos dos parceiros' },
    { key: 'instagram' as const, name: 'Instagram', icon: Instagram, description: 'Posts do Instagram' },
    { key: 'blog' as const, name: 'Blog', icon: FileText, description: 'Artigos do blog' },
    { key: 'cta' as const, name: 'CTA', icon: Megaphone, description: 'Call to action' },
    { key: 'stats' as const, name: 'Stats', icon: BarChart3, description: 'Estatísticas' },
    { key: 'carrossels' as const, name: 'Carrosséis', icon: Images, description: 'Carrosséis de produtos/serviços' },
    { key: 'certificacoes' as const, name: 'Certificações', icon: Award, description: 'Selos e certificações' },
    { key: 'icones-flutuantes' as const, name: 'Ícones Flutuantes', icon: Share2, description: 'Redes sociais flutuantes' },
    { key: 'header' as const, name: 'Header', icon: Settings, description: 'Cabeçalho do site' },
    { key: 'footer' as const, name: 'Footer', icon: Settings, description: 'Rodapé do site' }
  ];

  // Convert sections to SectionItem format for drag & drop
  const sectionsForReorder: SectionItem[] = sections.map((section, index) => ({
    id: section.key,
    key: section.key,
    label: section.name,
    enabled: config.sections[section.key]?.enabled ?? false,
    position: config.sections[section.key]?.position ?? index + 1
  }));

  // Loading state para evitar hydration error
  if (!isClient) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (isModernUI) {
    return (
      <div className="space-y-8" data-modern-admin="1">
        {/* Header */}
        <Panel className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Configurações</h1>
              <p className="text-slate-300 text-lg">Configure e personalize seu site</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm">
                <Eye className="w-4 h-4 inline mr-2" />
                Ver Site
              </button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 inline mr-2" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </div>
        </Panel>

        {/* Section Preview Bar */}
        <SectionPreviewBar 
          activeSection={activeSection as SectionKey} 
          draftProps={draftProps} 
        />

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg border ${
            message.includes('sucesso') 
              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seções */}
          <div className="lg:col-span-1">
            <Panel className="adm-panel adm-card--glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-400" />
                  Seções
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-400">Drag & Drop</span>
                  <Toggle
                    checked={sectionsDnD}
                    onChange={() => setSectionsDnD(!sectionsDnD)}
                    className="w-12 h-6"
                  />
                </div>
              </div>
              
              {sectionsDnD ? (
                <SectionsOrderList 
                  initial={sectionsForReorder}
                  onSave={handleSectionsReorder}
                />
              ) : (
                <div className="space-y-3">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.key;
                    const isEnabled = config.sections[section.key]?.enabled ?? false;
                    
                    return (
                      <div
                        key={section.key}
                        className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-blue-500/20 border-blue-500/30'
                            : 'bg-slate-800/50 border-slate-600/30 hover:bg-slate-700/50'
                        }`}
                        onClick={() => setActiveSection(section.key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{section.name}</h3>
                              <p className="text-slate-400 text-sm">{section.description}</p>
                            </div>
                          </div>
                          <Toggle
                            checked={isEnabled}
                            onChange={() => handleSectionToggle(section.key)}
                            className="w-12 h-6"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>
          </div>

          {/* Configuração */}
          <div className="lg:col-span-2">
            <Panel className="adm-panel adm-card--glass p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-400" />
                Configuração - {sections.find(s => s.key === activeSection)?.name}
              </h2>
              
              {/* Configurações específicas das seções */}
              {activeSection === 'hero' && (
                <div className="space-y-6">
                  {/* Toggle da seção */}
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Hero</h3>
                      <p className="text-slate-400 text-sm">Configurações da seção principal do site</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('hero')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections.hero?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.hero?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Type className="w-5 h-5 mr-2 text-blue-400" />
                      Conteúdo
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          value={config.sections.hero?.content?.title || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                content: {
                                  ...config.sections.hero?.content,
                                  title: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Digite o título principal"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Botão Primário
                        </label>
                        <input
                          type="text"
                          value={config.sections.hero?.content?.primaryButton || ''}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                content: {
                                  ...config.sections.hero?.content,
                                  primaryButton: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="Texto do botão"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Subtítulo
                      </label>
                      <textarea
                        value={config.sections.hero?.content?.subtitle || ''}
                        onChange={(e) => updateConfig({
                          sections: {
                            ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                              content: {
                                ...config.sections.hero?.content,
                                subtitle: e.target.value
                              }
                            }
                          }
                        })}
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Digite o subtítulo"
                      />
                    </div>
                  </div>

                  {/* Estilo */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-purple-400" />
                      Estilo
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Cor do Botão Primário
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={config.sections.hero?.style?.primaryButtonColor || '#2E6BD6'}
                            onChange={(e) => updateConfig({
                              sections: {
                                ...config.sections,
                                hero: {
                                  enabled: config.sections.hero?.enabled ?? false,
                                  position: config.sections.hero?.position ?? 1,
                                  ...config.sections.hero,
                                  style: {
                                    ...config.sections.hero?.style,
                                    primaryButtonColor: e.target.value
                                  }
                                }
                              }
                            })}
                            className="w-12 h-12 rounded-lg border border-slate-600/30 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.sections.hero?.style?.primaryButtonColor || '#2E6BD6'}
                            onChange={(e) => updateConfig({
                              sections: {
                                ...config.sections,
                                hero: {
                                  enabled: config.sections.hero?.enabled ?? false,
                                  position: config.sections.hero?.position ?? 1,
                                  ...config.sections.hero,
                                  style: {
                                    ...config.sections.hero?.style,
                                    primaryButtonColor: e.target.value
                                  }
                                }
                              }
                            })}
                            className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="#2E6BD6"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Tamanho do Título
                        </label>
                        <input
                          type="text"
                          value={config.sections.hero?.style?.titleSize || '3rem'}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                style: {
                                  ...config.sections.hero?.style,
                                  titleSize: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder="3rem"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Header Section */}
              {activeSection === 'header' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Header</h3>
                      <p className="text-slate-400 text-sm">Cabeçalho do site com navegação</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('header')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections.header?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.header?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Configurações do Header</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Texto do Logo
                        </label>
                        <input
                          type="text"
                          value="Rapidus"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Botão CTA
                        </label>
                        <input
                          type="text"
                          value="Solicitar Orçamento"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Section */}
              {activeSection === 'footer' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Footer</h3>
                      <p className="text-slate-400 text-sm">Rodapé do site com informações</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('footer')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections.footer?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.footer?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Configurações do Footer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Descrição da Empresa
                        </label>
                        <textarea
                          value="Especialistas em vistoria veicular com mais de 10 anos de experiência no mercado."
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 h-20"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Copyright
                        </label>
                        <input
                          type="text"
                          value="© 2024 Rapidus. Todos os direitos reservados."
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Carrosséis Section */}
              {activeSection === 'carrossels' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Carrosséis</h3>
                      <p className="text-slate-400 text-sm">Carrosséis de produtos/serviços</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('carrossels')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections.carrossels?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.carrossels?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Configurações dos Carrosséis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Título da Seção
                        </label>
                        <input
                          type="text"
                          value={config.content.carrossels?.title || 'Nossos Carrosséis'}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={config.content.carrossels?.subtitle || 'Apresente seus produtos e serviços'}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Itens do Carrossel
                      </label>
                      <div className="space-y-2">
                        {config.content.carrossels?.items?.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <p className="text-slate-400 text-sm">{item.description}</p>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${
                                item.enabled ? 'bg-green-500' : 'bg-slate-600'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificações Section */}
              {activeSection === 'certificacoes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Certificações</h3>
                      <p className="text-slate-400 text-sm">Selos e certificações</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('certificacoes')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections.certificacoes?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections.certificacoes?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Configurações das Certificações</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Título da Seção
                        </label>
                        <input
                          type="text"
                          value={config.content.certificacoes?.title || 'Selos e Certificações'}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={config.content.certificacoes?.subtitle || 'Nossas certificações de qualidade'}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Certificações Disponíveis
                      </label>
                      <div className="space-y-2">
                        {config.content.certificacoes?.items?.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <p className="text-slate-400 text-sm">{item.description}</p>
                                <p className="text-slate-500 text-xs">Org: {item.organization}</p>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${
                                item.enabled ? 'bg-green-500' : 'bg-slate-600'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ícones Flutuantes Section */}
              {activeSection === 'icones-flutuantes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">Seção Ícones Flutuantes</h3>
                      <p className="text-slate-400 text-sm">Redes sociais flutuantes</p>
                    </div>
                    <button
                      onClick={() => handleSectionToggle('icones-flutuantes')}
                      className={`w-12 h-6 rounded-full transition-all duration-200 ${
                        config.sections['icones-flutuantes']?.enabled
                          ? 'bg-gradient-to-r from-green-500 to-blue-500'
                          : 'bg-slate-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                        config.sections['icones-flutuantes']?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Configurações dos Ícones Flutuantes</h3>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Redes Sociais Disponíveis
                      </label>
                      <div className="space-y-2">
                        {config.content['icones-flutuantes']?.items?.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                                  style={{ backgroundColor: item.color }}
                                >
                                  <span className="text-sm">{item.icon}</span>
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">{item.name}</h4>
                                  <p className="text-slate-400 text-sm">{item.url}</p>
                                </div>
                              </div>
                              <div className={`w-3 h-3 rounded-full ${
                                item.enabled ? 'bg-green-500' : 'bg-slate-600'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Outras seções */}
              {!['hero', 'header', 'footer', 'carrossels', 'certificacoes', 'icones-flutuantes'].includes(activeSection) && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Configuração de {sections.find(s => s.key === activeSection)?.name}
                  </h3>
                  <p className="text-slate-400">
                    As configurações específicas desta seção serão implementadas em breve.
                  </p>
                </div>
              )}
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  // Layout original (fallback)
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Configurações</h2>
          <p className="text-zinc-400">Configure e personalize seu site</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seções */}
        <div className="lg:col-span-1">
          <div className="p-6 border border-zinc-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-6">Seções</h2>
            <div className="space-y-3">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.key;
                const isEnabled = config.sections[section.key]?.enabled ?? false;
                
                return (
                  <div
                    key={section.key}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-zinc-800 border-zinc-700'
                        : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                    }`}
                    onClick={() => setActiveSection(section.key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-zinc-400" />
                        <div>
                          <h3 className="text-white font-medium">{section.name}</h3>
                          <p className="text-zinc-400 text-sm">{section.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSectionToggle(section.key);
                        }}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          isEnabled ? 'bg-green-500' : 'bg-zinc-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Configuração */}
        <div className="lg:col-span-2">
          <div className="p-6 border border-zinc-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-6">
              Configuração - {sections.find(s => s.key === activeSection)?.name}
            </h2>
            
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Seção Hero</h3>
                    <p className="text-zinc-400 text-sm">Configurações da seção principal do site</p>
                  </div>
                  <button
                    onClick={() => handleSectionToggle('hero')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      config.sections.hero?.enabled ? 'bg-green-500' : 'bg-zinc-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      config.sections.hero?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Conteúdo</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        value={config.sections.hero?.content?.title || ''}
                        onChange={(e) => updateConfig({
                          sections: {
                            ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                content: {
                                  ...config.sections.hero?.content,
                                  title: e.target.value
                                }
                              }
                          }
                        })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Digite o título principal"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Botão Primário
                      </label>
                      <input
                        type="text"
                        value={config.sections.hero?.content?.primaryButton || ''}
                        onChange={(e) => updateConfig({
                          sections: {
                            ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                content: {
                                  ...config.sections.hero?.content,
                                  primaryButton: e.target.value
                                }
                              }
                          }
                        })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Texto do botão"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Subtítulo
                    </label>
                    <textarea
                      value={config.sections.hero?.content?.subtitle || ''}
                      onChange={(e) => updateConfig({
                        sections: {
                          ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                              content: {
                                ...config.sections.hero?.content,
                                subtitle: e.target.value
                              }
                            }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Digite o subtítulo"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Estilo</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Cor do Botão Primário
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={config.sections.hero?.style?.primaryButtonColor || '#2E6BD6'}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                style: {
                                  ...config.sections.hero?.style,
                                  primaryButtonColor: e.target.value
                                }
                              }
                            }
                          })}
                          className="w-12 h-12 rounded-lg border border-zinc-800 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.sections.hero?.style?.primaryButtonColor || '#2E6BD6'}
                          onChange={(e) => updateConfig({
                            sections: {
                              ...config.sections,
                              hero: {
                                enabled: config.sections.hero?.enabled ?? false,
                                position: config.sections.hero?.position ?? 1,
                                ...config.sections.hero,
                                style: {
                                  ...config.sections.hero?.style,
                                  primaryButtonColor: e.target.value
                                }
                              }
                            }
                          })}
                          className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          placeholder="#2E6BD6"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Tamanho do Título
                      </label>
                      <input
                        type="text"
                        value={config.sections.hero?.style?.titleSize || '3rem'}
                        onChange={(e) => updateConfig({
                          sections: {
                            ...config.sections,
                                hero: {
                                  enabled: config.sections.hero?.enabled ?? false,
                                  position: config.sections.hero?.position ?? 1,
                                  ...config.sections.hero,
                                  style: {
                                    ...config.sections.hero?.style,
                                    titleSize: e.target.value
                                  }
                                }
                          }
                        })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="3rem"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection !== 'hero' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Configuração de {sections.find(s => s.key === activeSection)?.name}
                </h3>
                <p className="text-zinc-400">
                  As configurações específicas desta seção serão implementadas em breve.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
