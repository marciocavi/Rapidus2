'use client';

import React from 'react';

interface AnimationPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const animationOptions = [
  { value: 'entrada', label: 'Entrada (Fade In)', preview: 'animate-fade-in' },
  { value: 'parallax', label: 'Parallax', preview: 'animate-parallax' },
  { value: 'rolagem', label: 'Efeito de Rolagem', preview: 'animate-scroll' },
  { value: 'slide-up', label: 'Slide Up', preview: 'animate-slide-up' },
  { value: 'slide-down', label: 'Slide Down', preview: 'animate-slide-down' },
  { value: 'zoom', label: 'Zoom', preview: 'animate-zoom' },
  { value: 'bounce', label: 'Bounce', preview: 'animate-bounce' },
  { value: 'none', label: 'Sem Animação', preview: 'animate-none' }
];

export default function AnimationPicker({ label, value, onChange }: AnimationPickerProps) {
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
        {animationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}



