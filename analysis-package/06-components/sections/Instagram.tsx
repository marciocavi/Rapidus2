// src/sections/Instagram/index.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { textStyleToStyle } from '../../utils/textStyle.js';
import { TextStyle } from '../../theme/tokens.js';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  caption?: string;
  permalink: string;
  timestamp: string;
  thumbnail_url?: string;
}

interface InstagramProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    numberOfPosts?: number;
    layout?: string; // grid, carrossel
    showCaptions?: boolean;
    apiToken?: string;
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

export default function Instagram({ content, style }: InstagramProps) {
  const {
    title = "Siga-nos no Instagram",
    subtitle = "@nossaempresa",
    description = "Acompanhe nosso dia a dia e novidades",
    numberOfPosts = 6,
    layout = "grid",
    showCaptions = true,
    apiToken = ""
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

  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Mock data para demonstração
  const mockPosts: InstagramPost[] = [
    {
      id: "1",
      media_url: "/placeholder-instagram.jpg",
      media_type: "IMAGE",
      caption: "Post de exemplo do Instagram #exemplo #demo",
      permalink: "https://instagram.com/p/example1",
      timestamp: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      media_url: "/placeholder-instagram.jpg",
      media_type: "IMAGE",
      caption: "Outro post interessante com mais texto para demonstrar como fica a legenda",
      permalink: "https://instagram.com/p/example2",
      timestamp: "2024-01-14T15:30:00Z"
    },
    {
      id: "3",
      media_url: "/placeholder-instagram.jpg", 
      media_type: "IMAGE",
      caption: "Terceiro post #hashtag #instagram",
      permalink: "https://instagram.com/p/example3",
      timestamp: "2024-01-13T09:15:00Z"
    },
    {
      id: "4",
      media_url: "/placeholder-instagram.jpg",
      media_type: "IMAGE", 
      caption: "Quarto post com uma legenda mais longa para testar o comportamento do texto",
      permalink: "https://instagram.com/p/example4",
      timestamp: "2024-01-12T14:45:00Z"
    },
    {
      id: "5",
      media_url: "/placeholder-instagram.jpg",
      media_type: "IMAGE",
      caption: "Quinto post #demo #teste",
      permalink: "https://instagram.com/p/example5", 
      timestamp: "2024-01-11T11:20:00Z"
    },
    {
      id: "6",
      media_url: "/placeholder-instagram.jpg",
      media_type: "IMAGE",
      caption: "Sexto e último post de exemplo",
      permalink: "https://instagram.com/p/example6",
      timestamp: "2024-01-10T16:00:00Z"
    }
  ];

  // Simular carregamento de posts
  useEffect(() => {
    if (apiToken) {
      setLoading(true);
      // Aqui seria feita a chamada real para a API do Instagram
      // Por enquanto, usamos dados mock
      setTimeout(() => {
        setPosts(mockPosts.slice(0, numberOfPosts));
        setLoading(false);
      }, 1000);
    } else {
      setPosts(mockPosts.slice(0, numberOfPosts));
    }
  }, [apiToken, numberOfPosts]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('pt-BR');
  };

  const truncateCaption = (caption: string, maxLength: number = 100) => {
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + '...';
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-slate-400 text-sm">
              Verifique se o token da API do Instagram está configurado corretamente.
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && layout === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`${getAnimationClass()} group relative`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration
                }}
              >
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                  aria-label={`Ver post do Instagram ${index + 1}`}
                >
                  <Image
                    src={post.media_url}
                    alt={post.caption || `Post do Instagram ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Caption */}
                {showCaptions && post.caption && (
                  <div className="mt-2">
                    <p 
                      className={`${captionStyleResult.className} text-xs`}
                      style={captionStyleResult.style}
                    >
                      {truncateCaption(post.caption, 60)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Posts Carousel */}
        {!loading && !error && layout === "carrossel" && (
          <div className="relative overflow-hidden">
            <div className="flex space-x-4 animate-scroll">
              {[...posts, ...posts].map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  className={`flex-shrink-0 ${getAnimationClass()}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration
                  }}
                >
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-64 aspect-square relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                    aria-label={`Ver post do Instagram ${index + 1}`}
                  >
                    <Image
                      src={post.media_url}
                      alt={post.caption || `Post do Instagram ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/nossaempresa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}


