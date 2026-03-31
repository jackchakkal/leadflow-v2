'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Users, BarChart3, Settings, DollarSign, UserPlus, Bot, FileText, Shield, Zap, ChevronRight, Home, LogOut } from 'lucide-react'

const MODULOS = [
  { id: 'busca', name: 'Buscar Leads', icon: Search, desc: 'Encontre empresas no Google Maps', path: '/dashboard' },
  { id: 'leads', name: 'Meus Leads', icon: Users, desc: 'Gerencie seus leads', path: '/dashboard/leads' },
  { id: 'pipeline', name: 'Pipeline', icon: BarChart3, desc: 'Funil de vendas', path: '/dashboard/pipeline' },
  { id: 'financeiro', name: 'Financeiro', icon: DollarSign, desc: 'Controle de receitas', path: '/dashboard/financeiro' },
  { id: 'equipe', name: 'Equipe', icon: UserPlus, desc: 'Gestão de usuários', path: '/dashboard/equipe' },
  { id: 'relatorios', name: 'Relatórios', icon: FileText, desc: 'Métricas e KPIs', path: '/dashboard/relatorios' },
  { id: 'automacoes', name: 'Automações', icon: Bot, desc: 'Automação de tarefas', path: '/dashboard/automacoes' },
  { id: 'config', name: 'Configurações', icon: Settings, desc: 'Dados da conta', path: '/dashboard/config' },
  { id: 'seguranca', name: 'Segurança', icon: Shield, desc: '2FA e segurança', path: '/dashboard/seguranca' },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 hover:opacity-80">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="font-bold text-xl gradient-text">LeadFlow</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">1000</span> créditos
            </span>
            <button className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Módulos Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {MODULOS.map(modulo => (
            <button
              key={modulo.id}
              onClick={() => router.push(modulo.path)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <modulo.icon className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-cyan-600">{modulo.name}</h3>
              <p className="text-sm text-slate-500">{modulo.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-cyan-600 text-sm">
                Acessar <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Em Breve */}
        <h2 className="text-lg font-bold mt-8 mb-4">Em Breve</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-bold text-lg text-slate-400">IA</h3>
            <p className="text-sm text-slate-500">Análise inteligente de leads</p>
          </div>
        </div>
      </main>

      {/* Footer com Voltar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-600 hover:text-cyan-600">
            <Home className="w-4 h-4" /> Voltar ao Início
          </button>
          <span className="text-xs text-slate-400">© 2026 LeadFlow</span>
        </div>
      </footer>
      {/* Espaçamento para o footer fixo */}
      <div className="h-16"></div>
    </div>
  )
}