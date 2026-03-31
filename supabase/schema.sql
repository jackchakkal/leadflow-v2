-- =============================================
-- DATABASE SCHEMA - LeadFlow (Supabase)
-- Tables start with "p20_" (20 para LeadFlow)
-- =============================================

-- USERS (usuários do sistema)
CREATE TABLE p20_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    phone VARCHAR(20),
    plan VARCHAR(50) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
    credits INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEARCHES (pesquisas salvas)
CREATE TABLE p20_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p20_users(id),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    categories JSONB DEFAULT '[]', -- array de categorias
    search_count INTEGER DEFAULT 0,
    last_searched_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- COMPANIES (empresas/leads capturados)
CREATE TABLE p20_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p20_users(id),
    
    -- Dados do Google Maps
    place_id VARCHAR(255) UNIQUE, -- ID único do Google
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(255),
    state VARCHAR(2),
    phone VARCHAR(20),
    rating DECIMAL(2,1),
    reviews INTEGER,
    website VARCHAR(255),
    category VARCHAR(100),
    types JSONB DEFAULT '[]',
    opening_hours JSONB,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    
    -- Dados do LeadFlow
    is_favorited BOOLEAN DEFAULT FALSE,
    is_contacted BOOLEAN DEFAULT FALSE,
    notes TEXT,
    tags JSONB DEFAULT '[]',
    
    -- Kontact tracking
    first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    search_id UUID REFERENCES p20_searches(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PHONES (telefones das empresas - para evitar duplicatas)
CREATE TABLE p20_phones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES p20_companies(id) ON DELETE CASCADE,
    phone VARCHAR(20) NOT NULL,
    phone_type VARCHAR(50), -- 'primary', 'whatsapp', 'mobile', 'landline'
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPORTS (exports/rels)
CREATE TABLE p20_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p20_users(id),
    search_id UUID REFERENCES p20_searches(id),
    filename VARCHAR(255),
    format VARCHAR(10), -- 'csv', 'xlsx'
    record_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API USAGE (controle de credits)
CREATE TABLE p20_api_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p20_users(id),
    api_name VARCHAR(50), -- 'google_maps', 'google_places'
    credits_used INTEGER DEFAULT 1,
    request_type VARCHAR(50), -- 'textsearch', 'nearby', 'details'
    response_status VARCHAR(20), -- 'success', 'error', 'zero_results'
    cost DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE p20_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE p20_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE p20_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE p20_phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE p20_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE p20_api_usage ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can see own data" ON p20_users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can see own searches" ON p20_searches FOR ALL USING (user_id IN (SELECT id FROM p20_users WHERE auth.uid() = id));
CREATE POLICY "Users can see own companies" ON p20_companies FOR ALL USING (user_id IN (SELECT id FROM p20_users WHERE auth.uid() = id));
CREATE POLICY "Users can see own exports" ON p20_exports FOR ALL USING (user_id IN (SELECT id FROM p20_users WHERE auth.uid() = id));
CREATE POLICY "Users can see own usage" ON p20_api_usage FOR ALL USING (user_id IN (SELECT id FROM p20_users WHERE auth.uid() = id));

-- Public read for companies (for now - can be used for lead sharing)
CREATE POLICY "Companies public read" ON p20_companies FOR SELECT USING (true);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_companies_place_id ON p20_companies(place_id);
CREATE INDEX idx_companies_phone ON p20_companies(phone);
CREATE INDEX idx_companies_category ON p20_companies(category);
CREATE INDEX idx_companies_city_state ON p20_companies(city, state);
CREATE INDEX idx_companies_user ON p20_companies(user_id);
CREATE INDEX idx_searches_user ON p20_searches(user_id);
CREATE INDEX idx_phones_company ON p20_phones(company_id);
CREATE INDEX idx_api_usage_user ON p20_api_usage(user_id);
CREATE INDEX idx_api_usage_date ON p20_api_usage(created_at DESC);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Função para verificar se empresa já existe
CREATE OR REPLACE FUNCTION company_exists(p_place_id VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM p20_companies 
        WHERE place_id = p_place_id
    );
END;
$$ LANGUAGE plpgsql;

-- Função para buscar empresa por place_id
CREATE OR REPLACE FUNCTION get_company_by_place(p_place_id VARCHAR)
RETURNS TABLE(
    id UUID,
    name VARCHAR,
    address TEXT,
    phone VARCHAR,
    rating DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.name, c.address, c.phone, c.rating
    FROM p20_companies c
    WHERE c.place_id = p_place_id;
END;
$$ LANGUAGE plpgsql;

-- Função para contar empresas por categoria
CREATE FUNCTION get_company_count_by_category(p_user_id UUID)
RETURNS TABLE(category VARCHAR, total BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT c.category, COUNT(*)::BIGINT
    FROM p20_companies c
    WHERE c.user_id = p_user_id
    GROUP BY c.category;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- STORAGE BUCKET (para uploads)
-- =============================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('leadflow-exports', 'leadflow-exports', true)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE p20_users IS 'Usuários do sistema LeadFlow';
COMMENT ON TABLE p20_searches IS 'Pesquisas salvas pelos usuários';
COMMENT ON TABLE p20_companies IS 'Empresas/leads capturados do Google Maps';
COMMENT ON TABLE p20_phones IS 'Telefones das empresas (para evitar duplicatas)';
COMMENT ON TABLE p20_exports IS 'Exportações feitas pelos usuários';
COMMENT ON TABLE p20_api_usage IS 'Registro de uso da API (controle de credits)';
