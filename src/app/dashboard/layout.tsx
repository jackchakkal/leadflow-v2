'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Search, Users, BarChart3, Settings, DollarSign, UserPlus, Bot, FileText, Shield } from 'lucide-react'

const menuItems = [
  { path: '/dashboard', name: 'Painel', icon: Home },
  { path: '/dashboard/leads', name: 'Leads', icon: Users },
  { path: '/dashboard/pipeline', name: 'Pipeline', icon: BarChart3 },
  { path: '/dashboard/financeiro', name: 'Financeiro', icon: DollarSign },
  { path: '/dashboard/equipe', name: 'Equipe', icon: UserPlus },
  { path: '/dashboard/relatorios', name: 'Relatórios', icon: FileText },
  { path: '/dashboard/automacoes', name: 'Automações', icon: Bot },
  { path: '/dashboard/config', name: 'Config', icon: Settings },
  { path: '/dashboard/seguranca', name: 'Segurança', icon: Shield },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/')} className="flex items-center gap-2 hover:opacity-80">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              <nav className="flex items-center gap-1">
                {menuItems.map(item => (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${
                      pathname === item.path
                        ? 'bg-cyan-50 text-cyan-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">1000</span> créditos
              </span>
              <button className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">JS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo com margem para o header fixo */}
      <main className="pt-14">
        {children}
      </main>

      {/* Footer fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-400">
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-cyan-600">
            <Home className="w-3 h-3" /> Voltar ao Início
          </button>
          <span>© 2026 LeadFlow</span>
        </div>
      </footer>
    </div>
  )
}