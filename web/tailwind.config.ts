import type { Config } from 'tailwindcss';

import { colors, typography, spacing, motion, zIndex } from './src/lib/tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Design Tokens - Cores
      colors: {
        // Brand Colors
        brand: colors.brand,
        
        // Neutral Colors (modo claro/escuro)
        neutral: {
          ...colors.neutral.light,
          dark: colors.neutral.dark,
        },
        
        // Feedback Colors
        feedback: colors.feedback,
        
        // Acentos cromáticos
        accent: {
          violet: colors.accent.violet,
          cyan: colors.accent.cyan,
          lime: colors.accent.lime,
          amber: colors.accent.amber,
          pink: colors.accent.pink,
          teal: colors.accent.teal,
        },
        
        // Semantic Colors
        semantic: colors.semantic,
        
        // Charts Colors
        charts: colors.charts as any,
      },

      // Design Tokens - Tipografia
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight as any,
      lineHeight: typography.lineHeight as any,
      letterSpacing: typography.letterSpacing,

      // Design Tokens - Espaçamento
      spacing: spacing.scale,
      borderRadius: spacing.borderRadius,
      boxShadow: spacing.boxShadow,

      // Design Tokens - Motion
      transitionDuration: {
        fast: motion.duration.fast,
        normal: motion.duration.normal,
        slow: motion.duration.slow,
        slower: motion.duration.slower,
      },
      transitionTimingFunction: {
        standard: motion.easing.standard,
        emphasized: motion.easing.emphasized,
        deEmphasized: motion.easing.deEmphasized,
        bounce: motion.easing.bounce,
      },

      // Design Tokens - Z-Index
      zIndex: zIndex as any,

      // Grid System
      maxWidth: {
        container: spacing.grid.container.maxWidth,
      },
      padding: {
        container: spacing.grid.container.padding,
      },

      // Breakpoints
      screens: spacing.breakpoints,

      // Custom Animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 0 2px rgba(124, 92, 252, 0.25)' },
          '50%': { boxShadow: '0 0 0 4px rgba(124, 92, 252, 0.4)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.15s ease-out',
        'slide-up': 'slide-up 0.15s ease-out',
        'slide-down': 'slide-down 0.15s ease-out',
        'scale-in': 'scale-in 0.15s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },

      // Component-specific tokens
      height: {
        'button-sm': '32px',
        'button-md': '40px',
        'button-lg': '48px',
        'input': '40px',
      },
    },
  },
  plugins: [
    // Plugin para utilities customizadas
    function({ addUtilities, theme }: { addUtilities: (utilities: Record<string, any>) => void; theme: (path: string) => unknown }) {
      const newUtilities = {
        '.focus-ring': {
          outline: '2px solid transparent',
          outlineOffset: '2px',
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.semantic.primary')}`,
            outlineOffset: '2px',
          },
        },
        // Glass effects disabled to remove translucent layers
        // '.glass': {
        //   background: 'rgba(255, 255, 255, 0.1)',
        //   backdropFilter: 'blur(10px)',
        //   border: '1px solid rgba(255, 255, 255, 0.2)',
        // },
        // '.glass-dark': {
        //   background: 'rgba(15, 23, 42, 0.8)',
        //   backdropFilter: 'blur(10px)',
        //   border: '1px solid rgba(30, 41, 59, 0.3)',
        // },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient-brand': {
          background: `linear-gradient(135deg, ${theme('colors.brand.primary')} 0%, ${theme('colors.accent.violet.base')} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;

