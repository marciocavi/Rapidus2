'use client';

import { useState, type CSSProperties } from 'react';
import clsx from 'clsx';
import { useSiteConfig } from '@/context/SiteConfigContext';
import type { TextStyle } from '@/theme/tokens';
import { textStyleToStyle } from '@/utils/textStyle';

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

  const toStringValue = (value: unknown, fallback = '') => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const toNumberValue = (value: unknown, fallback: number) => (typeof value === 'number' ? value : fallback);



  const resolveTextStyle = (value: unknown) => {

    if (!value || typeof value !== 'object') {

      return { className: '', style: {} as CSSProperties };

    }

    const { className, style } = textStyleToStyle(value as TextStyle);

    return { className, style };

  };



  const mergeItems = <T,>(override: unknown, fallback: T[]): T[] => (

    Array.isArray(override) && override.length > 0 ? (override as T[]) : fallback

  );



  const animationClassMap: Record<string, string> = {

    entrada: 'animate-fade-in',

    parallax: 'animate-parallax',

    rolagem: 'animate-scroll',

    'slide-up': 'animate-slide-up',

    'slide-down': 'animate-slide-down',

    zoom: 'animate-zoom',

    bounce: 'animate-bounce',

    none: '',

  };



  const cardStyleClassMap: Record<string, string> = {

    flat: 'border border-transparent bg-zinc-900/60',

    elevated: 'border border-zinc-800 bg-zinc-900/70 shadow-lg',

    outlined: 'border-2 border-zinc-700 bg-transparent',

  };



  const hoverEffectClassMap: Record<string, string> = {

    scale: 'hover:scale-105',

    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]',

    shadow: 'hover:shadow-2xl',

  };



  // Função para ordenar seções baseada na posição
  const getOrderedSections = () => {
    const items = Object.entries(config.sections)
      .filter(([, section]) => section?.enabled)
      .map(([key, section]) => ({
        key,
        section,
        position: section?.position ?? 999,
      }))
      .sort((a, b) => a.position - b.position);

    const headerIndex = items.findIndex((item) => item.key === 'header');
    const footerIndex = items.findIndex((item) => item.key === 'footer');

    const reordered: typeof items = [];

    if (headerIndex !== -1) {
      reordered.push(items[headerIndex]);
    }

    items.forEach((item, index) => {
      if (index !== headerIndex && index !== footerIndex) {
        reordered.push(item);
      }
    });

    if (footerIndex !== -1 && footerIndex !== headerIndex) {
      reordered.push(items[footerIndex]);
    }

    return reordered;
  };

  const orderedSections = getOrderedSections();

  const normalizedSections = (() => {
    const header = orderedSections.find((section) => section.key === 'header');
    const footer = orderedSections.find((section) => section.key === 'footer');

    const middle = orderedSections.filter(
      (section) => section.key !== 'header' && section.key !== 'footer'
    );

    const result = [] as typeof orderedSections;

    if (header) {
      result.push(header);
    }

    result.push(...middle);

    if (footer && footer !== header) {
      result.push(footer);
    }

    return result;
  })();

  // Componente para renderizar seções dinamicamente
  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      case 'header':
        return (
          <header key="header" className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
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
        );



      case 'hero': {

  const overrides = config.sections.hero?.content as Record<string, unknown> | undefined;



  const normalizeText = (value: unknown, fallback: string) => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const normalizeUrl = (value: unknown, fallback: string = '') => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const heroTitle = normalizeText(overrides?.['title'], config.content.hero.title);

  const heroSubtitle = normalizeText(overrides?.['subtitle'], config.content.hero.subtitle);

  const heroPrimaryLabel = normalizeText(overrides?.['primaryButton'], config.content.hero.primaryButton);

  const heroSecondaryLabel = normalizeText(overrides?.['secondaryButton'], config.content.hero.secondaryButton);



  const heroPrimaryLink = normalizeUrl(overrides?.['primaryButtonLink']);

  const heroSecondaryLink = normalizeUrl(overrides?.['secondaryButtonLink']);



  const heroImageCandidates = [

    overrides?.['image'],

    overrides?.['bannerImage'],

    config.content.hero.bannerImage,

  ];

  const heroImage = heroImageCandidates

    .map((candidate) => normalizeUrl(candidate))

    .find((candidate) => candidate.length > 0) ?? '';

  const heroBackgroundImage = normalizeUrl(overrides?.['backgroundImage']);

  const heroBackgroundVideo = normalizeUrl(overrides?.['backgroundVideo']);



  const resolveHref = (href: string) => (href.length > 0 ? href : '#');

  const computeLinkProps = (href: string) =>

    /^(https?:)?\/\//i.test(href) ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};



  const primaryHref = resolveHref(heroPrimaryLink);

  const secondaryHref = resolveHref(heroSecondaryLink);

  const primaryLinkProps = computeLinkProps(primaryHref);

  const secondaryLinkProps = computeLinkProps(secondaryHref);



  const containerStyles: Record<string, string> = {

    backgroundSize: 'cover',

    backgroundPosition: 'center',

    backgroundRepeat: 'no-repeat',

  };

  if (heroBackgroundImage && !heroBackgroundVideo) {

    containerStyles.backgroundImage = `url(${heroBackgroundImage})`;

  }



  return (

    <section key="hero" id="hero" className="relative mx-4 sm:mx-6 lg:mx-8">

      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl" style={containerStyles}>

        {!heroBackgroundImage && !heroBackgroundVideo && (

          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800" />

        )}



        {heroBackgroundVideo && (

          <video

            className="absolute inset-0 w-full h-full object-cover"

            src={heroBackgroundVideo}

            autoPlay

            muted

            loop

            playsInline

            aria-hidden="true"

          />

        )}



        {heroImage && (

          <img

            src={heroImage}

            alt={normalizeText(overrides?.['bannerAlt'], 'Hero background')}

            className="absolute inset-0 w-full h-full object-cover opacity-70"

          />

        )}



        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />



        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 px-6">

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">

            <h1

              className="font-bold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-lg"

              style={{ fontSize: config.theme.fontSize?.h1 || '3rem' }}

            >

              {heroTitle}

            </h1>

          </div>



          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">

            <p

              className="text-zinc-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md"

              style={{ fontSize: config.theme.fontSize?.body || '1rem' }}

            >

              {heroSubtitle}

            </p>

          </div>



          {/* Hero Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">

            <a

              className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"

              style={{

                backgroundColor: config.theme.button,

                color: config.theme.text,

              }}

              onMouseEnter={() => setHoveredCard(0)}

              onMouseLeave={() => setHoveredCard(null)}

              href={primaryHref}

              {...primaryLinkProps}

            >

              {heroPrimaryLabel}

            </a>

            <a

              className="px-8 py-4 border-2 border-zinc-300 text-zinc-100 rounded-xl font-semibold hover:bg-white hover:bg-opacity-20 hover:border-zinc-200 transition-all duration-300 transform hover:scale-105"

              onMouseEnter={() => setHoveredCard(1)}

              onMouseLeave={() => setHoveredCard(null)}

              href={secondaryHref}

              {...secondaryLinkProps}

            >

              {heroSecondaryLabel}

            </a>

          </div>

        </div>

      </div>

    </section>

  );

}







      case 'features': {

  const overrides = config.sections.features?.content as Record<string, unknown> | undefined;

  const fallbackItems = config.content.features.items as Record<string, unknown>[];

  const merged = {

    ...config.content.features,

    ...(overrides ?? {}),

  } as { title: string; items?: Record<string, unknown>[] };



  const normalizeText = (value: unknown, fallback: string) => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const normalizeUrl = (value: unknown, fallback: string = '') => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const items = Array.isArray(merged.items) && merged.items.length > 0 ? merged.items : fallbackItems;



  return (

    <section key="features" id="features" className="mx-4 sm:mx-6 lg:mx-8 py-16">

      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">

        <h2

          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"

          style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}

        >

          {normalizeText(merged.title, config.content.features.title)}

        </h2>

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {items.map((feature, index) => {

          const featureRecord = feature as Record<string, unknown>;

          const baseRecord = (fallbackItems[index] ?? {}) as Record<string, unknown>;

          const title = normalizeText(featureRecord['title'], normalizeText(baseRecord['title'], `Feature ${index + 1}`));

          const description = normalizeText(featureRecord['description'], normalizeText(baseRecord['description'], ''));

          const icon = normalizeText(featureRecord['icon'], normalizeText(baseRecord['icon'], '★'));

          const imageUrl = normalizeUrl(featureRecord['image'], normalizeUrl(baseRecord['image']));



          return (

            <div

              key={index}

              className="group p-8 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"

              style={{ animationDelay: `${index * 100}ms` }}

            >

              {imageUrl ? (

                <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">

                  <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />

                </div>

              ) : (

                <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">

                  <span className="text-3xl">{icon}</span>

                </div>

              )}



              <h3

                className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300 text-center"

                style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}

              >

                {title}

              </h3>



              <p

                className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300 text-center mt-2"

                style={{ fontSize: config.theme.fontSize?.body || '1rem' }}

              >

                {description}

              </p>

            </div>

          );

        })}

      </div>

    </section>

  );

}







      case 'services': {

  const overrides = config.sections.services?.content as Record<string, unknown> | undefined;

  const fallbackItems = config.content.services.items as Record<string, unknown>[];

  const merged = {

    ...config.content.services,

    ...(overrides ?? {}),

  } as { title: string; items?: Record<string, unknown>[] };



  const normalizeText = (value: unknown, fallback: string) => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const normalizeUrl = (value: unknown, fallback: string = '') => {

    if (typeof value !== 'string') return fallback;

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : fallback;

  };



  const computeLinkProps = (href: string) =>

    /^(https?:)?\/\//i.test(href) ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};



  const items = Array.isArray(merged.items) && merged.items.length > 0 ? merged.items : fallbackItems;



  return (

    <section key="services" id="services" className="mx-4 sm:mx-6 lg:mx-8 py-16">

      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">

        <h2

          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"

          style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}

        >

          {normalizeText(merged.title, config.content.services.title)}

        </h2>

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {items.map((service, index) => {

          const serviceRecord = service as Record<string, unknown>;

          const baseRecord = (fallbackItems[index] ?? {}) as Record<string, unknown>;

          const title = normalizeText(serviceRecord['title'], normalizeText(baseRecord['title'], `Serviço ${index + 1}`));

          const description = normalizeText(serviceRecord['description'], normalizeText(baseRecord['description'], ''));

          const icon = normalizeText(serviceRecord['icon'], normalizeText(baseRecord['icon'], '⚙'));

          const imageUrl = normalizeUrl(serviceRecord['image'], normalizeUrl(baseRecord['image']));

          const link = normalizeUrl(serviceRecord['link'], normalizeUrl(baseRecord['link']));

          const featuresList = (

            Array.isArray(serviceRecord['features']) && serviceRecord['features'].length > 0

              ? serviceRecord['features']

              : Array.isArray(baseRecord['features'])

                ? baseRecord['features']

                : []

          ) as unknown[];



          return (

            <div

              key={index}

              className="group p-8 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"

              style={{ animationDelay: `${index * 100}ms` }}

            >

              {imageUrl ? (

                <div className="mb-4 overflow-hidden rounded-xl border border-zinc-800">

                  <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />

                </div>

              ) : (

                <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">

                  <span className="text-3xl">{icon}</span>

                </div>

              )}



              <h3

                className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300 text-center"

                style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}

              >

                {title}

              </h3>



              <p

                className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300 text-center mt-2"

                style={{ fontSize: config.theme.fontSize?.body || '1rem' }}

              >

                {description}

              </p>



              {featuresList.length > 0 && (

                <ul className="mt-4 space-y-1 text-sm text-zinc-300">

                  {featuresList.map((featureItem, featureIndex) => (

                    <li key={featureIndex} className="flex items-center gap-2">

                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                      <span>{normalizeText(featureItem, '')}</span>

                    </li>

                  ))}

                </ul>

              )}



              {link && (

                <a

                  href={link}

                  {...computeLinkProps(link)}

                  className="inline-flex mt-4 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"

                >

                  Saiba mais

                </a>

              )}

            </div>

          );

        })}

      </div>

    </section>

  );

}





      case 'parceiros':
        return (
          <section key="parceiros" id="parceiros" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content.parceiros.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {(config.images as { logos: string[] }).logos.map((logo: string, index: number) => (
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
        );

      case 'instagram':
        return (
          <section key="instagram" id="instagram" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content.instagram.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(config.images as { instagramPosts: string[] }).instagramPosts.map((imageUrl: string, index: number) => (
                imageUrl && imageUrl.trim() !== '' && (
                  <div 
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                      <span className="text-zinc-400 text-4xl">📷</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        );

      case 'blog':
        return (
          <section key="blog" id="blog" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content.blog.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.content.blog.articles.map((post: Record<string, unknown>, index: number) => (
                <article 
                  key={index}
                  className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-400 text-4xl">📝</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300 mb-2"
                      style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                    >
                      {post.title as string}
                    </h3>
                    
                    <p 
                      className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300 mb-4"
                      style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                    >
                      {post.excerpt as string}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 text-sm">{post.date as string}</span>
                      <button 
                        className="text-zinc-300 hover:text-zinc-100 transition-colors duration-300"
                        style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                      >
                        Ler mais →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key="cta" id="cta" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 rounded-2xl p-12 border border-zinc-700">
                <h2 
                  className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-6"
                  style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
                >
                  {config.content.cta.title}
                </h2>
                
                <p 
                  className="text-zinc-300 mb-8 max-w-2xl mx-auto"
                  style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                >
                  {config.content.cta.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  <button 
                    className="px-8 py-4 border-2 border-zinc-300 text-zinc-100 rounded-xl font-semibold hover:bg-white hover:bg-opacity-20 hover:border-zinc-200 transition-all duration-300 transform hover:scale-105"
                    onMouseEnter={() => setHoveredCard(3)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {config.content.cta.secondaryButton}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'stats':
        return (
          <section key="stats" id="stats" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                Estatísticas
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {config.content.stats.items.map((stat: Record<string, unknown>, index: number) => (
                <div 
                  key={index}
                  className="text-center p-6 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="font-bold text-zinc-100 mb-2"
                    style={{ fontSize: config.theme.fontSize?.h1 || '3rem' }}
                  >
                    {stat.value as string}
                  </div>
                  <div 
                    className="text-zinc-400"
                    style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                  >
                    {stat.label as string}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'carrossels':
        return (
          <section key="carrossels" id="carrossels" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content.carrossels.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.content.carrossels.items.map((carrossel: Record<string, unknown>, index: number) => (
                <div 
                  key={index}
                  className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-400 text-4xl">🎠</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300 mb-2"
                      style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                    >
                      {carrossel.title as string}
                    </h3>
                    
                    <p 
                      className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                      style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                    >
                      {carrossel.description as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'certificacoes':
  return (
          <section key="certificacoes" id="certificacoes" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content.certificacoes.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.content.certificacoes.items.map((certificacao: Record<string, unknown>, index: number) => (
                <div 
                  key={index}
                  className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
                    <span className="text-zinc-400 text-4xl">🏆</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="font-semibold text-zinc-100 group-hover:text-zinc-50 transition-colors duration-300 mb-2"
                      style={{ fontSize: config.theme.fontSize?.h3 || '1.5rem' }}
                    >
                      {certificacao.title as string}
                    </h3>
                    
                    <p 
                      className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300"
                      style={{ fontSize: config.theme.fontSize?.body || '1rem' }}
                    >
                      {certificacao.description as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'icones-flutuantes':
        return (
          <section key="icones-flutuantes" id="icones-flutuantes" className="mx-4 sm:mx-6 lg:mx-8 py-16">
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-12">
              <h2 
                className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent"
                style={{ fontSize: config.theme.fontSize?.h2 || '2.25rem' }}
              >
                {config.content['icones-flutuantes'].title}
              </h2>
        </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {config.content['icones-flutuantes'].items.map((item: Record<string, unknown>, index: number) => (
        <a
                  key={index}
                  href={item.url as string}
          target="_blank"
          rel="noopener noreferrer"
                  className="group w-16 h-16 border border-zinc-800 rounded-full flex items-center justify-center hover:border-zinc-700 transition-all duration-300 transform hover:scale-110"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-zinc-400 group-hover:text-zinc-200 text-2xl transition-colors duration-300">
                    {item.icon as string}
                  </span>
                </a>
              ))}
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer key="footer" id="footer" className="bg-zinc-900 border-t border-zinc-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo */}
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-zinc-800">R</span>
                    </div>
                    <span className="text-xl font-bold text-zinc-100">Rapidus</span>
                  </div>
                  <p className="text-zinc-400 max-w-md">
                    Soluções tecnológicas inovadoras para o seu negócio.
                  </p>
                </div>
                
                {/* Links */}
                <div>
                  <h3 className="text-zinc-100 font-semibold mb-4">Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#hero" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Início</a></li>
                    <li><a href="#features" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Serviços</a></li>
                    <li><a href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Sobre</a></li>
                    <li><a href="#contact" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">Contato</a></li>
                  </ul>
                </div>
                
                {/* Social */}
                <div>
                  <h3 className="text-zinc-100 font-semibold mb-4">Redes Sociais</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                      <span className="text-xl">📱</span>
                    </a>
                    <a href="#" className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                      <span className="text-xl">📧</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
                <p className="text-zinc-400">
                  © 2024 Rapidus. Todos os direitos reservados.
                </p>
              </div>
            </div>
      </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12" style={{ fontFamily: config.theme.font }}>
      {/* Renderizar seções na ordem definida */}
      {normalizedSections.map(({ key }) => renderSection(key))}
    </div>
  );
}