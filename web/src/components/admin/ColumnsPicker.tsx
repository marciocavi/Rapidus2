'use client';

import React from 'react';

interface ColumnsPickerProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const columnOptions = [
  { value: 1, label: '1 Coluna', preview: 'grid-cols-1' },
  { value: 2, label: '2 Colunas', preview: 'grid-cols-2' },
  { value: 3, label: '3 Colunas', preview: 'grid-cols-3' },
  { value: 4, label: '4 Colunas', preview: 'grid-cols-4' },
  { value: 6, label: '6 Colunas', preview: 'grid-cols-6' }
];

export default function ColumnsPicker({ label, value, onChange }: ColumnsPickerProps) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-slate-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded-md text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
      >
        {columnOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
