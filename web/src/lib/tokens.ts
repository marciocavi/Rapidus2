/**
 * Design Tokens - Fonte Única da Verdade
 * Rapidus Design System v0.1
 * 
 * Objetivo: padronizar visual, UX e IX do site Rapidus e painel admin
 */

// ============================================================================
// 1. CORES
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    primary: "#4F46E5", // Indigo 600
    primaryHover: "#4338CA", // Indigo 700
    primaryMuted: "#EEF2FF", // Indigo 50
  },

  // Neutrals (modo claro/escuro)
  neutral: {
    // Modo claro
    light: {
      bg: "#FFFFFF",
      surface: "#F8FAFC", // Slate 50
      surfaceAlt: "#F1F5F9", // Slate 100
      onSurfaceHigh: "#0F172A", // Slate 900
      onSurface: "#334155", // Slate 700
      onSurfaceLow: "#64748B", // Slate 500
      border: "#E2E8F0", // Slate 200
      overlay: "#0F172A80", // Slate 900 com 50% opacidade
    },
    // Modo escuro
    dark: {
      bg: "#0B1020", // fundo escuro sutil para hero (site)
      surface: "#0F172A", // cards escuros (slate-900)
      surfaceAlt: "#111624", // barras/headers
      onSurfaceHigh: "#E8EEF7", // texto alto contraste
      onSurface: "#C6D1E4", // texto padrão
      onSurfaceLow: "#8FA3C1", // texto secundário
      border: "#1A2233", // bordas/divisores
      overlay: "#0C0F16CC", // scrim (80%)
    }
  },

  // Feedback Colors
  feedback: {
    success: "#16A34A", // Green 600
    successHover: "#15803D", // Green 700
    successMuted: "#DCFCE7", // Green 100
    warning: "#F59E0B", // Amber 500
    warningHover: "#D97706", // Amber 600
    warningMuted: "#FEF3C7", // Amber 100
    danger: "#DC2626", // Red 600
    dangerHover: "#B91C1C", // Red 700
    dangerMuted: "#FEE2E2", // Red 100
    info: "#0284C7", // Sky 600
    infoHover: "#0369A1", // Sky 700
    infoMuted: "#E0F2FE", // Sky 100
  },

  // Acentos cromáticos (admin dark theme)
  accent: {
    violet: { base: "#7C5CFC", hover: "#6A4AE6", muted: "#2A2151" },
    cyan: { base: "#22D3EE", hover: "#06B6D4", muted: "#0B2A33" },
    lime: { base: "#A3E635", hover: "#84CC16", muted: "#1F2A0F" },
    amber: { base: "#F59E0B", hover: "#D97706", muted: "#2F2208" },
    pink: { base: "#FB7185", hover: "#F43F5E", muted: "#2D0F17" },
    teal: { base: "#14B8A6", hover: "#0D9488", muted: "#0D2724" },
  },

  // Tokens semânticos (mapeiam para acentos)
  semantic: {
    brand: "#4F46E5",
    primary: "#7C5CFC", // violet base
    primaryHover: "#6A4AE6",
    primaryMuted: "#2A2151",
    secondary: "#14B8A6", // teal base
    secondaryHover: "#0D9488",
    secondaryMuted: "#0D2724",
    info: { base: "#38BDF8", hover: "#0EA5E9", muted: "#082636" },
    success: { base: "#22C55E", hover: "#16A34A", muted: "#0E2A1A" },
    warning: { base: "#F59E0B", hover: "#D97706", muted: "#2F2208" },
    danger: { base: "#EF4444", hover: "#DC2626", muted: "#2A0E0E" },
  },

  // Paleta de gráficos (DataViz, daltônica-amigável)
  charts: {
    categorical: [
      "#7C5CFC", "#22D3EE", "#A3E635", "#F59E0B", 
      "#FB7185", "#14B8A6", "#F472B6", "#60A5FA", 
      "#FCD34D", "#34D399"
    ],
    sequentialBlue: ["#0B1220", "#0E1C34", "#123055", "#205C8E", "#3B82F6"],
    diverging: ["#DC2626", "#F59E0B", "#22C55E"],
  }
};

