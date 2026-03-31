'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { DollarSign, TrendingUp, TrendingDown, Percent, Calendar, Download, CreditCard, Wallet, PiggyBank } from 'lucide-react'

interface Transacao {
  id: string
  tipo: 'receita' | 'despesa'
  descricao: string
  valor: number
  categoria: string
  data: string
  status: 'concluido' | 'pendente'
}

const categoriasReceita = ['Planos', 'Singles', 'Indicações', 'Outros']
const categoriasDespesa = ['Marketing', 'Software', 'Salário', 'Infraestrutura', 'Outros']

export default function Financeiro() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { id: '1', tipo: 'receita', descricao: 'Pro - João Silva', valor: 9700, categoria: 'Planos', data: '2026-03-30', status: 'concluido' },
    { id: '2', tipo: 'receita', descricao: 'Enterprise - Clínica Saúde', valor: 29700, categoria: 'Planos', data: '2026-03-28', status: 'concluido' },
    { id: '3', tipo: 'receita', descricao: 'Pro - Dr. João Silva', valor: 9700, categoria: 'Planos', data: '2026-03-25', status: 'concluido' },
    { id: '4', tipo: 'despesa', descricao: 'Google Ads', valor: 1500, categoria: 'Marketing', data: '2026-03-29', status: 'concluido' },
    { id: '5', tipo: 'despesa', descricao: 'Supabase', valor: 250, categoria: 'Software', data: '2026-03-01', status: 'concluido' },
    { id: '6', tipo: 'receita', descricao: 'Gratis Upgrade', valor: 0, categoria: 'Outros', data: '2026-03-27', status: 'pendente' },
  ])

  const [mostrarForm, setMostrarForm] = useState(false)
  const [novaTransacao, setNovaTransacao] = useState({ tipo: 'receita', descricao: '', valor: '', categoria: 'Planos' })

  // Stats
  const receitaTotal = transacoes.filter(t => t.tipo === 'receita' && t.status === 'concluido').reduce((s, t) => s + t.valor, 0)
  const despesaTotal = transacoes.filter(t => t.tipo === 'despesa' && t.status === 'concluido').reduce((s, t) => s + t.valor, 0)
  const lucro = receitaTotal - despesaTotal
  const ticketMedio = receitaTotal / transacoes.filter(t => t.tipo === 'receita').length

  // Adicionar transação
  const adicionar = () => {
    if (!novaTransacao.descricao || !novaTransacao.valor) {
      toast.error('Preencha todos os campos')
      return
    }
    const trans: Transacao = {
      id: crypto.randomUUID(),
      tipo: novaTransacao.tipo as 'receita' | 'despesa',
      descricao: novaTransacao.descricao,
      valor: parseFloat(novaTransacao.valor),
      categoria: novaTransacao.categoria,
      data: new Date().toISOString().split('T')[0],
      status: 'concluido'
    }
    setTransacoes([trans, ...transacoes])
    setMostrarForm(false)
    setNovaTransacao({ tipo: 'receita', descricao: '', valor: '', categoria: 'Planos' })
    toast.success('Transação adicionada!')
  }

  // Exportar
  const exportar = () => {
    const headers = ['Data', 'Tipo', 'Descrição', 'Categoria', 'Valor', 'Status']
    const rows = transacoes.map(t => [t.data, t.tipo, t.descricao, t.categoria, t.valor, t.status])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financeiro-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('Exportado!')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Financeiro</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">Receita</span>
          </div>
          <div className="text-xl font-bold">R$ {receitaTotal.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs">Despesa</span>
          </div>
          <div className="text-xl font-bold">R$ {despesaTotal.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">Lucro</span>
          </div>
          <div className="text-xl font-bold">R$ {lucro.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Percent className="w-4 h-4" />
            <span className="text-xs">Ticket Médio</span>
          </div>
          <div className="text-xl font-bold">R$ {Math.round(ticketMedio).toLocaleString()}</div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setMostrarForm(true)} className="btn-primary flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Nova Transação
        </button>
        <button onClick={exportar} className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" /> Exportar
        </button>
      </div>

      {/* Lista */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Data</th>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Tipo</th>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Descrição</th>
              <th className="px-4 py-2 text-left text-xs text-slate-500">Categoria</th>
              <th className="px-4 py-2 text-right text-xs text-slate-500">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-3 text-sm">{t.data}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${t.tipo === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.tipo}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{t.descricao}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{t.categoria}</td>
                <td className={`px-4 py-3 text-right font-medium ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.tipo === 'receita' ? '+' : '-'}R$ {t.valor.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarForm(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Nova Transação</h2>
            <div className="space-y-3">
              <select value={novaTransacao.tipo} onChange={e => setNovaTransacao({ ...novaTransacao, tipo: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
              <input value={novaTransacao.descricao} onChange={e => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })} placeholder="Descrição" className="w-full px-4 py-2 border rounded-lg" />
              <input value={novaTransacao.valor} onChange={e => setNovaTransacao({ ...novaTransacao, valor: e.target.value })} type="number" placeholder="Valor" className="w-full px-4 py-2 border rounded-lg" />
              <select value={novaTransacao.categoria} onChange={e => setNovaTransacao({ ...novaTransacao, categoria: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                {(novaTransacao.tipo === 'receita' ? categoriasReceita : categoriasDespesa).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={adicionar} className="w-full btn-primary mt-4">Salvar</button>
          </div>
        </div>
      )}
    </div>
  )
}