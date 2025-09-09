'use client';

import React from 'react';

interface DisplayTypePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const displayTypeOptions = [
  { value: 'grid', label: 'Grid', preview: 'grid' },
  { value: 'carrossel', label: 'Carrossel', preview: 'carousel' },
  { value: 'lista', label: 'Lista', preview: 'list' },
  { value: 'mosaico', label: 'Mosaico', preview: 'mosaic' }
];

export default function DisplayTypePicker({ label, value, onChange }: DisplayTypePickerProps) {
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
        {displayTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
