'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar } from 'lucide-react'

const periodos = [
  { id: '7d', name: 'Últimos 7 dias' },
  { id: '30d', name: 'Últimos 30 dias' },
  { id: '90d', name: 'Últimos 90 dias' },
  { id: 'ano', name: 'Este ano' },
]

export default function Relatorios() {
  const [periodo, setPeriodo] = useState('30d')

  // Dados mock
  const KPIs = [
    { label: 'Leads Captados', valor: 156, variacao: 12, icon: Users },
    { label: 'Taxa Conversão', valor: '23%', variacao: 5, icon: TrendingUp },
    { label: 'Receita', valor: 'R$ 48.900', variacao: 18, icon: DollarSign },
    { label: 'CAC', valor: 'R$ 127', variacao: -8, icon: DollarSign },
  ]

  const leadsPorCategoria = [
    { categoria: 'Restaurantes', valor: 45 },
    { categoria: 'Clínicas', valor: 32 },
    { categoria: 'Dentistas', valor: 28 },
    { categoria: 'Academias', valor: 21 },
    { categoria: 'Advogados', valor: 15 },
    { categoria: 'Beleza', valor: 15 },
  ]

  const pipelineData = [
    { etapa: 'Novo', valor: 35, percentual: 22 },
    { etapa: 'Contato', valor: 28, percentual: 18 },
    { etapa: 'Proposta', valor: 45, percentual: 29 },
    { etapa: 'Fechado', valor: 32, percentual: 21 },
    { etapa: 'Perdido', valor: 16, percentual: 10 },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>

      {/* Periood */}
      <div className="flex justify-between items-center mb-6">
        <select value={periodo} onChange={e => setPeriodo(e.target.value)} className="px-4 py-2 border rounded-lg">
          {periodos.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" /> Exportar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {KPIs.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <kpi.icon className="w-4 h-4" />
              <span className="text-xs">{kpi.label}</span>
            </div>
            <div className="text-xl font-bold">{kpi.valor}</div>
            <div className={`text-xs ${kpi.variacao > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}% vs período anterior
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos Simulados */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Leads por Categoria */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-bold mb-4">Leads por Categoria</h2>
          <div className="space-y-3">
            {leadsPorCategoria.map(c => (
              <div key={c.categoria}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{c.categoria}</span>
                  <span className="font-medium">{c.valor}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: `${c.valor}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="font-bold mb-4">Pipeline</h2>
          <div className="space-y-3">
            {pipelineData.map(p => (
              <div key={p.etapa}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.etapa}</span>
                  <span className="font-medium">{p.valor} ({p.percentual}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${
                    p.etapa === 'Novo' ? 'bg-blue-500' :
                    p.etapa === 'Contato' ? 'bg-yellow-500' :
                    p.etapa === 'Proposta' ? 'bg-purple-500' :
                    p.etapa === 'Fechado' ? 'bg-green-500' : 'bg-red-500'
                  }`} style={{ width: `${p.percentual * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de performance */}
      <div className="bg-white rounded-xl p-4 mt-6">
        <h2 className="font-bold mb-4">Performance por Vendedor</h2>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Vendedor</th>
              <th className="px-4 py-2 text-right text-xs text-slate-500">Leads</th>
              <th className="px-4 py-2 text-right text-xs text-slate-500">Fechados</th>
              <th className="px-4 py-2 text-right text-xs text-slate-500">Taxa</th>
              <th className="px-4 py-2 text-right text-xs text-slate-500">Valor</th>
            </tr>
          </thead>
          <tbody>
            {[
              { nome: 'João Silva', leads: 45, fechados: 12, taxa: 27, valor: 15600 },
              { nome: 'Maria Santos', leads: 38, fechados: 9, taxa: 24, valor: 12300 },
              { nome: 'Pedro Costa', leads: 32, fechados: 7, taxa: 22, valor: 8900 },
              { nome: 'Ana Oliveira', leads: 28, fechados: 4, taxa: 14, valor: 5200 },
            ].map(v => (
              <tr key={v.nome} className="border-t">
                <td className="px-4 py-3">{v.nome}</td>
                <td className="px-4 py-3 text-right">{v.leads}</td>
                <td className="px-4 py-3 text-right">{v.fechados}</td>
                <td className="px-4 py-3 text-right">{v.taxa}%</td>
                <td className="px-4 py-3 text-right font-medium text-green-600">R$ {v.valor.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}