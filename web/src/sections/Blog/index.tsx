// src/sections/Blog/index.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface BlogPost {
  title?: string;
  summary?: string;
  author?: string;
  date?: string;
  tags?: string[];
  coverImage?: string;
  url?: string;
  featured?: boolean;
}

interface BlogProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    posts?: BlogPost[];
    columns?: number;
    showAuthor?: boolean;
    showDate?: boolean;
    showTags?: boolean;
    orderBy?: string; // recent, manual
  };
  style: {
    backgroundColor?: string;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    postTitleStyle?: TextStyle;
    postSummaryStyle?: TextStyle;
    metadataStyle?: TextStyle;
    cardStyle?: string; // flat, elevated, outlined
    hoverEffect?: string; // scale, glow, shadow
    animationType?: string; // fade, slide, bounce
    animationDuration?: string;
  };
}

export default function Blog({ content, style }: BlogProps) {
  const {
    title = "Nosso Blog",
    subtitle = "Últimas notícias e artigos",
    description = "Fique por dentro das novidades e tendências do mercado",
    posts = [
      {
        title: "Como implementar uma estratégia digital eficaz",
        summary: "Descubra as melhores práticas para criar uma presença digital forte e engajante para sua empresa.",
        author: "João Silva",
        date: "2024-01-15",
        tags: ["Marketing", "Digital", "Estratégia"],
        coverImage: "/placeholder-blog.jpg",
        url: "#",
        featured: true
      },
      {
        title: "Tendências de design para 2024",
        summary: "Explore as principais tendências de design que vão dominar o mercado este ano.",
        author: "Maria Santos",
        date: "2024-01-12",
        tags: ["Design", "Tendências", "2024"],
        coverImage: "/placeholder-blog.jpg",
        url: "#"
      },
      {
        title: "O futuro do e-commerce",
        summary: "Entenda como as novas tecnologias estão transformando o comércio eletrônico.",
        author: "Pedro Costa",
        date: "2024-01-10",
        tags: ["E-commerce", "Tecnologia", "Futuro"],
        coverImage: "/placeholder-blog.jpg",
        url: "#"
      }
    ],
    columns = 3,
    showAuthor = true,
    showDate = true,
    showTags = true,
    orderBy = "recent"
  } = content;

  const {
    backgroundColor = "transparent",
    titleStyle,
    subtitleStyle,
    descriptionStyle,
    postTitleStyle,
    postSummaryStyle,
    metadataStyle,
    cardStyle = "elevated",
    hoverEffect = "scale",
    animationType = "fade",
    animationDuration = "300ms"
  } = style;

  // Aplicar estilos de texto
  const titleStyleResult = textStyleToStyle(titleStyle || {});
  const subtitleStyleResult = textStyleToStyle(subtitleStyle || {});
  const descriptionStyleResult = textStyleToStyle(descriptionStyle || {});
  const postTitleStyleResult = textStyleToStyle(postTitleStyle || {});
  const postSummaryStyleResult = textStyleToStyle(postSummaryStyle || {});
  const metadataStyleResult = textStyleToStyle(metadataStyle || {});

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
    const baseClasses = "rounded-lg transition-all duration-300 overflow-hidden";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

        {/* Blog Posts Grid */}
        <div className={getGridClasses()}>
          {posts.map((post, index) => (
            <article
              key={index}
              className={`${getCardClasses(post.featured)} ${getAnimationClass()}`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration
              }}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Destaque
                  </span>
                </div>
              )}

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title || 'Post do blog'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                {showTags && post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 
                  className={`${postTitleStyleResult.className} mb-3`}
                  style={postTitleStyleResult.style}
                >
                  {post.title}
                </h3>

                {/* Summary */}
                <p 
                  className={`${postSummaryStyleResult.className} mb-4`}
                  style={postSummaryStyleResult.style}
                >
                  {post.summary}
                </p>

                {/* Metadata */}
                <div className={`${metadataStyleResult.className} text-sm`} style={metadataStyleResult.style}>
                  <div className="flex items-center justify-between text-slate-400">
                    {showAuthor && post.author && (
                      <span>Por {post.author}</span>
                    )}
                    {showDate && post.date && (
                      <span>{formatDate(post.date)}</span>
                    )}
                  </div>
                </div>

                {/* Read More Link */}
                {post.url && (
                  <div className="mt-4">
                    <a
                      href={post.url}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                    >
                      Ler mais
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Ver todos os artigos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}


