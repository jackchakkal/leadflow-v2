'use client'

import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Grátis',
    price: 'R$ 0',
    period: '/mês',
    description: 'Perfeito para começar',
    features: [
      '100 leads/mês',
      'Busca básica',
      'Exportar CSV',
      '1 usuário',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para escalar seu negócio',
    features: [
      '1.000 leads/mês',
      'Busca avançada',
      'Pipeline completo',
      'Equipe (até 5)',
      'Relatórios',
      'Suporte prioritário',
    ],
    cta: 'Escolher Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 297',
    period: '/mês',
    description: 'Para grandes equipes',
    features: [
      'Leads ilimitados',
      'API de acesso',
      'Equipe ilimitada',
      'White-label',
      'Gerente de contas',
      'SLA garantido',
    ],
    cta: 'Falar com Consultor',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
            Planos
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Escolha o plano ideal
          </h2>
          <p className="text-xl text-slate-600 mt-4">
            Comece grátis, upgrading quando precisar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.popular
                  ? 'ring-2 ring-cyan-500 shadow-xl scale-105 z-10'
                  : 'border border-slate-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-cyan-600' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-slate-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:opacity-90'
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
  )
}
