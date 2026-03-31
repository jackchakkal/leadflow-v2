'use client'

import { useState } from 'react'
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield, 
  BarChart3,
  Menu,
  X,
  Check,
  Star,
  Play
} from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const features = [
    {
      icon: MapPin,
      title: 'Captura Automática',
      description: 'Extraia leads diretamente do Google Maps com filtros por localização, categoria e avaliação.'
    },
    {
      icon: Users,
      title: 'Gestão de Contatos',
      description: 'Organize, categorize e acompanhe todos os seus leads em um só lugar com pipeline visual.'
    },
    {
      icon: TrendingUp,
      title: 'Automação de Vendas',
      description: 'Configure sequências de follow-up automáticas e nunca perca uma oportunidade.'
    },
    {
      icon: Zap,
      title: 'Integração Rápida',
      description: 'Conecte com seu CRM favorito ou use nossa API robusta para customizações.'
    },
    {
      icon: Shield,
      title: 'Dados Protegidos',
      description: 'Segurança enterprise com criptografia, backup automático e conformidade LGPD.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avançado',
      description: 'Métricas em tempo real, relatórios customizados e dashboards interativos.'
    }
  ]

  const plans = [
    {
      name: 'Starter',
      price: '97',
      description: 'Perfeito para autônomos e pequenos negócios',
      features: [
        '1.000 leads/mês',
        '5 categorias',
        '1 usuário',
        'E-mail suporte',
        'Exportação CSV'
      ],
      highlight: false
    },
    {
      name: 'Professional',
      price: '197',
      description: 'Ideal para equipes de vendas em crescimento',
      features: [
        '10.000 leads/mês',
        'Categorias ilimitadas',
        '5 usuários',
        'Suporte prioritário',
        'API acesso',
        'Automação básica'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: '497',
      description: 'Para empresas que precisam de escala',
      features: [
        'Leads ilimitados',
        'Usuários ilimitados',
        'API completa',
        'Automação avançada',
        'Consultor dedicado',
        'SLA garantido'
      ],
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">LeadFlow</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Preços</a>
              <a href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Depoimentos</a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-sm"
              >
                Ver Demo
              </button>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-600 font-medium">Features</a>
            <a href="#pricing" className="block text-slate-600 font-medium">Preços</a>
            <a href="#testimonials" className="block text-slate-600 font-medium">Depoimentos</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm w-full"
            >
              Ver Demo
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">🚀 Agora com IA para qualificação automática</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Capture leads do{' '}
              <span className="gradient-text">Google Maps</span>{' '}
              como nunca
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              A plataforma mais completa para captar, qualificar e converter leads do Google Maps. 
              Automatize seu funil de vendas e multiplique suas conversões.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Ver Demonstração
              </button>
              <a href="#pricing" className="btn-secondary text-lg px-8 py-4">
                Começar Grátis
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50K+', label: 'Leads capturados' },
                { value: '98%', label: 'Satisfação' },
                { value: '3x', label: 'Mais conversões' },
                { value: '24/7', label: 'Suporte' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Tudo que você precisa para vender mais</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Ferramentas poderosas pensadas para simplificar sua rotina e maximizar resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="card group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Preços</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Planos que cabem no seu bolso</h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Todos incluem 7 dias de teste grátis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i}
                className={`relative bg-white rounded-2xl p-8 ${
                  plan.highlight 
                    ? 'ring-2 ring-cyan-500 shadow-xl scale-105' 
                    : 'border border-slate-200'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
                </div>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-slate-900">R$</span>
                  <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}>
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">O que dizem nossos clientes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos Silva',
                role: 'Diretor de Vendas',
                company: 'TechCorp',
                text: 'O LeadFlow transformou nossa operação. Capturamos 3x mais leads e aumentamos nossa conversão em 150% no primeiro mês.',
                rating: 5
              },
              {
                name: 'Mariana Oliveira',
                role: 'Fundadora',
                company: 'StartUp Brasil',
                text: 'Incrível como a automação nos economiza tempo. Nossa equipe agora foca em fechar negócios, não em procurar leads.',
                rating: 5
              },
              {
                name: 'Ricardo Santos',
                role: 'Gestor Comercial',
                company: 'Grupo Prime',
                text: 'Melhor investimento que fizemos. O suporte é excepcional e as funcionalidades superam qualquer concorrente.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para transformar suas vendas?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Comece seu teste grátis de 7 dias agora mesmo. Sem compromisso.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all shadow-xl"
          >
            Criar Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LeadFlow</span>
              </div>
              <p className="text-slate-400">
                Capturando leads do Google Maps para impulsionar seu negócio.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LeadFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Demonstração LeadFlow</h3>
                  <p className="text-slate-500">Veja a plataforma em ação</p>
                </div>
              </div>

              <div className="bg-slate-100 rounded-xl aspect-video flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">Demo em breve...</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">O que você verá:</h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Como capturar leads do Maps
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Gestão de pipeline de vendas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Automação de follow-up
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Agende uma demo</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Nossa equipe mostra tudo personalmente
                  </p>
                  <button className="btn-primary text-sm w-full">
                    Agendar agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}