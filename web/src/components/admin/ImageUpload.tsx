"use client";

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, placeholder = "Clique para fazer upload", className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          onChange(result);
        }
        setIsUploading(false);
      };
      reader.onerror = (error) => {
        console.error('Erro ao ler arquivo:', error);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Erro no upload:', error);
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <div className="relative w-full h-24 rounded-md border border-slate-600/30 overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-24 border-2 border-dashed border-slate-600/30 rounded-md flex flex-col items-center justify-center text-slate-400 hover:border-slate-500/50 hover:text-slate-300 transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload className="w-4 h-4 mb-1" />
              <span className="text-xs">{placeholder}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
