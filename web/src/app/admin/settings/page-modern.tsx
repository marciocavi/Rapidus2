'use client';

import { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { SiteConfig } from '@/lib/site-config';
import { Shell, Panel, Field, Button, Toggle, Tabs } from '@/components/admin/ui';

export default function AdminSettings() {
  const { config, updateConfig, saveConfig, isLoading } = useSiteConfig();
  const [message, setMessage] = useState<string>('');
  const [activeSection, setActiveSection] = useState<keyof SiteConfig['sections']>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Flag para ativar/desativar Modern UI
  const modern = process.env.NEXT_PUBLIC_MODERN_ADMIN_UI === '1';

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
    } catch (error) {
      setMessage('Erro ao salvar configurações');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { id: 'hero', label: 'Hero', icon: '🏠', description: 'Seção principal' },
    { id: 'features', label: 'Features', icon: '⭐', description: 'Características' },
    { id: 'services', label: 'Services', icon: '🛠️', description: 'Serviços' },
    { id: 'parceiros', label: 'Parceiros', icon: '🤝', description: 'Parcerias' },
    { id: 'instagram', label: 'Instagram', icon: '📸', description: 'Posts do Instagram' },
    { id: 'blog', label: 'Blog', icon: '📝', description: 'Artigos do blog' },
    { id: 'cta', label: 'CTA', icon: '📢', description: 'Call to action' },
    { id: 'stats', label: 'Stats', icon: '📊', description: 'Estatísticas' },
    { id: 'header', label: 'Header', icon: '🔝', description: 'Cabeçalho e navegação' },
    { id: 'footer', label: 'Footer', icon: '🔻', description: 'Rodapé e links' },
    { id: 'advanced', label: 'Avançado', icon: '⚙️', description: 'Configurações avançadas' }
  ] as const;

  const tabs = sections.map(section => ({
    id: section.id,
    label: section.label,
    isActive: activeSection === section.id,
    onClick: () => setActiveSection(section.id)
  }));

  const topbar = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <strong>Rapidus</strong>
        <span style={{ opacity: 0.7 }}>Painel Administrativo</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {message && (
          <span style={{ color: 'var(--success)', fontSize: '14px' }}>
            {message}
          </span>
        )}
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );

  const sidebar = (
    <nav>
      <div className="text-secondary mb-16">Seções</div>
      <ul style={{ display: 'grid', gap: 8 }}>
        {sections.map((section) => (
          <li key={section.id}>
            <a 
              href="#" 
              className={`text-secondary ${activeSection === section.id ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(section.id);
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: activeSection === section.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'background-color 0.2s'
              }}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isLoading) {
    return (
      <Shell modern={modern} topbar={topbar} sidebar={sidebar}>
        <Panel>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div>Carregando configurações...</div>
          </div>
        </Panel>
      </Shell>
    );
  }

  return (
    <Shell modern={modern} topbar={topbar} sidebar={sidebar}>
      <div style={{ marginBottom: '24px' }}>
        <Tabs tabs={tabs} activeTab={activeSection} onTabChange={(id) => setActiveSection(id as any)} />
      </div>

      <Panel 
        header={
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
              {sections.find(s => s.id === activeSection)?.icon} {sections.find(s => s.id === activeSection)?.label}
            </h2>
            <p className="text-secondary">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
        }
        footer={
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="ghost">Cancelar</Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        }
      >
        <div style={{ display: 'grid', gap: 16 }}>
          {/* Toggle para habilitar/desabilitar seção */}
          <Field 
            label="Habilitar seção"
            hint="Ative ou desative esta seção no site"
          >
            <Toggle 
              checked={(config.sections as any)[activeSection]?.enabled || false}
              onChange={() => handleSectionToggle(activeSection)}
            />
          </Field>

          {/* Conteúdo específico da seção */}
          {activeSection === 'hero' && (
            <div style={{ display: 'grid', gap: 16 }}>
              <Field label="Título Principal" hint="Será exibido no banner">
                <input 
                  className="adm-input" 
                  value={config.content.hero.title || ''} 
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      hero: { ...config.content.hero, title: e.target.value }
                    }
                  })}
                  placeholder="Rapidus"
                />
              </Field>

              <Field label="Subtítulo" hint="Descrição principal">
                <textarea 
                  className="adm-textarea" 
                  rows={3}
                  value={config.content.hero.subtitle || ''} 
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      hero: { ...config.content.hero, subtitle: e.target.value }
                    }
                  })}
                  placeholder="Soluções digitais rápidas..."
                />
              </Field>

              <Field label="Botão Primário">
                <input 
                  className="adm-input" 
                  value={config.content.hero.primaryButton || ''} 
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      hero: { ...config.content.hero, primaryButton: e.target.value }
                    }
                  })}
                  placeholder="Começar Agora"
                />
              </Field>

              <Field label="Botão Secundário">
                <input 
                  className="adm-input" 
                  value={config.content.hero.secondaryButton || ''} 
                  onChange={(e) => updateConfig({
                    content: {
                      ...config.content,
                      hero: { ...config.content.hero, secondaryButton: e.target.value }
                    }
                  })}
                  placeholder="Saiba Mais"
                />
              </Field>
            </div>
          )}

          {activeSection === 'theme' && (
            <div style={{ display: 'grid', gap: 16 }}>
              <Field label="Cor Primária" hint="Cor principal do site">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input 
                    type="color"
                    value={config.theme.primary}
                    onChange={(e) => updateConfig({
                      theme: { ...config.theme, primary: e.target.value }
                    })}
                    className="adm-input"
                    style={{ width: '48px', height: '48px', padding: 0 }}
                  />
                  <input 
                    className="adm-input" 
                    value={config.theme.primary}
                    onChange={(e) => updateConfig({
                      theme: { ...config.theme, primary: e.target.value }
                    })}
                  />
                </div>
              </Field>

              <Field label="Cor Secundária">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input 
                    type="color"
                    value={config.theme.secondary}
                    onChange={(e) => updateConfig({
                      theme: { ...config.theme, secondary: e.target.value }
                    })}
                    className="adm-input"
                    style={{ width: '48px', height: '48px', padding: 0 }}
                  />
                  <input 
                    className="adm-input" 
                    value={config.theme.secondary}
                    onChange={(e) => updateConfig({
                      theme: { ...config.theme, secondary: e.target.value }
                    })}
                  />
                </div>
              </Field>
            </div>
          )}
        </div>
      </Panel>
    </Shell>
  );
}
