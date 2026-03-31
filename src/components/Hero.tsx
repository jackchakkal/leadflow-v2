'use client'

import { ArrowRight, Play, Zap, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Leads Captados', value: '50.000+', icon: Users },
  { label: 'Usuários Ativos', value: '2.500+', icon: Zap },
  { label: 'Vendas Geradas', value: 'R$ 15M+', icon: TrendingUp },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-cyan-700">🚀 Ahora con integração ao Google Maps</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 animate-slide-up">
          O Sistema de Captação
          <br />
          <span className="gradient-text">Mais Poderoso do Brasil</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-100">
          Capture leads do Google Maps, gerencie todo o ciclo de vendas e multiplique suas conversões com inteligência.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-200">
          <Link href="/dashboard" className="btn-primary group flex items-center gap-2">
            <Play className="w-5 h-5" />
            Começar Grátis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#features" className="btn-secondary">
            Ver Demonstração
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in animation-delay-300">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-xl">
                <stat.icon className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
