## Components Map (mock)

Endpoint: `GET /api/ai/site/components-map`

Formato de resposta:

```json
{
  "components": {
    "HeroBanner": { "props": ["title", "subtitle", "ctaText", "ctaHref"], "path": "src/sections/HeroBanner" },
    "FeaturesGrid": { "props": ["items", "title"], "path": "src/sections/FeaturesGrid" },
    "ContactForm": { "props": ["recipientEmail"], "path": "src/sections/ContactForm" }
  }
}
```

Notas:

- É um mapa mockado para desenvolvimento. Será expandido por um scanner seguro.
- Use-o para guiar o `LayoutPlanSchema` ao sugerir `sections[].props` válidos.



