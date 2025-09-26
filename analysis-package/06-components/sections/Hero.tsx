// src/sections/Hero/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface HeroProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    primaryButton?: string;
    secondaryButton?: string;
    primaryButtonLink?: string;
    secondaryButtonLink?: string;
    primaryButtonIcon?: string;
    secondaryButtonIcon?: string;
    image?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    height?: string;
    layout?: string;
    animation?: string;
    caption?: string;
  };
  style: {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundOpacity?: number;
    backgroundGradient?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    buttonStyle?: TextStyle;
    captionStyle?: TextStyle;
    primaryButtonColor?: string;
    primaryButtonTextColor?: string;
    primaryButtonHoverColor?: string;
    secondaryButtonColor?: string;
    secondaryButtonTextColor?: string;
    secondaryButtonHoverColor?: string;
  };
}

export default function Hero({ content, style }: HeroProps) {
  const {
    title = "Título Principal",
    subtitle = "Subtítulo Impactante",
    description = "Descrição detalhada do que você oferece",
    primaryButton = "Botão Principal",
    secondaryButton = "Botão Secundário",
    primaryButtonLink = "#",
    secondaryButtonLink = "#",
    primaryButtonIcon,
    secondaryButtonIcon,
    image,
    backgroundImage,
    backgroundVideo,
    height = "100%",
    layout = "centralizado",
    animation = "entrada",
    caption
  } = content;

  const {
    backgroundColor = "transparent",
    backgroundOpacity = 0.8,
    backgroundGradient,
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    buttonStyle,
    captionStyle,
    primaryButtonColor = "#3b82f6",
    primaryButtonTextColor = "#ffffff",
    primaryButtonHoverColor = "#2563eb",
    secondaryButtonColor = "transparent",
    secondaryButtonTextColor = "#3b82f6",
    secondaryButtonHoverColor = "#f1f5f9"
  } = style;

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const buttonStyleResult = textStyleToStyle(buttonStyle || {});
  const captionStyleResult = textStyleToStyle(captionStyle || {});

  // Calcular altura
  const heightClass = height === "100%" ? "min-h-screen" : 
                     height === "70%" ? "min-h-[70vh]" : 
                     "min-h-[50vh]";

  // Layout
  const isCentered = layout === "centralizado";
  const isSideBySide = layout === "lado a lado";

  // Animação
  const animationClass = animation === "entrada" ? "animate-fade-in" :
                        animation === "parallax" ? "animate-parallax" :
                        animation === "rolagem" ? "animate-scroll" : "";

  return (
    <section 
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${animationClass}`}
      style={{
        backgroundColor: backgroundColor !== "transparent" ? backgroundColor : undefined,
        backgroundImage: backgroundGradient ? `linear-gradient(${backgroundGradient})` : undefined,
      }}
    >
      {/* Background Image/Video */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            style={{ opacity: backgroundOpacity }}
          />
        </div>
      )}

      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            style={{ opacity: backgroundOpacity }}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      {(backgroundImage || backgroundVideo) && (
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` 
          }}
        />
      )}

      {/* Content */}
      <div className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isCentered ? 'text-center' : ''}`}>
        <div className={`grid ${isSideBySide ? 'lg:grid-cols-2 gap-12 items-center' : 'grid-cols-1'} max-w-4xl ${isCentered ? 'mx-auto' : ''}`}>
          
          {/* Text Content */}
          <div className={`space-y-6 ${isSideBySide ? 'lg:order-1' : ''}`}>
            {/* Caption */}
            {caption && (
              <div 
                className={captionStyleResult.className}
                style={captionStyleResult.style}
              >
                {caption}
              </div>
            )}

            {/* Title */}
            <h1 
              className={titleStyleResult.className}
              style={titleStyleResult.style}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <h2 
              className={subtitleStyleResult.className}
              style={subtitleStyleResult.style}
            >
              {subtitle}
            </h2>

            {/* Description */}
            <p 
              className={descriptionStyleResult.className}
              style={descriptionStyleResult.style}
            >
              {description}
            </p>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isCentered ? 'justify-center' : 'justify-start'}`}>
              {primaryButton && (
                <a
                  href={primaryButtonLink}
                  className={`
                    inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${buttonStyleResult.className}
                    hover:scale-105 active:scale-95
                  `}
                  style={{
                    ...buttonStyleResult.style,
                    backgroundColor: primaryButtonColor,
                    color: primaryButtonTextColor,
                    '--hover-bg': primaryButtonHoverColor,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryButtonHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = primaryButtonColor;
                  }}
                >
                  {primaryButtonIcon && (
                    <span className="mr-2">{primaryButtonIcon}</span>
                  )}
                  {primaryButton}
                </a>
              )}

              {secondaryButton && (
                <a
                  href={secondaryButtonLink}
                  className={`
                    inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                    border-2 ${buttonStyleResult.className}
                    hover:scale-105 active:scale-95
                  `}
                  style={{
                    ...buttonStyleResult.style,
                    backgroundColor: secondaryButtonColor,
                    color: secondaryButtonTextColor,
                    borderColor: secondaryButtonTextColor,
                    '--hover-bg': secondaryButtonHoverColor,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = secondaryButtonHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = secondaryButtonColor;
                  }}
                >
                  {secondaryButtonIcon && (
                    <span className="mr-2">{secondaryButtonIcon}</span>
                  )}
                  {secondaryButton}
                </a>
              )}
            </div>
          </div>

          {/* Image */}
          {image && isSideBySide && (
            <div className={`lg:order-2 ${isCentered ? 'mt-8' : ''}`}>
              <div className="relative">
                <Image
                  src={image}
                  alt={title}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}


