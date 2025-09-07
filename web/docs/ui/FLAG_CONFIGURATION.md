# Configuração da Flag Modern UI

## Variável de Ambiente

Para ativar/desativar o Modern UI, configure a seguinte variável de ambiente:

```bash
# .env.local
NEXT_PUBLIC_MODERN_ADMIN_UI=1  # Ativa Modern UI
NEXT_PUBLIC_MODERN_ADMIN_UI=0  # Desativa Modern UI (layout original)
```

## Como Funciona

### Flag = 0 (Padrão)
- Usa o layout original do admin
- Mantém todas as funcionalidades existentes
- Sem alterações visuais

### Flag = 1 (Modern UI)
- Ativa o novo Shell com glassmorphism
- Aplica classes CSS modernas (.adm-*)
- Interface com efeitos visuais aprimorados
- Mantém todas as funcionalidades

## Rollback Seguro

Para voltar ao layout original:
1. Altere `NEXT_PUBLIC_MODERN_ADMIN_UI=0`
2. Reinicie o servidor
3. O layout original será restaurado automaticamente

## Arquivos Afetados

- `src/app/admin/layout.tsx` - Importa o CSS moderno
- `src/app/admin/settings/page-modern.tsx` - Versão moderna da página
- `src/components/admin/ui/*` - Componentes modernos
- `src/design/theme/modern-admin.css` - Estilos modernos

## Teste

1. Configure `NEXT_PUBLIC_MODERN_ADMIN_UI=1`
2. Acesse `/admin/settings`
3. Verifique se o layout moderno está ativo
4. Configure `NEXT_PUBLIC_MODERN_ADMIN_UI=0`
5. Verifique se voltou ao layout original
