'use client'

import { Toaster, toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Pricing } from '@/components/Pricing'
import { Footer } from '@/components/Footer'
import { Search, MapPin, Star, Phone, Download, X, Check } from 'lucide-react'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes', icon: '🍽️' },
  { id: 'clinic', name: 'Clínicas', icon: '🏥' },
  { id: 'dentist', name: 'Dentistas', icon: '🦷' },
  { id: 'gym', name: 'Academias', icon: '💪' },
  { id: 'lawyer', name: 'Advogados', icon: '⚖️' },
  { id: 'beauty', name: 'Beleza', icon: '💇' },
  { id: 'car', name: 'Carros', icon: '🚗' },
  { id: 'hotel', name: 'Hotéis', icon: '🏨' },
  { id: 'pharmacy', name: 'Farmácias', icon: '💊' },
  { id: 'market', name: 'Mercados', icon: '🛒' },
  { id: 'bar', name: 'Bares', icon: '🍺' },
  { id: 'pet', name: 'Pet Shops', icon: '🐕' },
]

interface Lead {
  name: string
  address: string
  rating: number
  reviews: number
  phone: string
  category: string
}

export default function Home() {
  const [showDemo, setShowDemo] = useState(false)
  const [city, setCity] = useState('')
  const [state, setState] = useState('BA')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const searchLeads = () => {
    if (!city.trim()) { toast.error('Digite a cidade!'); return }
    if (selectedCategories.length === 0) { toast.error('Selecione categorias!'); return }

    setLoading(true)
    setLeads([])

    setTimeout(() => {
      const mockLeads = [
        { name: 'Restaurante Sabor Baiano', address: 'Rua das Flores, 123', rating: 4.5, reviews: 230, phone: '(77) 99999-0001', category: 'Restaurantes' },
        { name: 'Clínica Saúde Integral', address: 'Av. Principal, 456', rating: 4.8, reviews: 150, phone: '(77) 99999-0002', category: 'Clínicas' },
        { name: 'Academia Fit Life', address: 'Rua do Esporte, 789', rating: 4.2, reviews: 89, phone: '(77) 99999-0003', category: 'Academias' },
        { name: 'Dr. João Silva - Dentista', address: 'Av. Central, 101', rating: 4.9, reviews: 320, phone: '(77) 99999-0004', category: 'Dentistas' },
        { name: 'Silva & Associados Advocacia', address: 'Rua dos Advogados, 202', rating: 4.6, reviews: 45, phone: '(77) 99999-0005', category: 'Advogados' },
      ]
      setLeads(mockLeads)
      setLoading(false)
      toast.success(`${mockLeads.length} leads encontrados!`)
    }, 2500)
  }

  const downloadCSV = () => {
    const headers = ['Nome', 'Endereço', 'Telefone', 'Nota', 'Avaliações', 'Categoria']
    const rows = leads.map(l => [l.name, l.address, l.phone, l.rating.toString(), l.reviews.toString(), l.category])
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
    <div className="min-h-screen">
      <Toaster position="top-center" />
      
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDemo(false)}>
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Testar Busca de Leads</h2>
              <button onClick={() => setShowDemo(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cidade</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Ex: Barreiras"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estado</label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  >
                    <option value="BA">Bahia</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="CE">Ceará</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Categorias</label>
                  <div className="flex gap-3">
                    <button onClick={() => setSelectedCategories(CATEGORIES.map(c => c.id))} className="text-sm text-cyan-600 hover:underline">
                      Todas
                    </button>
                    <button onClick={() => setSelectedCategories([])} className="text-sm text-slate-500 hover:underline">
                      Limpar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-3 rounded-xl text-sm border transition-all ${
                        selectedCategories.includes(cat.id)
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-lg mb-1">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4">
              <button
                onClick={searchLeads}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Buscar Leads
                  </>
                )}
              </button>
            </div>

            {leads.length > 0 && (
              <div className="border-t p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold">{leads.length} leads encontrados</span>
                  <button onClick={downloadCSV} className="flex items-center gap-2 text-green-600 font-medium">
                    <Download className="w-4 h-4" />
                    Baixar CSV
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {leads.map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> {lead.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-cyan-600 font-medium">
                          <Phone className="w-4 h-4" /> {lead.phone}
                        </a>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Star className="w-3 h-3 text-amber-400 fill-current" /> {lead.rating} ({lead.reviews})
                        </div>
                      </div>
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
