'use client'

import Link from 'next/link'

const features = [
  {
    icon: '🗺️',
    title: 'Busca Avançada',
    description: 'Busque por cidade, raio, categoria, avaliação e muito mais. Encontre exatamente o que precisa.',
  },
  {
    icon: '📋',
    title: 'Pipeline Kanban',
    description: 'Arraste e solte leads entre etapas. Visualize todo seu funil de vendas de uma forma.',
  },
  {
    icon: '📊',
    title: 'Controle Total',
    description: 'Acompanhe valor por lead, comissões, receita e tome decisões baseadas em dados.',
  },
  {
    icon: '👥',
    title: 'Gestão de Equipe',
    description: 'Múltiplos usuários com permissões. Atribua leads e acompanhe performance por vendedor.',
  },
  {
    icon: '📥',
    title: 'Importação/Exportação',
    description: 'Importe CSV, exporte relatórios, envie links diretos para WhatsApp. Tudo em poucos cliques.',
  },
  {
    icon: '🤖',
    title: 'Automações',
    description: 'Mensagens automáticas, lembretes de follow-up e sequências de nutrição.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
            Funcionalidades
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Tudo que você precisa para vender mais
          </h2>
          <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
            Uma solução completa para capturar, gerenciar e converter leads do Google Maps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
