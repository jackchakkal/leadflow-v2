-- LeadFlow v2 - Database Schema com dados de DEMONSTRAÇÃO
-- Execute este script no Supabase SQL Editor

-- =====================
-- EXTENSIONS
-- =====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================
-- TABELAS
-- =====================

-- 1. USUARIOS
DROP TABLE IF EXISTS usuarios CASCADE;
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
DROP TABLE IF EXISTS empresas CASCADE;
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
DROP TABLE IF EXISTS pipeline CASCADE;
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
DROP TABLE IF EXISTS interacoes CASCADE;
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
DROP TABLE IF EXISTS equipe CASCADE;
CREATE TABLE equipe (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    membro_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    permissao TEXT DEFAULT 'editor' CHECK (permissao IN ('admin', 'editor', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EXPORTACOES
DROP TABLE IF EXISTS exportacoes CASCADE;
CREATE TABLE exportacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    formato TEXT CHECK (formato IN ('csv', 'xlsx', 'json')),
    filtros JSONB,
    total INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CREDITOS LOG
DROP TABLE IF EXISTS creditos_log CASCADE;
CREATE TABLE creditos_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    acao TEXT NOT NULL,
    quantidade INTEGER,
    custo INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONFIGURACOES
DROP TABLE IF EXISTS configuracoes CASCADE;
CREATE TABLE configuracoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE UNIQUE,
    notificacoes_email BOOLEAN DEFAULT TRUE,
    notificacoes_whatsapp BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDICES
-- =====================
CREATE INDEX idx_empresas_usuario ON empresas(usuario_id);
CREATE INDEX idx_empresas_categoria ON empresas(categoria);
CREATE INDEX idx_pipeline_usuario ON pipeline(usuario_id);
CREATE INDEX idx_pipeline_etapa ON pipeline(etapa);
CREATE INDEX idx_interacoes_pipeline ON interacoes(pipeline_id);
CREATE INDEX idx_equipe_membro ON equipe(membro_id);

-- =====================
-- DADOS DE DEMONSTRAÇÃO
-- =====================

-- Usuário demo
INSERT INTO usuarios (id, email, nome, plano, credits, credits_usados) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'demo@leadflow.com.br', 'Demo User', 'pro', 1000, 150);

-- Empresas demo (20 empresas fake)
INSERT INTO empresas (id, usuario_id, nome, endereco, telefone, nota, avaliacoes, categoria, cidade, estado, lat, lng) VALUES
('11111111-1111-1111-1111-111111111001', '00000000-0000-0000-0000-000000000001', 'Restaurante Sabor Baiano', 'Rua das Flores, 123 - Centro', '(77) 99999-0001', 4.5, 230, 'Restaurantes', 'Barreiras', 'BA', -12.2533, -42.5214),
('11111111-1111-1111-1111-111111111002', '00000000-0000-0000-0000-000000000001', 'Churrascaria Prime', 'Av. Getúlio Vargas, 456 - Sul', '(77) 99999-0002', 4.8, 450, 'Restaurantes', 'Barreiras', 'BA', -12.2611, -42.5100),
('11111111-1111-1111-1111-111111111003', '00000000-0000-0000-0000-000000000001', 'Pizzaria Napoli', 'Rua das Palmeiras, 789 - Norte', '(77) 99999-0003', 4.2, 180, 'Restaurantes', 'Barreiras', 'BA', -12.2455, -42.5300),
('11111111-1111-1111-1111-111111111004', '00000000-0000-0000-0000-000000000001', 'Clínica Saúde Integral', 'Av. Brasil, 101 - Leste', '(77) 99999-0004', 4.8, 150, 'Clínicas', 'Barreiras', 'BA', -12.2700, -42.5150),
('11111111-1111-1111-1111-111111111005', '00000000-0000-0000-0000-000000000001', 'Consultório Dr. Carlos', 'Av. Central, 202 - Centro', '(77) 99999-0005', 4.6, 95, 'Clínicas', 'Barreiras', 'BA', -12.2522, -42.5200),
('11111111-1111-1111-1111-111111111006', '00000000-0000-0000-0000-000000000001', 'Centro Médico Oeste', 'Rua dos Médicos, 303 - Oeste', '(77) 99999-0006', 4.9, 320, 'Clínicas', 'Barreiras', 'BA', -12.2655, -42.5400),
('11111111-1111-1111-1111-111111111007', '00000000-0000-0000-0000-000000000001', 'Dr. João Silva - Dentista', 'Av. Central, 404 - Sul', '(77) 99999-0007', 4.9, 320, 'Dentistas', 'Barreiras', 'BA', -12.2600, -42.5100),
('11111111-1111-1111-1111-111111111008', '00000000-0000-0000-0000-000000000001', 'Oral Care Odontologia', 'Rua do Sorriso, 505 - Norte', '(77) 99999-0008', 4.7, 210, 'Dentistas', 'Barreiras', 'BA', -12.2400, -42.5350),
('11111111-1111-1111-1111-111111111009', '00000000-0000-0000-0000-000000000001', 'Sorriso Dental Clinic', 'Av. Brasil, 606 - Leste', '(77) 99999-0009', 4.5, 145, 'Dentistas', 'Barreiras', 'BA', -12.2722, -42.5180),
('11111111-1111-1111-1111-111111111010', '00000000-0000-0000-0000-000000000001', 'Smart Fit Academia', 'Av. das Nações, 707 - Sul', '(77) 99999-0010', 4.2, 89, 'Academias', 'Barreiras', 'BA', -12.2633, -42.5080),
('11111111-1111-1111-1111-111111111011', '00000000-0000-0000-0000-000000000001', 'Bio Ritmo Fitness', 'Rua do Esporte, 808 - Norte', '(77) 99999-0011', 4.4, 156, 'Academias', 'Barreiras', 'BA', -12.2444, -42.5380),
('11111111-1111-1111-1111-111111111012', '00000000-0000-0000-0000-000000000001', 'Academia Velocity', 'Av. Brasil, 909 - Oeste', '(77) 99999-0012', 4.1, 67, 'Academias', 'Barreiras', 'BA', -12.2688, -42.5450),
('11111111-1111-1111-1111-111111111013', '00000000-0000-0000-0000-000000000001', 'Silva & Associados Advocacia', 'Rua dos Advogados, 111 - Centro', '(77) 99999-0013', 4.6, 45, 'Advogados', 'Barreiras', 'BA', -12.2511, -42.5220),
('11111111-1111-1111-1111-111111111014', '00000000-0000-0000-0000-000000000001', 'Direito Corp Advocacia', 'Av. Getúlio Vargas, 222 - Sul', '(77) 99999-0014', 4.7, 78, 'Advogados', 'Barreiras', 'BA', -12.2599, -42.5120),
('11111111-1111-1111-1111-111111111015', '00000000-0000-0000-0000-000000000001', 'Advocacia Legal', 'Rua da Justiça, 333 - Norte', '(77) 99999-0015', 4.5, 34, 'Advogados', 'Barreiras', 'BA', -12.2422, -42.5320),
('11111111-1111-1111-1111-111111111016', '00000000-0000-0000-0000-000000000001', 'Salão Beleza Prime', 'Av. das Nações, 444 - Sul', '(77) 99999-0016', 4.7, 180, 'Beleza', 'Barreiras', 'BA', -12.2611, -42.5070),
('11111111-1111-1111-1111-111111111017', '00000000-0000-0000-0000-000000000001', 'Studio Beleza', 'Rua da Beleza, 555 - Leste', '(77) 99999-0017', 4.6, 145, 'Beleza', 'Barreiras', 'BA', -12.2711, -42.5190),
('11111111-1111-1111-1111-111111111018', '00000000-0000-0000-0000-000000000001', 'Espaço Feminino', 'Av. Brasil, 666 - Oeste', '(77) 99999-0018', 4.8, 210, 'Beleza', 'Barreiras', 'BA', -12.2666, -42.5420),
('11111111-1111-1111-1111-111111111019', '00000000-0000-0000-0000-000000000001', 'Pet Shop Amigo Fiel', 'Rua dos Pets, 777 - Norte', '(77) 99999-0019', 4.4, 95, 'Pet Shops', 'Barreiras', 'BA', -12.2433, -42.5360),
('11111111-1111-1111-1111-111111111020', '00000000-0000-0000-0000-000000000001', 'Farmácia Popular +', 'Av. Getúlio Vargas, 888 - Centro', '(77) 99999-0020', 4.3, 210, 'Farmácias', 'Barreiras', 'BA', -12.2555, -42.5180);

-- Pipeline demo (10 leads em diferentes etapas)
INSERT INTO pipeline (id, empresa_id, usuario_id, etapa, valor, probabilidade, observacoes) VALUES
('22222222-2222-2222-2222-222222221001', '11111111-1111-1111-1111-111111111001', '00000000-0000-0000-0000-000000000001', 'novo', 5000, 10, 'Cliente em potencial, entrou em contato via site'),
('22222222-2222-2222-2222-222222221002', '11111111-1111-1111-1111-111111111002', '00000000-0000-0000-0000-000000000001', 'contato', 15000, 30, 'Ligou, interessou no serviço de Goldstein'),
('22222222-2222-2222-2222-222222221003', '11111111-1111-1111-1111-111111111004', '00000000-0000-0000-0000-000000000001', 'contato', 8000, 40, 'Agendou ligação para amanhã'),
('22222222-2222-2222-2222-222222221004', '11111111-1111-1111-1111-111111111007', '00000000-0000-0000-0000-000000000001', 'proposta', 25000, 60, 'Enviada proposta de plano odontológico'),
('22222222-2222-2222-2222-222222221005', '11111111-1111-1111-1111-111111111010', '00000000-0000-0000-0000-000000000001', 'novo', 3000, 10, 'Novo lead via busca'),
('22222222-2222-2222-2222-222222221006', '11111111-1111-1111-1111-111111111013', '00000000-0000-0000-0000-000000000001', 'contato', 12000, 25, 'Primeiro contato realizado'),
('22222222-2222-2222-2222-222222221007', '11111111-1111-1111-1111-111111111016', '00000000-0000-0000-0000-000000000001', 'fechado', 6000, 100, 'FECHADO! Contrato assinado', '2026-03-30'),
('22222222-2222-2222-2222-222222221008', '11111111-1111-1111-1111-111111111003', '00000000-0000-0000-0000-000000000001', 'fechado', 8500, 100, 'FECHADO! Negócio fechado', '2026-03-28'),
('22222222-2222-2222-2222-222222221009', '11111111-1111-1111-1111-111111111019', '00000000-0000-0000-0000-000000000001', 'perdido', 0, 0, 'Cliente disse que não precisa no momento'),
('22222222-2222-2222-2222-222222221010', '11111111-1111-1111-1111-111111111012', '00000000-0000-0000-0000-000000000001', 'fechado', 4500, 100, 'FECHADO! Plano mensal');

-- Interações demo
INSERT INTO interacoes (id, pipeline_id, usuario_id, tipo, descricao, resultado) VALUES
('33333333-3333-3333-3333-333333331001', '22222222-2222-2222-2222-222222221002', '00000000-0000-0000-0000-000000000001', 'whatsapp', 'Enviada mensagem presenting o serviço', 'Positivo'),
('33333333-3333-3333-3333-333333331002', '22222222-2222-2222-2222-222222221002', '00000000-0000-0000-0000-000000000001', 'ligacao', 'Ligação de apresentação', 'Interessado, pediu orçamento'),
('33333333-3333-3333-3333-333333331003', '22222222-2222-2222-2222-222222221004', '00000000-0000-0000-0000-000000000001', 'email', 'Enviada proposta por e-mail', 'Aguardando resposta'),
('33333333-3333-3333-3333-333333331004', '22222222-2222-2222-2222-222222221007', '00000000-0000-0000-0000-000000000001', 'reuniao', 'Reunião de fechamento', 'Aceito!'),
('33333333-3333-3333-3333-333333331005', '22222222-2222-2222-2222-222222221009', '00000000-0000-0000-0000-000000000001', 'ligacao', 'Ligação de follow-up', 'Não tem interesse no momento');

-- =====================
-- VERIFICAÇÃO
-- =====================
SELECT 'Usuários: ' || COUNT(*) AS total FROM usuarios;
SELECT 'Empresas: ' || COUNT(*) AS total FROM empresas;
SELECT 'Pipeline: ' || COUNT(*) AS total FROM pipeline;
SELECT 'Interações: ' || COUNT(*) AS total FROM interacoes;

-- Verificar dados
SELECT nome, categoria, nota FROM empresas ORDER BY nota DESC LIMIT 10;
SELECT etapa, COUNT(*) AS total, SUM(valor) AS valor_total FROM pipeline GROUP BY etapa ORDER BY etapa;