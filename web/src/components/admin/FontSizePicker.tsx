"use client";

import { useState } from 'react';
import { Type } from 'lucide-react';

interface FontSizePickerProps {
  value?: string;
  onChange: (size: string) => void;
  label?: string;
  className?: string;
}

const FONT_SIZES = [
  { label: 'XS', value: 'text-xs', size: '0.75rem' },
  { label: 'SM', value: 'text-sm', size: '0.875rem' },
  { label: 'Base', value: 'text-base', size: '1rem' },
  { label: 'LG', value: 'text-lg', size: '1.125rem' },
  { label: 'XL', value: 'text-xl', size: '1.25rem' },
  { label: '2XL', value: 'text-2xl', size: '1.5rem' },
  { label: '3XL', value: 'text-3xl', size: '1.875rem' },
  { label: '4XL', value: 'text-4xl', size: '2.25rem' },
];

export default function FontSizePicker({ value = 'text-lg', onChange, label, className = "" }: FontSizePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSize = FONT_SIZES.find(size => size.value === value) || FONT_SIZES[3];

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1">
          {label}
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1 bg-slate-800 border border-slate-600/30 rounded text-white text-xs flex items-center justify-between hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Type className="w-3 h-3" />
          <span>{currentSize.label}</span>
        </div>
        <span className="text-slate-400">{currentSize.size}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600/30 rounded-md shadow-lg z-10">
          {FONT_SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => {
                onChange(size.value);
                setIsOpen(false);
              }}
              className={`w-full px-2 py-1 text-left text-xs hover:bg-slate-700/50 transition-colors ${
                value === size.value ? 'bg-blue-500/20 text-blue-300' : 'text-white'
              }`}
            >
              <div className="flex justify-between">
                <span>{size.label}</span>
                <span className="text-slate-400">{size.size}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



