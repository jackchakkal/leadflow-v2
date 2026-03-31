'use client'

import { Toaster, toast } from 'react-hot-toast'
import { useState } from 'react'
import { Search, MapPin, Star, Phone, Download, X, Check, Menu } from 'lucide-react'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️' },
  { id: 'clinic', name: 'Clínicas', icon: '🏥' },
  { id: 'dentist', name: 'Dentistas', icon: '🦷' },
  { id: 'gym', name: 'Academias', icon: '💪' },
  { id: 'lawyer', name: 'Advogados', icon: '⚖️' },
  { id: 'beauty', name: 'Beleza', icon: '💇' },
]

interface Lead {
  name: string
  address: string
  rating: number
  reviews: number
  phone: string
  category: string
}

const FEATURES = [
  { icon: '🗺️', title: 'Busca Avançada', desc: 'Cidade, raio, categoria, avaliação' },
  { icon: '📋', title: 'Pipeline Kanban', desc: 'Arraste e solte entre etapas' },
  { icon: '📊', title: 'Controle Total', desc: 'Valor, comissões, receita' },
]

const PLANS = [
  { name: 'Grátis', price: 'R$ 0', features: ['100 leads/mês', 'Busca básica', 'Exportar CSV'] },
  { name: 'Pro', price: 'R$ 97', popular: true, features: ['1.000 leads/mês', 'Pipeline completo', 'Equipe (5)'] },
  { name: 'Enterprise', price: 'R$ 297', features: ['Leads ilimitados', 'API', 'Equipe ilimitada'] },
]

export default function Home() {
  const [showDemo, setShowDemo] = useState(false)
  const [city, setCity] = useState('')
  const [state, setState] = useState('BA')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const searchLeads = () => {
    if (!city.trim()) { toast.error('Digite a cidade!'); return }
    if (selectedCategories.length === 0) { toast.error('Selecione categorias!'); return }
    setLoading(true)
    setLeads([])
    setTimeout(() => {
      const mock = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes' },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas' },
      ]
      setLeads(mock)
      setLoading(false)
      toast.success(`${mock.length} leads encontrados!`)
    }, 2000)
  }

  const downloadCSV = () => {
    const csv = ['Nome,Endereço,Telefone,Nota,Avaliações,Categoria', ...leads.map(l => `${l.name},${l.address},${l.phone},${l.rating},${l.reviews},${l.category}`)].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `leads-${city.toLowerCase()}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">LeadFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-600 hover:text-cyan-600">Funcionalidades</a>
            <a href="#pricing" className="text-slate-600 hover:text-cyan-600">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block text-slate-600">Entrar</a>
            <button onClick={() => setShowDemo(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800">Começar Grátis</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-700">Integração Google Maps</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            O Sistema de Captação<br/>
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Mais Poderoso do Brasil</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">Capture leads do Google Maps, gerencie o ciclo de vendas e multiplique conversões.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowDemo(true)} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800">🚀 Testar Grátis</button>
            <a href="#features" className="px-8 py-4 rounded-xl font-bold text-lg border border-slate-300 text-slate-700 hover:bg-slate-50">Ver Recursos</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Tudo que você precisa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Escolha o plano</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((p, i) => (
              <div key={i} className={`bg-white p-8 rounded-2xl ${p.popular ? 'ring-2 ring-cyan-500 shadow-xl scale-105' : 'border border-slate-200'}`}>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="text-4xl font-bold mt-4">{p.price}<span className="text-slate-500">/mês</span></div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-500" />{f}</li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold mt-8 ${p.popular ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white' : 'bg-slate-900 text-white'}`}>
                  {p.name === 'Grátis' ? 'Começar Grátis' : p.name === 'Pro' ? 'Escolher Pro' : 'Falar Consultor'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2026 LeadFlow. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDemo(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Testar Busca</h2>
              <button onClick={() => setShowDemo(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cidade</label>
                  <input value={city} onChange={e => setCity(e.target.value)} placeholder="Ex: Barreiras" className="w-full px-4 py-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <select value={state} onChange={e => setState(e.target.value)} className="w-full px-4 py-3 border rounded-xl">
                    <option value="BA">Bahia</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Categorias</label>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedCategories(CATEGORIES.map(c => c.id))} className="text-sm text-cyan-600">Todas</button>
                    <button onClick={() => setSelectedCategories([])} className="text-sm text-slate-500">Limpar</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`p-2 rounded-lg text-xs border ${selectedCategories.includes(cat.id) ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200'}`}>
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={searchLeads} disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-6 disabled:opacity-50">
              {loading ? 'Buscando...' : '🔍 Buscar Leads'}
            </button>
            {leads.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">{leads.length} leads</span>
                  <button onClick={downloadCSV} className="text-green-600 font-medium">📥 CSV</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {leads.map((l, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <div>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-xs text-slate-500">{l.address}</div>
                      </div>
                      <a href={`tel:${l.phone}`} className="text-cyan-600">{l.phone}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}