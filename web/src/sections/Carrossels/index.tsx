// src/sections/Carrossels/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface CarouselItem {
  image?: string;
  title?: string;
  description?: string;
  price?: string;
  link?: string;
}

interface CarrosselsProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: CarouselItem[];
    autoplay?: boolean;
    showArrows?: boolean;
    speed?: number; // milissegundos
    transitionType?: string; // slide, fade, scale
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    itemTitleStyle?: TextStyle;
    itemDescriptionStyle?: TextStyle;
    priceStyle?: TextStyle;
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Carrossels({ content, style }: CarrosselsProps) {
  const {
    title = "Nossos Produtos",
    subtitle = "Conheça nossa linha completa",
    description = "Explore nossa seleção de produtos e serviços",
    items = [
      {
        image: "/placeholder-product.jpg",
        title: "Produto 1",
        description: "Descrição detalhada do primeiro produto",
        price: "R$ 99,90",
        link: "#"
      },
      {
        image: "/placeholder-product.jpg",
        title: "Produto 2",
        description: "Descrição detalhada do segundo produto",
        price: "R$ 149,90",
        link: "#"
      },
      {
        image: "/placeholder-product.jpg",
        title: "Produto 3",
        description: "Descrição detalhada do terceiro produto",
        price: "R$ 199,90",
        link: "#"
      },
      {
        image: "/placeholder-product.jpg",
        title: "Produto 4",
        description: "Descrição detalhada do quarto produto",
        price: "R$ 249,90",
        link: "#"
      }
    ],
    autoplay = true,
    showArrows = true,
    speed = 3000,
    transitionType = "slide"
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    itemTitleStyle,
    itemDescriptionStyle,
    priceStyle,
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const itemTitleStyleResult = textStyleToStyle(itemTitleStyle || {});
  const itemDescriptionStyleResult = textStyleToStyle(itemDescriptionStyle || {});
  const priceStyleResult = textStyleToStyle(priceStyle || {});

  // Animação
  const getAnimationClass = () => {
    const animations = {
      fade: "animate-fade-in",
      slide: "animate-slide-up",
      bounce: "animate-bounce-in"
    };
    return animations[animationType as keyof typeof animations] || animations.fade;
  };

  // Autoplay
  useEffect(() => {
    if (!autoplay || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, speed);

    return () => clearInterval(interval);
  }, [autoplay, speed, items.length]);

  // Navegação
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Classes de transição
  const getTransitionClasses = () => {
    const transitions = {
      slide: "transform transition-transform duration-300 ease-in-out",
      fade: "transition-opacity duration-300 ease-in-out",
      scale: "transform transition-all duration-300 ease-in-out hover:scale-105"
    };
    return transitions[transitionType as keyof typeof transitions] || transitions.slide;
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

        {/* Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
                    {/* Image */}
                    <div className={`${getTransitionClasses()} ${getAnimationClass()}`}>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title || `Produto ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <span className="text-slate-400">Imagem do Produto</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${getAnimationClass()} space-y-4`}>
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

                      {item.price && (
                        <div 
                          className={priceStyleResult.className}
                          style={priceStyleResult.style}
                        >
                          {item.price}
                        </div>
                      )}

                      {item.link && (
                        <a
                          href={item.link}
                          className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                        >
                          Saiba mais
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {showArrows && items.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
                aria-label="Slide anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
                aria-label="Próximo slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {items.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-blue-500' 
                      : 'bg-slate-400 hover:bg-slate-300'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


