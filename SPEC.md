# SPEC.md - LeadFlow v2 Full Specification

## 📋 VISÃO GERAL

**Produto:** LeadFlow - Sistema de Captação de Leads via Google Maps  
**Versão:** 2.0  
**Plataforma:** Web (Next.js) + Mobile (PWA)  
**Stack:** Next.js 14, React, TailwindCSS, Supabase, TypeScript

---

## 🎯 MÓDULOS DO SISTEMA

### 1. CAPTAÇÃO (Google Maps)

#### 1.1 Busca Avançada
- [x] Busca por cidade/estado
- [x] Seleção múltipla de categorias
- [x] Raio de busca (1km - 50km)
- [x] Filtro por avaliação (1-5 estrelas)
- [x] Filtro por quantidade de avaliações

#### 1.2 Resultados
- [x] Lista de empresas com dados completos
- [x] Mapa com marcadores
- [x] Ordenação por nota/distância
- [x] Paginação infinita

#### 1.3 Detalhes
- [x] Place Details (endereço, telefone, horário, fotos)
- [x] WhatsApp direto
- [x] Ligação direta

---

### 2. GESTÃO DE LEADS (CRM)

#### 2.1 Pipeline Kanban
- [x] 5 etapas: Novo → Contato → Proposta → Fechado → Perdido
- [x] Arrastar e soltar
- [x] Customização de etapas
- [x] Cor por etapa

#### 2.2 Dados do Lead
- [x] Valor potencial
- [x] Probabilidade (%)
- [x] Fonte (qual busca)
- [x] Tags e anotações

#### 2.3 Histórico
- [x] Timeline de interações
- [x] Tipos: Ligação, WhatsApp, E-mail, Réunion
- [x] Resultados por interação

#### 2.4 Lembretes
- [x] Data e hora
- [x] Descrição da tarefa
- [x] Notificações

---

### 3. FINANCEIRO

#### 3.1 Controle
- [x] Valor por lead
- [x] Comissão (%)
- [x] Receita total por período
- [x] Metas

#### 3.2 Relatórios
- [x] Conversão por etapa
- [x] Ticket médio
- [x] Tempo médio de conversão

---

### 4. EQUIPE (Multi-usuário)

#### 4.1 Permissões
- [x] Admin: Tudo
- [x] Editor: CRUD leads
- [x] Viewer: Apenasvisualizar

#### 4.2 Atribuição
- [x] Leads distribuidos automaticamente
- [x] round-robin

---

### 5. EXPORTAÇÃO/IMPORTAÇÃO

#### 5.1 Export
- [x] CSV com todos os dados
- [x] XLS com formatação
- [x] JSON para APIs

#### 5.2 Import
- [x] CSV com mapeamento de colunas

---

### 6. AUTOMAÇÕES

#### 6.1 Sequências
- [x]follow-up automático
- [x] Mensagens programadas
- [x] Condições (tempo sem contato, etc)

---

### 7. SEGURANÇA

#### 7.1 Autenticação
- [ ] E-mail/Senha
- [ ] Google OAuth
- [ ] Apple OAuth
- [ ] 2FA (TOTP)

#### 7.2 Dados
- [ ] RLS (Row Level Security)
- [ ] Criptografia de dados sensíveis
- [ ] Backup automático

---

## 🗄️ DATABASE

### Tabelas

```sql
usuarios        -- Cadastro e auth
empresas       -- Leads capturados
pipeline       -- Kanban
interacoes     -- Histórico
equipe         -- Multi-usuário
exportacoes    -- Logs de export
creditos_log   -- Controle de credits
configuracoes  -- Preferências do usuário
```

---

## 🎨 DESIGN SYSTEM

### Cores
- Primary: `#0ea5e9` (cyan-500)
- Secondary: `#8b5cf6` (purple-500)
- Dark: `#0f172a` (slate-900)
- Background: `#f8fafc` (slate-50)
- Success: `#22c55e` (green-500)
- Error: `#ef4444` (red-500)
- Warning: `#f59e0b` (amber-500)

### Tipografia
- Font: Inter
- H1: 48px / Bold
- H2: 36px / Bold
- H3: 24px / Semibold
- Body: 16px / Regular
- Small: 14px / Regular

### Componentes
- Buttons: rounded-lg (8px), shadow
- Cards: rounded-2xl (16px), shadow-sm → shadow on hover
- Inputs: rounded-xl, border-slate-200
- Modals: rounded-2xl, max-w-lg, backdrop-blur

### Animações
- Hover: 200ms ease
- Modal: fade-in 300ms
- Page: slide-up 400ms

---

## 📱 PÁGINAS

1. **Home/Landing** - https://leadflow-v2.vercel.app
2. **Dashboard** - https://leadflow-v2.vercel.app/dashboard
3. **Busca** - https://leadflow-v2.vercel.app/busca
4. **Pipeline** - https://leadflow-v2.vercel.app/pipeline
5. **Leads** - https://leadflow-v2.vercel.app/leads
6. **Configurações** - https://leadflow-v2.vercel.app/config

---

## 🚀 ROADMAP

### Fase 1 (Atual)
- Landing page profissional ✅
- Dashboard com busca ✅
- Pipeline Kanban básico ✅

### Fase 2 (Próxima)
- Autenticação completa
- Banco Supabase
- API Google Maps real
- Pipeline completo
- Histórico de interações

### Fase 3
- Equipe multi-usuário
- Automações
- Relatórios

### Fase 4
- Assinaturas (Stripe)
- White-label
- API pública

---

**Status: Em Desenvolvimento** 🚧