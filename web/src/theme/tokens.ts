// src/theme/tokens.ts
export const tokens = {
  // Famílias de fontes
  fontFamily: {
    heading: 'var(--ff-heading)',
    body: 'var(--ff-body)',
    mono: 'var(--ff-mono)',
  },

  // Tamanhos de fonte
  fontSize: {
    'display-2xl': 'var(--fs-display-2xl)',
    'h1': 'var(--fs-h1)',
    'h2': 'var(--fs-h2)',
    'h3': 'var(--fs-h3)',
    'h4': 'var(--fs-h4)',
    'body': 'var(--fs-body)',
    'body-sm': 'var(--fs-body-sm)',
    'caption': 'var(--fs-caption)',
  },

  // Pesos de fonte
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Altura de linha
  lineHeight: {
    tight: '1.1',
    snug: '1.2',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.8',
  },

  // Espaçamento de letras
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Cores de texto
  textColor: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    inverse: 'var(--color-text-inverse)',
  },

  // Cores de marca
  brandColor: {
    primary: 'var(--color-brand-primary)',
    accent: 'var(--color-brand-accent)',
    secondary: 'var(--color-brand-secondary)',
  },

  // Cores de superfície
  surfaceColor: {
    base: 'var(--color-surface-base)',
    elevated: 'var(--color-surface-elevated)',
    overlay: 'var(--color-surface-overlay)',
  },

  // Cores de link
  linkColor: {
    default: 'var(--color-link)',
    hover: 'var(--color-link-hover)',
    active: 'var(--color-link-active)',
  },

  // Sombras
  shadow: {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },

  // Transformações de texto
  textTransform: {
    none: 'none',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  },

  // Alinhamento de texto
  textAlign: {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify',
  },
} as const;

// Tipos TypeScript
export type FontFamily = keyof typeof tokens.fontFamily;
export type FontSize = keyof typeof tokens.fontSize;
export type FontWeight = keyof typeof tokens.fontWeight;
export type LineHeight = keyof typeof tokens.lineHeight;
export type LetterSpacing = keyof typeof tokens.letterSpacing;
export type TextColor = keyof typeof tokens.textColor;
export type BrandColor = keyof typeof tokens.brandColor;
export type SurfaceColor = keyof typeof tokens.surfaceColor;
export type LinkColor = keyof typeof tokens.linkColor;
export type Shadow = keyof typeof tokens.shadow;
export type TextTransform = keyof typeof tokens.textTransform;
export type TextAlign = keyof typeof tokens.textAlign;

// Interface para configuração de estilo de texto
export interface TextStyle {
  family?: FontFamily;
  size?: FontSize;
  weight?: FontWeight;
  line?: LineHeight;
  tracking?: LetterSpacing;
  color?: TextColor | BrandColor | SurfaceColor | LinkColor | string;
  transform?: TextTransform;
  align?: TextAlign;
  maxWidthCh?: number;
  shadow?: Shadow;
}

// Validação de contraste AA
export const contrastRatios = {
  normal: 4.5,
  large: 3.0,
} as const;

export function getContrastLevel(fontSize: FontSize, fontWeight: FontWeight): number {
  const isLarge = ['display-2xl', 'h1', 'h2', 'h3'].includes(fontSize) || 
                  ['bold', 'extrabold'].includes(fontWeight);
  return isLarge ? contrastRatios.large : contrastRatios.normal;
}
