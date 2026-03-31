# SPEC COMPLETO - LeadFlow 🚀
## Sistema Profissional de Captação e Gestão de Leads via Google Maps

---

## 📋 RESUMO EXECUTIVO

**Missão:** Criar o maior e mais completo sistema de controle de leads capturados pelo Google Maps do mundo.

**Diferencial:** Não apenas captura leads, mas gerencia TODO o ciclo de vida do lead - do primeiro contato até o fechamento.

---

## 🎯 MÓDULOS DO SISTEMA

### 1. MÓDULO CAPTAÇÃO (Frontend)

#### 1.1 Busca de Leads
- [ ] Busca por cidade/estado
- [ ] Busca por múltiplas categorias simultâneas
- [ ] Busca por raio (km) a partir de um endereço
- [ ] Busca por palavra-chave (ex: "café em sp", "mecânico na Zona Sul")
- [ ] Filtros avançados:
  - Avaliação mínima (1-5 estrelas)
  - Quantidade mínima de avaliações
  - Está aberto agora (horário de funcionamento)
  - Tem WhatsApp
  - Tem site próprio

#### 1.2 Visualização de Resultados
- [ ] Lista de empresas com dados completos
- [ ] Mapa interativo com pinos
- [ ] Visualização em cards
- [ ] Preview rápido ao passar mouse
- [ ] Indicador visual de "já contactado"

#### 1.3 Detalhes da Empresa
- [ ] Todas informações do Google Maps
- [ ] Fotos do estabelecimento
- [ ] Histórico de avaliações
- [ ] Link para perfil Google
- [ ] Link para WhatsApp direto
- [ ] Ligação direta

---

### 2. MÓDULO GESTÃO DE LEADS (CRM)

#### 2.1 Cadastro de Leasd
- [ ] Importação automática do Google Maps
- [ ] Importação manual
- [ ] Importação por CSV/Excel
- [ ] Duplicate detection (por telefone, nome, endereço)
- [ ] Merge de registros duplicados

#### 2.2 Pipeline de Vendas
- [ ] Kanban personalizado por etapa
- [ ] Etapas customizáveis:
  - Novo Lead
  - Primeiro Contato
  - Qualificação
  - Proposta Enviada
  - Negociando
  - Fechado Ganho
  - Fechado Perdido
- [ ] Arastar e soltar entre etapas
- [ ] Tempo em cada etapa
- [ ] automação de transição

#### 2.3 Informações do Lead
- [ ] Dados básicos (nome, telefone, email, endereço)
- [ ] Histórico completo de interações
- [ ] Anotações personalizadas
- [ ] Arquivos anexos
- [ ] Tags e categorias
- [ ] Valor potencial (quanto pode render)
- [ ] Fonte de origem (qual busca gerou)

#### 2.4 Controle de Contactabilidade
- [ ] Status: Não contactado / Em contato / Não atendeu / Indisponível
- [ ] Próximo contato previsto
- [ ] Histórico de todos os contatos
- [ ] Lembretes automáticos
- [ ] Quem contactou (vendedor)

---

### 3. MÓDULO FINANCEIRO

#### 3.1 Controle de Ganhos
- [ ] Valor fechado por lead
- [ ] Valor mensal por cliente
- [ ] Comissões por vendedor
- [ ] Receita por período
- [ ] Gráficos de receita
- [ ] Projeção de receita

#### 3.2 Métricas por Lead
- [ ] Quanto cada lead já gerou
- [ ] Quanto cada lead pode gerar
- [ ] Taxa de conversão por fonte
- [ ] Ticket médio

---

### 4. MÓDULO RELAÇÕES (CRM)

#### 4.1 Histórico de Contatos
- [ ] Data/hora de cada contato
- [ ] Meio de contato (WhatsApp, ligação, email, visita)
- [ ] Quem contactou
- [ ] Resumo da conversa
- [ ] Próximo passo combinado
- [ ] Anexos (prints, áudios, documentos)

#### 4.2 Lembretes e Tarefas
- [ ] Lembretes para follow-up
- [ ] Tarefas vinculadas ao lead
- [ ] Notificações por email/app
- [ ] Automação de lembretes (ex: "ligar em 3 dias")

---

### 5. MÓDULO EXPORTAÇÃO/IMPORTAÇÃO

#### 5.1 Exportação
- [ ] CSV com todos os campos
- [ ] Excel com formatação
- [ ] PDF com relatório
- [ ] Google Sheets direto
- [ ] WhatsApp directo (lista de números)
- [ ] selective (por tag, etapa, data)

#### 5.2 Importação
- [ ] Importar de CSV/Excel
- [ ] Mapear colunas automaticamente
- [ ] Validar dados durante importação
- [ ] Tratar duplicatas na importação

---

### 6. MÓDULO EQUIPE (Multi-usuário)

