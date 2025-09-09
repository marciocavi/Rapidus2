'use client';

import React from 'react';

interface HeightPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const heightOptions = [
  { value: '100%', label: '100% (Tela Cheia)', preview: 'h-screen' },
  { value: '70%', label: '70% (Alto)', preview: 'h-[70vh]' },
  { value: '50%', label: '50% (Médio)', preview: 'h-[50vh]' },
  { value: '30%', label: '30% (Baixo)', preview: 'h-[30vh]' },
  { value: 'custom', label: 'Personalizado', preview: 'h-auto' }
];

export default function HeightPicker({ label, value, onChange }: HeightPickerProps) {
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
        {heightOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value === 'custom' && (
        <input
          type="text"
          placeholder="Ex: 400px, 50vh, auto"
          className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 mt-1"
        />
      )}
    </div>
  );
}
