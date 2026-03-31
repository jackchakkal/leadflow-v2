'use client'

import { Toaster, toast } from 'react-hot-toast'
import { useState } from 'react'
import { 
  Search, MapPin, Star, Phone, Download, X, Check, Menu, 
  Kanban, TrendingUp, Users, Bot, ArrowRight, Mail 
} from 'lucide-react'

const CATEGORIES = [
  { id: 'restaurant', name: 'Restaurantes' },
  { id: 'clinic', name: 'Clínicas' },
  { id: 'dentist', name: 'Dentistas' },
  { id: 'gym', name: 'Academias' },
  { id: 'lawyer', name: 'Advogados' },
  { id: 'beauty', name: 'Beleza' },
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
  { 
    icon: Search, 
    title: 'Busca Avançada', 
    desc: 'Filtre por cidade, raio, categoria e avaliação. Encontre exatamente o que precisa.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50'
  },
  { 
    icon: Kanban, 
    title: 'Pipeline Kanban', 
    desc: 'Arraste e solte entre etapas. Visualize o funil completo de vendas.',
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  { 
    icon: TrendingUp, 
    title: 'Controle Total', 
    desc: 'Acompanhe valor, comissões e receita. Métricas em tempo real.',
    color: 'text-green-500',
    bg: 'bg-green-50'
  },
  { 
    icon: Users, 
    title: 'Gestão de Equipe', 
    desc: 'Colabore com sua equipe. Permissões avançadas e atribuição de leads.',
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  { 
    icon: Download, 
    title: 'Exportação CSV', 
    desc: 'Exporte dados ilimitados. Integre com seus sistemas e planilhas.',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  { 
    icon: Bot, 
    title: 'Automação IA', 
    desc: 'Automatize tarefas repetitivas. Economize tempo e foque em vender.',
    color: 'text-pink-500',
    bg: 'bg-pink-50'
  },
]

const PLANS = [
  { 
    name: 'Grátis', 
    price: 'R$ 0', 
    period: 'para sempre',
    features: ['100 leads/mês', 'Busca básica', 'Exportar CSV', 'Suporte por email'],
    cta: 'Começar Grátis',
    popular: false
  },
  { 
    name: 'Pro', 
    price: 'R$ 97', 
    period: 'por mês',
    features: ['1.000 leads/mês', 'Pipeline completo', 'Equipe (5 usuários)', 'Automação IA', 'Prioridade suporte'],
    cta: 'Escolher Pro',
    popular: true
  },
  { 
    name: 'Enterprise', 
    price: 'R$ 297', 
    period: 'por mês',
    features: ['Leads ilimitados', 'API completa', 'Equipe ilimitada', 'Manager dedicado', 'SLA garantido'],
    cta: 'Falar Consultor',
    popular: false
  },
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
        { name: 'Academia FitLife', address: 'Av. São Paulo, 789', rating: 4.3, reviews: 89, phone: '(77) 99999-0003', category: 'Academias' },
        { name: 'Consultório Dr. Silva', address: 'Rua Nova, 101', rating: 4.9, reviews: 312, phone: '(77) 99999-0004', category: 'Dentistas' },
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
    a.download = `leads-${city.toLowerCase().replace(/\s+/g, '-')}.csv`
    a.click()
    toast.success('CSV baixado!')
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                LeadFlow
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Planos</a>
              <a href="#demo" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">Demo</a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button className="text-slate-700 font-medium hover:text-cyan-600 transition-colors px-4 py-2">
                Entrar
              </button>
              <button 
                onClick={() => setShowDemo(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Começar Grátis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-slate-700 font-medium py-2">Funcionalidades</a>
            <a href="#pricing" className="block text-slate-700 font-medium py-2">Planos</a>
            <a href="#demo" className="block text-slate-700 font-medium py-2">Demo</a>
            <button className="w-full text-left text-slate-700 font-medium py-2">Entrar</button>
            <button 
              onClick={() => { setShowDemo(true); setMenuOpen(false) }}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Começar Grátis
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-300/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-100/30 to-purple-100/30 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-white/50 rounded-full mb-8 shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">🚀 Integração Google Maps</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            O Sistema de Captação<br/>
            <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Mais Poderoso do Brasil
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Capture leads qualificados do Google Maps, gerencie o ciclo de vendas completo 
            e multiplique suas conversões com automação inteligente.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setShowDemo(true)}
              className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
            >
              Testar Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#features"
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Ver Recursos
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Tudo que você precisa para vender mais
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ferramentas completas para capturar, gerenciar e converter leads em clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Escolha o plano ideal
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comece gratuitement e evolua conforme seu negócio cresce.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {PLANS.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-white p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-2 ring-cyan-500 shadow-xl shadow-cyan-200/30 scale-105 z-10' 
                    : 'border-slate-200 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold rounded-full">
                    MAIS POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">/{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/30' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">LeadFlow</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="hover:text-cyan-400 transition-colors">Planos</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Termos</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacidade</a>
            </div>

            {/* Copyright */}
            <p className="text-sm">© 2026 LeadFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowDemo(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Testar Busca de Leads</h2>
                <p className="text-sm text-slate-500">Demonstração gratuita</p>
              </div>
              <button 
                onClick={() => setShowDemo(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* City & State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cidade</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      value={city} 
                      onChange={e => setCity(e.target.value)} 
                      placeholder="Ex: Barreiras" 
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
                  <select 
                    value={state} 
                    onChange={e => setState(e.target.value)} 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
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
              </div>

              {/* Categories */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700">Categorias</label>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setSelectedCategories(CATEGORIES.map(c => c.id))} 
                      className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                      Todas
                    </button>
                    <button 
                      onClick={() => setSelectedCategories([])} 
                      className="text-sm text-slate-500 hover:text-slate-600"
                    >
                      Limpar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)} 
                      className={`p-3 rounded-xl text-sm font-medium border transition-all ${
                        selectedCategories.includes(cat.id) 
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={searchLeads} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-bold mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Buscar Leads
                </>
              )}
            </button>

            {/* Results */}
            {leads.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-900">{leads.length} leads encontrados</span>
                  <button 
                    onClick={downloadCSV}
                    className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {leads.map((lead, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="font-medium text-slate-900">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.address}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-sm font-medium">{lead.rating}</span>
                        </div>
                        <a 
                          href={`tel:${lead.phone}`} 
                          className="text-cyan-600 text-sm hover:text-cyan-700 flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>
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
