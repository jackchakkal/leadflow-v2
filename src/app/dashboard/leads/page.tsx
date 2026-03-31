'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Search, Phone, Mail, ChevronLeft, Download, Filter, Star, MapPin, Calendar, MoreVertical } from 'lucide-react'

const CATEGORIAS = ['Todos', 'Restaurantes', 'Clínicas', 'Dentistas', 'Academias', 'Advogados', 'Beleza']
const BAIRROS = ['Todos', 'Centro', 'Sul', 'Norte', 'Leste', 'Oeste']

export default function Leads() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [bairro, setBairro] = useState('Todos')
  const [ordenar, setOrdenar] = useState('nota')

  // Mock data
  const leads = [
    { id: '1', nome: 'Restaurante Sabor Baiano', endereco: 'Rua das Flores, 123 - Centro', telefone: '(77) 99999-0001', categoria: 'Restaurantes', nota: 4.5, avaliacoes: 230, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-30' },
    { id: '2', nome: 'Clínica Saúde Integral', endereco: 'Av. Getúlio Vargas, 456 - Sul', telefone: '(77) 99999-0002', categoria: 'Clínicas', nota: 4.8, avaliacoes: 150, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-29' },
    { id: '3', nome: 'Academia Smart Fit', endereco: 'Av. Brasil, 789 - Norte', telefone: '(77) 99999-0003', categoria: 'Academias', nota: 4.2, avaliacoes: 89, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-28' },
    { id: '4', nome: 'Dr. João Silva - Dentista', endereco: 'Av. Central, 101 - Oeste', telefone: '(77) 99999-0004', categoria: 'Dentistas', nota: 4.9, avaliacoes: 320, municipio: 'Barreiras', estado: 'BA', fonte: 'Indicação', created_at: '2026-03-27' },
    { id: '5', nome: 'Silva & Associados', endereco: 'Rua dos Advogados, 202 - Centro', telefone: '(77) 99999-0005', categoria: 'Advogados', nota: 4.6, avaliacoes: 45, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-26' },
    { id: '6', nome: 'Salão Beleza Prime', endereco: 'Av. das Nações, 303 - Sul', telefone: '(77) 99999-0006', categoria: 'Beleza', nota: 4.7, avaliacoes: 180, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-25' },
    { id: '7', nome: 'Pet Shop Amigo Fiel', endereco: 'Rua dos Pets, 404 - Leste', telefone: '(77) 99999-0007', categoria: 'Pet Shops', nota: 4.4, avaliacoes: 95, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-24' },
    { id: '8', nome: 'Farmácia Popular +', endereco: 'Av. Getúlio Vargas, 505 - Centro', telefone: '(77) 99999-0008', categoria: 'Farmácias', nota: 4.3, avaliacoes: 210, municipio: 'Barreiras', estado: 'BA', fonte: 'Google Maps', created_at: '2026-03-23' },
  ]

  // Filtered leads
  const filtered = leads.filter(l => {
    if (busca && !l.nome.toLowerCase().includes(busca.toLowerCase())) return false
    if (categoria !== 'Todos' && l.categoria !== categoria) return false
    return true
  })

  // Order
  const ordered = [...filtered].sort((a, b) => {
    if (ordenar === 'nota') return b.nota - a.nota
    if (ordenar === 'avaliacoes') return b.avaliacoes - a.avaliacoes
    if (ordenar === 'nome') return a.nome.localeCompare(b.nome)
    return 0
  })

  // CSV Export
  const exportarCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Categoria', 'Nota', 'Avaliações', 'Município', 'Fonte']
    const rows = ordered.map(l => [l.nome, l.endereco, l.telefone, l.categoria, l.nota, l.avaliacoes, l.municipio, l.fonte])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success(`Exportados ${ordered.length} leads!`)
  }

  // Stats
  const stats = {
    total: leads.length,
    notaMedia: (leads.reduce((s, l) => s + l.nota, 0) / leads.length).toFixed(1),
    totalAvaliacoes: leads.reduce((s, l) => s + l.avaliacoes, 0),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Meus Leads</h1>
          </div>
          <button onClick={exportarCSV} className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Total de Leads</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-amber-500">{stats.notaMedia}</div>
            <div className="text-xs text-slate-500">Nota Média</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-cyan-600">{stats.totalAvaliacoes.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Avaliações</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar por nome..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          
          {/* Categoria */}
          <select value={categoria} onChange={e => setCategoria(e.target.value)} className="px-4 py-2 border rounded-lg">
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Order */}
          <select value={ordenar} onChange={e => setOrdenar(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="nota">Ordenar por Nota</option>
            <option value="avaliacoes">Ordenar por Avaliações</option>
            <option value="nome">Ordenar por Nome</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2 max-w-7xl mx-auto">
        <span className="text-sm text-slate-500">{ordered.length} resultados</span>
      </div>

      {/* Leads Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordered.map(lead => (
            <div key={lead.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-slate-900 line-clamp-1">{lead.nome}</div>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              
              <div className="text-sm text-slate-500 mb-2">{lead.categoria}</div>
              
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {lead.endereco}
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <a href={`tel:${lead.telefone}`} className="text-cyan-600 text-sm flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {lead.telefone}
                </a>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{lead.nota}</span>
                  <span className="text-slate-400 text-xs">({lead.avaliacoes})</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{lead.fonte}</span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">{lead.created_at}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}