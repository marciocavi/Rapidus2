"use client";

import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

const PRESET_COLORS = [
  '#3B82F6', // blue-500
  '#8B5CF6', // violet-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
  '#F97316', // orange-500
  '#EC4899', // pink-500
  '#6B7280', // gray-500
  '#1F2937', // gray-800
  '#FFFFFF', // white
];

export default function ColorPicker({ value = '#3B82F6', onChange, label, className = "" }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-6 rounded border border-slate-600/30 flex items-center justify-center"
          style={{ backgroundColor: value }}
        >
          <Palette className="w-3 h-3 text-white" />
        </button>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 bg-slate-800 border border-slate-600/30 rounded text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-slate-800 border border-slate-600/30 rounded-md shadow-lg z-10">
          <div className="grid grid-cols-6 gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
                className="w-6 h-6 rounded border border-slate-600/30 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
