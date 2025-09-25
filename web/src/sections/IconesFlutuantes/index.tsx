// src/sections/IconesFlutuantes/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface SocialIcon {
  platform: string;
  url: string;
  icon: string;
  tooltip?: string;
  color?: string;
}

interface IconesFlutuantesProps {
  content: {
    icons?: SocialIcon[];
    position?: string; // bottom-right, bottom-left, top-right, top-left
    animation?: string; // bounce, pulse, float, none
    showTooltips?: boolean;
  };
  style: {
    tooltipStyle?: TextStyle;
    animationDuration?: string;
  };
}

export default function IconesFlutuantes({ content, style }: IconesFlutuantesProps) {
  const {
    icons = [
      {
        platform: "WhatsApp",
        url: "https://wa.me/5511999999999",
        icon: "📱",
        tooltip: "Fale conosco no WhatsApp",
        color: "#25D366"
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/nossaempresa",
        icon: "📷",
        tooltip: "Siga-nos no Instagram",
        color: "#E4405F"
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/nossaempresa",
        icon: "👥",
        tooltip: "Curta nossa página no Facebook",
        color: "#1877F2"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/nossaempresa",
        icon: "💼",
        tooltip: "Conecte-se no LinkedIn",
        color: "#0077B5"
      }
    ],
    position = "bottom-right",
    animation = "bounce",
    showTooltips = true
  } = content;

  const {
    tooltipStyle,
    animationDuration = "2s"
  } = style;

  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  // Aplicar estilos de texto
  const tooltipStyleResult = textStyleToStyle(tooltipStyle || {});

  // Classes de posição
  const getPositionClasses = () => {
    const positions = {
      "bottom-right": "bottom-6 right-6",
      "bottom-left": "bottom-6 left-6",
      "top-right": "top-6 right-6",
      "top-left": "top-6 left-6"
    };
    return positions[position as keyof typeof positions] || positions["bottom-right"];
  };

  // Classes de animação
  const getAnimationClasses = () => {
    const animations = {
      bounce: "animate-bounce",
      pulse: "animate-pulse",
      float: "animate-float",
      none: ""
    };
    return animations[animation as keyof typeof animations] || animations.bounce;
  };

  // Mostrar ícones após um delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animação CSS personalizada para float
  useEffect(() => {
    if (animation === "float") {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float ${animationDuration} ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [animation, animationDuration]);

  if (!isVisible) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-3`}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="relative group"
          onMouseEnter={() => setHoveredIcon(index)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {/* Social Icon */}
          <a
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block w-14 h-14 rounded-full shadow-lg transition-all duration-300
              ${getAnimationClasses()}
              hover:scale-110 active:scale-95
              flex items-center justify-center text-white text-xl
            `}
            style={{
              backgroundColor: icon.color || "#3b82f6",
              animationDelay: `${index * 0.2}s`,
              animationDuration
            }}
            aria-label={`${icon.platform} - ${icon.tooltip || `Visitar ${icon.platform}`}`}
            role="button"
            tabIndex={0}
          >
            <span className="text-2xl">{icon.icon}</span>
          </a>

          {/* Tooltip */}
          {showTooltips && icon.tooltip && hoveredIcon === index && (
            <div 
              className={`
                absolute px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10
                ${tooltipStyleResult.className}
                ${position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'}
                ${position.includes('bottom') ? 'bottom-1/2 translate-y-1/2' : 'top-1/2 -translate-y-1/2'}
                whitespace-nowrap
              `}
              style={tooltipStyleResult.style}
            >
              {icon.tooltip}
              {/* Arrow */}
              <div 
                className={`
                  absolute top-1/2 transform -translate-y-1/2 border-4 border-transparent
                  ${position.includes('right') ? 'left-full border-l-gray-900' : 'right-full border-r-gray-900'}
                `}
              ></div>
            </div>
          )}
        </div>
      ))}

      {/* Accessibility: Skip to main content */}
      <div className="sr-only">
        <a 
          href="#main-content" 
          className="absolute -top-10 left-0 bg-blue-500 text-white px-4 py-2 rounded focus:top-0 focus:z-50"
        >
          Pular para o conteúdo principal
        </a>
      </div>
    </div>
  );
}


