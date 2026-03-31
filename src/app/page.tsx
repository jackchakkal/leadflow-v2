'use client'

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️' },
  { id: 'clinic', name: 'Clínicas', icon: '🏥' },
  { id: 'dentist', name: 'Dentistas', icon: '🦷' },
  { id: 'gym', name: 'Academias', icon: '💪' },
  { id: 'lawyer', name: 'Advogados', icon: '⚖️' },
  { id: 'beauty_salon', name: 'Beleza', icon: '💇' },
  { id: 'car_dealer', name: 'Carros', icon: '🚗' },
  { id: 'hotel', name: 'Hotéis', icon: '🏨' },
  { id: 'pharmacy', name: 'Farmácias', icon: '💊' },
  { id: 'supermarket', name: 'Mercados', icon: '🛒' },
  { id: 'bar', name: 'Bares', icon: '🍺' },
  { id: 'petshop', name: 'Pet Shops', icon: '🐕' },
]

interface Lead {
  name: string
  address: string
  rating: number
  reviews: number
  phone: string
  category: string
  city: string
  placeId: string
}

export default function Home() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('BA')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const selectAll = () => setSelectedCategories(CATEGORIES.map(c => c.id))
  const clearAll = () => setSelectedCategories([])

  const searchLeads = async () => {
    if (!city.trim()) { toast.error('Digite a cidade!'); return }
    if (selectedCategories.length === 0) { toast.error('Selecione categorias!'); return }

    setLoading(true)
    setLeads([])

    // Simular busca (aqui seria a API do Google Maps)
    setTimeout(() => {
      const mockLeads = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes', city, placeId: '1' },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas', city, placeId: '2' },
        { name: 'Academia Fit Life', address: 'Rua do Esporte, 789', rating: 4.2, reviews: 89, phone: '(77) 99999-0003', category: 'Academias', city, placeId: '3' },
        { name: 'Dr. João Silva - Dentista', address: 'Av. Central, 101', rating: 4.9, reviews: 320, phone: '(77) 99999-0004', category: 'Dentistas', city, placeId: '4' },
        { name: 'Silva & Associados Advocacia', address: 'Rua dos Advogados, 202', rating: 4.6, reviews: 45, phone: '(77) 99999-0005', category: 'Advogados', city, placeId: '5' },
        { name: 'Salão Beleza Prime', address: 'Av. das Nações, 303', rating: 4.7, reviews: 180, phone: '(77) 99999-0006', category: 'Beleza', city, placeId: '6' },
        { name: 'Pet Shop Amigo Fiel', address: 'Rua dos Pets, 404', rating: 4.4, reviews: 95, phone: '(77) 99999-0007', category: 'Pet Shops', city, placeId: '7' },
        { name: 'Farmácia Popular +', address: 'Av. Getúlio Vargas, 505', rating: 4.3, reviews: 210, phone: '(77) 99999-0008', category: 'Farmácias', city, placeId: '8' },
      ]
      setLeads(mockLeads)
      setLoading(false)
      toast.success(`${mockLeads.length} leads encontrados!`)
    }, 2500)
  }

  const downloadCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria']
    const rows = leads.map(l => [`"${l.name}"`, `"${l.address}"`, l.phone, l.rating.toString(), l.reviews.toString(), l.category])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${city.toLowerCase()}-${state}.csv`
    a.click()
    toast.success('CSV baixado!')
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              LeadFlow
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#funcionalidades" className="text-slate-600 hover:text-cyan-600 font-medium">Funcionalidades</a>
            <a href="#precos" className="text-slate-600 hover:text-cyan-600 font-medium">Planos</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-slate-600 font-medium hidden sm:block">Entrar</a>
            <a href="#" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800">
              Começar Grátis
            </a>
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
            <span className="text-sm font-medium text-cyan-700">Integração com Google Maps</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            O Sistema de Captação<br/>
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Mais Poderoso do Brasil</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Capture leads do Google Maps, gerencie o ciclo de vendas e multiplique conversões.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowDemo(true)} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 shadow-lg">
              🚀 Testar Grátis
            </button>
            <a href="#funcionalidades" className="px-8 py-4 rounded-xl font-bold text-lg border border-slate-300 text-slate-700 hover:bg-slate-50">
              Ver Recursos
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div><div className="text-3xl font-bold">50.000+</div><div className="text-sm text-slate-500">Leads</div></div>
            <div><div className="text-3xl font-bold">2.500+</div><div className="text-sm text-slate-500">Usuários</div></div>
            <div><div className="text-3xl font-bold">R$ 15M+</div><div className="text-sm text-slate-500">Vendas</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Tudo que você precisa</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🗺️', title: 'Busca Avançada', desc: 'Cidade, raio, categoria, avaliação' },
              { icon: '📋', title: 'Pipeline Kanban', desc: 'Arraste e solte entre etapas' },
              { icon: '📊', title: 'Controle Total', desc: 'Valor, comissões, receita' },
              { icon: '👥', title: 'Equipe', desc: 'Múltiplos usuários' },
              { icon: '📥', title: 'Import/Export', desc: 'CSV, WhatsApp direto' },
              { icon: '🤖', title: 'Automações', desc: 'Mensagens e lembretes' },
            ].map((f, i) => (
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
      <section id="precos" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Escolha o plano</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold">Grátis</h3>
              <div className="text-4xl font-bold mt-4">R$ 0<span className="text-slate-500">/mês</span></div>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>✅ 100 leads/mês</li>
                <li>✅ Busca básica</li>
                <li>✅ Exportar CSV</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center border border-slate-300 rounded-xl mt-8 font-semibold">Começar Grátis</a>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-purple-600 p-8 rounded-2xl text-white transform scale-105">
              <div className="flex justify-between items-center"><h3 className="text-xl font-bold">Pro</div><span className="bg-white/20 px-3 py-1 rounded-full text-sm">Popular</span></div>
              <div className="text-4xl font-bold mt-4">R$ 97<span className="text-cyan-200">/mês</span></div>
              <ul className="mt-6 space-y-3">
                <li>✅ 1.000 leads/mês</li>
                <li>✅ Pipeline completo</li>
                <li>✅ Equipe (5 usuários)</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center bg-white text-cyan-600 rounded-xl mt-8 font-bold">Escolher Pro</a>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <div className="text-4xl font-bold mt-4">R$ 297<span className="text-slate-500">/mês</span></div>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>✅ Leads ilimitados</li>
                <li>✅ API</li>
                <li>✅ Equipe ilimitada</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center border border-slate-300 rounded-xl mt-8 font-semibold">Falar Consultor</a>
            </div>
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
            <h2 className="text-2xl font-bold mb-6">Testar Busca</h2>
            <div className="space-y-4">
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
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Categorias</label>
                  <div className="flex gap-2">
                    <button onClick={selectAll} className="text-sm text-cyan-600">Todas</button>
                    <button onClick={clearAll} className="text-sm text-slate-500">Limpar</button>
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
                  <span className="font-bold">{leads.length} leads encontrados</span>
                  <button onClick={downloadCSV} className="text-green-600 font-medium">📥 Baixar CSV</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {leads.map((lead, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.address}</div>
                      </div>
                      <a href={`tel:${lead.phone}`} className="text-cyan-600">{lead.phone}</a>
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
