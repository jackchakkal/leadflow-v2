'use client'

import { useState, useEffect } from 'react'

// Dados demo (funciona sem Supabase)
const dadosDemo = [
  { id: '1', nome: 'Restaurante Sabor Baiano', telefone: '(77) 99999-0001', categoria: 'Restaurantes', nota: 4.5, avaliacoes: 230, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-30', endereco: 'Rua das Flores, 123' },
  { id: '2', nome: 'Clínica Saúde Integral', telefone: '(77) 99999-0002', categoria: 'Clínicas', nota: 4.8, avaliacoes: 150, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-29', endereco: 'Av. Getúlio Vargas, 456' },
  { id: '3', nome: 'Smart Fit Academia', telefone: '(77) 99999-0003', categoria: 'Academias', nota: 4.2, avaliacoes: 89, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-28', endereco: 'Av. Brasil, 789' },
  { id: '4', nome: 'Dr. João Silva - Dentista', telefone: '(77) 99999-0004', categoria: 'Dentistas', nota: 4.9, avaliacoes: 320, cidade: 'Barreiras', estado: 'BA', fonte: 'Indicação', created_at: '2026-03-27', endereco: 'Av. Central, 101' },
  { id: '5', nome: 'Silva & Associados', telefone: '(77) 99999-0005', categoria: 'Advogados', nota: 4.6, avaliacoes: 45, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-26', endereco: 'Rua dos Advogados, 202' },
  { id: '6', nome: 'Salão Beleza Prime', telefone: '(77) 99999-0006', categoria: 'Beleza', nota: 4.7, avaliacoes: 180, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-25', endereco: 'Av. das Nações, 303' },
  { id: '7', nome: 'Pet Shop Amigo Fiel', telefone: '(77) 99999-0007', categoria: 'Pet Shops', nota: 4.4, avaliacoes: 95, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-24', endereco: 'Rua dos Pets, 404' },
  { id: '8', nome: 'Farmácia Popular +', telefone: '(77) 99999-0008', categoria: 'Farmácias', nota: 4.3, avaliacoes: 210, cidade: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-23', endereco: 'Av. Getúlio Vargas, 505' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [ordenar, setOrdenar] = useState('nota')

  useEffect(() => {
    // Carregar dados demo ao iniciar
    setLeads(dadosDemo)
  }, [])

  // Filtrar
  const filtered = leads.filter(l => {
    if (busca && !l.nome?.toLowerCase().includes(busca.toLowerCase())) return false
    if (categoria !== 'Todos' && l.categoria !== categoria) return false
    return true
  })

  // Ordenar
  const ordered = [...filtered].sort((a, b) => {
    if (ordenar === 'nota') return b.nota - a.nota
    if (ordenar === 'avaliacoes') return b.avaliacoes - a.avaliacoes
    return a.nome.localeCompare(b.nome)
  })

  // Stats
  const stats = {
    total: leads.length,
    notaMedia: (leads.reduce((s, l) => s + l.nota, 0) / leads.length).toFixed(1),
    totalAvaliacoes: leads.reduce((s, l) => s + l.avaliacoes, 0),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold p-4">Meus Leads</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-xs text-slate-500">Total de Leads</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-500">{stats.notaMedia}</div>
          <div className="text-xs text-slate-500">Nota Média</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-600">{stats.totalAvaliacoes}</div>
          <div className="text-xs text-slate-500">Avaliações</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 px-4 mb-4">
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="Todos">Todas</option>
          <option value="Restaurantes">Restaurantes</option>
          <option value="Clínicas">Clínicas</option>
          <option value="Dentistas">Dentistas</option>
          <option value="Academias">Academias</option>
          <option value="Advogados">Advogados</option>
          <option value="Beleza">Beleza</option>
        </select>
        <select value={ordenar} onChange={e => setOrdenar(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="nota">Nota</option>
          <option value="avaliacoes">Avaliações</option>
          <option value="nome">Nome</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {ordered.map(lead => (
          <div key={lead.id} className="bg-white rounded-xl p-4">
            <div className="font-bold">{lead.nome}</div>
            <div className="text-sm text-slate-500">{lead.categoria}</div>
            <div className="text-xs text-slate-400 mt-1">{lead.endereco}</div>
            <div className="flex justify-between mt-3 pt-3 border-t">
              <a href={`tel:${lead.telefone}`} className="text-cyan-600 text-sm">{lead.telefone}</a>
              <span className="text-amber-500">★ {lead.nota} ({lead.avaliacoes})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}