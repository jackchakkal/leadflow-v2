import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for the database
export interface Usuario {
  id: string
  email: string
  nome: string
  avatar_url?: string
  plano: 'gratis' | 'pro' | 'enterprise'
  credits: number
  credits_usados: number
  created_at: string
}

export interface Empresa {
  id: string
  usuario_id: string
  nome: string
  endereco?: string
  telefone?: string
  nota: number
  avaliacoes: number
  categoria?: string
  cidade?: string
  estado?: string
  place_id?: string
  lat?: number
  lng?: number
  foto_url?: string
  website?: string
  created_at: string
}

export interface Pipeline {
  id: string
  empresa_id: string
  usuario_id: string
  etapa: 'novo' | 'contato' | 'proposta' | 'fechado' | 'perdido'
  valor: number
  probabilidade: number
  observacoes?: string
  next_action?: string
  next_date?: string
  created_at: string
}

export interface Equipe {
  id: string
  usuario_id: string
  membro_id: string
  permissao: 'admin' | 'editor' | 'viewer'
}

// Helper functions
export async function getUsuario(id: string) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function getEmpresas(usuarioId: string, filtros?: { categoria?: string; cidade?: string; estado?: string }) {
  let query = supabase.from('empresas').select('*').eq('usuario_id', usuarioId)
  if (filtros?.categoria) query = query.eq('categoria', filtros.categoria)
  if (filtros?.cidade) query = query.eq('cidade', filtros.cidade)
  if (filtros?.estado) query = query.eq('estado', filtros.estado)
  return query.order('criado_em', { ascending: false })
}

export async function getPipeline(usuarioId: string) {
  return supabase
    .from('pipeline')
    .select('*, empresas(*)')
    .eq('usuario_id', usuarioId)
    .order('created_at', { ascending: false })
}

export async function createEmpresa(data: Partial<Empresa>) {
  return supabase.from('empresas').insert(data).select().single()
}

export async function createPipeline(data: Partial<Pipeline>) {
  return supabase.from('pipeline').insert(data).select().single()
}

export async function updatePipelineEtapa(id: string, etapa: string) {
  return supabase
    .from('pipeline')
    .update({ etapa, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
}

export async function usarCreditos(usuarioId: string, quantidade: number) {
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('credits, credits_usados')
    .eq('id', usuarioId)
    .single()
  
  if (!usuario || usuario.credits - usuario.credits_usados < quantidade) {
    return { error: 'Créditos insuficientes' }
  }
  
  return supabase
    .from('usuarios')
    .update({ credits_usados: usuario.credits_usados + quantidade })
    .eq('id', usuarioId)
}