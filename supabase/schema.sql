-- =============================================
-- DATABASE SCHEMA - LeadFlow (Supabase)
-- Tables start with "p21_" (21 para LeadFlow v2)
-- =============================================

-- USERS (usuários do sistema)
CREATE TABLE p21_users (
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
CREATE TABLE p21_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p21_users(id),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    categories JSONB DEFAULT '[]', -- array de categorias
    search_count INTEGER DEFAULT 0,
    last_searched_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- COMPANIES (empresas/leads capturados)
CREATE TABLE p21_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES p21_users(id),
    
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
    search_id UUID REFERENCES p21_searches(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

