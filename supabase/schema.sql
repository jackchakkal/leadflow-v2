-- =============================================
-- BANCO DE DADOS - LeadFlow (Supabase)
-- Tabelas com prefixo p21_
-- =============================================

-- USUARIOS (usuários do sistema)
CREATE TABLE p21_usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    nome VARCHAR(255),
    telefone VARCHAR(20),
    plano VARCHAR(50) DEFAULT 'gratis', -- 'gratis', 'pro', 'enterprise'
    creditos INTEGER DEFAULT 100,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PESQUISAS (pesquisas salvas pelos usuários)
CREATE TABLE p21_pesquisas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES p21_usuarios(id),
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    categorias JSONB DEFAULT '[]',
    quantidade_buscas INTEGER DEFAULT 0,
    ultima_busca_em TIMESTAMP WITH TIME ZONE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EMPRESAS (empresas/leads capturados do Google Maps)
CREATE TABLE p21_empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES p21_usuarios(id),
    
    -- Dados do Google Maps
    place_id VARCHAR(255) UNIQUE,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT,
    cidade VARCHAR(255),
    estado VARCHAR(2),
    telefone VARCHAR(20),
    avaliacao DECIMAL(2,1),
    total_avaliacoes INTEGER,
    site VARCHAR(255),
    categoria VARCHAR(100),
    tipos JSONB DEFAULT '[]',
    horario_funcionamento JSONB,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Dados do LeadFlow
    favoritado BOOLEAN DEFAULT FALSE,
    contactado BOOLEAN DEFAULT FALSE,
    observacoes TEXT,
    etiquetas JSONB DEFAULT '[]',
    
    -- Controle
    primeira_visualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultima_visualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    pesquisa_id UUID REFERENCES p21_pesquisas(id),
    
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPORTACOES (exports/rels)
CREATE TABLE p21_exportacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES p21_usuarios(id),
    pesquisa_id UUID REFERENCES p21_pesquisas(id),
    nome_arquivo VARCHAR(255),
    formato VARCHAR(10), -- 'csv', 'xlsx'
    quantidade_registros INTEGER,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USO_API (controle de creditos)
CREATE TABLE p21_uso_api (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES p21_usuarios(id),
    nome_api VARCHAR(50), -- 'google_maps', 'google_places'
    creditos_usados INTEGER DEFAULT 1,
    tipo_requisicao VARCHAR(50),
    status_resposta VARCHAR(20),
    custo DECIMAL(5,2) DEFAULT 0,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SEGURANÇA (RLS)
-- =============================================

ALTER TABLE p21_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE p21_pesquisas ENABLE ROW LEVEL SECURITY;
ALTER TABLE p21_empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE p21_exportacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE p21_uso_api ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Usuarios veem proprios dados" ON p21_usuarios FOR ALL USING (auth.uid() = id);
CREATE POLICY "Usuarios veem proprias pesquisas" ON p21_pesquisas FOR ALL USING (usuario_id IN (SELECT id FROM p21_usuarios WHERE auth.uid() = id));
CREATE POLICY "Usuarios veem proprias empresas" ON p21_empresas FOR ALL USING (usuario_id IN (SELECT id FROM p21_usuarios WHERE auth.uid() = id));
CREATE POLICY "Usuarios veem proprias exportacoes" ON p21_exportacoes FOR ALL USING (usuario_id IN (SELECT id FROM p21_usuarios WHERE auth.uid() = id));
CREATE POLICY "Usuarios veem proprio uso" ON p21_uso_api FOR ALL USING (usuario_id IN (SELECT id FROM p21_usuarios WHERE auth.uid() = id));

-- Leitura pública de empresas (para compartilhamento)
CREATE POLICY "Empresas visiveis publicamente" ON p21_empresas FOR SELECT USING (true);

-- =============================================
-- ÍNDICES (para performance)
-- =============================================

CREATE INDEX idx_empresas_place_id ON p21_empresas(place_id);
CREATE INDEX idx_empresas_telefone ON p21_empresas(telefone);
CREATE INDEX idx_empresas_categoria ON p21_empresas(categoria);
CREATE INDEX idx_empresas_cidade_estado ON p21_empresas(cidade, estado);
CREATE INDEX idx_empresas_usuario ON p21_empresas(usuario_id);
CREATE INDEX idx_pesquisas_usuario ON p21_pesquisas(usuario_id);
CREATE INDEX idx_uso_api_usuario ON p21_uso_api(usuario_id);
CREATE INDEX idx_uso_api_data ON p21_uso_api(data_criacao DESC);

-- =============================================
-- FUNÇÕES ÚTEIS
-- =============================================

-- Verificar se empresa já existe
CREATE OR REPLACE FUNCTION empresa_existe(p_place_id VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM p21_empresas 
        WHERE place_id = p_place_id
    );
END;
$$ LANGUAGE plpgsql;

-- Buscar empresa por place_id
CREATE OR REPLACE FUNCTION buscar_empresa_por_place_id(p_place_id VARCHAR)
RETURNS TABLE(
    id UUID,
    nome VARCHAR,
    endereco TEXT,
    telefone VARCHAR,
    avaliacao DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT e.id, e.nome, e.endereco, e.telefone, e.avaliacao
    FROM p21_empresas e
    WHERE e.place_id = p_place_id;
END;
$$ LANGUAGE plpgsql;

-- Contar empresas por categoria
CREATE OR REPLACE FUNCTION contar_empresas_por_categoria(p_usuario_id UUID)
RETURNS TABLE(categoria VARCHAR, total BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT e.categoria, COUNT(*)::BIGINT
    FROM p21_empresas e
    WHERE e.usuario_id = p_usuario_id
    GROUP BY e.categoria;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- COMENTÁRIOS
-- =============================================

COMMENT ON TABLE p21_usuarios IS 'Usuários do sistema LeadFlow';
COMMENT ON TABLE p21_pesquisas IS 'Pesquisas salvas pelos usuários';
COMMENT ON TABLE p21_empresas IS 'Empresas/leads capturados do Google Maps';
COMMENT ON TABLE p21_exportacoes IS 'Exportações feitas pelos usuários';
COMMENT ON TABLE p21_uso_api IS 'Registro de uso da API (controle de créditos)';
