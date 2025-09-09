'use client';

import { useState } from 'react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function HomePage() {
  const { config } = useSiteConfig();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">Carregando configuração...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12" style={{ fontFamily: config.theme.font }}>
      {/* Header Section */}
      {config.sections.header?.enabled && (
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-zinc-800">R</span>
                </div>
                <span className="text-xl font-bold text-zinc-100">Rapidus</span>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#hero" className="text-zinc-300 hover:text-zinc-100 transition-colors duration-300">Início</a>
                <a href="#features" className="text-zinc-300 hover:text-zinc-100 transition-colors duration-300">Serviços</a>
                <a href="#about" className="text-zinc-300 hover:text-zinc-100 transition-colors duration-300">Sobre</a>
                <a href="#contact" className="text-zinc-300 hover:text-zinc-100 transition-colors duration-300">Contato</a>
              </nav>
              
              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button 
                  className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  style={{
                    backgroundColor: config.theme.button,
                    color: config.theme.text
                  }}
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      {/* Hero Section */}
      {config.sections.hero?.enabled && (
        <section id="hero" className="relative mx-4 sm:mx-6 lg:mx-8">
          <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 px-6">
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
              
              {/* Hero Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
                <button 
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ 
                    backgroundColor: config.theme.button,
                    color: config.theme.text
                  }}
                  onMouseEnter={() => setHoveredCard(0)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {config.content.hero.primaryButton}
                </button>
                <button 
                  className="px-8 py-4 border-2 border-zinc-300 text-zinc-100 rounded-xl font-semibold hover:bg-white hover:bg-opacity-20 hover:border-zinc-200 transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setHoveredCard(1)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {config.content.hero.secondaryButton}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {config.sections.features?.enabled && (
        <section id="features" className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
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
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="text-zinc-300 text-sm font-medium">{item.title}</div>
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
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.services.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🔧</span>
                    </div>
                    <div className="text-zinc-300 text-sm font-medium">{service.title}</div>
                  </div>
                </div>
                
                <h3 
                  className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300"
                  style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                >
                  {service.title}
                </h3>
                
                <p 
                  className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Partners Section */}
      {config.sections.parceiros?.enabled && (
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
            <h2 
              className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
              style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
            >
              {config.content.parceiros.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {(config.images as { logos: string[] }).logos.map((logo, index) => (
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
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.content.instagram.posts.map((post, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📷</span>
                    </div>
                    <div className="text-zinc-300 text-sm font-medium">Instagram Post</div>
                  </div>
                </div>
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
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
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
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div className="text-zinc-300 text-sm font-medium">{article.title}</div>
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
                  <div className="flex justify-between items-center text-sm text-zinc-500">
                    <span>{article.date}</span>
                    <span>{article.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {config.sections.cta?.enabled && (
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
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
            <div className="pt-4">
              <button 
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: config.theme.button,
                  color: config.theme.text
                }}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {config.content.cta.primaryButton}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {config.sections.stats?.enabled && (
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* New Sections */}
      
      {/* Carrossels Section */}
      {config.sections.carrossels?.enabled && (
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center mb-12">
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
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800">
            <div className="flex transition-transform duration-500 ease-in-out" id="carousel-container">
              {config.content.carrossels.items.map((item, index) => (
                <div 
                  key={item.id}
                  className="w-full flex-shrink-0"
                  style={{ transform: `translateX(${index * 100}%)` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Content */}
                    <div className="flex flex-col justify-center space-y-6">
                      <h3 
                        className="font-bold text-zinc-100"
                        style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-zinc-400 leading-relaxed"
                        style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                      >
                        {item.description}
                      </p>
                      <div className="flex space-x-4">
                        <button 
                          className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                          style={{
                            backgroundColor: config.theme.button,
                            color: config.theme.text
                          }}
                        >
                          Saiba Mais
                        </button>
                        <button className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg font-semibold hover:bg-zinc-800 transition-all duration-300">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                    
                    {/* Visual */}
                    <div className="relative h-80 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-6">
                          <span className="text-4xl">🎠</span>
                        </div>
                        <div className="text-zinc-300 text-lg font-medium">{item.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-zinc-800 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center text-zinc-100 transition-all duration-300"
              onClick={() => {
                const container = document.getElementById('carousel-container');
                if (container) {
                  container.style.transform = 'translateX(-100%)';
                }
              }}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-zinc-800 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center text-zinc-100 transition-all duration-300"
              onClick={() => {
                const container = document.getElementById('carousel-container');
                if (container) {
                  container.style.transform = 'translateX(0%)';
                }
              }}
            >
              →
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {config.content.carrossels.items.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === 0 ? 'bg-zinc-100' : 'bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificações Section */}
      {config.sections.certificacoes?.enabled && (
        <section className="mx-4 sm:mx-6 lg:mx-8 py-16">
          <div className="text-center mb-12">
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
          
          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.content.certificacoes.items.map((item, index) => (
              <div 
                key={item.id}
                className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-zinc-900 to-zinc-800"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Certificate Header */}
                <div className="relative h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="text-white text-sm font-bold">{item.title}</div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs font-bold rounded-full">
                      CERTIFICADO
                    </span>
                  </div>
                </div>
                
                {/* Certificate Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 
                      className="font-bold text-zinc-100"
                      style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">✓</span>
                    </div>
                  </div>
                  
                  <p 
                    className="text-zinc-400 leading-relaxed"
                    style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                  >
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-zinc-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Organização:</span>
                      <span className="text-zinc-300 font-medium">{item.organization}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Status:</span>
                      <span className="text-green-400 font-medium">✓ Ativo</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-all duration-300 text-sm font-medium">
                    Ver Certificado
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-100">10+</div>
                <div className="text-sm text-zinc-400">Anos de Experiência</div>
              </div>
              <div className="w-px h-12 bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-100">1000+</div>
                <div className="text-sm text-zinc-400">Certificações Emitidas</div>
              </div>
              <div className="w-px h-12 bg-zinc-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-100">99%</div>
                <div className="text-sm text-zinc-400">Taxa de Aprovação</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating Icons Section */}
      {config.sections['icones-flutuantes']?.enabled && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Main Floating Button */}
          <div className="relative">
            <button 
              className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110"
              onClick={() => {
                const icons = document.getElementById('floating-icons');
                if (icons) {
                  icons.classList.toggle('hidden');
                }
              }}
            >
              <span className="text-2xl">💬</span>
            </button>
            
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
              Fale conosco!
            </div>
          </div>
          
          {/* Social Icons */}
          <div id="floating-icons" className="hidden absolute bottom-16 right-0 flex flex-col gap-3">
            {config.content['icones-flutuantes'].items.map((item, index: number) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
                style={{
                  backgroundColor: item.color,
                  animationDelay: `${index * 100}ms`
                }}
                title={item.name}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                
                {/* Tooltip */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-zinc-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </div>
              </a>
            ))}
          </div>
          
          {/* Back to Top Button */}
          <button 
            className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 mt-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Voltar ao topo"
          >
            <span className="text-lg">↑</span>
          </button>
        </div>
      )}

      {/* Footer Section */}
      {config.sections.footer?.enabled && (
        <footer className="bg-zinc-900 border-t border-zinc-800 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-zinc-800">R</span>
                  </div>
                  <span className="text-xl font-bold text-zinc-100">Rapidus</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Especialistas em vistoria veicular com mais de 10 anos de experiência no mercado.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                    <span className="text-xl">📘</span>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                    <span className="text-xl">📷</span>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                    <span className="text-xl">📱</span>
                  </a>
                </div>
              </div>
              
              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-zinc-100 font-semibold">Serviços</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Vistoria Veicular</a></li>
                  <li><a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Inspeção Técnica</a></li>
                  <li><a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Laudo Técnico</a></li>
                  <li><a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Consultoria</a></li>
                </ul>
              </div>
              
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-zinc-100 font-semibold">Links Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#hero" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Início</a></li>
                  <li><a href="#features" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Serviços</a></li>
                  <li><a href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Sobre</a></li>
                  <li><a href="#contact" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Contato</a></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-zinc-100 font-semibold">Contato</h3>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✉️</span>
                    <span>contato@rapidus.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>São Paulo, SP</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-zinc-400 text-sm">
                © 2024 Rapidus. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300 text-sm">Política de Privacidade</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300 text-sm">Termos de Uso</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}