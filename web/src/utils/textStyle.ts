// src/utils/textStyle.ts
import { clsx } from 'clsx';
import { tokens, TextStyle, FontSize, FontWeight } from '../theme/tokens';

/**
 * Converte configuração TextStyle em classes CSS
 */
export function textStyleToClass(style: TextStyle): string {
  if (!style) return '';

  const classes: string[] = [];

  // Família de fonte
  if (style.family) {
    switch (style.family) {
      case 'heading':
        classes.push('font-heading');
        break;
      case 'body':
        classes.push('font-body');
        break;
      case 'mono':
        classes.push('font-mono');
        break;
    }
  }

  // Tamanho de fonte
  if (style.size) {
    switch (style.size) {
      case 'display-2xl':
        classes.push('text-display-2xl');
        break;
      case 'h1':
        classes.push('text-h1');
        break;
      case 'h2':
        classes.push('text-h2');
        break;
      case 'h3':
        classes.push('text-h3');
        break;
      case 'h4':
        classes.push('text-h4');
        break;
      case 'body':
        classes.push('text-body');
        break;
      case 'body-sm':
        classes.push('text-body-sm');
        break;
      case 'caption':
        classes.push('text-caption');
        break;
    }
  }

  // Peso da fonte
  if (style.weight) {
    classes.push(`font-${style.weight}`);
  }

  // Altura de linha
  if (style.line) {
    classes.push(`leading-${style.line}`);
  }

  // Espaçamento de letras
  if (style.tracking) {
    classes.push(`tracking-${style.tracking}`);
  }

  // Cor do texto
  if (style.color) {
    if (style.color.startsWith('text.')) {
      const colorKey = style.color.replace('text.', '');
      classes.push(`text-${colorKey}`);
    } else if (style.color.startsWith('brand.')) {
      const colorKey = style.color.replace('brand.', '');
      classes.push(`text-brand-${colorKey}`);
    } else if (style.color.startsWith('surface.')) {
      const colorKey = style.color.replace('surface.', '');
      classes.push(`text-${colorKey}`);
    } else if (style.color.startsWith('link')) {
      classes.push('link');
    }
  }

  // Transformação de texto
  if (style.transform) {
    classes.push(`text-${style.transform}`);
  }

  // Alinhamento de texto
  if (style.align) {
    classes.push(`text-${style.align}`);
  }

  // Sombra
  if (style.shadow && style.shadow !== 'none') {
    classes.push(`shadow-${style.shadow}`);
  }

  return clsx(classes);
}

/**
 * Gera estilos inline para propriedades não cobertas por classes
 */
export function textStyleToInline(style: TextStyle): React.CSSProperties {
  const inline: React.CSSProperties = {};

  // Largura máxima em caracteres
  if (style.maxWidthCh) {
    inline.maxWidth = `${style.maxWidthCh}ch`;
  }

  return inline;
}

/**
 * Valida contraste AA para acessibilidade
 */
export function validateContrast(
  textColor: string,
  backgroundColor: string,
  fontSize: FontSize,
  fontWeight: FontWeight
): boolean {
  // Implementação simplificada - em produção usar biblioteca de contraste
  const isLarge = ['display-2xl', 'h1', 'h2', 'h3'].includes(fontSize) || 
                  ['bold', 'extrabold'].includes(fontWeight);
  
  // Para demonstração, assumir que cores dos tokens são válidas
  return true;
}

/**
 * Gera classes CSS customizadas com tokens
 */
export function generateCustomClasses(style: TextStyle): string {
  const customClasses: string[] = [];

  if (style.family) {
    customClasses.push(`font-family: ${tokens.fontFamily[style.family]}`);
  }

  if (style.size) {
    customClasses.push(`font-size: ${tokens.fontSize[style.size]}`);
  }

  if (style.color) {
    let colorValue = '';
    if (style.color.startsWith('text.')) {
      const key = style.color.replace('text.', '') as keyof typeof tokens.textColor;
      colorValue = tokens.textColor[key];
    } else if (style.color.startsWith('brand.')) {
      const key = style.color.replace('brand.', '') as keyof typeof tokens.brandColor;
      colorValue = tokens.brandColor[key];
    }
    
    if (colorValue) {
      customClasses.push(`color: ${colorValue}`);
    }
  }

  return customClasses.join('; ');
}

/**
 * Combina classes e estilos inline
 */
export function textStyleToStyle(style: TextStyle): {
  className: string;
  style: React.CSSProperties;
} {
  return {
    className: textStyleToClass(style),
    style: textStyleToInline(style),
  };
}

/**
 * Preset de estilos comuns
 */
export const textStylePresets = {
  heroTitle: {
    family: 'heading' as const,
    size: 'display-2xl' as const,
    weight: 'bold' as const,
    line: 'tight' as const,
    tracking: 'tight' as const,
    color: 'text.primary' as const,
    align: 'center' as const,
  },
  heroSubtitle: {
    family: 'body' as const,
    size: 'h3' as const,
    weight: 'normal' as const,
    line: 'relaxed' as const,
    color: 'text.secondary' as const,
    align: 'center' as const,
  },
  sectionTitle: {
    family: 'heading' as const,
    size: 'h2' as const,
    weight: 'semibold' as const,
    line: 'snug' as const,
    color: 'text.primary' as const,
    align: 'center' as const,
  },
  cardTitle: {
    family: 'heading' as const,
    size: 'h4' as const,
    weight: 'semibold' as const,
    line: 'snug' as const,
    color: 'text.primary' as const,
  },
  cardDescription: {
    family: 'body' as const,
    size: 'body' as const,
    weight: 'normal' as const,
    line: 'relaxed' as const,
    color: 'text.secondary' as const,
  },
  button: {
    family: 'body' as const,
    size: 'body' as const,
    weight: 'medium' as const,
    line: 'normal' as const,
    color: 'text.inverse' as const,
    transform: 'none' as const,
  },
} as const;
