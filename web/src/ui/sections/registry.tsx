// src/ui/sections/registry.tsx
// Mapa central: chave -> componente da seção.
// ATENÇÃO: ajuste os imports para os caminhos reais dos seus componentes de seção.

import React from 'react';

export type SectionKey = "hero" | "features" | "services" | "parceiros" | "instagram" | "blog" | "cta" | "stats" | "carrossels" | "certificacoes" | "icones-flutuantes" | "header" | "footer";

// Componentes stub temporários para não quebrar o build
const HeroStub = (props: any) => (
  <section className="relative w-full h-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-1 px-3">
      <h1 className="font-bold text-white text-sm">
        {props.title || "Transforme sua empresa com tecnologia"}
      </h1>
      <p className="text-slate-200 max-w-xs mx-auto leading-tight text-xs">
        {props.subtitle || "Soluções inovadoras para acelerar seu crescimento digital"}
      </p>
      <div className="flex gap-1">
        <button className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-600 text-white">
          {props.primaryButton || "Começar Agora"}
        </button>
        <button className="px-2 py-0.5 border border-slate-300 text-slate-100 rounded text-xs font-semibold">
          {props.secondaryButton || "Saiba Mais"}
        </button>
      </div>
    </div>
  </section>
);

const FeaturesStub = (props: any) => (
  <section className="py-6 bg-slate-900">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-4">
        <h2 className="font-bold text-white text-lg mb-2">
          {props.title || "Por que escolher a Rapidus?"}
        </h2>
        <p className="text-slate-300 max-w-xl mx-auto text-sm">
          {props.subtitle || "Oferecemos soluções completas para impulsionar seu negócio"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: "⚡", title: "Performance", desc: "Velocidade e eficiência" },
          { icon: "🔒", title: "Segurança", desc: "Proteção avançada" },
          { icon: "📈", title: "Crescimento", desc: "Resultados mensuráveis" }
        ].map((feature, i) => (
          <div key={i} className="p-3 bg-slate-800 rounded-md border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mb-2">
              <span className="text-sm">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-white mb-1 text-sm">{feature.title}</h3>
            <p className="text-slate-300 text-xs">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Services"}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-8 border border-zinc-800 rounded-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔧</span>
          </div>
          <h3 className="font-semibold text-zinc-100 mb-2">Service {i}</h3>
          <p className="text-zinc-400">Description for service {i}</p>
        </div>
      ))}
    </div>
  </div>
);

const PartnersStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Partners"}
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center justify-center p-6 border border-zinc-800 rounded-xl">
          <span className="text-zinc-400 font-medium text-sm">Partner {i}</span>
        </div>
      ))}
    </div>
  </div>
);

const InstagramStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Instagram"}
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-zinc-800">
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400 text-4xl">📷</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Blog"}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <article key={i} className="border border-zinc-800 rounded-xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400 text-4xl">📝</span>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-zinc-100 mb-2">Blog Post {i}</h3>
            <p className="text-zinc-400 mb-4">Excerpt for blog post {i}</p>
            <button className="text-zinc-300 hover:text-zinc-100">Ler mais →</button>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const CtaStub = (props: any) => (
  <div className="py-16">
    <div className="bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800 rounded-2xl p-12 border border-zinc-700 text-center">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-6 text-3xl">
        {props.title || "Call to Action"}
      </h2>
      <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
        {props.subtitle || "CTA subtitle here"}
      </p>
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-4 rounded-xl font-semibold bg-blue-600 text-white">
          {props.primaryButton || "Primary CTA"}
        </button>
        <button className="px-8 py-4 border-2 border-zinc-300 text-zinc-100 rounded-xl font-semibold">
          {props.secondaryButton || "Secondary CTA"}
        </button>
      </div>
    </div>
  </div>
);

const StatsStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        Statistics
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { value: "1,234", label: "Users" },
        { value: "567", label: "Projects" },
        { value: "89", label: "Reviews" },
        { value: "99%", label: "Satisfaction" }
      ].map((stat, i) => (
        <div key={i} className="text-center p-6 border border-zinc-800 rounded-xl">
          <div className="font-bold text-zinc-100 mb-2 text-3xl">{stat.value}</div>
          <div className="text-zinc-400">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const CarrosselsStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Carrosséis"}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-zinc-800 rounded-xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400 text-4xl">🎠</span>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-zinc-100 mb-2">Carrossel {i}</h3>
            <p className="text-zinc-400">Description for carrossel {i}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CertificacoesStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Certificações"}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-zinc-800 rounded-xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400 text-4xl">🏆</span>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-zinc-100 mb-2">Certificação {i}</h3>
            <p className="text-zinc-400">Description for certificação {i}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const IconesFlutuantesStub = (props: any) => (
  <div className="py-16">
    <div className="text-center mb-12">
      <h2 className="font-semibold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent text-3xl">
        {props.title || "Ícones Flutuantes"}
      </h2>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      {["📱", "📧", "💬", "📞"].map((icon, i) => (
        <div key={i} className="w-16 h-16 border border-zinc-800 rounded-full flex items-center justify-center">
          <span className="text-zinc-400 text-2xl">{icon}</span>
        </div>
      ))}
    </div>
  </div>
);

const HeaderStub = (props: any) => (
  <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-zinc-800">R</span>
          </div>
          <span className="text-xl font-bold text-zinc-100">Rapidus</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Início</a>
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Serviços</a>
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Sobre</a>
          <a href="#" className="text-zinc-300 hover:text-zinc-100">Contato</a>
        </nav>
        <button className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white">
          Solicitar Orçamento
        </button>
      </div>
    </div>
  </header>
);

const FooterStub = (props: any) => (
  <footer className="bg-zinc-900 border-t border-zinc-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100">Início</a></li>
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100">Serviços</a></li>
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100">Sobre</a></li>
            <li><a href="#" className="text-zinc-400 hover:text-zinc-100">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-zinc-100 font-semibold mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-zinc-400 hover:text-zinc-100">
              <span className="text-xl">📱</span>
            </a>
            <a href="#" className="text-zinc-400 hover:text-zinc-100">
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

export const SectionRegistry: Record<SectionKey, React.FC<any>> = {
  hero: HeroStub,
  features: FeaturesStub,
  services: ServicesStub,
  parceiros: PartnersStub,
  instagram: InstagramStub,
  blog: BlogStub,
  cta: CtaStub,
  stats: StatsStub,
  carrossels: CarrosselsStub,
  certificacoes: CertificacoesStub,
  'icones-flutuantes': IconesFlutuantesStub,
  header: HeaderStub,
  footer: FooterStub,
};
