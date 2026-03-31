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
]

interface Lead {
  name: string
  address: string
  rating: number
  reviews: number
  phone: string
  category: string
  city: string
}

export default function Home() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('BA')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
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

    // Simular busca (aqui seria a API do Google)
    // Quando tiver a API Key real, integrar aqui
    setTimeout(() => {
      // Dados de exemplo
      const mockLeads: Lead[] = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes', city: city },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas', city: city },
        { name: 'Academia Fit Life', address: 'Rua do Esporte, 789', rating: 4.2, reviews: 89, phone: '(77) 99999-0003', category: 'Academias', city: city },
        { name: 'Dr. João Silva - Dentista', address: 'Av. Central, 101', rating: 4.9, reviews: 320, phone: '(77) 99999-0004', category: 'Dentistas', city: city },
        { name: 'Escritório Silva & Associados', address: 'Rua dos Advogados, 202', rating: 4.6, reviews: 45, phone: '(77) 99999-0005', category: 'Advogados', city: city },
      ]

      setLeads(mockLeads)
      setLoading(false)
      toast.success(`Encontrados ${mockLeads.length} leads!`)
    }, 2000)
  }

  const downloadCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria', 'Cidade']
    const rows = leads.map(l => [
      l.name,
      l.address,
      l.phone,
      l.rating.toString(),
      l.reviews.toString(),
      l.category,
      l.city
    ])
    
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${city}-${state}.csv`
    a.click()
    
    toast.success('CSV baixado!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">🎯 LeadFlow</h1>
          <p className="text-indigo-100">Captação de leads via Google Maps</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Buscar Leads</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Barreiras"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
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
                  '🔍 Buscar Leads'
                )}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecione as categorias ({selectedCategories.length} selecionadas)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                    selectedCategories.includes(cat.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {leads.length > 0 ? `${leads.length} Leads Encontrados` : 'Nenhum resultado'}
              </h2>
              {leads.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
                >
                  📥 Baixar CSV
                </button>
              )}
            </div>
            
            {leads.length === 0 && !loading ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-4xl mb-4">🔍</p>
                <p>Nenhum lead encontrado para essa busca.</p>
                <p className="text-sm mt-2">Tente selecionar outras categorias ou cidades.</p>
              </div>
            ) : (
              <div className="divide-y">
                {leads.map((lead, index) => (
                  <div key={index} className="p-6 flex flex-col md:flex-row md:items-center gap-4 hover:bg-gray-50">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{lead.name}</h3>
                      <p className="text-gray-600 text-sm">{lead.address}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          ⭐ {lead.rating} ({lead.reviews} avaliações)
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{lead.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <a
                        href={`tel:${lead.phone}`}
                        className="block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200"
                      >
                        📞 {lead.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-2">ℹ️ Como funciona</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>1. Digite a cidade e estado onde deseja buscar</li>
            <li>2. Selecione as categorias de empresas de interesse</li>
            <li>3. Clique em "Buscar Leads" e aguarde</li>
            <li>4. Baixe o CSV com todos os dados para suaplanilha</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 LeadFlow - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
