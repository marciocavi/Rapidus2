"use client";
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

type Palette = { primary: string; secondary: string; accent: string; neutral: string; background: string };
type Typography = { heading: string; body: string };
type SectionKey = 'hero'|'carousel'|'portfolio'|'contacts'|'blog'|'testimonials'|'floatingIcons';

export interface WizardState {
  identity: { name: string; slogan?: string };
  industry?: string;
  brand: { logoUrl?: string; useLogoColors: boolean; palette: Palette };
  style: { theme: 'minimal'|'modern'|'classic'|'neon'; typography: Typography };
  inspiration?: { instagram?: string; website?: string };
  sections: Record<SectionKey, { enabled: boolean; config?: Record<string, unknown> }>;
  contacts: { whatsapp?: string; phone?: string; email?: string; instagram?: string; address?: string };
  dirty: boolean;
  stepIndex: number;
}

interface WizardActions {
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  saveDraft: () => void;
};

const DEFAULT_STATE: WizardState = {
  identity: { name: '' },
  brand: {
    useLogoColors: true,
    palette: { primary: '#111827', secondary: '#374151', accent: '#2563eb', neutral: '#9ca3af', background: '#ffffff' },
  },
  style: { theme: 'modern', typography: { heading: 'Inter', body: 'Inter' } },
  sections: {
    hero: { enabled: true },
    carousel: { enabled: false },
    portfolio: { enabled: false },
    contacts: { enabled: true },
    blog: { enabled: false },
    testimonials: { enabled: false },
    floatingIcons: { enabled: false },
  },
  contacts: {},
  dirty: false,
  stepIndex: 0,
};

const STORAGE_KEY = 'wizardState@v1';

function loadFromStorage(): WizardState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardState;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return null;
  }
}

function saveToStorage(state: WizardState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

type WizardContextValue = WizardState & WizardActions;

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const initial = typeof window !== 'undefined' ? loadFromStorage() ?? DEFAULT_STATE : DEFAULT_STATE;
  const [state, setStateInternal] = useState<WizardState>(initial);
  const stateRef = useRef(state);
  stateRef.current = state;

  const api = useMemo((): WizardContextValue => ({
    ...state,
    // Esta função genérica não deve ser exposta. Usar actions específicas.
    // A lógica foi movida para dentro do useMemo para ser usada pelas actions.
    setState: (partial: Partial<WizardState>) => {
      const next = { ...stateRef.current, ...partial, dirty: true } as WizardState;
      setStateInternal(next);
      saveToStorage(next);
    },
    nextStep: () => setStateInternal((s) => ({ ...s, stepIndex: s.stepIndex + 1, dirty: true })),
    prevStep: () => setStateInternal((s) => ({ ...s, stepIndex: Math.max(0, s.stepIndex - 1), dirty: true })),
    reset: () => setStateInternal(DEFAULT_STATE),
    saveDraft: () => {
      const next = { ...stateRef.current, dirty: false };
      setStateInternal(next);
      saveToStorage(next);
    },
  }), [state]);

  return <WizardContext.Provider value={api}>{children}</WizardContext.Provider>;
}

export function useWizardStore(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('WizardProvider ausente');
  return ctx;
}
