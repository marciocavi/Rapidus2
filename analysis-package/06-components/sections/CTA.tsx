// src/sections/CTA/index.tsx
'use client';

import React from 'react';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface CTAProps {
  content: {
    headline?: string;
    subheadline?: string;
    button?: string;
    buttonLink?: string;
    buttonIcon?: string;
    layout?: string; // full-width, box
    backgroundType?: string; // color, gradient, image
  };
  style: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundGradient?: string;
    headlineStyle?: TextStyle;
    subheadlineStyle?: TextStyle;
    buttonStyle?: TextStyle;
    animationType?: string; // none, shine, pulse, bounce
    animationDuration?: string;
  };
}

export default function CTA({ content, style }: CTAProps) {
  const {
    headline = "Pronto para começar?",
    subheadline = "Transforme sua ideia em realidade hoje mesmo",
    button = "Começar Agora",
    buttonLink = "#",
    buttonIcon = "🚀",
    layout = "full-width",
    backgroundType = "gradient"
  } = content;

  const {
    backgroundColor = "#1e40af",
    backgroundImage,
    backgroundGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    headlineStyle,
    subheadlineStyle,
    buttonStyle,
    animationType = "shine",
    animationDuration = "2s"
  } = style;

  // Aplicar estilos de texto
  const headlineStyleResult = textStyleToStyle(headlineStyle || {});
  const subheadlineStyleResult = textStyleToStyle(subheadlineStyle || {});
  const buttonStyleResult = textStyleToStyle(buttonStyle || {});

  // Classes de layout
  const getLayoutClasses = () => {
    return layout === "full-width" 
      ? "w-full" 
      : "max-w-4xl mx-auto rounded-2xl";
  };

  // Estilo de fundo
  const getBackgroundStyle = () => {
    if (backgroundType === "image" && backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    } else if (backgroundType === "gradient" && backgroundGradient) {
      return {
        background: backgroundGradient
      };
    } else {
      return {
        backgroundColor
      };
    }
  };

  // Classes de animação do botão
  const getButtonAnimationClasses = () => {
    const animations = {
      none: "",
      shine: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shine",
      pulse: "animate-pulse",
      bounce: "hover:animate-bounce"
    };
    return animations[animationType as keyof typeof animations] || animations.shine;
  };

  return (
    <section 
      className={`py-16 ${getLayoutClasses()}`}
      style={getBackgroundStyle()}
    >
      {/* Overlay para melhorar legibilidade */}
      {(backgroundType === "image" || backgroundType === "gradient") && (
        <div className="absolute inset-0 bg-black/20"></div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Headline */}
          <h2 
            className={`${headlineStyleResult.className} mb-4`}
            style={headlineStyleResult.style}
          >
            {headline}
          </h2>

          {/* Subheadline */}
          {subheadline && (
            <p 
              className={`${subheadlineStyleResult.className} mb-8 max-w-2xl mx-auto`}
              style={subheadlineStyleResult.style}
            >
              {subheadline}
            </p>
          )}

          {/* Button */}
          <div className="flex justify-center">
            <a
              href={buttonLink}
              className={`
                inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300
                ${buttonStyleResult.className}
                ${getButtonAnimationClasses()}
                hover:scale-105 active:scale-95
                bg-white text-gray-900 hover:bg-gray-100
                shadow-lg hover:shadow-xl
              `}
              style={{
                ...buttonStyleResult.style,
                animationDuration
              }}
            >
              {buttonIcon && (
                <span className="mr-2 text-lg">{buttonIcon}</span>
              )}
              {button}
            </a>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animações */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine ${animationDuration} ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}


