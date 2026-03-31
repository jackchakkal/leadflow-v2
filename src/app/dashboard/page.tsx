'use client'

import { useState } from 'react'
import { Search, Phone, Mail, Users, DollarSign, ChevronLeft, ChevronRight, Plus, X, Star } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️' },
  { id: 'clinic', name: 'Clínicas', icon: '🏥' },
  { id: 'dentist', name: 'Dentistas', icon: '🦷' },
  { id: 'gym', name: 'Academias', icon: '💪' },
  { id: 'lawyer', name: 'Advogados', icon: '⚖️' },
  { id: 'beauty', name: 'Beleza', icon: '💇' },
]

const ETAPAS = [
  { id: 'novo', name: 'Novo', color: 'bg-blue-500' },
  { id: 'contato', name: 'Contato', color: 'bg-yellow-500' },
  { id: 'proposta', name: 'Proposta', color: 'bg-purple-500' },
  { id: 'fechado', name: 'Fechado', color: 'bg-green-500' },
  { id: 'perdido', name: 'Perdido', color: 'bg-red-500' },
]

export default function Dashboard() {
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('BA')
  const [categorias, setCategorias] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [pipeline, setPipeline] = useState<any[]>([])
  const [aba, setAba] = useState<'busca' | 'pipeline' | 'leads'>('busca')

  // Toggle categoria
  const toggleCat = (id: string) => {
    setCategorias(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  // Buscar leads
  const buscarLeads = async () => {
    if (!cidade.trim()) { toast.error('Digite a cidade!'); return }
    if (!categorias.length) { toast.error('Selecione categorias!'); return }
    setLoading(true)
    
    await new Promise(r => setTimeout(r, 1500))
    
    const mock = []
    for (const cat of categorias) {
      for (let i = 0; i < 3; i++) {
        mock.push({
          id: crypto.randomUUID(),
          nome: `${cat} ${i + 1}`,
          endereco: `Rua ${i + 1}, ${cidade}`,
          telefone: '(77) 99999-0000'.replace('0000', String(i).padStart(4, '0')),
          nota: (Math.random() * 2 + 3).toFixed(1),
          avaliacoes: Math.floor(Math.random() * 200),
          categoria: cat,
          cidade,
          estado,
        })
      }
    }
    
    setResults(mock)
    setLoading(false)
    setBuscaAberta(false)
    toast.success(`${mock.length} leads encontrados!`)
  }

  // Adicionar ao pipeline
  const adicionarPipeline = (lead: any) => {
    const novo = { ...lead, etapa: 'novo', valor: 0, probabilidade: 10 }
    setPipeline(prev => [...prev, novo])
    toast.success('Adicionado ao pipeline!')
  }

  // Mover no pipeline
  const moverEtapa = (id: string, direcao: number) => {
    const idx = ETAPAS.findIndex(e => e.id === pipeline.find(p => p.id === id)?.etapa)
    if (idx === -1) return
    const novaIdx = Math.max(0, Math.min(ETAPAS.length - 1, idx + direcao))
    setPipeline(prev => prev.map(p => p.id === id ? { ...p, etapa: ETAPAS[novaIdx].id } : p))
  }

  // Stats
  const stats = {
    total: results.length,
    pipeline: pipeline.length,
    fechados: pipeline.filter(p => p.etapa === 'fechado').length,
    valor: pipeline.filter(p => p.etapa === 'fechado').reduce((s, p) => s + (p.valor || 0), 0),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold text-xl gradient-text">LeadFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">100</span> créditos
            </div>
            <button className="w-10 h-10 bg-slate-200 rounded-full"></button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{stats.pipeline}</div>
            <div className="text-xs text-slate-500">Pipeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.fechados}</div>
            <div className="text-xs text-slate-500">Fechados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">R$ {stats.valor.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Valor Total</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {[
            { id: 'busca', label: '🔍 Buscar Leads' },
            { id: 'leads', label: '📋 Meus Leads' },
            { id: 'pipeline', label: '📊 Pipeline' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id as any)}
              className={`px-4 py-3 font-medium text-sm ${
                aba === tab.id
                  ? 'text-cyan-600 border-b-2 border-cyan-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto p-4">
        
        {/* ABA: BUSCA */}
        {aba === 'busca' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Buscar Novas Empresas</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cidade</label>
                  <input
                    value={cidade}
                    onChange={e => setCidade(e.target.value)}
                    placeholder="Ex: Barreiras"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <select
                    value={estado}
                    onChange={e => setEstado(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  >
                    <option value="BA">Bahia</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categorias</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCat(cat.id)}
                        className={`p-3 rounded-xl text-sm border ${
                          categorias.includes(cat.id)
                            ? 'border-cyan-500 bg-cyan-50'
                            : 'border-slate-200'
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={buscarLeads}
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Buscando...</>
                  ) : (
                    <>🔍 Buscar Leads</>
                  )}
                </button>
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Resultado da Busca</h2>
              {results.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  Busque empresas para ver aqui
                </div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {results.map(r => (
                    <div key={r.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="font-medium">{r.nome}</div>
                        <div className="text-xs text-slate-500">{r.endereco}</div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-amber-500">★ {r.nota}</span>
                        <button
                          onClick={() => adicionarPipeline(r)}
                          className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA: LEADS */}
        {aba === 'leads' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Meus Leads ({results.length})</h2>
            {results.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Nenhum lead ainda. Faça uma busca!
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {results.map(r => (
                  <div key={r.id} className="p-4 border rounded-xl">
                    <div className="font-bold">{r.nome}</div>
                    <div className="text-sm text-slate-500">{r.endereco}</div>
                    <div className="flex justify-between mt-2">
                      <a href={`tel:${r.telefone}`} className="text-cyan-600 text-sm">
                        📞 {r.telefone}
                      </a>
                      <span className="text-amber-500">★ {r.nota} ({r.avaliacoes})</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABA: PIPELINE */}
        {aba === 'pipeline' && (
          <div className="grid md:grid-cols-5 gap-4">
            {ETAPAS.map(etapa => (
              <div key={etapa.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className={`w-full h-1 rounded-full ${etapa.color} mb-4`} />
                <h3 className="font-bold mb-4">{etapa.name}</h3>
                <div className="space-y-2">
                  {pipeline.filter(p => p.etapa === etapa.id).map(p => (
                    <div
                      key={p.id}
                      className="p-3 bg-slate-50 rounded-lg cursor-move"
                      draggable
                    >
                      <div className="font-medium text-sm">{p.nome}</div>
                      <div className="text-xs text-slate-500">{p.categoria}</div>
                    </div>
                  ))}
                </div>
                {etapa.id === 'novo' && (
                  <button
                    onClick={() => setBuscaAberta(true)}
                    className="w-full mt-4 py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded-lg text-sm hover:border-cyan-500 hover:text-cyan-600"
                  >
                    + Adicionar Lead
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Busca */}
      {buscaAberta && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setBuscaAberta(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Adicionar ao Pipeline</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {results.map(r => (
                <button
                  key={r.id}
                  onClick={() => adicionarPipeline(r)}
                  className="w-full p-3 text-left bg-slate-50 rounded-lg hover:bg-slate-100"
                >
                  <div className="font-medium">{r.nome}</div>
                  <div className="text-xs text-slate-500">{r.endereco}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}