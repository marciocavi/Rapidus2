import type { Palette } from '../_state/wizardStore';

export function derivePalettesFromPrimary(primary: string): Palette[] {
  // Mock simples: retorna variações do primary
  return [
    { primary, secondary: '#374151', accent: '#2563eb', neutral: '#9ca3af', background: '#ffffff' },
    { primary, secondary: '#1f2937', accent: '#10b981', neutral: '#6b7280', background: '#0f172a' },
    { primary, secondary: '#111827', accent: '#e11d48', neutral: '#94a3b8', background: '#f8fafc' },
  ];
}



