'use client'

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️' },
  { id: 'clinic', name: 'Clínicas Médicas', icon: '🏥' },
  { id: 'dentist', name: 'Dentistas', icon: '🦷' },
  { id: 'gym', name: 'Academias', icon: '💪' },
  { id: 'lawyer', name: 'Advogados', icon: '⚖️' },
  { id: 'beauty_salon', name: 'Salões de Beleza', icon: '💇' },
  { id: 'car_dealer', name: 'Concessionárias', icon: '🚗' },
  { id: 'hotel', name: 'Hotéis', icon: '🏨' },
  { id: 'pharmacy', name: 'Farmácias', icon: '💊' },
  { id: 'supermarket', name: 'Supermercados', icon: '🛒' },
  { id: 'bar', name: 'Bares', icon: '🍺' },
  { id: 'petshop', name: 'Pet Shops', icon: '🐕' },
]

interface Lead {
  name: string; address: string; rating: number; reviews: number; phone: string; category: string; city: string; placeId: string
}

export default function Home() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('BA')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showFeatures, setShowFeatures] = useState(false)

  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href') || '')
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [])

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const selectAll = () => setSelectedCategories(CATEGORIES.map(c => c.id))
  const clearAll = () => setSelectedCategories([])

  const searchLeads = async () => {
    if (!city.trim()) { toast.error('Digite a cidade!'); return }
    if (selectedCategories.length === 0) { toast.error('Selecione categorias!'); return }

    setLoading(true); setSearched(true); setLeads([]); setProgress(0)
    const progressInterval = setInterval(() => setProgress(p => Math.min(p + 10, 90)), 200)

    setTimeout(() => {
      clearInterval(progressInterval); setProgress(100)
      const mockLeads = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123 - Centro', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes', city, placeId: '1' },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456 - Centro', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas Médicas', city, placeId: '2' },
        { name: 'Academia Fit Life', address: 'Rua do Esporte, 789 - Bela Vista', rating: 4.2, reviews: 89, phone: '(77) 99999-0003', category: 'Academias', city, placeId: '3' },
        { name: 'Dr. João Silva - Dentista', address: 'Av. Central, 101 - Centro', rating: 4.9, reviews: 320, phone: '(77) 99999-0004', category: 'Dentistas', city, placeId: '4' },
        { name: 'Silva & Associados Advocacia', address: 'Rua dos Advogados, 202 - Centro', rating: 4.6, reviews: 45, phone: '(77) 99999-0005', category: 'Advogados', city, placeId: '5' },
        { name: 'Salão Beleza Prime', address: 'Av. das Nações, 303 - Jardim América', rating: 4.7, reviews: 180, phone: '(77) 99999-0006', category: 'Salões de Beleza', city, placeId: '6' },
        { name: 'Pet Shop Amigo Fiel', address: 'Rua dos Pets, 404 - Centro', rating: 4.4, reviews: 95, phone: '(77) 99999-0007', category: 'Pet Shops', city, placeId: '7' },
        { name: 'Farmácia Popular +', address: 'Av. Getúlio Vargas, 505 - Centro', rating: 4.3, reviews: 210, phone: '(77) 99999-0008', category: 'Farmácias', city, placeId: '8' },
      ]
      setLeads(mockLeads); setLoading(false); toast.success(`${mockLeads.length} leads encontrados!`)
    }, 2500)
  }

  const downloadCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria', 'Cidade']
    const rows = leads.map(l => [`"${l.name}"`, `"${l.address}"`, l.phone, l.rating.toString(), l.reviews.toString(), l.category, l.city])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `leads-${city.toLowerCase()}-${state}.csv`; a.click()
    toast.success('CSV baixado!')
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">LeadFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#funcionalidades" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Funcionalidades</a>
              <a href="#precos" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Planos</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-slate-600 hover:text-slate-900 font-medium hidden sm:block">Entrar</a>
              <a href="#" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">Começar Grátis</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-700">✨ Agora com integração ao Google Maps</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            O Sistema de Captação<br/>
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Mais Poderoso do Brasil</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Capture leads do Google Maps, gerencie todo o ciclo de vendas e multiplique suas conversões.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={searchLeads} className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              🚀 Criar Conta Grátis
            </button>
            <button onClick={() => setShowFeatures(true)} className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all">
              Ver Demonstração
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center"><div className="text-3xl font-bold text-slate-900">50.000+</div><div className="text-sm text-slate-500">Leads Captados</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-slate-900">2.500+</div><div className="text-sm text-slate-500">Usuários</div></div>
            <div className="text-center"><div className="text-3xl font-bold text-slate-900">R$ 15M+</div><div className="text-sm text-slate-500">Em Vendas</div></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Funcionalidades</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Tudo que você precisa</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{icon: '🗺️', title: 'Busca Avançada', desc: 'Busque por cidade, raio, categoria, avaliação e muito mais.'},
              {icon: '📋', title: 'Pipeline Kanban', desc: 'Arraste e solte leads entre etapas visualize seu funil.'},
              {icon: '📊', title: 'Controle Total', desc: 'Acompanhe valor por lead, comissões e receita.'},
              {icon: '👥', title: 'Gestão de Equipe', desc: 'Múltiplos usuários com permissões personalizadas.'},
              {icon: '📥', title: 'Import/Export', desc: 'Importe CSV, exporte relatórios, WhatsApp direto.'},
              {icon: '🤖', title: 'Automações', desc: 'Mensagens automáticas e lembretes de follow-up.'}
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Escolha o plano ideal</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold">Grátis</h3>
              <div className="mt-4"><span className="text-4xl font-bold">R$ 0</span><span className="text-slate-500">/mês</span></div>
              <ul className="space-y-3 mt-6 mb-8">
                <li className="flex items-center gap-2 text-slate-600">✅ 100 leads/mês</li>
                <li className="flex items-center gap-2 text-slate-600">✅ Busca básica</li>
                <li className="flex items-center gap-2 text-slate-600">✅ Exportar CSV</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50">Começar Grátis</a>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-purple-600 rounded-2xl p-8 text-white transform scale-105">
              <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold">Pro</div><span className="px-3 py-1 bg-white/20 rounded-full text-sm">Mais Popular</span></div>
              <div className="mt-4"><span className="text-4xl font-bold">R$ 97</span><span className="text-cyan-200">/mês</span></div>
              <ul className="space-y-3 mt-6 mb-8">
                <li className="flex items-center gap-2">✅ 1.000 leads/mês</li>
                <li className="flex items-center gap-2">✅ Pipeline completo</li>
                <li className="flex items-center gap-2">✅ Equipe (até 5)</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center bg-white text-cyan-600 rounded-xl font-bold hover:bg-cyan-50">Escolher Pro</a>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <div className="mt-4"><span className="text-4xl font-bold">R$ 297</span><span className="text-slate-500">/mês</span></div>
              <ul className="space-y-3 mt-6 mb-8">
                <li className="flex items-center gap-2 text-slate-600">✅ Leads ilimitados</li>
                <li className="flex items-center gap-2 text-slate-600">✅ API de acesso</li>
                <li className="flex items-center gap-2 text-slate-600">✅ Equipe ilimitada</li>
              </ul>
              <a href="#" className="block w-full py-3 text-center border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50">Falar com Consultor</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-white font-bold">LeadFlow</span>
          </div>
          <p className="text-sm">© 2026 LeadFlow. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Demo Modal */}
      {showFeatures && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowFeatures(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Teste a Busca</h2>
              <button onClick={() => setShowFeatures(false)} className="text-2xl text-slate-400">×</button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Cidade</label>
                <input value={city} onChange={e => setCity(e.target.value)} placeholder="Ex: Barreiras" className="w-full px-4 py-3 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Estado</label>
                <select value={state} onChange={e => setState(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl">
                  <option value="BA">Bahia</option><option value="SP">São Paulo</option><option value="RJ">Rio de Janeiro</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Categorias ({selectedCategories.length})</label>
                  <div className="flex gap-2"><button onClick={selectAll} className="text-sm text-cyan-600">Todas</button><button onClick={clearAll} className="text-sm text-slate-500">Limpar</button></div>
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
            
            <button onClick={searchLeads} disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold disabled:opacity-50">
              {loading ? 'Buscando...' : '🔍 Buscar Leads'}
            </button>
            
            {leads.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">{leads.length} leads encontrados</h3>
                  <button onClick={downloadCSV} className="text-green-600 font-medium">📥 Baixar CSV</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {leads.map((lead, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between">
                      <div><div className="font-medium">{lead.name}</div><div className="text-xs text-slate-500">{lead.address}</div></div>
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
