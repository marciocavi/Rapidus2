'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { SiteConfig } from '@/lib/site-config';

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  saveConfig: () => Promise<boolean>;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children, initialConfig }: { 
  children: ReactNode; 
  initialConfig: SiteConfig;
}) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      console.log('Config updated:', updated);
      return updated;
    });
  };

  const saveConfig = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      if (response.ok) {
        return true;
      } else {
        // Fallback to localStorage if server save fails
        localStorage.setItem('siteConfig', JSON.stringify(config));
        return true;
      }
    } catch {
      // Fallback to localStorage
      localStorage.setItem('siteConfig', JSON.stringify(config));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  // Load from localStorage on client side
  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Only use localStorage if it has the new structure
        if (parsed.theme?.fontSize && parsed.content) {
          setConfig(parsed);
        }
      } catch {
        // Keep default if localStorage is invalid
      }
    }
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, saveConfig, isLoading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}
