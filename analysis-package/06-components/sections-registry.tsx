import React from 'react';
import Hero from '../../sections/Hero';
import Features from '../../sections/Features';
import Services from '../../sections/Services';
import Parceiros from '../../sections/Parceiros';
import Instagram from '../../sections/Instagram';
import Blog from '../../sections/Blog';
import CTA from '../../sections/CTA';
import Stats from '../../sections/Stats';
import Carrossels from '../../sections/Carrossels';
import Certificacoes from '../../sections/Certificacoes';
import IconesFlutuantes from '../../sections/IconesFlutuantes';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';

export type SectionKey = "hero" | "features" | "services" | "parceiros" | "instagram" | "blog" | "cta" | "stats" | "carrossels" | "certificacoes" | "icones-flutuantes" | "header" | "footer";

// Componentes stub temporários para não quebrar o build
const HeroStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <section 
      className="relative min-h-[400px] flex items-center justify-center"
      style={{ 
        backgroundColor: style?.backgroundColor as string,
        backgroundImage: content?.backgroundImage ? `url(${content.backgroundImage as string})` : undefined
      }}
    >
      <div className="text-center z-10">
        <h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || "Hero Title"}
        </h1>
        <p 
          className="text-lg md:text-xl mb-8"
          style={{ 
            color: style?.subtitleColor as string,
            fontSize: style?.subtitleSize as string
          }}
        >
          {content?.subtitle as string || "Hero subtitle"}
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            className="px-6 py-3 rounded-lg font-medium"
            style={{ 
              backgroundColor: style?.primaryButtonColor as string,
              color: style?.primaryButtonTextColor as string
            }}
          >
            {content?.primaryButton as string || "Primary Button"}
          </button>
          <button 
            className="px-6 py-3 rounded-lg font-medium border"
            style={{ 
              backgroundColor: style?.secondaryButtonColor as string,
              color: style?.secondaryButtonTextColor as string,
              borderColor: style?.secondaryButtonColor as string
            }}
          >
            {content?.secondaryButton as string || "Secondary Button"}
          </button>
        </div>
      </div>
    </section>
  );
};

const FeaturesStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  const items = content?.items as Array<Record<string, unknown>> | undefined;
  
  return (
    <section 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || "Features"}
        </h2>
        <p 
          className="text-lg"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || "Feature subtitle"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(items || [
          { title: "Feature 1", description: "Description for feature 1" },
          { title: "Feature 2", description: "Description for feature 2" },
          { title: "Feature 3", description: "Description for feature 3" }
        ]).slice(0, 3).map((feature: Record<string, unknown>, i: number) => (
          <div key={i} className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title as string}</h3>
            <p className="text-zinc-400">{feature.description as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ServicesStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  const items = content?.items as Array<Record<string, unknown>> | undefined;
  
  return (
    <section 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || "Services"}
        </h2>
        <p 
          className="text-lg"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || "Service subtitle"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(items || [
          { title: "Service 1", description: "Description for service 1" },
          { title: "Service 2", description: "Description for service 2" },
          { title: "Service 3", description: "Description for service 3" }
        ]).slice(0, 3).map((service: Record<string, unknown>, i: number) => (
          <div key={i} className="p-8 border border-zinc-800 rounded-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔧</span>
            </div>
            <h3 className="font-semibold text-zinc-100 mb-2">{service.title as string}</h3>
            <p className="text-zinc-400">{service.description as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const PartnersStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <div 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || props.title as string || "Partners"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || props.subtitle as string || "Nossos parceiros de confiança"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {((content?.items as Array<Record<string, unknown>>) || [
          { name: "Partner 1", logo: "🏢" },
          { name: "Partner 2", logo: "🏭" },
          { name: "Partner 3", logo: "🏪" },
          { name: "Partner 4", logo: "🏬" }
        ]).slice(0, 4).map((partner: Record<string, unknown>, i: number) => (
          <div key={i} className="text-center p-4">
            <div className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">{partner.logo as string}</span>
            </div>
            <p className="text-sm text-zinc-300">{partner.name as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const InstagramStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <div 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || props.title as string || "Instagram"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || props.subtitle as string || "Siga-nos no Instagram"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {((content?.items as Array<Record<string, unknown>>) || [
          { image: "📸", caption: "Post 1" },
          { image: "📷", caption: "Post 2" },
          { image: "🖼️", caption: "Post 3" },
          { image: "🎨", caption: "Post 4" }
        ]).slice(0, 4).map((post: Record<string, unknown>, i: number) => (
          <div key={i} className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
            <span className="text-4xl">{post.image as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <div 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || props.title as string || "Blog"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || props.subtitle as string || "Últimas notícias e artigos"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {((content?.items as Array<Record<string, unknown>>) || [
          { title: "Blog Post 1", excerpt: "Excerpt for blog post 1", date: "2024-01-01" },
          { title: "Blog Post 2", excerpt: "Excerpt for blog post 2", date: "2024-01-02" },
          { title: "Blog Post 3", excerpt: "Excerpt for blog post 3", date: "2024-01-03" }
        ]).slice(0, 3).map((post: Record<string, unknown>, i: number) => (
          <article key={i} className="bg-zinc-800 rounded-lg p-6">
            <div className="aspect-video bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{post.title as string}</h3>
            <p className="text-zinc-400 text-sm mb-4">{post.excerpt as string}</p>
            <span className="text-xs text-zinc-500">{post.date as string}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

const CtaStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <div 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div 
        className="text-center max-w-2xl mx-auto"
        style={{
          backgroundColor: style?.backgroundColor as string,
          backgroundImage: content?.backgroundImage ? `url(${content.backgroundImage as string})` : undefined
        }}
      >
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || props.title as string || "Call to Action"}
        </h2>
        <p 
          className="text-lg mb-8"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || props.subtitle as string || "CTA subtitle here"}
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            className="px-8 py-3 rounded-lg font-medium"
            style={{ 
              backgroundColor: style?.primaryButtonColor as string || '#2563EB',
              color: style?.primaryButtonTextColor as string || '#FFFFFF'
            }}
          >
            {content?.primaryButton as string || props.primaryButton as string || "Primary CTA"}
          </button>
          <button 
            className="px-8 py-3 rounded-lg font-medium border"
            style={{ 
              backgroundColor: style?.secondaryButtonColor as string,
              color: style?.secondaryButtonTextColor as string,
              borderColor: style?.secondaryButtonColor as string
            }}
          >
            {content?.secondaryButton as string || props.secondaryButton as string || "Secondary CTA"}
          </button>
        </div>
      </div>
    </div>
  );
};

const StatsStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  const content = props.content as Record<string, unknown> | undefined;
  
  return (
    <div 
      className="py-16"
      style={{ backgroundColor: style?.backgroundColor as string }}
    >
      <div className="text-center mb-12">
        <h2 
          className="text-3xl font-bold mb-4"
          style={{ 
            color: style?.titleColor as string,
            fontSize: style?.titleSize as string
          }}
        >
          {content?.title as string || props.title as string || "Statistics"}
        </h2>
        <p 
          className="text-lg"
          style={{ color: style?.subtitleColor as string }}
        >
          {content?.subtitle as string || props.subtitle as string || "Nossos números"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {((content?.items as Array<Record<string, unknown>>) || [
          { number: "100+", label: "Clientes" },
          { number: "50+", label: "Projetos" },
          { number: "5+", label: "Anos" },
          { number: "24/7", label: "Suporte" }
        ]).slice(0, 4).map((stat: Record<string, unknown>, i: number) => (
          <div key={i} className="text-center">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: style?.titleColor as string }}
            >
              {stat.number as string}
            </div>
            <div 
              className="text-sm"
              style={{ color: style?.subtitleColor as string }}
            >
              {stat.label as string}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarrosselsStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ color: style?.titleColor as string }}
        >
          {props.title as string || "Carrosséis"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {props.subtitle as string || "Carrossel subtitle"}
        </p>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex-shrink-0 w-64 h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎠</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificacoesStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ color: style?.titleColor as string }}
        >
          {props.title as string || "Certificações"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {props.subtitle as string || "Nossas certificações"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((cert) => (
          <div key={cert} className="text-center p-4">
            <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-sm text-zinc-300">Certificação {cert}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const IconesFlutuantesStub = (props: Record<string, unknown>) => {
  const style = props.style as Record<string, unknown> | undefined;
  
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 
          className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl"
          style={{ color: style?.titleColor as string }}
        >
          {props.title as string || "Ícones Flutuantes"}
        </h2>
        <p 
          className="text-zinc-400 text-sm mt-4"
          style={{ color: style?.subtitleColor as string }}
        >
          {props.subtitle as string || "Contato rápido"}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        {[
          { icon: "📱", label: "WhatsApp" },
          { icon: "📞", label: "Telefone" },
          { icon: "✉️", label: "Email" }
        ].map((item, i) => (
          <div key={i} className="w-16 h-16 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeaderStub = () => (
  <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-zinc-900">R</span>
          </div>
          <span className="text-xl font-semibold text-zinc-100">Rapidus</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Home</a>
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Sobre</a>
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Contato</a>
        </nav>
      </div>
    </div>
  </header>
);

const FooterStub = () => (
  <footer className="bg-zinc-900 border-t border-zinc-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-zinc-900">R</span>
            </div>
            <span className="text-xl font-semibold text-zinc-100">Rapidus</span>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            Soluções inovadoras para o seu negócio.
          </p>
        </div>
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100 text-sm">Home</a></li>
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100 text-sm">Sobre</a></li>
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100 text-sm">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Contato</h3>
          <ul className="space-y-2">
            <li className="text-zinc-400 text-sm">📧 contato@rapidus.com</li>
            <li className="text-zinc-400 text-sm">📞 (11) 99999-9999</li>
            <li className="text-zinc-400 text-sm">📍 São Paulo, SP</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
        <p className="text-zinc-400 text-sm">
          © 2024 Rapidus. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export const SectionRegistry: Record<SectionKey, React.ComponentType<any>> = {
  hero: Hero,
  features: Features,
  services: Services,
  parceiros: Parceiros,
  instagram: Instagram,
  blog: Blog,
  cta: CTA,
  stats: Stats,
  carrossels: Carrossels,
  certificacoes: Certificacoes,
  'icones-flutuantes': IconesFlutuantes,
  header: Header,
  footer: Footer,
};