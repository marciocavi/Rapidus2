'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Settings, 
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
import { Panel, Toggle } from '@/components/admin/ui';
import HeroAdmin from '@/components/admin/sections/Hero';
import FeaturesAdmin from '@/components/admin/sections/Features';
import ServicesAdmin from '@/components/admin/sections/Services';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [sectionsDnD, setSectionsDnD] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Evitar hydration error
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSectionToggle = (section: keyof SiteConfig['sections']) => {
    updateConfig({
      sections: {
        ...config.sections,
        [section]: {
          ...config.sections[section],
          enabled: !config.sections[section]?.enabled
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      await saveConfig();
      setMessage('Configurações salvas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Erro ao salvar configurações');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const sections = [
    { key: 'hero', label: 'Hero', icon: Home, description: 'Seção principal do site' },
    { key: 'features', label: 'Features', icon: Star, description: 'Diferenciais e características' },
    { key: 'services', label: 'Services', icon: Wrench, description: 'Serviços oferecidos' },
    { key: 'parceiros', label: 'Parceiros', icon: Heart, description: 'Logos dos parceiros' },
    { key: 'instagram', label: 'Instagram', icon: Instagram, description: 'Posts do Instagram' },
    { key: 'blog', label: 'Blog', icon: FileText, description: 'Artigos do blog' },
    { key: 'cta', label: 'CTA', icon: Megaphone, description: 'Call to action' },
    { key: 'stats', label: 'Stats', icon: BarChart3, description: 'Estatísticas' },
    { key: 'carrossels', label: 'Carrosséis', icon: Images, description: 'Carrosséis de conteúdo' },
    { key: 'certificacoes', label: 'Certificações', icon: Award, description: 'Certificações e selos' },
    { key: 'iconesFlutuantes', label: 'Ícones Flutuantes', icon: Share2, description: 'Redes sociais flutuantes' },
    { key: 'header', label: 'Header', icon: Settings, description: 'Cabeçalho do site' },
    { key: 'footer', label: 'Footer', icon: Settings, description: 'Rodapé do site' }
  ];

  if (!isClient) {
    return <div className="min-h-screen bg-neutral-dark-bg flex items-center justify-center">
      <div className="text-white">Carregando...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-neutral-dark-bg">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-semibold">Rapidus</span>
            </div>
            
            <nav className="space-y-2">
              <a href="/admin" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 text-white bg-zinc-800 rounded-lg">
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </a>
              <a href="/admin/analytics" className="flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Configurações</h1>
              <p className="text-zinc-400">Gerencie as configurações do seu site</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {message && (
                <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                  {message}
                </div>
              )}
              <Link 
                href="/" 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Ver Site
              </Link>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sections List */}
            <div className="lg:col-span-1">
              <Panel header={<h3 className="text-lg font-semibold text-white">Seções</h3>} className="h-fit">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-400">Drag & Drop</span>
                  <Toggle
                    checked={sectionsDnD}
                    onChange={setSectionsDnD}
                  />
                </div>
                
                <div className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.key;
                    const isEnabled = config.sections[section.key as keyof SiteConfig['sections']]?.enabled ?? false;
                    
                    return (
                      <div
                        key={section.key}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isActive 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                        onClick={() => setActiveSection(section.key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-zinc-400" />
                            <div>
                              <h3 className="text-white font-medium">{section.label}</h3>
                              <p className="text-zinc-400 text-sm">{section.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionToggle(section.key as keyof SiteConfig['sections']);
                            }}
                            className={`w-6 h-6 rounded-full transition-colors ${
                              isEnabled ? 'bg-green-500' : 'bg-zinc-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              isEnabled ? 'translate-x-3' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </div>

            {/* Section Configuration */}
            <div className="lg:col-span-2">
              <Panel header={<h3 className="text-lg font-semibold text-white">Configurações das Seções</h3>} className="min-h-[600px]">
                {activeSection === 'hero' && <HeroAdmin />}
                {activeSection === 'features' && <FeaturesAdmin />}
                {activeSection === 'services' && <ServicesAdmin />}
                {activeSection !== 'hero' && activeSection !== 'features' && activeSection !== 'services' && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-zinc-400" />
                      </div>
                      <h3 className="text-white font-medium mb-2">Configurações em Desenvolvimento</h3>
                      <p className="text-zinc-400 text-sm">
                        As configurações para a seção &quot;{sections.find(s => s.key === activeSection)?.label}&quot; 
                        estão sendo desenvolvidas.
                      </p>
                    </div>
                  </div>
                )}
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
