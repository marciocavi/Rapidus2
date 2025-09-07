# 🧪 Guia de Teste - Painel Admin Rapidus

## 🚀 **Como Testar as Funcionalidades Implementadas**

### **1. Acessar o Painel Admin**
- URL: `http://localhost:3000/admin/settings`
- Login: Use as credenciais fake (qualquer email/senha)

### **2. Funcionalidades JÁ IMPLEMENTADAS para Testar**

#### ✅ **Hero Section (Banner Principal)**
**Localização**: Seção "Hero" no painel admin

**Teste 1 - Alterar Conteúdo:**
1. Clique na seção "Hero" na sidebar
2. Altere o "Título Principal" para: "Rapidus Vistoria Digital"
3. Altere o "Subtítulo" para: "Tecnologia avançada para inspeção veicular"
4. Altere o "Botão Primário" para: "Solicitar Vistoria"
5. Altere o "Botão Secundário" para: "Ver Demonstração"
6. Clique em "Salvar"
7. Clique em "Ver Site" para ver as mudanças

**Teste 2 - Alterar Imagem:**
1. Na seção Hero, altere a "URL da Imagem do Banner"
2. Use: `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`
3. Altere o "Texto Alternativo" para: "Vistoria veicular profissional"
4. Salve e veja o resultado

**Teste 3 - Alterar Estilo:**
1. Altere a "Cor do Botão Primário" usando o seletor de cor
2. Altere o "Tamanho do Título" para: "4rem"
3. Altere a "Fonte Principal" para: "Poppins"
4. Salve e veja o resultado

#### ✅ **Features Section (Diferenciais)**
**Localização**: Seção "Features" no painel admin

**Teste 1 - Alterar Conteúdo:**
1. Clique na seção "Features" na sidebar
2. Altere o "Título da Seção" para: "Nossos Diferenciais"
3. Para cada Feature:
   - Altere o ícone (ex: 🔍, ⚡, 🛡️)
   - Altere o título (ex: "Inspeção Completa", "Agilidade", "Segurança")
   - Altere a descrição
4. Salve e veja o resultado

**Teste 2 - Ativar/Desativar:**
1. Use o toggle na sidebar para desativar a seção Features
2. Salve e veja que a seção desaparece do site
3. Reative a seção

#### ✅ **Controle de Seções**
**Localização**: Sidebar esquerda do painel admin

**Teste 1 - Ativar/Desativar Seções:**
1. Use os toggles na sidebar para ativar/desativar:
   - Hero ✅
   - Features ✅
   - Services ✅
   - Parceiros ✅
   - Instagram ✅
   - Blog ✅
   - CTA ✅
   - Stats ✅
2. Salve e veja que as seções aparecem/desaparecem no site

#### ✅ **Tema Global**
**Localização**: Seção "Hero" > Estilo

**Teste 1 - Alterar Cores:**
1. Altere a "Cor do Botão Primário" para: `#2E6BD6`
2. Salve e veja que a cor se aplica globalmente

**Teste 2 - Alterar Tipografia:**
1. Altere a "Fonte Principal" para: "Montserrat"
2. Salve e veja que a fonte se aplica globalmente

### **3. Funcionalidades NÃO IMPLEMENTADAS (Para Implementar)**

#### ❌ **Header/Navbar**
- Alterar logo
- Alterar links do menu
- Alterar cores do header
- Ativar/desativar botão login

#### ❌ **Services Section**
- Editar título da seção
- Editar lista de serviços
- Alterar layout
- Alterar estilo dos cards

#### ❌ **Footer**
- Alterar links de redes sociais
- Alterar texto de direitos autorais
- Alterar cores do footer

#### ❌ **Opções Avançadas**
- Código de rastreamento
- Chat de suporte
- Configurações de SEO

### **4. Como Verificar se Funcionou**

1. **Salvar**: Sempre clique em "Salvar" após fazer alterações
2. **Ver Site**: Use o botão "Ver Site" para abrir o site em nova aba
3. **Recarregar**: Recarregue a página do site para ver as mudanças
4. **Verificar**: Confirme que as alterações aparecem no site

### **5. URLs para Testar**

- **Site Principal**: `http://localhost:3000`
- **Painel Admin**: `http://localhost:3000/admin/settings`
- **Login**: `http://localhost:3000/login`

### **6. Dicas de Teste**

- ✅ **Teste incremental**: Faça uma alteração por vez
- ✅ **Verifique feedback**: Observe as mensagens de sucesso/erro
- ✅ **Teste responsivo**: Verifique em diferentes tamanhos de tela
- ✅ **Teste persistência**: Recarregue a página para ver se as mudanças persistem

---

## 🎯 **Resultado Esperado**

Após testar todas as funcionalidades implementadas, você deve conseguir:
- Alterar completamente o conteúdo da seção Hero
- Modificar os diferenciais da seção Features
- Ativar/desativar qualquer seção do site
- Alterar cores e tipografia globalmente
- Ver as mudanças refletidas imediatamente no site
