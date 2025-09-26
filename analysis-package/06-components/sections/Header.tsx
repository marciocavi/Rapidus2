// src/sections/Header/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface MenuItem {
  label: string;
  url: string;
  children?: MenuItem[];
}

interface HeaderProps {
  content: {
    logo?: string;
    brandName?: string;
    menuItems?: MenuItem[];
    ctaButton?: string;
    ctaButtonLink?: string;
    ctaButtonIcon?: string;
    isSticky?: boolean;
    isTransparent?: boolean;
  };
  style: {
    backgroundColor?: string;
    brandStyle?: TextStyle;
    menuStyle?: TextStyle;
    ctaButtonStyle?: TextStyle;
    logoSize?: string;
  };
}

export default function Header({ content, style }: HeaderProps) {
  const {
    logo,
    brandName = "Nossa Empresa",
    menuItems = [
      { label: "Início", url: "/" },
      { label: "Sobre", url: "/sobre" },
      { label: "Serviços", url: "/servicos" },
      { label: "Contato", url: "/contato" }
    ],
    ctaButton = "Fale Conosco",
    ctaButtonLink = "/contato",
    ctaButtonIcon = "💬",
    isSticky = true,
    isTransparent = false
  } = content;

  const {
    backgroundColor = "#1e293b",
    brandStyle,
    menuStyle,
    ctaButtonStyle,
    logoSize = "h-8"
  } = style;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Aplicar estilos de texto
  const brandStyleResult = textStyleToStyle(brandStyle || {});
  const menuStyleResult = textStyleToStyle(menuStyle || {});
  const ctaButtonStyleResult = textStyleToStyle(ctaButtonStyle || {});

  // Detectar scroll para sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getHeaderClasses = () => {
    const baseClasses = "w-full transition-all duration-300";
    const stickyClasses = isSticky ? "fixed top-0 z-50" : "relative";
    const scrolledClasses = isScrolled ? "shadow-lg" : "";
    const transparentClasses = isTransparent && !isScrolled ? "bg-transparent" : "";
    
    return `${baseClasses} ${stickyClasses} ${scrolledClasses} ${transparentClasses}`;
  };

  const getBackgroundStyle = () => {
    if (isTransparent && !isScrolled) {
      return { backgroundColor: "transparent" };
    }
    return { backgroundColor };
  };

  return (
    <header 
      className={getHeaderClasses()}
      style={getBackgroundStyle()}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-3"
            aria-label="Ir para página inicial"
          >
            {logo ? (
              <div className={`relative ${logoSize} w-auto`}>
                <Image
                  src={logo}
                  alt={brandName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className={`${logoSize} w-auto bg-blue-500 rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">L</span>
              </div>
            )}
            <span 
              className={brandStyleResult.className}
              style={brandStyleResult.style}
            >
              {brandName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Menu principal">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.url}
                  className={`${menuStyleResult.className} hover:text-blue-400 transition-colors`}
                  style={menuStyleResult.style}
                  onMouseEnter={() => item.children && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.label}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.url}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href={ctaButtonLink}
              className={`
                inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${ctaButtonStyleResult.className}
                bg-blue-500 hover:bg-blue-600 text-white
                hover:scale-105 active:scale-95
              `}
              style={ctaButtonStyleResult.style}
            >
              {ctaButtonIcon && (
                <span className="mr-2">{ctaButtonIcon}</span>
              )}
              {ctaButton}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-lg mt-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.url}
                    className={`block px-3 py-2 ${menuStyleResult.className} hover:text-blue-400 transition-colors`}
                    style={menuStyleResult.style}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.children && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.url}
                          className={`block px-3 py-2 ${menuStyleResult.className} text-sm hover:text-blue-400 transition-colors`}
                          style={menuStyleResult.style}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-slate-700">
                <Link
                  href={ctaButtonLink}
                  className={`
                    block w-full text-center px-4 py-2 rounded-lg font-medium transition-colors
                    ${ctaButtonStyleResult.className}
                    bg-blue-500 hover:bg-blue-600 text-white
                  `}
                  style={ctaButtonStyleResult.style}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ctaButtonIcon && (
                    <span className="mr-2">{ctaButtonIcon}</span>
                  )}
                  {ctaButton}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer para sticky header */}
      {isSticky && (
        <div className="h-16"></div>
      )}
    </header>
  );
}


