import { NextResponse } from 'next/server';
import { assertAssistantEnabled } from '@/config/featureFlags';

// Mapa simples de componentes disponíveis no projeto com props esperadas (superficial)
// TODO: Futuramente, este mapa pode ser gerado dinamicamente em tempo de build.
// Um script poderia escanear o diretório `src/sections`, usar uma ferramenta como
// `react-docgen-typescript` para extrair as props de cada componente de seção
// e gerar este mapa automaticamente. Isso evitaria a dessincronização manual
// entre os componentes reais e os que a IA conhece.

export async function GET() {
  try {
    assertAssistantEnabled();
    const map = {
      HeroBanner: {
        props: ["title", "subtitle", "ctaText", "ctaHref"],
        example: { title: "Bem-vindo", subtitle: "Subtítulo", ctaText: "Saiba mais", ctaHref: "/" },
        path: "src/sections/HeroBanner",
      },
      FeaturesGrid: {
        props: ["items", "title"],
        example: { title: "Destaques", items: [{ icon: "bolt", title: "Rápido", text: "Descrição" }] },
        path: "src/sections/FeaturesGrid",
      },
      Carousel: {
        props: ["slides", "autoplay", "intervalMs"],
        example: { slides: [{ imageUrl: "/img1.jpg", caption: "Slide 1" }], autoplay: true, intervalMs: 5000 },
        path: "src/sections/Carousel",
      },
      Testimonials: {
        props: ["title", "items"],
        example: { title: "Depoimentos", items: [{ name: "Cliente", text: "Excelente!" }] },
        path: "src/sections/Testimonials",
      },
      ContactForm: {
        props: ["recipientEmail"],
        example: { recipientEmail: "contato@empresa.com" },
        path: "src/sections/ContactForm",
      },
    };
    return NextResponse.json({ components: map });
  } catch (e: any) {
    const status = e?.statusCode ?? 404;
    return NextResponse.json({ error: e?.message ?? 'disabled' }, { status });
  }
}


