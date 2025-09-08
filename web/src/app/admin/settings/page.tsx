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
  BarChart3
} from 'lucide-react';

import { useSiteConfig } from '@/context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [activeSection, setActiveSection] = useState<keyof SiteConfig['sections']>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [isModernUI, setIsModernUI] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

  const sections = [
    { key: 'hero' as const, name: 'Hero', icon: Home, description: 'Seção principal do site' },
    { key: 'features' as const, name: 'Features', icon: Star, description: 'Diferenciais e características' },
    { key: 'services' as const, name: 'Services', icon: Wrench, description: 'Serviços oferecidos' },
    { key: 'parceiros' as const, name: 'Parceiros', icon: Heart, description: 'Logos dos parceiros' },
    { key: 'instagram' as const, name: 'Instagram', icon: Instagram, description: 'Posts do Instagram' },
    { key: 'blog' as const, name: 'Blog', icon: FileText, description: 'Artigos do blog' },
    { key: 'cta' as const, name: 'CTA', icon: Megaphone, description: 'Call to action' },
    { key: 'stats' as const, name: 'Stats', icon: BarChart3, description: 'Estatísticas' },
    { key: 'header' as const, name: 'Header', icon: Settings, description: 'Cabeçalho do site' },
    { key: 'footer' as const, name: 'Footer', icon: Settings, description: 'Rodapé do site' }
  ];

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
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
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
              <button
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
              </button>
            </div>
          </div>
        </div>

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
            <div className="adm-panel adm-card--glass p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                Seções
              </h2>
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSectionToggle(section.key);
                          }}
                          className={`w-12 h-6 rounded-full transition-all duration-200 ${
                            isEnabled
                              ? 'bg-gradient-to-r from-green-500 to-blue-500'
                              : 'bg-slate-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
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
            <div className="adm-panel adm-card--glass p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-400" />
                Configuração - {sections.find(s => s.key === activeSection)?.name}
              </h2>
              
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

              {/* Outras seções */}
              {activeSection !== 'hero' && (
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
            </div>
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
