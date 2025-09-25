'use client';

import React from 'react';

interface LayoutPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const layoutOptions = [
  { value: 'centralizado', label: 'Centralizado', preview: 'text-center' },
  { value: 'lado a lado', label: 'Lado a Lado', preview: 'flex items-center' },
  { value: 'esquerda', label: 'Alinhado à Esquerda', preview: 'text-left' },
  { value: 'direita', label: 'Alinhado à Direita', preview: 'text-right' }
];

export default function LayoutPicker({ label, value, onChange }: LayoutPickerProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
      >
        {layoutOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}