#### 6.1 Gestão de Vendedores
- [ ] Cadastro de vendedores
- [ ] Atribuir leads por vendedor
- [ ] Ver leads de toda equipe
- [ ] Meta de conversão por vendedor
- [ ] Comissão por vendedor

#### 6.2 Permissões
- [ ] Admin (acesso total)
- [ ] Vendedor (só seus leads)
- [ ] Gestor (equipe + relatórios)
- [ ] Personalizável

---

### 7. MÓDULO RELATÓRIOS E ANÁLISES

#### 7.1 Dashboards
- [ ] Total de leads
- [ ] Leads por estágio
- [ ] Taxa de conversão
- [ ] Receita por período
- [ ] Performance por vendedor
- [ ] Fontes mais eficientes

#### 7.2 Relatórios
- [ ] Relatório de conversão por período
- [ ] Relatório de vendas por vendedor
- [ ] Relatório de origem dos leads
- [ ] Relatório de tempo médio de fechamento
- [ ] Relatório de produtividade
- [ ] Exportar qualquer relatório

---

### 8. MÓDULO AUTOMAÇÕES

#### 8.1 Automação de Contato
- [ ] Mensagem automática no WhatsApp
- [ ] Template de mensagens
- [ ] Envio em massa
- [ ] Sequência de follow-up

#### 8.2 Notificações
- [ ] Email quando lead é atribuído
- [ ] Email quando lead muda de etapa
- [ ] Relatório diário por email
- [ ] Alertas de conversão

---

### 9. MÓDULO GOOGLE MAPS (API)

#### 9.1 Integração
- [ ] Text Search API (busca por texto)
- [ ] Nearby Search API (busca por raio)
- [ ] Place Details API (detalhes)
- [ ] Photo API (fotos)
- [ ] Autocomplete (busca de endereços)

#### 9.2 Cache e Economia
- [ ] Salvar dados no banco (não buscar两次)
- [ ] Controle de créditos
- [ ] Relatório de uso de API
- [ ] Alerta de limite

---

### 10. MÓDULO SEGURANÇA

#### 10.1 Proteção
- [ ] Autenticação (email/senha, Google, Apple)
- [ ] 2FA opcional
- [ ] Backup automático
- [ ] Criptografia de dados sensíveis
- [ ] Logs de auditoria

---

## 📊 BANCO DE DADOS

### Tabelas Principais

```
p21_usuarios
p21_empresas
p21_pesquisas
p21_leads (novo - para CRM)
p21_interacoes (novo - histórico de contatos)
p21_tarefas (novo - lembretes)
p21_vendedores (novo - equipe)
p21_vendas (novo - controle financeiro)
p21_etapas (novo - pipeline customizável)
p21_etiquetas (novo - tags)
```

---

## 🛠️ TECNOLOGIAS

- **Frontend:** Next.js 14 + React + TypeScript + TailwindCSS
- **Backend:** Next.js API Routes
- **Banco:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth + Google OAuth
- **Maps:** Google Places API, Maps JavaScript API
- **WhatsApp:** Twilio ou WhatsApp Business API
- **Email:** Resend ou SendGrid
- **Hospedagem:** Vercel

---

## 📅 ROADMAP

### Fase 1 - MVP (Agora)
- [ ] Busca por cidade/categoria
- [ ] Lista de resultados
- [ ] Salvar empresas no banco
- [ ] Exportar CSV

### Fase 2 - Gestão (Próximas semanas)
- [ ] Cadastro de leads
- [ ] Pipeline Kanban
- [ ] Histórico de contados
- [ ] Anotações

### Fase 3 - Equipe (Depois)
- [ ] Multi-usuário
- [ ] Permissões
- [ ] Atribuição de leads
- [ ] Relatórios por vendedor

### Fase 4 - Automação (Depois)
- [ ] Mensagens automáticas
- [ ] Lembretes
- [ ] Notificações

### Fase 5 - Escala (Futuro)
- [ ] App mobile
- [ ] WhatsApp API
- [ ] Integrações (CRM, Email marketing)

---

## 💰 MODELO DE NEGÓCIOS

### Planos

| Plano | Preço | Leads/Mês | Funcionalidades |
|-------|-------|-----------|-----------------|
| Grátis | R$ 0 | 100 | Busca básica, Exportar CSV |
| Pro | R$ 97/mês | 1.000 | Tudo + Pipeline + Equipe |
| Enterprise | R$ 297/mês | Ilimitado | Tudo + API + Suporte |

---

## 🎯 PRÓXIMO PASSO

1. **Criar banco no Supabase** com schema atualizado
2. **Atualizar frontend** para consumir API real
3. **Integrar Google Maps API**
4. **Deploy na Vercel**
5. **Testar com dados reais**

---

**Squad LeadFlow - Em ação!** 🚀
