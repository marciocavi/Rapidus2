// src/sections/Features/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface FeatureItem {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  link?: string;
}

interface FeaturesProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: FeatureItem[];
    columns?: number;
    displayType?: string; // grid, carrossel, lista
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    itemTitleStyle?: TextStyle;
    itemDescriptionStyle?: TextStyle;
    cardStyle?: string; // flat, elevated, outlined
    hoverEffect?: string; // scale, glow, shadow
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Features({ content, style }: FeaturesProps) {
  const {
    title = "Nossas Funcionalidades",
    subtitle = "Descubra o que nos torna únicos",
    description = "Explore as principais características que fazem a diferença",
    items = [
      {
        title: "Funcionalidade 1",
        description: "Descrição detalhada da primeira funcionalidade",
        icon: "🚀"
      },
      {
        title: "Funcionalidade 2", 
        description: "Descrição detalhada da segunda funcionalidade",
        icon: "⚡"
      },
      {
        title: "Funcionalidade 3",
        description: "Descrição detalhada da terceira funcionalidade", 
        icon: "🎯"
      }
    ],
    columns = 3,
    displayType = "grid"
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    itemTitleStyle,
    itemDescriptionStyle,
    cardStyle = "elevated",
    hoverEffect = "scale",
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const itemTitleStyleResult = textStyleToStyle(itemTitleStyle || {});
  const itemDescriptionStyleResult = textStyleToStyle(itemDescriptionStyle || {});

  // Classes de grid responsivo
  const getGridClasses = () => {
    const baseClasses = "grid gap-6";
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    };
    return `${baseClasses} ${columnClasses[columns as keyof typeof columnClasses] || columnClasses[3]}`;
  };

  // Classes de card
  const getCardClasses = () => {
    const baseClasses = "p-6 rounded-lg transition-all duration-300";
    const styleClasses = {
      flat: "bg-slate-800/50 border border-slate-700",
      elevated: "bg-slate-800/80 shadow-lg border border-slate-700/50",
      outlined: "bg-transparent border-2 border-slate-600"
    };
    const hoverClasses = {
      scale: "hover:scale-105",
      glow: "hover:shadow-xl hover:shadow-blue-500/20",
      shadow: "hover:shadow-2xl"
    };
    return `${baseClasses} ${styleClasses[cardStyle as keyof typeof styleClasses] || styleClasses.elevated} ${hoverClasses[hoverEffect as keyof typeof hoverClasses] || hoverClasses.scale}`;
  };

  // Animação
  const getAnimationClass = () => {
    const animations = {
      fade: "animate-fade-in",
      slide: "animate-slide-up",
      bounce: "animate-bounce-in"
    };
    return animations[animationType as keyof typeof animations] || animations.fade;
  };

  return (
    <section 
      className={`py-16 ${backgroundColor !== 'transparent' ? 'bg-opacity-90' : ''}`}
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <h2 
              className={subtitleStyleResult.className}
              style={subtitleStyleResult.style}
            >
              {subtitle}
            </h2>
          )}
          
          <h1 
            className={titleStyleResult.className}
            style={titleStyleResult.style}
          >
            {title}
          </h1>
          
          {description && (
            <p 
              className={descriptionStyleResult.className}
              style={descriptionStyleResult.style}
            >
              {description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className={getGridClasses()}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${getCardClasses()} ${getAnimationClass()}`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration
              }}
            >
              {/* Icon/Image */}
              <div className="mb-4">
                {item.image ? (
                  <div className="relative w-16 h-16 mb-4">
                    <Image
                      src={item.image}
                      alt={item.title || 'Feature'}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : item.icon ? (
                  <div className="text-4xl mb-4">{item.icon}</div>
                ) : (
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl text-white">⚡</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 
                  className={itemTitleStyleResult.className}
                  style={itemTitleStyleResult.style}
                >
                  {item.title}
                </h3>
                
                <p 
                  className={itemDescriptionStyleResult.className}
                  style={itemDescriptionStyleResult.style}
                >
                  {item.description}
                </p>

                {/* Link */}
                {item.link && (
                  <a
                    href={item.link}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  >
                    Saiba mais
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Display Type: Lista */}
        {displayType === "lista" && (
          <div className="mt-12">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg ${getCardClasses()}`}
                >
                  <div className="flex-shrink-0">
                    {item.image ? (
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.image}
                          alt={item.title || 'Feature'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : item.icon ? (
                      <div className="text-2xl">{item.icon}</div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-lg text-white">⚡</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 
                      className={itemTitleStyleResult.className}
                      style={itemTitleStyleResult.style}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className={itemDescriptionStyleResult.className}
                      style={itemDescriptionStyleResult.style}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


