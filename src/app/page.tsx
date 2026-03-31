'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

// Categorias disponíveis
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
  const [searched, setSearched] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedCategories(CATEGORIES.map(c => c.id))
  }

  const clearAll = () => {
    setSelectedCategories([])
  }

  const searchLeads = async () => {
    if (!city.trim()) {
      toast.error('Digite o nome da cidade!')
      return
    }
    if (selectedCategories.length === 0) {
      toast.error('Selecione pelo menos uma categoria!')
      return
    }

    setLoading(true)
    setSearched(true)
    setLeads([])
    setProgress(0)

    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 200)

    // Simular busca (aqui seria a API do Google)
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      
      // Dados de exemplo baseados na cidade
      const mockLeads: Lead[] = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123 - Centro', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes', city: city, placeId: '1' },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456 - Centro', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas Médicas', city: city, placeId: '2' },
        { name: 'Academia Fit Life', address: 'Rua do Esporte, 789 - Bela Vista', rating: 4.2, reviews: 89, phone: '(77) 99999-0003', category: 'Academias', city: city, placeId: '3' },
        { name: 'Dr. João Silva - Dentista', address: 'Av. Central, 101 - Centro', rating: 4.9, reviews: 320, phone: '(77) 99999-0004', category: 'Dentistas', city: city, placeId: '4' },
        { name: 'Silva & Associados Advocacia', address: 'Rua dos Advogados, 202 - Centro', rating: 4.6, reviews: 45, phone: '(77) 99999-0005', category: 'Advogados', city: city, placeId: '5' },
        { name: 'Salão Beleza Prime', address: 'Av. das Nações, 303 - Jardim América', rating: 4.7, reviews: 180, phone: '(77) 99999-0006', category: 'Salões de Beleza', city: city, placeId: '6' },
        { name: 'Pet Shop Amigo Fiel', address: 'Rua dos Pets, 404 - Centro', rating: 4.4, reviews: 95, phone: '(77) 99999-0007', category: 'Pet Shops', city: city, placeId: '7' },
        { name: 'Farmácia Popular +', address: 'Av. Getúlio Vargas, 505 - Centro', rating: 4.3, reviews: 210, phone: '(77) 99999-0008', category: 'Farmácias', city: city, placeId: '8' },
      ]

      setLeads(mockLeads)
      setLoading(false)
      toast.success(`Encontrados ${mockLeads.length} leads em ${city}-${state}!`)
    }, 2500)
  }

  const downloadCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria', 'Cidade']
    const rows = leads.map(l => [
      `"${l.name}"`,
      `"${l.address}"`,
      l.phone,
      l.rating.toString(),
      l.reviews.toString(),
      l.category,
      l.city
    ])
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${city.toLowerCase().replace(/\s/g, '-')}-${state}.csv`
    a.click()
    
    toast.success('CSV baixado com sucesso!')
  }

  const copyToClipboard = () => {
    const text = leads.map(l => `${l.name}: ${l.phone}`).join('\n')
    navigator.clipboard.writeText(text)
    toast.success('Números copiados!')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🎯</span>
                <h1 className="text-4xl font-bold tracking-tight">LeadFlow</h1>
              </div>
              <p className="text-slate-400 text-lg">Captação profissional de leads via Google Maps</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Mais de</p>
              <p className="text-3xl font-bold text-emerald-400">10.000+</p>
              <p className="text-sm text-slate-400">leads captados</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 -mt-6">
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Buscar Novos Leads</h2>
              <p className="text-slate-500">Encontre empresas na sua região</p>
            </div>
            <div className="flex gap-2">
              <button onClick={selectAll} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Selecionar todas</button>
              <span className="text-slate-300">|</span>
              <button onClick={clearAll} className="text-sm text-slate-500 hover:text-slate-700 font-medium">Limpar</button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Barreiras, São Paulo, Rio de Janeiro"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-white"
              >
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={searchLeads}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  '🔍 Iniciar Busca'
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Buscando empresas...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Categorias ({selectedCategories.length} selecionadas)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    selectedCategories.includes(cat.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {leads.length > 0 ? `${leads.length} Leads Encontrados` : 'Nenhum resultado'}
                </h2>
                <p className="text-slate-500">{city}, {state}</p>
              </div>
              {leads.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 flex items-center gap-2 transition-colors"
                  >
                    📋 Copiar Telefones
                  </button>
                  <button
                    onClick={downloadCSV}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                  >
                    📥 Baixar CSV
                  </button>
                </div>
              )}
            </div>
            
            {leads.length === 0 && !loading ? (
              <div className="p-16 text-center">
                <p className="text-6xl mb-4">🔍</p>
                <p className="text-xl text-slate-600 font-medium">Nenhum lead encontrado</p>
                <p className="text-slate-500 mt-2">Tente selecionar outras categorias ou cidades</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {leads.map((lead, index) => (
                  <div key={index} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800">{lead.name}</h3>
                        <p className="text-slate-500 text-sm">{lead.address}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm font-medium">
                            ⭐ {lead.rating}
                          </span>
                          <span className="text-slate-400 text-sm">({lead.reviews} avaliações)</span>
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-sm font-medium">{lead.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${lead.phone}`}
                          className="bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-2"
                        >
                          📞 {lead.phone}
                        </a>
                        <a
                          href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Busca Precisa</h3>
            <p className="text-slate-500">Encontre exatamente o tipo de empresa que você precisa na região desejada</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-4">⚡</div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Dados Verificados</h3>
            <p className="text-slate-500">Telefones, endereços e avaliações diretamente do Google Maps</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl mb-4">📊</div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Exportação Fácil</h3>
            <p className="text-slate-500">Baixe em CSV ou copie os telefones para usar no seu CRM</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p>© 2026 LeadFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
