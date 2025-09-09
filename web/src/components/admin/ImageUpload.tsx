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
      // Simular upload - em produção, usar serviço real como Cloudinary, AWS S3, etc.
      const mockUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=800&h=600&fit=crop`;
      
      // Simular delay do upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onChange(mockUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
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
