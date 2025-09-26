// src/sections/Services/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface ServiceItem {
  title?: string;
  description?: string;
  price?: string;
  link?: string;
  icon?: string;
  image?: string;
  featured?: boolean;
}

interface ServicesProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: ServiceItem[];
    columns?: number;
    displayType?: string; // cards, lista, slider
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    itemTitleStyle?: TextStyle;
    itemDescriptionStyle?: TextStyle;
    priceStyle?: TextStyle;
    cardStyle?: string; // flat, elevated, outlined
    hoverEffect?: string; // scale, glow, shadow
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Services({ content, style }: ServicesProps) {
  const {
    title = "Nossos Serviços",
    subtitle = "Soluções completas para você",
    description = "Conheça nossos serviços e escolha o que melhor atende suas necessidades",
    items = [
      {
        title: "Serviço Básico",
        description: "Descrição do serviço básico com todas as funcionalidades essenciais",
        price: "R$ 99/mês",
        icon: "🚀"
      },
      {
        title: "Serviço Premium",
        description: "Descrição do serviço premium com funcionalidades avançadas",
        price: "R$ 199/mês",
        icon: "⭐",
        featured: true
      },
      {
        title: "Serviço Enterprise",
        description: "Descrição do serviço enterprise para grandes empresas",
        price: "R$ 499/mês",
        icon: "🏢"
      }
    ],
    columns = 3,
    displayType = "cards"
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    itemTitleStyle,
    itemDescriptionStyle,
    priceStyle,
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
  const priceStyleResult = textStyleToStyle(priceStyle || {});

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
  const getCardClasses = (featured = false) => {
    const baseClasses = "p-6 rounded-lg transition-all duration-300 relative";
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
    const featuredClasses = featured ? "ring-2 ring-blue-500 ring-opacity-50" : "";
    return `${baseClasses} ${styleClasses[cardStyle as keyof typeof styleClasses] || styleClasses.elevated} ${hoverClasses[hoverEffect as keyof typeof hoverClasses] || hoverClasses.scale} ${featuredClasses}`;
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

        {/* Services Grid */}
        {displayType === "cards" && (
          <div className={getGridClasses()}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`${getCardClasses(item.featured)} ${getAnimationClass()}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration
                }}
              >
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                {/* Icon/Image */}
                <div className="mb-4">
                  {item.image ? (
                    <div className="relative w-16 h-16 mb-4">
                      <Image
                        src={item.image}
                        alt={item.title || 'Service'}
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

                  {/* Price */}
                  {item.price && (
                    <div 
                      className={priceStyleResult.className}
                      style={priceStyleResult.style}
                    >
                      {item.price}
                    </div>
                  )}

                  {/* Link */}
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                    >
                      Contratar
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display Type: Lista */}
        {displayType === "lista" && (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 p-4 rounded-lg ${getCardClasses(item.featured)}`}
              >
                <div className="flex-shrink-0">
                  {item.image ? (
                    <div className="relative w-12 h-12">
                      <Image
                        src={item.image}
                        alt={item.title || 'Service'}
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 
                      className={itemTitleStyleResult.className}
                      style={itemTitleStyleResult.style}
                    >
                      {item.title}
                    </h3>
                    {item.price && (
                      <span 
                        className={priceStyleResult.className}
                        style={priceStyleResult.style}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p 
                    className={itemDescriptionStyleResult.className}
                    style={itemDescriptionStyleResult.style}
                  >
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium mt-2"
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
        )}

        {/* Display Type: Slider */}
        {displayType === "slider" && (
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 ${getCardClasses(item.featured)} ${getAnimationClass()}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration
                  }}
                >
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  {/* Icon/Image */}
                  <div className="mb-4">
                    {item.image ? (
                      <div className="relative w-16 h-16 mb-4">
                        <Image
                          src={item.image}
                          alt={item.title || 'Service'}
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

                    {/* Price */}
                    {item.price && (
                      <div 
                        className={priceStyleResult.className}
                        style={priceStyleResult.style}
                      >
                        {item.price}
                      </div>
                    )}

                    {/* Link */}
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Contratar
                      </a>
                    )}
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


