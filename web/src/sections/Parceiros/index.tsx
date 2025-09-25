// src/sections/Parceiros/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface PartnerItem {
  logo?: string;
  link?: string;
  caption?: string;
  name?: string;
}

interface ParceirosProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: PartnerItem[];
    displayType?: string; // carrossel, grid
    uniformSize?: boolean;
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    captionStyle?: TextStyle;
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Parceiros({ content, style }: ParceirosProps) {
  const {
    title = "Nossos Parceiros",
    subtitle = "Empresas que confiam em nós",
    description = "Conheça as empresas que fazem parte da nossa rede de parceiros",
    items = [
      { logo: "/placeholder-logo.png", name: "Parceiro 1", link: "#" },
      { logo: "/placeholder-logo.png", name: "Parceiro 2", link: "#" },
      { logo: "/placeholder-logo.png", name: "Parceiro 3", link: "#" },
      { logo: "/placeholder-logo.png", name: "Parceiro 4", link: "#" },
      { logo: "/placeholder-logo.png", name: "Parceiro 5", link: "#" },
      { logo: "/placeholder-logo.png", name: "Parceiro 6", link: "#" }
    ],
    displayType = "grid",
    uniformSize = true
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    captionStyle,
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const captionStyleResult = textStyleToStyle(captionStyle || {});

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

        {/* Partners Grid */}
        {displayType === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {items.map((item, index) => (
              <div
                key={index}
                className={`${getAnimationClass()} group`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration
                }}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                    aria-label={`Visitar site do parceiro ${item.name || index + 1}`}
                  >
                    <div className={`relative ${uniformSize ? 'h-16' : 'h-20'} flex items-center justify-center`}>
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.name || `Parceiro ${index + 1}`}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-slate-400 text-sm">Logo</span>
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <p 
                        className={`mt-2 text-center ${captionStyleResult.className}`}
                        style={captionStyleResult.style}
                      >
                        {item.caption}
                      </p>
                    )}
                  </a>
                ) : (
                  <div className="block p-4 rounded-lg">
                    <div className={`relative ${uniformSize ? 'h-16' : 'h-20'} flex items-center justify-center`}>
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.name || `Parceiro ${index + 1}`}
                          fill
                          className="object-contain filter grayscale"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-slate-400 text-sm">Logo</span>
                        </div>
                      )}
                    </div>
                    {item.caption && (
                      <p 
                        className={`mt-2 text-center ${captionStyleResult.className}`}
                        style={captionStyleResult.style}
                      >
                        {item.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Partners Carousel */}
        {displayType === "carrossel" && (
          <div className="relative overflow-hidden">
            <div className="flex space-x-8 animate-scroll">
              {/* Duplicate items for infinite scroll effect */}
              {[...items, ...items].map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 ${getAnimationClass()}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration
                  }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                      aria-label={`Visitar site do parceiro ${item.name || index + 1}`}
                    >
                      <div className={`relative ${uniformSize ? 'h-16 w-32' : 'h-20 w-40'} flex items-center justify-center`}>
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt={item.name || `Parceiro ${index + 1}`}
                            fill
                            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                            <span className="text-slate-400 text-sm">Logo</span>
                          </div>
                        )}
                      </div>
                      {item.caption && (
                        <p 
                          className={`mt-2 text-center ${captionStyleResult.className}`}
                          style={captionStyleResult.style}
                        >
                          {item.caption}
                        </p>
                      )}
                    </a>
                  ) : (
                    <div className="block p-4 rounded-lg">
                      <div className={`relative ${uniformSize ? 'h-16 w-32' : 'h-20 w-40'} flex items-center justify-center`}>
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt={item.name || `Parceiro ${index + 1}`}
                            fill
                            className="object-contain filter grayscale"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                            <span className="text-slate-400 text-sm">Logo</span>
                          </div>
                        )}
                      </div>
                      {item.caption && (
                        <p 
                          className={`mt-2 text-center ${captionStyleResult.className}`}
                          style={captionStyleResult.style}
                        >
                          {item.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


