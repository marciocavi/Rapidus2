'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type CSSProperties,
} from 'react';
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
  Share2,
  GripVertical,
} from 'lucide-react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useSiteConfig } from '@/context/SiteConfigContext';
import { SectionKey } from '@/lib/site-config';
import { Panel, Toggle } from '@/components/admin/ui';
import HeroAdmin from '@/components/admin/sections/Hero';
import FeaturesAdmin from '@/components/admin/sections/Features';
import ServicesAdmin from '@/components/admin/sections/Services';
import ParceirosAdmin from '@/components/admin/sections/Parceiros';
import InstagramAdmin from '@/components/admin/sections/Instagram';
import BlogAdmin from '@/components/admin/sections/Blog';
import CTAAdmin from '@/components/admin/sections/CTA';
import StatsAdmin from '@/components/admin/sections/Stats';
import CarrosselsAdmin from '@/components/admin/sections/Carrossels';
import CertificacoesAdmin from '@/components/admin/sections/Certificacoes';
import IconesFlutuantesAdmin from '@/components/admin/sections/IconesFlutuantes';
import HeaderAdmin from '@/components/admin/sections/Header';
import FooterAdmin from '@/components/admin/sections/Footer';

type SectionDefinition = {
  key: SectionKey;
  label: string;
  icon: typeof Settings;
  description: string;
};

const STATIC_SECTIONS = new Set<SectionKey>(['header', 'footer']);

const SECTION_DEFINITIONS: SectionDefinition[] = [
  { key: 'hero', label: 'Hero', icon: Home, description: 'Seção principal do site' },
  { key: 'features', label: 'Features', icon: Star, description: 'Diferenciais e características' },
  { key: 'services', label: 'Services', icon: Wrench, description: 'Serviços oferecidos' },
  { key: 'parceiros', label: 'Parceiros', icon: Heart, description: 'Logos dos parceiros' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, description: 'Posts do Instagram' },
  { key: 'blog', label: 'Blog', icon: FileText, description: 'Artigos do blog' },
  { key: 'cta', label: 'CTA', icon: Megaphone, description: 'Call to action' },
  { key: 'stats', label: 'Stats', icon: BarChart3, description: 'Indicadores e métricas' },
  { key: 'carrossels', label: 'Carrosséis', icon: Images, description: 'Slides de conteúdo' },
  { key: 'certificacoes', label: 'Certificações', icon: Award, description: 'Selos e garantias' },
  { key: 'icones-flutuantes', label: 'Ícones Flutuantes', icon: Share2, description: 'Botões flutuantes de redes sociais' },
  { key: 'header', label: 'Header', icon: Settings, description: 'Cabeçalho do site' },
  { key: 'footer', label: 'Footer', icon: Settings, description: 'Rodapé do site' },
];

const SECTION_MAP: Partial<Record<SectionKey, SectionDefinition>> = SECTION_DEFINITIONS.reduce(
  (acc, section) => {
    acc[section.key] = section;
    return acc;
  },
  {} as Partial<Record<SectionKey, SectionDefinition>>
);

const HEADER_KEY = 'header' as SectionKey;
const FOOTER_KEY = 'footer' as SectionKey;

