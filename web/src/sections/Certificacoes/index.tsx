// src/sections/Certificacoes/index.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface CertificationItem {
  logo?: string;
  title?: string;
  description?: string;
  issuer?: string;
  date?: string;
  link?: string;
  tooltip?: string;
}

interface CertificacoesProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: CertificationItem[];
    displayType?: string; // grid, carrossel
    showTooltips?: boolean;
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    certificationTitleStyle?: TextStyle;
    certificationDescriptionStyle?: TextStyle;
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Certificacoes({ content, style }: CertificacoesProps) {
  const {
    title = "Nossas Certificações",
    subtitle = "Reconhecimento e Qualidade",
    description = "Certificações que comprovam nossa excelência e compromisso com a qualidade",
    items = [
      {
        logo: "/placeholder-certification.png",
        title: "ISO 9001:2015",
        description: "Sistema de Gestão da Qualidade",
        issuer: "ISO",
        date: "2023",
        tooltip: "Certificação internacional de qualidade que garante nossos processos e serviços"
      },
      {
        logo: "/placeholder-certification.png",
        title: "ISO 27001:2013",
        description: "Sistema de Gestão de Segurança da Informação",
        issuer: "ISO",
        date: "2023",
        tooltip: "Certificação que comprova nossa segurança e proteção de dados"
      },
      {
        logo: "/placeholder-certification.png",
        title: "Certificação Digital",
        description: "Autoridade Certificadora",
        issuer: "AC",
        date: "2023",
        tooltip: "Certificação para serviços de assinatura digital e autenticação"
      }
    ],
    displayType = "grid",
    showTooltips = true
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    certificationTitleStyle,
    certificationDescriptionStyle,
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const certificationTitleStyleResult = textStyleToStyle(certificationTitleStyle || {});
  const certificationDescriptionStyleResult = textStyleToStyle(certificationDescriptionStyle || {});

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

        {/* Certifications Grid */}
        {displayType === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className={`${getAnimationClass()} relative group`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="bg-slate-800/80 rounded-lg p-6 text-center hover:bg-slate-800 transition-colors border border-slate-700/50 hover:border-slate-600">
                  {/* Logo */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.title || `Certificação ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-slate-400 text-sm">Logo</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 
                    className={certificationTitleStyleResult.className}
                    style={certificationTitleStyleResult.style}
                  >
                    {item.title}
                  </h3>

                  <p 
                    className={certificationDescriptionStyleResult.className}
                    style={certificationDescriptionStyleResult.style}
                  >
                    {item.description}
                  </p>

                  {/* Issuer and Date */}
                  <div className="mt-4 text-sm text-slate-400">
                    {item.issuer && <div>Emitido por: {item.issuer}</div>}
                    {item.date && <div>Ano: {item.date}</div>}
                  </div>

                  {/* Link */}
                  {item.link && (
                    <div className="mt-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                      >
                        Ver certificado
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Tooltip */}
                {showTooltips && item.tooltip && hoveredItem === index && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 max-w-xs">
                    <div className="text-center">{item.tooltip}</div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications Carousel */}
        {displayType === "carrossel" && (
          <div className="relative overflow-hidden">
            <div className="flex space-x-8 animate-scroll">
              {[...items, ...items].map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 ${getAnimationClass()}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration
                  }}
                >
                  <div className="bg-slate-800/80 rounded-lg p-6 text-center w-64 border border-slate-700/50">
                    {/* Logo */}
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.title || `Certificação ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-slate-400 text-sm">Logo</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 
                      className={certificationTitleStyleResult.className}
                      style={certificationTitleStyleResult.style}
                    >
                      {item.title}
                    </h3>

                    <p 
                      className={`${certificationDescriptionStyleResult.className} text-sm`}
                      style={certificationDescriptionStyleResult.style}
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


