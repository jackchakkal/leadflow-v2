'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast'
import { Search, Plus, Users, BarChart3, Settings, X, Star, Mail, Phone, MapPin, Calendar, Download, ChevronRight, Bot, Zap, Shield } from 'lucide-react'

const MODULOS = [
  { id: 'busca', name: 'Buscar Leads', icon: Search, desc: 'Encontre empresas no Google Maps', path: '/' },
  { id: 'leads', name: 'Meus Leads', icon: Users, desc: 'Gerencie seus leads', path: '/leads' },
  { id: 'pipeline', name: 'Pipeline', icon: BarChart3, desc: 'Funil de vendas', path: '/pipeline' },
]

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({ total: 0, pipeline: 0, fechados: 0, valorTotal: 0 })
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // Carregar stats do localStorage
    const dados = localStorage.getItem('leadflow_stats')
    if (dados) {
      setStats(JSON.parse(dados))
    }
    
    const activity = localStorage.getItem('leadflow_activity')
    if (activity) {
      setRecentActivity(JSON.parse(activity))
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-bold text-xl gradient-text">LeadFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">100</span> créditos
            </span>
            <button className="w-10 h-10 bg-slate-200 rounded-full"></button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{stats.total || 0}</div>
            <div className="text-xs text-slate-500">Leads Captados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pipeline || 0}</div>
            <div className="text-xs text-slate-500">No Pipeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.fechados || 0}</div>
            <div className="text-xs text-slate-500">Fechados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">R$ {(stats.valorTotal || 0).toLocaleString()}</div>
            <div className="text-xs text-slate-500">Valor Total</div>
          </div>
        </div>
      </div>

      {/* Módulos */}
      <main className="max-w-7xl mx-auto p-4">
        <h2 className="text-lg font-bold mb-4">Módulos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {MODULOS.map(modulo => (
            <button
              key={modulo.id}
              onClick={() => router.push(`/dashboard${modulo.path}`)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <modulo.icon className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-1">{modulo.name}</h3>
              <p className="text-sm text-slate-500">{modulo.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-cyan-600 text-sm">
                Acessar <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Em breve */}
        <h2 className="text-lg font-bold mt-8 mb-4">Em Breve</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-400">Automações</h3>
            <p className="text-sm text-slate-500">follow-up automático</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-400">IA</h3>
            <p className="text-sm text-slate-500">Análise inteligente</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-slate-400">Segurança</h3>
            <p className="text-sm text-slate-500">Auth e 2FA</p>
          </div>
        </div>
      </main>
    </div>
  )
}