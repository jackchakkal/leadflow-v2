'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { Search, Users, BarChart3, Settings, DollarSign, UserPlus, Bot, FileText, Shield, Zap, ChevronRight } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50 p-4">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Módulos Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {MODULOS.map(modulo => (
          <button
            key={modulo.id}
            onClick={() => router.push(modulo.path)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-left group"
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
    </div>
  )
}