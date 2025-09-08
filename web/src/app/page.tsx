'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useSiteConfig } from '@/context/SiteConfigContext';

export default function HomePage() {
  const { config } = useSiteConfig();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Verificações de segurança para evitar erros
  if (!config || !config.theme || !config.content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-400"></div>
          <span className="text-zinc-400">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12" style={{ fontFamily: config.theme.font }}>
      {/* Hero Section */}
      {config.sections.hero?.enabled && (
        <section className="relative mx-4 sm:mx-6 lg:mx-8">
          {/* Banner Image */}
          {config.content.hero.bannerImage && (
            <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={config.content.hero.bannerImage}
                alt={config.content.hero.bannerAlt || 'Banner principal'}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              
              {/* Hero Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 px-6 bg-transparent">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 
                    className="font-bold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-lg"
                  style={{ fontSize: config.theme.fontSize?.h1 || '3rem' }}
                >
                  {config.content.hero.title}
                </h1>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                <p 
                    className="text-zinc-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {config.content.hero.subtitle}
                </p>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 flex gap-4 justify-center">
                  <button 
                    className={`
                      px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform
                      ${hoveredButton === 'primary' 
                        ? 'scale-105 shadow-xl' 
                        : 'hover:scale-105 hover:shadow-lg'
                      }
                    `}
                    style={{ 
                      backgroundColor: config.theme.button,
                      color: config.theme.text
                    }}
                    onMouseEnter={() => setHoveredButton('primary')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {config.content.hero.primaryButton}
                  </button>
                  <button 
                    className="px-8 py-4 border-2 border-zinc-300 text-zinc-100 rounded-xl font-semibold hover:bg-white hover:bg-opacity-20 hover:border-zinc-200 transition-all duration-300 transform hover:scale-105"
                    onMouseEnter={() => setHoveredButton('secondary')}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {config.content.hero.secondaryButton}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Fallback Content (when no banner) */}
          {!config.content.hero.bannerImage && (
            <div className="text-center space-y-8 py-16 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 
                  className="font-bold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h1 || '3rem' }}
              >
                {config.content.hero.title}
              </h1>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <p 
                  className="text-zinc-300 max-w-2xl mx-auto leading-relaxed"
                style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
              >
                {config.content.hero.subtitle}
              </p>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 flex gap-4 justify-center">
                <button 
                  className={`
                    px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform
                    ${hoveredButton === 'primary' 
                      ? 'scale-105 shadow-xl' 
                      : 'hover:scale-105 hover:shadow-lg'
                    }
                  `}
                  style={{ 
                    backgroundColor: config.theme.button,
                    color: config.theme.text
                  }}
                  onMouseEnter={() => setHoveredButton('primary')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {config.content.hero.primaryButton}
                </button>
                <button 
                  className="px-8 py-4 border-2 border-zinc-700 text-zinc-100 rounded-xl font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setHoveredButton('secondary')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {config.content.hero.secondaryButton}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      {config.sections.features?.enabled && (
        <section id="features" className="space-y-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
            style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
          >
            {config.content.features.title}
          </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.content.features.items.map((item, index) => (
              <div 
                key={index} 
                className={`
                  group p-8 border border-zinc-800 rounded-xl space-y-6 transition-all duration-300 transform
                  ${hoveredCard === index 
                    ? 'scale-105 shadow-2xl border-zinc-700 bg-zinc-900' 
                    : 'hover:scale-105 hover:shadow-xl hover:border-zinc-700 hover:bg-zinc-900'
                  }
                `}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={config.images && 'featureImages' in config.images ? (config.images as { featureImages: string[] }).featureImages[index] : `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`}
                    alt={`${item.title} - Vistoria veicular`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                </div>
                <h3 
                  className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300"
                  style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Section */}
      {config.sections.services?.enabled && (
        <section id="services" className="space-y-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
            style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
          >
            {config.content.services.title}
          </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {config.content.services.items.map((service, index) => (
              <div 
                key={index} 
                className={`
                  group p-8 border border-zinc-800 rounded-xl space-y-6 transition-all duration-300 transform
                  ${hoveredCard === index + 10 
                    ? 'scale-105 shadow-2xl border-zinc-700 bg-zinc-900' 
                    : 'hover:scale-105 hover:shadow-xl hover:border-zinc-700 hover:bg-zinc-900'
                  }
                `}
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={config.images && 'serviceImages' in config.images ? (config.images as { serviceImages: string[] }).serviceImages[index] : `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                    alt={`${service.title} - Serviço de vistoria veicular`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 
                      className="font-semibold text-white text-xl mb-2"
                  style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                >
                  {service.title}
                </h3>
                  </div>
                </div>
                <p 
                  className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {service.description}
                </p>
                <ul className="text-zinc-400 space-y-3 group-hover:text-zinc-300 transition-colors duration-300">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full group-hover:bg-zinc-300 transition-colors duration-300"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Parceiros Section */}
      {config.sections.parceiros?.enabled && (
        <section id="parceiros" className="space-y-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.parceiros.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {config.content.parceiros.logos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center p-6 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-zinc-400 font-medium text-sm">{logo}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Instagram Section */}
      {config.sections.instagram?.enabled && (
        <section id="instagram" className="space-y-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.instagram.title}
            </h2>
            <p 
              className="text-zinc-400 mt-4"
              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
            >
              {config.content.instagram.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {config.content.instagram.posts.map((post, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={config.images && 'instagramPosts' in config.images ? (config.images as { instagramPosts: string[] }).instagramPosts[index] : `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`}
                  alt={`Post ${index + 1} - Instagram`}
                  width={300}
                  height={256}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{post.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blog Section */}
      {config.sections.blog?.enabled && (
        <section id="blog" className="space-y-12 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.blog.title}
            </h2>
            <p 
              className="text-zinc-400 mt-4"
              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
            >
              {config.content.blog.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.content.blog.articles.map((article, index) => (
              <div 
                key={index} 
                className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={config.images && 'blogThumbnails' in config.images ? (config.images as { blogThumbnails: string[] }).blogThumbnails[index] : `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-zinc-900 bg-opacity-80 text-zinc-100 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 
                    className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300"
                    style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                  >
                    {article.title}
                  </h3>
                  <p 
                    className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                    style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                  >
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-zinc-500 text-sm">{article.date}</span>
                    <button className="text-zinc-400 hover:text-zinc-200 transition-colors duration-300 text-sm font-medium">
                      Ler mais →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {config.sections.cta?.enabled && (
        <section id="cta" className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center space-y-6 py-12 border border-zinc-800 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.cta.title}
            </h2>
            <p 
              className="text-zinc-300 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
            >
              {config.content.cta.subtitle}
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                className={`
                  px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform
                  ${hoveredButton === 'cta-primary' 
                    ? 'scale-105 shadow-xl' 
                    : 'hover:scale-105 hover:shadow-lg'
                  }
                `}
                style={{ 
                  backgroundColor: config.theme.button,
                  color: config.theme.text
                }}
                onMouseEnter={() => setHoveredButton('cta-primary')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {config.content.cta.primaryButton}
              </button>
              <button 
                className="px-8 py-4 border-2 border-zinc-700 text-zinc-100 rounded-xl font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setHoveredButton('cta-secondary')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {config.content.cta.secondaryButton}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {config.sections.stats?.enabled && (
        <section id="stats" className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {config.content.stats.items.map((stat, index) => (
              <div 
                key={index} 
                className="p-6 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="font-bold text-zinc-100 mb-2"
                  style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-zinc-400"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Carrosséis Section */}
      {config.sections.carrossels?.enabled && (
        <section id="carrossels" className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center space-y-4">
            <h2 
              className="font-bold text-zinc-100"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.carrossels.title}
            </h2>
            <p 
              className="text-zinc-400 max-w-2xl mx-auto"
              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
            >
              {config.content.carrossels.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.content.carrossels.items.filter(item => item.enabled).map((item, index) => (
              <div 
                key={item.id}
                className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 
                      className="font-semibold text-white text-xl mb-2"
                      style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-zinc-200 text-sm"
                      style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                {item.link && (
                  <div className="p-4">
                    <a 
                      href={item.link}
                      className="inline-flex items-center px-4 py-2 bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
                    >
                      Saiba Mais
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificações Section */}
      {config.sections.certificacoes?.enabled && (
        <section id="certificacoes" className="space-y-8 container mx-auto px-4 sm:px-6 lg:px-8 max-w-container">
          <div className="text-center space-y-4">
            <h2 
              className="font-bold text-zinc-100"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.certificacoes.title}
            </h2>
            <p 
              className="text-zinc-400 max-w-2xl mx-auto"
              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
            >
              {config.content.certificacoes.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.content.certificacoes.items.filter(item => item.enabled).map((item, index) => (
              <div 
                key={item.id}
                className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-zinc-900 bg-opacity-80 text-zinc-100 text-xs font-medium rounded-full">
                      {item.organization}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 
                    className="font-semibold text-zinc-100 mb-2"
                    style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-zinc-400 text-sm"
                    style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ícones Flutuantes */}
      {config.sections['icones-flutuantes']?.enabled && (
        <div className="fixed right-4 bottom-4 z-50 space-y-3">
          {config.content.iconesFlutuantes.items.filter(item => item.enabled).map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              style={{ 
                backgroundColor: item.color,
                animationDelay: `${index * 100}ms`
              }}
              title={item.name}
            >
              <span className="text-2xl">{item.icon}</span>
            </a>
          ))}
        </div>
      )}

    </div>
  );
}
