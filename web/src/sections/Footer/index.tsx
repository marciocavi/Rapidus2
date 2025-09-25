// src/sections/Footer/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    url: string;
    external?: boolean;
  }>;
}

interface FooterProps {
  content: {
    logo?: string;
    brandName?: string;
    description?: string;
    columns?: FooterColumn[];
    socialLinks?: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    newsletter?: {
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
    };
    copyright?: string;
    legalLinks?: Array<{
      label: string;
      url: string;
    }>;
  };
  style: {
    backgroundColor?: string;
    brandStyle?: TextStyle;
    columnTitleStyle?: TextStyle;
    linkStyle?: TextStyle;
    copyrightStyle?: TextStyle;
    theme?: string; // light, dark
  };
}

export default function Footer({ content, style }: FooterProps) {
  const {
    logo,
    brandName = "Nossa Empresa",
    description = "Transformando ideias em realidade através da tecnologia e inovação.",
    columns = [
      {
        title: "Empresa",
        links: [
          { label: "Sobre Nós", url: "/sobre" },
          { label: "Nossa Equipe", url: "/equipe" },
          { label: "Carreiras", url: "/carreiras" },
          { label: "Imprensa", url: "/imprensa" }
        ]
      },
      {
        title: "Serviços",
        links: [
          { label: "Desenvolvimento Web", url: "/servicos/web" },
          { label: "Mobile Apps", url: "/servicos/mobile" },
          { label: "Consultoria", url: "/servicos/consultoria" },
          { label: "Suporte", url: "/servicos/suporte" }
        ]
      },
      {
        title: "Recursos",
        links: [
          { label: "Blog", url: "/blog" },
          { label: "Documentação", url: "/docs" },
          { label: "API", url: "/api" },
          { label: "Status", url: "/status" }
        ]
      },
      {
        title: "Contato",
        links: [
          { label: "Fale Conosco", url: "/contato" },
          { label: "WhatsApp", url: "https://wa.me/5511999999999", external: true },
          { label: "Email", url: "mailto:contato@empresa.com" },
          { label: "Telefone", url: "tel:+5511999999999" }
        ]
      }
    ],
    socialLinks = [
      { platform: "Facebook", url: "https://facebook.com/nossaempresa", icon: "👥" },
      { platform: "Instagram", url: "https://instagram.com/nossaempresa", icon: "📷" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/nossaempresa", icon: "💼" },
      { platform: "Twitter", url: "https://twitter.com/nossaempresa", icon: "🐦" }
    ],
    newsletter = {
      title: "Newsletter",
      description: "Receba nossas novidades e dicas exclusivas",
      placeholder: "Seu melhor email",
      buttonText: "Inscrever"
    },
    copyright = "© 2024 Nossa Empresa. Todos os direitos reservados.",
    legalLinks = [
      { label: "Política de Privacidade", url: "/privacidade" },
      { label: "Termos de Uso", url: "/termos" },
      { label: "Cookies", url: "/cookies" }
    ]
  } = content;

  const {
    backgroundColor = "#0f172a",
    brandStyle,
    columnTitleStyle,
    linkStyle,
    copyrightStyle,
    theme = "dark"
  } = style;

  // Aplicar estilos de texto
  const brandStyleResult = textStyleToStyle(brandStyle || {});
  const columnTitleStyleResult = textStyleToStyle(columnTitleStyle || {});
  const linkStyleResult = textStyleToStyle(linkStyle || {});
  const copyrightStyleResult = textStyleToStyle(copyrightStyle || {});

  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const linkColor = isDark ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900";
  const borderColor = isDark ? "border-slate-700" : "border-gray-200";

  return (
    <footer 
      className={`${textColor}`}
      style={{ backgroundColor }}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4">
                {logo ? (
                  <div className="relative h-8 w-auto">
                    <Image
                      src={logo}
                      alt={brandName}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                )}
                <span 
                  className={brandStyleResult.className}
                  style={brandStyleResult.style}
                >
                  {brandName}
                </span>
              </Link>
              
              <p className={`${linkColor} mb-6 max-w-md`}>
                {description}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors ${linkColor}`}
                    aria-label={social.platform}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Columns */}
            {columns.map((column, index) => (
              <div key={index}>
                <h3 
                  className={`${columnTitleStyleResult.className} mb-4`}
                  style={columnTitleStyleResult.style}
                >
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.url}
                        className={`${linkStyleResult.className} ${linkColor} transition-colors`}
                        style={linkStyleResult.style}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-slate-700">
            <div className="max-w-md">
              <h3 
                className={`${columnTitleStyleResult.className} mb-2`}
                style={columnTitleStyleResult.style}
              >
                {newsletter.title}
              </h3>
              <p className={`${linkColor} mb-4`}>
                {newsletter.description}
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  {newsletter.buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={`py-6 border-t ${borderColor}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p 
              className={`${copyrightStyleResult.className} ${linkColor}`}
              style={copyrightStyleResult.style}
            >
              {copyright}
            </p>

            {/* Legal Links */}
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className={`${linkStyleResult.className} ${linkColor} text-sm transition-colors`}
                  style={linkStyleResult.style}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


