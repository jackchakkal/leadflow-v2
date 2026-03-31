-- LeadFlow v2 - Database Schema
-- PostgreSQL + Supabase

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USUARIOS
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    senha_hash TEXT,
    avatar_url TEXT,
    plano TEXT DEFAULT 'gratis' CHECK (plano IN ('gratis', 'pro', 'enterprise')),
    credits INTEGER DEFAULT 100,
    credits_usados INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    ativo BOOLEAN DEFAULT TRUE
);

-- 2. EMPRESAS (Leads capturados)
CREATE TABLE empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    endereco TEXT,
    telefone TEXT,
    nota DECIMAL(2,1) DEFAULT 0,
    avaliacoes INTEGER DEFAULT 0,
    categoria TEXT,
    cidade TEXT,
    estado TEXT,
    place_id TEXT,
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    foto_url TEXT,
    website TEXT,
    horario TEXT,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PIPELINE (Kanban)
CREATE TABLE pipeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    etapa TEXT DEFAULT 'novo' CHECK (etapa IN ('novo', 'contato', 'proposta', 'fechado', 'perdido')),
    valor DECIMAL(12,2) DEFAULT 0,
    probabilidade INTEGER DEFAULT 10,
    observacoes TEXT,
    next_action TEXT,
    next_date TIMESTAMPTZ,
    converted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INTERACOES (Historico)
CREATE TABLE interacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID REFERENCES pipeline(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo TEXT CHECK (tipo IN ('ligacao', 'whatsapp', 'email', 'reuniao', 'nota')),
    descricao TEXT,
    resultado TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EQUIPE (Multi-usuario)
CREATE TABLE equipe (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    membro_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    permissao TEXT DEFAULT 'editor' CHECK (permissao IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EXPORTACOES
CREATE TABLE exportacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    formato TEXT CHECK (formato IN ('csv', 'xlsx', 'json')),
    filtros JSONB,
    total INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CREDITOS Historico
CREATE TABLE creditos_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    acao TEXT NOT NULL,
    quantidade INTEGER,
    custo INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONFIGURACOES do Usuario
CREATE TABLE configuracoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE UNIQUE,
    notificacoes_email BOOLEAN DEFAULT TRUE,
    notificacoes_whatsapp BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS - Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE interacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipe ENABLE ROW LEVEL SECURITY;
ALTER TABLE exportacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;

-- Politicas RLS
CREATE POLICY "usuarios_read" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "empresas_read" ON empresas FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "empresas_insert" ON empresas FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "empresas_update" ON empresas FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "pipeline_read" ON pipeline FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "pipeline_insert" ON pipeline FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "pipeline_update" ON pipeline FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "interacoes_read" ON interacoes FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "interacoes_insert" ON interacoes FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- INDICES
CREATE INDEX idx_empresas_usuario ON empresas(usuario_id);
CREATE INDEX idx_empresas_categoria ON empresas(categoria);
CREATE INDEX idx_pipeline_usuario ON pipeline(usuario_id);
CREATE INDEX idx_pipeline_etapa ON pipeline(etapa);
CREATE INDEX idx_interacoes_pipeline ON interacoes(pipeline_id);
CREATE INDEX idx_equipe_membro ON equipe(membro_id);