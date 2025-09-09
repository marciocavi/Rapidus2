# 🧪 Ambiente de Testes - Rapidus

## 📋 Visão Geral

Este documento descreve a estrutura de ambientes de teste implementada para o projeto Rapidus, garantindo desenvolvimento seguro e deploy controlado.

## 🏗️ Arquitetura de Ambientes

### **Desenvolvimento (Development)**
- **Branch**: `feat/*` (feature branches)
- **URL**: `http://localhost:3000`
- **Configuração**: `.env.local`
- **Propósito**: Desenvolvimento de features

### **Staging (Testes)**
- **Branch**: `staging`
- **URL**: `http://localhost:3000` (com NODE_ENV=staging)
- **Configuração**: `.env.staging`
- **Propósito**: Testes de integração e validação

### **Produção (Production)**
- **Branch**: `main`
- **URL**: `https://rapidus.com`
- **Configuração**: `.env.production`
- **Propósito**: Ambiente final para usuários

## 🔄 Fluxo de Desenvolvimento

### **1. Desenvolvimento de Feature**
```bash
# Criar branch de feature
git checkout -b feat/nova-funcionalidade

# Desenvolver localmente
npm run dev

# Testes locais
npm run typecheck
npm run lint
```

### **2. Deploy para Staging**
```bash
# Mudar para branch staging
git checkout staging

# Merge da feature
git merge feat/nova-funcionalidade

# Deploy para staging
npm run deploy:staging
```

### **3. Validação em Staging**
- ✅ Testes funcionais
- ✅ Testes de performance
- ✅ Validação de UI/UX
- ✅ Testes de integração

### **4. Deploy para Produção**
```bash
# Merge para main
git checkout main
git merge staging

# Deploy para produção
npm run deploy:production
```

## 🛠️ Scripts Disponíveis

### **Desenvolvimento**
- `npm run dev` - Ambiente de desenvolvimento
- `npm run dev:staging` - Desenvolvimento com configurações de staging

### **Build**
- `npm run build` - Build padrão
- `npm run build:staging` - Build para staging
- `npm run build:production` - Build para produção

### **Deploy**
- `npm run deploy:staging` - Deploy para staging
- `npm run deploy:production` - Deploy para produção

### **Qualidade**
- `npm run lint` - Verificação de código
- `npm run typecheck` - Verificação de tipos
- `npm run test` - Testes automatizados

## 🔒 Variáveis de Ambiente

### **Staging**
```bash
NODE_ENV=staging
NEXT_PUBLIC_MODERN_ADMIN_UI=1
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### **Produção**
```bash
NODE_ENV=production
NEXT_PUBLIC_MODERN_ADMIN_UI=0
NEXT_PUBLIC_ENABLE_DEBUG=false
```

## ⚠️ Regras e Boas Práticas

### **✅ Permitido**
- Desenvolvimento em feature branches
- Testes em staging
- Deploy controlado para produção

### **❌ Proibido**
- Deploy direto para produção
- Commits diretos na branch main
- Desenvolvimento sem testes

## 🚨 Troubleshooting

### **Problemas Comuns**
1. **Build falha**: Verificar `npm run typecheck` e `npm run lint`
2. **Staging não funciona**: Verificar variáveis de ambiente
3. **Deploy falha**: Verificar se está na branch correta

### **Comandos de Emergência**
```bash
# Rollback rápido
git checkout main
git reset --hard HEAD~1

# Limpar cache
rm -rf .next
npm run build
```

## 📞 Suporte

Para dúvidas sobre o ambiente de testes, consulte:
- Este documento
- Logs do sistema
- Equipe de desenvolvimento
