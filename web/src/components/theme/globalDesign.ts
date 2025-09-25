export type GlobalDesignTokens = {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  radius: number;
  spacing: number;
};

const STORE_KEY = 'global-design-tokens';

export function loadGlobalDesign(): GlobalDesignTokens | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as GlobalDesignTokens) : null;
  } catch {
    return null;
  }
}

export function saveGlobalDesign(tokens: GlobalDesignTokens) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(tokens));
  } catch {}
}

export function defaultGlobalDesign(): GlobalDesignTokens {
  return {
    colors: { background: '#0a0a0a', foreground: '#ffffff', primary: '#2E6BD6', secondary: '#2AAA48' },
    fonts: { heading: 'Montserrat', body: 'Inter' },
    radius: 12,
    spacing: 96,
  };
}