export default function AdminSettings() {
  const { config, updateConfig, saveConfig } = useSiteConfig();
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [sectionsDnD, setSectionsDnD] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [draggableOrder, setDraggableOrder] = useState<SectionKey[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSectionToggle = (section: SectionKey) => {
    const fallbackPosition = Object.keys(config.sections).length + 1;
    const currentSection = config.sections[section] ?? { enabled: false, position: fallbackPosition };

    updateConfig({
      sections: {
        ...config.sections,
        [section]: {
          ...currentSection,
          enabled: !currentSection.enabled,
        },
      },
    });
  };

  const handleSave = useCallback(async () => {
    try {
      await saveConfig();
      setMessage('Configurações salvas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Erro ao salvar configurações');
      setTimeout(() => setMessage(''), 3000);
    }
  }, [saveConfig]);

  useEffect(() => {
    const externalSaveHandler = () => {
      void handleSave();
    };

    window.addEventListener('admin-save', externalSaveHandler);
    return () => {
      window.removeEventListener('admin-save', externalSaveHandler);
    };
  }, [handleSave]);

  useEffect(() => {
    const fallbackPositions = SECTION_DEFINITIONS.reduce<Record<SectionKey, number>>((acc, section, index) => {
      acc[section.key] = index + 1;
      return acc;
    }, {} as Record<SectionKey, number>);

    const sorted = SECTION_DEFINITIONS
      .filter((section) => !STATIC_SECTIONS.has(section.key))
      .sort((a, b) => {
        const fallbackA = fallbackPositions[a.key];
        const fallbackB = fallbackPositions[b.key];
        const aPosition = config.sections[a.key]?.position ?? fallbackA;
        const bPosition = config.sections[b.key]?.position ?? fallbackB;

        if (aPosition === bPosition) {
          return fallbackA - fallbackB;
        }

        return aPosition - bPosition;
      })
      .map((section) => section.key);

    setDraggableOrder(sorted);
  }, [config.sections]);

  const fullOrder = useMemo(() => {
    const ordered: SectionKey[] = [];

    if (SECTION_MAP[HEADER_KEY]) {
      ordered.push(HEADER_KEY);
    }

    draggableOrder.forEach((key) => {
      if (SECTION_MAP[key] && !ordered.includes(key)) {
        ordered.push(key);
      }
    });

    if (SECTION_MAP[FOOTER_KEY]) {
      ordered.push(FOOTER_KEY);
    }

    (Object.keys(config.sections) as SectionKey[]).forEach((sectionKey) => {
      if (!ordered.includes(sectionKey) && SECTION_MAP[sectionKey] && !STATIC_SECTIONS.has(sectionKey)) {
        ordered.push(sectionKey);
      }
    });

    SECTION_DEFINITIONS.forEach((section) => {
      if (!ordered.includes(section.key)) {
        ordered.push(section.key);
      }
    });

    return ordered;
  }, [config.sections, draggableOrder]);

  const positionLookup = useMemo(() => {
    const map: Partial<Record<SectionKey, number>> = {};
    fullOrder.forEach((key, index) => {
      map[key] = index + 1;
    });
    return map;
  }, [fullOrder]);

  const sectionComponents: Partial<Record<SectionKey, ComponentType>> = {
    hero: HeroAdmin,
    features: FeaturesAdmin,
    services: ServicesAdmin,
    parceiros: ParceirosAdmin,
    instagram: InstagramAdmin,
    blog: BlogAdmin,
    cta: CTAAdmin,
    stats: StatsAdmin,
    carrossels: CarrosselsAdmin,
    certificacoes: CertificacoesAdmin,
    'icones-flutuantes': IconesFlutuantesAdmin,
    header: HeaderAdmin,
    footer: FooterAdmin,
  };

  const activeMeta = SECTION_DEFINITIONS.find((section) => section.key === activeSection);
  const ActiveComponent = activeSection ? sectionComponents[activeSection] : undefined;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-neutral-dark-bg flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (!sectionsDnD) {
      return;
    }

    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setDraggableOrder((prev) => {
      const activeKey = active.id as SectionKey;
      const overKey = over.id as SectionKey;

      const oldIndex = prev.indexOf(activeKey);
      const newIndex = prev.indexOf(overKey);

      if (oldIndex === -1 || newIndex === -1) {
        return prev;
      }

      const reordered = arrayMove(prev, oldIndex, newIndex);
      const nextOrder: SectionKey[] = [];

      if (SECTION_MAP[HEADER_KEY]) {
        nextOrder.push(HEADER_KEY);
      }

      reordered.forEach((key) => {
        if (SECTION_MAP[key]) {
          nextOrder.push(key);
        }
      });

      if (SECTION_MAP[FOOTER_KEY]) {
        nextOrder.push(FOOTER_KEY);
      }

      (Object.keys(config.sections) as SectionKey[]).forEach((sectionKey) => {
        if (!nextOrder.includes(sectionKey) && SECTION_MAP[sectionKey] && !STATIC_SECTIONS.has(sectionKey)) {
          nextOrder.push(sectionKey);
        }
      });

      const updatedSections = { ...config.sections };
      nextOrder.forEach((key, index) => {
        const current = updatedSections[key] ?? { enabled: true, position: index + 1 };
        updatedSections[key] = { ...current, position: index + 1 };
      });

      updateConfig({ sections: updatedSections });
      return reordered;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-dark-bg">
      <div className="p-6">
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Panel header={<h3 className="text-lg font-semibold text-white">Seções</h3>} className="h-fit">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-400">Drag & Drop</span>
                <Toggle checked={sectionsDnD} onChange={(value) => setSectionsDnD(Boolean(value))} />
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="space-y-2">
                  {SECTION_MAP[HEADER_KEY] && (
                    <StaticSectionCard
                      key={HEADER_KEY}
                      meta={SECTION_MAP[HEADER_KEY]!}
                      position={positionLookup[HEADER_KEY] ?? 1}
                      isActive={activeSection === HEADER_KEY}
                      isEnabled={config.sections[HEADER_KEY]?.enabled ?? true}
                      onSelect={() => setActiveSection(HEADER_KEY)}
                      onToggle={() => handleSectionToggle(HEADER_KEY)}
                      lockedLabel="fixo"
                    />
                  )}

                  <SortableContext items={draggableOrder} strategy={verticalListSortingStrategy}>
                    {draggableOrder.map((key) => {
                      const meta = SECTION_MAP[key];
                      if (!meta) {
                        return null;
                      }

                      const sectionConfig = config.sections[key] ?? null;

                      return (
                        <SortableSectionCard
                          key={key}
                          meta={meta}
                          position={positionLookup[key] ?? 0}
                          isActive={activeSection === key}
                          isEnabled={sectionConfig?.enabled ?? false}
                          onSelect={() => setActiveSection(key)}
                          onToggle={() => handleSectionToggle(key)}
                          dndEnabled={sectionsDnD}
                        />
                      );
                    })}
                  </SortableContext>

                  {SECTION_MAP[FOOTER_KEY] && (
                    <StaticSectionCard
                      key={FOOTER_KEY}
                      meta={SECTION_MAP[FOOTER_KEY]!}
                      position={positionLookup[FOOTER_KEY] ?? fullOrder.length}
                      isActive={activeSection === FOOTER_KEY}
                      isEnabled={config.sections[FOOTER_KEY]?.enabled ?? true}
                      onSelect={() => setActiveSection(FOOTER_KEY)}
                      onToggle={() => handleSectionToggle(FOOTER_KEY)}
                      lockedLabel="fixo"
                    />
                  )}
                </div>
              </DndContext>
            </Panel>
          </div>

          <div className="lg:col-span-2">
            <Panel header={<h3 className="text-lg font-semibold text-white">Configurações das Seções</h3>} className="min-h-[600px]">
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="w-8 h-8 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Seção ainda não configurada</h3>
                      <p className="text-zinc-400 text-sm">
                        Ajustes para <span className="font-semibold">{activeMeta?.label ?? 'esta seção'}</span> ainda serão implementados.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionCardProps {
  meta: SectionDefinition;
  position: number;
  isActive: boolean;
  isEnabled: boolean;
  onSelect: () => void;
  onToggle: () => void;
}

interface SortableSectionCardProps extends SectionCardProps {
  dndEnabled: boolean;
}

function SortableSectionCard({
  meta,
  position,
  isActive,
  isEnabled,
  onSelect,
  onToggle,
  dndEnabled,
}: SortableSectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: meta.key,
    disabled: !dndEnabled,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
  };

  const Icon = meta.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 rounded-lg border transition-all cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 hover:border-zinc-700'
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            {...attributes}
            {...listeners}
            onClick={(event) => event.stopPropagation()}
            className={`p-1 rounded-md text-zinc-400 hover:text-white transition-colors ${
              dndEnabled ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed opacity-50'
            }`}
            aria-label="Reordenar seção"
            disabled={!dndEnabled}
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <Icon className="w-5 h-5 text-zinc-400" />
          <div>
            <h3 className="text-white font-medium">{meta.label}</h3>
            <p className="text-zinc-400 text-sm">{meta.description}</p>
          </div>
        </div>
        <SectionCardActions position={position} isEnabled={isEnabled} onToggle={onToggle} />
      </div>
    </div>
  );
}

interface StaticSectionCardProps extends SectionCardProps {
  lockedLabel?: string;
}

function StaticSectionCard({
  meta,
  position,
  isActive,
  isEnabled,
  onSelect,
  onToggle,
  lockedLabel,
}: StaticSectionCardProps) {
  const Icon = meta.icon;

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isActive ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 hover:border-zinc-700'
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1 rounded-md bg-zinc-800 text-zinc-400">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-medium">{meta.label}</h3>
            <p className="text-zinc-400 text-sm">{meta.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {lockedLabel && <span className="text-xs uppercase tracking-wide text-zinc-500">{lockedLabel}</span>}
          <SectionCardActions position={position} isEnabled={isEnabled} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}

interface SectionCardActionsProps {
  position: number;
  isEnabled: boolean;
  onToggle: () => void;
}

function SectionCardActions({ position, isEnabled, onToggle }: SectionCardActionsProps) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-xs text-zinc-500 font-mono">#{position}</span>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        className={`w-6 h-6 rounded-full transition-colors ${isEnabled ? 'bg-green-500' : 'bg-zinc-600'}`}
        aria-pressed={isEnabled}
        aria-label={isEnabled ? 'Desativar seção' : 'Ativar seção'}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform ${
            isEnabled ? 'translate-x-3' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
