// src/sections/Stats/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface StatItem {
  title?: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  abbreviation?: string; // K, M, B
  description?: string;
  tag?: string;
  isNumeric?: boolean;
}

interface StatsProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: StatItem[];
    columns?: number;
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    statValueStyle?: TextStyle;
    statTitleStyle?: TextStyle;
    statDescriptionStyle?: TextStyle;
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Stats({ content, style }: StatsProps) {
  const {
    title = "Nossos Números",
    subtitle = "Resultados que falam por si",
    description = "Conheça os números que comprovam nosso sucesso",
    items = [
      {
        title: "Clientes Satisfeitos",
        value: 1000,
        suffix: "+",
        description: "Clientes ativos",
        isNumeric: true
      },
      {
        title: "Projetos Entregues",
        value: 500,
        suffix: "+",
        description: "Projetos concluídos",
        isNumeric: true
      },
      {
        title: "Anos de Experiência",
        value: 5,
        suffix: "+",
        description: "No mercado",
        isNumeric: true
      },
      {
        title: "Satisfação",
        value: 98,
        suffix: "%",
        description: "Taxa de satisfação",
        isNumeric: true
      }
    ],
    columns = 4
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    statValueStyle,
    statTitleStyle,
    statDescriptionStyle,
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  const [animatedValues, setAnimatedValues] = useState<Record<number, number>>({});

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const statValueStyleResult = textStyleToStyle(statValueStyle || {});
  const statTitleStyleResult = textStyleToStyle(statTitleStyle || {});
  const statDescriptionStyleResult = textStyleToStyle(statDescriptionStyle || {});

  // Classes de grid responsivo
  const getGridClasses = () => {
    const baseClasses = "grid gap-6";
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    };
    return `${baseClasses} ${columnClasses[columns as keyof typeof columnClasses] || columnClasses[4]}`;
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

  // Animação de contador
  useEffect(() => {
    const animateCounters = () => {
      items.forEach((item, index) => {
        if (item.isNumeric && typeof item.value === 'number') {
          const startValue = 0;
          const endValue = item.value;
          const duration = 2000; // 2 segundos
          const increment = endValue / (duration / 16); // 60fps
          
          let currentValue = startValue;
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= endValue) {
              currentValue = endValue;
              clearInterval(timer);
            }
            setAnimatedValues(prev => ({ ...prev, [index]: Math.floor(currentValue) }));
          }, 16);
        }
      });
    };

    // Iniciar animação após um pequeno delay
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [items]);

  // Formatar valor
  const formatValue = (item: StatItem, index: number) => {
    if (item.isNumeric && typeof item.value === 'number') {
      const animatedValue = animatedValues[index] ?? 0;
      let formattedValue = animatedValue.toString();
      
      // Aplicar abreviação
      if (item.abbreviation) {
        const abbreviations = {
          'K': 1000,
          'M': 1000000,
          'B': 1000000000
        };
        const divisor = abbreviations[item.abbreviation as keyof typeof abbreviations];
        if (divisor && animatedValue >= divisor) {
          formattedValue = (animatedValue / divisor).toFixed(item.decimals || 1);
        }
      }
      
      return `${item.prefix || ''}${formattedValue}${item.suffix || ''}`;
    }
    
    return `${item.prefix || ''}${item.value}${item.suffix || ''}`;
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

        {/* Stats Grid */}
        <div className={getGridClasses()}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`text-center ${getAnimationClass()}`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration
              }}
            >
              {/* Tag */}
              {item.tag && (
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                    {item.tag}
                  </span>
                </div>
              )}

              {/* Value */}
              <div 
                className={statValueStyleResult.className}
                style={statValueStyleResult.style}
              >
                {formatValue(item, index)}
              </div>

              {/* Title */}
              <h3 
                className={statTitleStyleResult.className}
                style={statTitleStyleResult.style}
              >
                {item.title}
              </h3>

              {/* Description */}
              {item.description && (
                <p 
                  className={statDescriptionStyleResult.className}
                  style={statDescriptionStyleResult.style}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


