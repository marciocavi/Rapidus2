# Script para criar pacote de analise para IA
# Copia arquivos essenciais organizados por categoria

Write-Host "Criando pacote de analise para IA..." -ForegroundColor Green

# Criar pasta principal
$packageDir = "analysis-package"
if (Test-Path $packageDir) {
    Remove-Item -Recurse -Force $packageDir
}
New-Item -ItemType Directory -Path $packageDir | Out-Null

# Funcao para copiar arquivos com estrutura de pastas
function Copy-FileWithStructure {
    param($sourcePath, $destPath)
    
    if (Test-Path $sourcePath) {
        $destDir = Split-Path $destPath -Parent
        if (!(Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copiado: $sourcePath" -ForegroundColor Cyan
    } else {
        Write-Host "Nao encontrado: $sourcePath" -ForegroundColor Yellow
    }
}

Write-Host "`n1. Configuracao Base..." -ForegroundColor Magenta
Copy-FileWithStructure "web/package.json" "$packageDir/01-config/package.json"
Copy-FileWithStructure "web/next.config.mjs" "$packageDir/01-config/next.config.mjs"
Copy-FileWithStructure "web/tailwind.config.ts" "$packageDir/01-config/tailwind.config.ts"
Copy-FileWithStructure "web/tsconfig.json" "$packageDir/01-config/tsconfig.json"
Copy-FileWithStructure "web/.env.local" "$packageDir/01-config/.env.local"
Copy-FileWithStructure "web/env-example.txt" "$packageDir/01-config/env-example.txt"

Write-Host "`n2. Documentacao..." -ForegroundColor Magenta
Copy-FileWithStructure "web/docs/AI_WIZARD_SPEC.md" "$packageDir/02-docs/AI_WIZARD_SPEC.md"
Copy-FileWithStructure "web/docs/PR_TEMPLATE.md" "$packageDir/02-docs/PR_TEMPLATE.md"
Copy-FileWithStructure "web/docs/MANIFEST.md" "$packageDir/02-docs/MANIFEST.md"
Copy-FileWithStructure "web/docs/components-map.md" "$packageDir/02-docs/components-map.md"
Copy-FileWithStructure "web/docs/ai-site-assistant.md" "$packageDir/02-docs/ai-site-assistant.md"

Write-Host "`n3. Arquitetura Core..." -ForegroundColor Magenta
Copy-FileWithStructure "web/src/app/layout.tsx" "$packageDir/03-core/layout.tsx"
Copy-FileWithStructure "web/src/app/page.tsx" "$packageDir/03-core/page.tsx"
Copy-FileWithStructure "web/src/app/globals.css" "$packageDir/03-core/globals.css"
Copy-FileWithStructure "web/src/lib/site-config.ts" "$packageDir/03-core/site-config.ts"
Copy-FileWithStructure "web/src/config/featureFlags.ts" "$packageDir/03-core/featureFlags.ts"

Write-Host "`n4. AI Wizard..." -ForegroundColor Magenta
# Wizard principal
Copy-FileWithStructure "web/src/app/wizard/page.tsx" "$packageDir/04-wizard/page.tsx"
Copy-FileWithStructure "web/src/app/wizard/layout.tsx" "$packageDir/04-wizard/layout.tsx"
Copy-FileWithStructure "web/src/app/wizard/WizardApp.tsx" "$packageDir/04-wizard/WizardApp.tsx"
Copy-FileWithStructure "web/src/app/wizard/README.md" "$packageDir/04-wizard/README.md"

# Estado e utilitarios
Copy-FileWithStructure "web/src/app/wizard/_state/wizardStore.tsx" "$packageDir/04-wizard/_state/wizardStore.tsx"
Copy-FileWithStructure "web/src/app/wizard/_utils/validation.ts" "$packageDir/04-wizard/_utils/validation.ts"
Copy-FileWithStructure "web/src/app/wizard/_utils/debounce.ts" "$packageDir/04-wizard/_utils/debounce.ts"
Copy-FileWithStructure "web/src/app/wizard/_utils/palette.ts" "$packageDir/04-wizard/_utils/palette.ts"
Copy-FileWithStructure "web/src/app/wizard/_utils/instagram.ts" "$packageDir/04-wizard/_utils/instagram.ts"

# Componentes de passos
$stepFiles = @(
    "StepWelcome.tsx", "StepIdentity.tsx", "StepIndustry.tsx", "StepBrand.tsx",
    "StepStyle.tsx", "StepInspiration.tsx", "StepSections.tsx", "StepContacts.tsx",
    "StepPreview.tsx", "StepReview.tsx", "WizardHeader.tsx", "WizardFooter.tsx"
)

foreach ($step in $stepFiles) {
    Copy-FileWithStructure "web/src/app/wizard/components/$step" "$packageDir/04-wizard/components/$step"
}

Write-Host "`n5. APIs..." -ForegroundColor Magenta
Copy-FileWithStructure "web/src/app/api/ai/site/generate/route.ts" "$packageDir/05-apis/ai-site-generate.ts"
Copy-FileWithStructure "web/src/app/api/ai/site/plan/route.ts" "$packageDir/05-apis/ai-site-plan.ts"
Copy-FileWithStructure "web/src/app/api/ai/site/components-map/route.ts" "$packageDir/05-apis/ai-site-components-map.ts"
Copy-FileWithStructure "web/src/app/api/ai/site/apply/route.ts" "$packageDir/05-apis/ai-site-apply.ts"
Copy-FileWithStructure "web/src/app/api/integrations/status/route.ts" "$packageDir/05-apis/integrations-status.ts"
Copy-FileWithStructure "web/src/integrations/secrets.ts" "$packageDir/05-apis/secrets.ts"

Write-Host "`n6. Componentes..." -ForegroundColor Magenta
Copy-FileWithStructure "web/src/components/ai-editor/AIEditor.tsx" "$packageDir/06-components/ai-editor/AIEditor.tsx"
Copy-FileWithStructure "web/src/components/ai-editor/planUtils.ts" "$packageDir/06-components/ai-editor/planUtils.ts"
Copy-FileWithStructure "web/src/components/theme/globalDesign.ts" "$packageDir/06-components/theme/globalDesign.ts"
Copy-FileWithStructure "web/src/ui/sections/registry.tsx" "$packageDir/06-components/sections-registry.tsx"

# Secoes principais
$sections = @("Hero", "Features", "Services", "Blog", "CTA", "Footer", "Header", "Stats", "Instagram", "Parceiros")
foreach ($section in $sections) {
    Copy-FileWithStructure "web/src/sections/$section/index.tsx" "$packageDir/06-components/sections/$section.tsx"
}

Write-Host "`n7. Testes..." -ForegroundColor Magenta
Copy-FileWithStructure "web/tests/ai.editor.utils.spec.ts" "$packageDir/07-tests/ai-editor-utils.spec.ts"
Copy-FileWithStructure "web/tests/api.ai.endpoints.spec.ts" "$packageDir/07-tests/api-ai-endpoints.spec.ts"
Copy-FileWithStructure "web/tests/integrations.status.spec.ts" "$packageDir/07-tests/integrations-status.spec.ts"
Copy-FileWithStructure "web/tests/wizard.spec.ts" "$packageDir/07-tests/wizard.spec.ts"

Write-Host "`n8. Schemas e Tipos..." -ForegroundColor Magenta
Copy-FileWithStructure "web/src/ai/schemas/SitePlan.schema.ts" "$packageDir/08-schemas/SitePlan.schema.ts"
Copy-FileWithStructure "web/src/ai/schemas/LayoutPlan.schema.ts" "$packageDir/08-schemas/LayoutPlan.schema.ts"
Copy-FileWithStructure "web/src/types/analytics.ts" "$packageDir/08-schemas/analytics.ts"
Copy-FileWithStructure "web/src/theme/tokens.ts" "$packageDir/08-schemas/tokens.ts"

Write-Host "`n9. Criando README do pacote..." -ForegroundColor Magenta
$readmeContent = @"
# Pacote de Analise - AI Wizard Project

Este pacote contem os arquivos essenciais para analise completa do projeto AI Wizard.

## Estrutura do Pacote

### 01-config/ - Configuracao Base
- package.json, next.config.mjs, tailwind.config.ts
- Configuracoes TypeScript e ambiente

### 02-docs/ - Documentacao
- AI_WIZARD_SPEC.md: Especificacao completa do wizard
- PR_TEMPLATE.md: Template para pull requests
- MANIFEST.md: Manifesto do projeto

### 03-core/ - Arquitetura Core
- Layout raiz, pagina inicial, estilos globais
- Configuracao do site e feature flags

### 04-wizard/ - AI Wizard Completo
- WizardApp.tsx: Componente principal
- _state/: Gerenciamento de estado (Context API)
- _utils/: Validacao, debounce, utilitarios
- components/: Todos os 10 passos + header/footer

### 05-apis/ - Endpoints
- APIs de geracao, validacao e aplicacao de planos
- Integracao com OpenAI e status

### 06-components/ - Componentes UI
- Editor visual, tema global, registry de secoes
- Componentes de secao (Hero, Features, etc.)

### 07-tests/ - Testes Unitarios
- Testes para editor, APIs e wizard

### 08-schemas/ - Validacao e Tipos
- Schemas Zod, tipos TypeScript, tokens de design

## Contexto Arquitetural

### Decisoes Importantes:
1. Isolamento: Wizard em /wizard/ separado do admin
2. Feature Flags: WIZARD_IA_ONBOARDING para controle
3. Validacao: Dry-run obrigatorio antes de aplicar
4. Fallback: JSON editor original preservado
5. Estado: Context API (minimalismo)

### Tecnologias:
- Next.js 15, React, TypeScript
- TailwindCSS, shadcn/ui, Lucide Icons
- Zod para validacao
- OpenAI para geracao de conteudo
- Vitest para testes

### Status Atual:
- Wizard navegavel com 10 passos
- Validacao basica implementada
- Contraste de inputs corrigido
- Alguns componentes ainda sao stubs
- Testes E2E pendentes

## Proximos Passos Sugeridos:
1. Implementar atalhos Alt+->/Alt+<-
2. Completar componentes stub
3. Adicionar testes E2E
4. Otimizar performance
5. Implementar Salvar rascunho

---
Pacote criado em: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

Set-Content -Path "$packageDir/README.md" -Value $readmeContent -Encoding UTF8

Write-Host "`nPacote criado com sucesso!" -ForegroundColor Green
Write-Host "Localizacao: $packageDir/" -ForegroundColor Cyan
Write-Host "Arquivos: $(Get-ChildItem -Recurse $packageDir | Measure-Object).Count" -ForegroundColor Cyan
Write-Host "`nPronto para envio para analise de IA!" -ForegroundColor Yellow