// ============================================================================
// 2. TIPOGRAFIA
// ============================================================================

export const typography = {
  // Família de fontes
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "Consolas", "monospace"],
  },

  // Escala modular
  fontSize: {
    xs: "12px",    // 0.75rem
    sm: "14px",    // 0.875rem
    base: "16px",  // 1rem
    lg: "18px",    // 1.125rem
    xl: "20px",    // 1.25rem
    "2xl": "24px", // 1.5rem
    "3xl": "30px", // 1.875rem
    "4xl": "36px", // 2.25rem
    "5xl": "48px", // 3rem
    "6xl": "60px", // 3.75rem
    "7xl": "72px", // 4.5rem
  },

  // Pesos
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  }
};

// ============================================================================
// 3. ESPAÇAMENTO & LAYOUT
// ============================================================================

export const spacing = {
  // Escala 4px
  scale: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
    32: "128px",
  },

  // Radii
  borderRadius: {
    none: "0px",
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    full: "9999px",
  },

  // Sombras
  boxShadow: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    glow: "0 0 0 2px rgba(124, 92, 252, 0.25)", // violet glow
  },

  // Grid
  grid: {
    container: {
      maxWidth: "1280px",
      padding: "24px",
    },
    columns: {
      mobile: 4,
      tablet: 6,
      desktop: 12,
    },
    gutter: "24px",
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  }
};

// ============================================================================
// 4. MOTION
// ============================================================================

export const motion = {
  // Durações
  duration: {
    fast: "80ms",      // hover/focus
    normal: "150ms",    // enter/exit
    slow: "250ms",      // complex animations
    slower: "400ms",    // page transitions
  },

  // Curvas de easing
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    deEmphasized: "cubic-bezier(0, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Presets de animação
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    slideDown: {
      from: { opacity: 0, transform: "translateY(-20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    scaleIn: {
      from: { opacity: 0, transform: "scale(0.95)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
  }
};

// ============================================================================
// 5. Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// ============================================================================
// 6. COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  button: {
    height: {
      sm: "32px",
      md: "40px",
      lg: "48px",
    },
    padding: {
      sm: "8px 16px",
      md: "12px 24px",
      lg: "16px 32px",
    },
  },
  
  input: {
    height: "40px",
    padding: "12px 16px",
    borderRadius: spacing.borderRadius.md,
  },

  card: {
    padding: "24px",
    borderRadius: spacing.borderRadius.lg,
    shadow: spacing.boxShadow.sm,
  },

  modal: {
    maxWidth: "500px",
    borderRadius: spacing.borderRadius.xl,
    shadow: spacing.boxShadow.xl,
  }
};

// ============================================================================
// 7. UTILITIES
// ============================================================================

// Função para obter cor baseada no tema
export const getThemeColor = (colorPath: string, theme: 'light' | 'dark' = 'dark') => {
  const path = colorPath.split('.');
  let color: Record<string, unknown> = colors;
  
  for (const key of path) {
    if (key === 'neutral' && theme) {
      color = color[key][theme];
    } else {
      color = color[key];
    }
  }
  
  return color;
};

// Função para gerar CSS custom properties
export const generateCSSVariables = (theme: 'light' | 'dark' = 'dark') => {
  const vars: Record<string, string> = {};
  
  // Neutral colors
  Object.entries(colors.neutral[theme]).forEach(([key, value]) => {
    vars[`--color-neutral-${key}`] = value;
  });
  
  // Brand colors
  Object.entries(colors.brand).forEach(([key, value]) => {
    vars[`--color-brand-${key}`] = value;
  });
  
  // Feedback colors
  Object.entries(colors.feedback).forEach(([key, value]) => {
    vars[`--color-feedback-${key}`] = value;
  });
  
  // Semantic colors
  Object.entries(colors.semantic).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        vars[`--color-semantic-${key}-${subKey}`] = subValue;
      });
    } else {
      vars[`--color-semantic-${key}`] = value;
    }
  });
  
  return vars;
};

// Export default para facilitar importação
const designTokens = {
  colors,
  typography,
  spacing,
  motion,
  zIndex,
  components,
  getThemeColor,
  generateCSSVariables,
};

export default designTokens;
