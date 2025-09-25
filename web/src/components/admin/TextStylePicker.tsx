// src/components/admin/TextStylePicker.tsx
'use client';

import React, { useState } from 'react';
import { TextStyle } from '../../theme/tokens';
import { textStyleToStyle } from '../../utils/textStyle';

// Presets de estilos comuns
const textStylePresets = {
  heroTitle: {
    family: 'heading' as const,
    size: 'display-2xl' as const,
    weight: 'bold' as const,
    line: 'tight' as const,
    tracking: 'tight' as const,
    color: 'text.primary' as const,
    align: 'center' as const,
  },
  heroSubtitle: {
    family: 'body' as const,
    size: 'h3' as const,
    weight: 'normal' as const,
    line: 'relaxed' as const,
    color: 'text.secondary' as const,
    align: 'center' as const,
  },
  sectionTitle: {
    family: 'heading' as const,
    size: 'h2' as const,
    weight: 'semibold' as const,
    line: 'snug' as const,
    color: 'text.primary' as const,
    align: 'center' as const,
  },
  cardTitle: {
    family: 'heading' as const,
    size: 'h4' as const,
    weight: 'semibold' as const,
    line: 'snug' as const,
    color: 'text.primary' as const,
  },
  cardDescription: {
    family: 'body' as const,
    size: 'body' as const,
    weight: 'normal' as const,
    line: 'relaxed' as const,
    color: 'text.secondary' as const,
  },
  button: {
    family: 'body' as const,
    size: 'body' as const,
    weight: 'medium' as const,
    line: 'normal' as const,
    color: 'text.inverse' as const,
    transform: 'none' as const,
  },
} as const;

interface TextStylePickerProps {
  value: TextStyle;
  onChange: (style: TextStyle) => void;
  label?: string;
  previewText?: string;
}

export default function TextStylePicker({ 
  value, 
  onChange, 
  label = "Estilo de Texto",
  previewText = "Texto de exemplo"
}: TextStylePickerProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  const handlePreset = (preset: TextStyle) => {
    onChange(preset);
  };

  const updateStyle = (key: keyof TextStyle, newValue: any) => {
    onChange({ ...value, [key]: newValue });
  };

  const { className, style } = textStyleToStyle(value);

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white">{label}</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-3 py-1 text-xs rounded ${
                activeTab === 'basic' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Básico
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-3 py-1 text-xs rounded ${
                activeTab === 'advanced' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Avançado
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
          <div className="text-xs text-slate-400 mb-2">Preview:</div>
          <div className={className} style={style}>
            {previewText}
          </div>
        </div>

        {activeTab === 'basic' && (
          <div className="space-y-3">
            {/* Presets */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Presets Rápidos
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handlePreset(textStylePresets.heroTitle)}
                  className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600"
                >
                  Título Hero
                </button>
                <button
                  onClick={() => handlePreset(textStylePresets.sectionTitle)}
                  className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600"
                >
                  Título Seção
                </button>
                <button
                  onClick={() => handlePreset(textStylePresets.cardTitle)}
                  className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600"
                >
                  Título Card
                </button>
                <button
                  onClick={() => handlePreset(textStylePresets.cardDescription)}
                  className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600"
                >
                  Descrição
                </button>
              </div>
            </div>

            {/* Família */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Família
              </label>
              <select
                value={value.family || 'body'}
                onChange={(e) => updateStyle('family', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="heading">Heading</option>
                <option value="body">Body</option>
                <option value="mono">Mono</option>
              </select>
            </div>

            {/* Tamanho */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tamanho
              </label>
              <select
                value={value.size || 'body'}
                onChange={(e) => updateStyle('size', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="display-2xl">Display 2XL</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="body">Body</option>
                <option value="body-sm">Body Small</option>
                <option value="caption">Caption</option>
              </select>
            </div>

            {/* Peso */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Peso
              </label>
              <select
                value={value.weight || 'normal'}
                onChange={(e) => updateStyle('weight', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="light">Light (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Medium (500)</option>
                <option value="semibold">Semibold (600)</option>
                <option value="bold">Bold (700)</option>
                <option value="extrabold">Extrabold (800)</option>
              </select>
            </div>

            {/* Cor */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cor
              </label>
              <select
                value={value.color || 'text.primary'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <optgroup label="Texto">
                  <option value="text.primary">Primário</option>
                  <option value="text.secondary">Secundário</option>
                  <option value="text.muted">Muted</option>
                  <option value="text.inverse">Inverso</option>
                </optgroup>
                <optgroup label="Marca">
                  <option value="brand.primary">Primário</option>
                  <option value="brand.accent">Accent</option>
                  <option value="brand.secondary">Secundário</option>
                </optgroup>
              </select>
            </div>

            {/* Alinhamento */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Alinhamento
              </label>
              <select
                value={value.align || 'left'}
                onChange={(e) => updateStyle('align', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="left">Esquerda</option>
                <option value="center">Centro</option>
                <option value="right">Direita</option>
                <option value="justify">Justificado</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-3">
            {/* Altura de linha */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Altura de Linha
              </label>
              <select
                value={value.line || 'normal'}
                onChange={(e) => updateStyle('line', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="tight">Tight (1.1)</option>
                <option value="snug">Snug (1.2)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Relaxed (1.6)</option>
                <option value="loose">Loose (1.8)</option>
              </select>
            </div>

            {/* Espaçamento de letras */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Espaçamento de Letras
              </label>
              <select
                value={value.tracking || 'normal'}
                onChange={(e) => updateStyle('tracking', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="tighter">Tighter (-0.05em)</option>
                <option value="tight">Tight (-0.025em)</option>
                <option value="normal">Normal (0em)</option>
                <option value="wide">Wide (0.025em)</option>
                <option value="wider">Wider (0.05em)</option>
                <option value="widest">Widest (0.1em)</option>
              </select>
            </div>

            {/* Transformação */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Transformação
              </label>
              <select
                value={value.transform || 'none'}
                onChange={(e) => updateStyle('transform', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="none">Nenhuma</option>
                <option value="uppercase">Maiúsculas</option>
                <option value="lowercase">Minúsculas</option>
                <option value="capitalize">Capitalizar</option>
              </select>
            </div>

            {/* Largura máxima */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Largura Máxima (caracteres)
              </label>
              <input
                type="number"
                value={value.maxWidthCh || ''}
                onChange={(e) => updateStyle('maxWidthCh', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Ex: 65"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              />
            </div>

            {/* Sombra */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Sombra
              </label>
              <select
                value={value.shadow || 'none'}
                onChange={(e) => updateStyle('shadow', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="none">Nenhuma</option>
                <option value="sm">Pequena</option>
                <option value="md">Média</option>
                <option value="lg">Grande</option>
                <option value="xl">Extra Grande</option>
              </select>
            </div>
          </div>
        )}

        {/* Reset */}
        <div className="pt-3 border-t border-slate-600/30">
          <button
            onClick={() => onChange({})}
            className="px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-slate-300"
          >
            Resetar Estilo
          </button>
        </div>
      </div>
    </div>
  );
}
