import { z } from 'zod';

export type SectionKey = 
  | 'hero' | 'features' | 'services' | 'parceiros' | 'instagram' | 'blog' | 'cta' | 'stats' | 'header' | 'footer' | 'advanced';

export const SiteConfigSchema = z.object({
  sections: z.record(z.enum([
    'hero', 'features', 'services', 'parceiros', 'instagram', 'blog', 'cta', 'stats', 'header', 'footer', 'advanced'
  ]), z.object({
    enabled: z.boolean(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    content: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      primaryButton: z.string().optional(),
      secondaryButton: z.string().optional()
    }).optional(),
    style: z.object({
      primaryButtonColor: z.string().optional(),
      titleSize: z.string().optional()
    }).optional()
  })),
  theme: z.object({
    primary: z.string(),
    secondary: z.string(),
    button: z.string(),
    background: z.string(),
    text: z.string(),
    font: z.string(),
    fontSize: z.object({
      h1: z.string(),
      h2: z.string(),
      h3: z.string(),
      body: z.string()
    }),
    header: z.object({
      backgroundColor: z.string(),
      textColor: z.string(),
      borderColor: z.string()
    }).optional(),
    footer: z.object({
      backgroundColor: z.string(),
      textColor: z.string(),
      borderColor: z.string()
    }).optional()
  }),
  content: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      primaryButton: z.string(),
      secondaryButton: z.string(),
      bannerImage: z.string().optional(),
      bannerAlt: z.string().optional()
    }),
    features: z.object({
      title: z.string(),
      items: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string()
      }))
    }),
    services: z.object({
      title: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        features: z.array(z.string())
      }))
    }),
    parceiros: z.object({
      title: z.string(),
      subtitle: z.string(),
      logos: z.array(z.string())
    }),
    instagram: z.object({
      title: z.string(),
      subtitle: z.string(),
      handle: z.string(),
      posts: z.array(z.object({
        caption: z.string(),
        image: z.string()
      }))
    }),
    blog: z.object({
      title: z.string(),
      subtitle: z.string(),
      articles: z.array(z.object({
        title: z.string(),
        category: z.string(),
        excerpt: z.string(),
        date: z.string(),
        image: z.string()
      }))
    }),
    cta: z.object({
      title: z.string(),
      subtitle: z.string(),
      primaryButton: z.string(),
      secondaryButton: z.string()
    }),
    stats: z.object({
      items: z.array(z.object({
        value: z.string(),
        label: z.string()
      }))
    })
  }),
  images: z.object({
    logos: z.array(z.string()),
    blogThumbnails: z.array(z.string()),
    instagramPosts: z.array(z.string()),
    heroBackground: z.string().optional(),
    serviceImages: z.array(z.string()).optional(),
    featureImages: z.array(z.string()).optional()
  }),
  header: z.object({
    logo: z.object({
      text: z.string(),
      image: z.string(),
      useImage: z.boolean()
    }),
    menu: z.object({
      items: z.array(z.object({
        label: z.string(),
        url: z.string(),
        enabled: z.boolean()
      }))
    }),
    loginButton: z.object({
      enabled: z.boolean(),
      text: z.string(),
      url: z.string()
    })
  }).optional(),
  footer: z.object({
    socialMedia: z.object({
      instagram: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      whatsapp: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      linkedin: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      facebook: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      twitter: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() })
    }),
    copyright: z.string(),
    links: z.object({
      privacyPolicy: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      termsOfUse: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() }),
      contact: z.object({ enabled: z.boolean(), url: z.string(), label: z.string() })
    })
  }).optional(),
  advanced: z.object({
    tracking: z.object({
      googleAnalytics: z.object({ enabled: z.boolean(), id: z.string() }),
      facebookPixel: z.object({ enabled: z.boolean(), id: z.string() }),
      googleTagManager: z.object({ enabled: z.boolean(), id: z.string() })
    }),
    chat: z.object({
      whatsapp: z.object({ enabled: z.boolean(), number: z.string(), message: z.string() }),
      liveChat: z.object({ enabled: z.boolean(), provider: z.string(), id: z.string() })
    }),
    seo: z.object({
      metaTitle: z.string(),
      metaDescription: z.string(),
      metaKeywords: z.string()
    })
  }).optional()
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const defaultConfig: SiteConfig = {
  sections: {
    hero: { enabled: true },
    features: { enabled: true },
    services: { enabled: true },
    parceiros: { enabled: true },
    instagram: { enabled: true },
    blog: { enabled: true },
    cta: { enabled: true },
    stats: { enabled: true },
    header: { enabled: true },
    footer: { enabled: true },
    advanced: { enabled: true }
  },
  theme: {
    primary: '#0b2743',
    secondary: '#2AAA48',
    button: '#2E6BD6',
    background: '#0a0a0a',
    text: '#ffffff',
    font: 'Inter',
    fontSize: {
      h1: '3rem',
      h2: '2.25rem',
      h3: '1.5rem',
      body: '1rem'
    }
  },
  content: {
    hero: {
      title: 'Rapidus',
      subtitle: 'Soluções digitais rápidas e eficientes para impulsionar seu negócio no mundo digital.',
      primaryButton: 'Começar Agora',
      secondaryButton: 'Saiba Mais',
      bannerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bannerAlt: 'Banner principal - Tecnologia e inovação'
    },
    features: {
      title: 'Nossos Diferenciais',
      items: [
        {
          icon: '⚡',
          title: 'Velocidade',
          description: 'Desenvolvimento rápido e eficiente, entregando resultados em tempo recorde.'
        },
        {
          icon: '🎯',
          title: 'Precisão',
          description: 'Soluções personalizadas que atendem exatamente às necessidades do seu negócio.'
        },
        {
          icon: '🚀',
          title: 'Inovação',
          description: 'Tecnologias de ponta para manter seu negócio sempre à frente da concorrência.'
        }
      ]
    },
    services: {
      title: 'Nossos Serviços',
      items: [
        {
          title: 'Desenvolvimento Web',
          description: 'Sites modernos, responsivos e otimizados para conversão.',
          features: ['Sites institucionais', 'E-commerce', 'Landing pages']
        },
        {
          title: 'Aplicações Mobile',
          description: 'Apps nativos e híbridos para iOS e Android.',
          features: ['Apps empresariais', 'E-commerce mobile', 'Apps de produtividade']
        }
      ]
    },
    parceiros: {
      title: 'Nossos Parceiros',
      subtitle: 'Trabalhamos com empresas líderes de mercado para entregar soluções de excelência.',
      logos: ['LOGO 1', 'LOGO 2', 'LOGO 3', 'LOGO 4', 'LOGO 5', 'LOGO 6']
    },
    instagram: {
      title: 'Siga-nos no Instagram',
      subtitle: 'Acompanhe nosso dia a dia e veja projetos incríveis em tempo real.',
      handle: '@rapidus_oficial',
      posts: [
        { caption: "Vistoria completa realizada", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
        { caption: "Inspeção técnica detalhada", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
        { caption: "Relatório de vistoria", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
        { caption: "Veículo aprovado", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" }
      ]
    },
    blog: {
      title: 'Últimas do Blog',
      subtitle: 'Artigos sobre tecnologia, tendências e insights do mercado digital.',
      articles: [
        {
          title: 'Como Preparar seu Veículo para a Vistoria',
          category: 'Dicas',
          excerpt: 'Dicas essenciais para garantir que seu veículo passe na vistoria sem problemas.',
          date: '15 Jan 2024',
          image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          title: 'Sinais de que seu Carro Precisa de Vistoria',
          category: 'Segurança',
          excerpt: 'Identifique os sinais que indicam a necessidade de uma inspeção técnica.',
          date: '10 Jan 2024',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        },
        {
          title: 'Vistoria Digital: O Futuro da Inspeção Veicular',
          category: 'Tecnologia',
          excerpt: 'Como a tecnologia está revolucionando o processo de vistoria de veículos.',
          date: '05 Jan 2024',
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        }
      ]
    },
    cta: {
      title: 'Pronto para Transformar seu Negócio?',
      subtitle: 'Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer no mundo digital.',
      primaryButton: 'Solicitar Orçamento',
      secondaryButton: 'Ver Portfólio'
    },
    stats: {
      items: [
        { value: '150+', label: 'Projetos Entregues' },
        { value: '98%', label: 'Satisfação' },
        { value: '24/7', label: 'Suporte' },
        { value: '5+', label: 'Anos de Experiência' }
      ]
    }
  },
  images: {
    logos: ['LOGO 1', 'LOGO 2', 'LOGO 3', 'LOGO 4', 'LOGO 5', 'LOGO 6'],
    blogThumbnails: ['📝', '📱', '🚀'],
    instagramPosts: ['📸', '📸', '📸', '📸'],
    heroBackground: undefined
  }
};

export async function loadSiteConfig(): Promise<SiteConfig> {
  try {
    if (process.env.ALLOW_ADMIN_WRITE === 'true') {
      const fs = await import('fs/promises');
      const path = await import('path');
      const configPath = path.join(process.cwd(), 'data', 'site.json');
      
      try {
        const data = await fs.readFile(configPath, 'utf-8');
        const parsed = JSON.parse(data);
        return SiteConfigSchema.parse(parsed);
      } catch {
        return defaultConfig;
      }
    }
    return defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<boolean> {
  if (process.env.ALLOW_ADMIN_WRITE !== 'true') {
    return false;
  }

  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const configPath = path.join(process.cwd(), 'data', 'site.json');
    
    // Ensure data directory exists
    const dataDir = path.dirname(configPath);
    await fs.mkdir(dataDir, { recursive: true });
    
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch {
    return false;
  }
}

