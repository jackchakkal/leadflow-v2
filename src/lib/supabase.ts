import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  email: string
  name: string
  phone: string
  plan: 'free' | 'pro' | 'enterprise'
  credits: number
}

export interface Company {
  id: string
  user_id: string
  place_id: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  rating: number
  reviews: number
  website: string
  category: string
  is_favorited: boolean
  is_contacted: boolean
  notes: string
  first_seen_at: string
  last_seen_at: string
}

export interface Search {
  id: string
  user_id: string
  city: string
  state: string
  categories: string[]
  search_count: number
  last_searched_at: string
}

// API Functions
export async function checkCompanyExists(placeId: string): Promise<boolean> {
  const { data, error } = await supabase
    .rpc('company_exists', { p_place_id: placeId })
  
  if (error) throw error
  return data || false
}

export async function getCompanyByPlaceId(placeId: string) {
  const { data, error } = await supabase
    .rpc('get_company_by_place', { p_place_id: placeId })
  
  if (error) throw error
  return data
}

export async function saveCompany(company: Partial<Company>) {
  const { data, error } = await supabase
    .from('p20_companies')
    .upsert(company, { onConflict: 'place_id' })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function saveSearch(search: Partial<Search>) {
  const { data, error } = await supabase
    .from('p20_searches')
    .insert(search)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getUserCompanies(userId: string, filters?: { category?: string; city?: string }) {
  let query = supabase
    .from('p20_companies')
    .select('*')
    .eq('user_id', userId)
    .order('last_seen_at', { ascending: false })
  
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

export async function getUserSearches(userId: string) {
  const { data, error } = await supabase
    .from('p20_searches')
    .select('*')
    .eq('user_id', userId)
    .order('last_searched_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function markCompanyAsContacted(companyId: string) {
  const { data, error } = await supabase
    .from('p20_companies')
    .update({ is_contacted: true, updated_at: new Date().toISOString() })
    .eq('id', companyId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function toggleFavorite(companyId: string, favorited: boolean) {
  const { data, error } = await supabase
    .from('p20_companies')
    .update({ is_favorited: favorited, updated_at: new Date().toISOString() })
    .eq('id', companyId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getStats(userId: string) {
  const [companiesResult, searchesResult, categoriesResult] = await Promise.all([
    supabase.from('p20_companies').select('id', { count: 'exact' }).eq('user_id', userId),
    supabase.from('p20_searches').select('id', { count: 'exact' }).eq('user_id', userId),
    supabase.rpc('get_company_count_by_category', { p_user_id: userId })
  ])

  return {
    totalCompanies: companiesResult.count || 0,
    totalSearches: searchesResult.count || 0,
    byCategory: categoriesResult.data || []
  }
}

export async function exportToCSV(userId: string, searchId?: string) {
  let query = supabase
    .from('p20_companies')
    .select('name, address, phone, rating, reviews, category, city, state')
    .eq('user_id', userId)
  
  if (searchId) {
    query = query.eq('search_id', searchId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  
  // Convert to CSV
  const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria', 'Cidade', 'Estado']
  const rows = data?.map(c => [
    c.name,
    c.address,
    c.phone,
    c.rating,
    c.reviews,
    c.category,
    c.city,
    c.state
  ]) || []
  
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  
  // Save export record
  await supabase.from('p20_exports').insert({
    user_id: userId,
    search_id: searchId,
    filename: `leads-${Date.now()}.csv`,
    format: 'csv',
    record_count: rows.length
  })
  
  return csv
}
