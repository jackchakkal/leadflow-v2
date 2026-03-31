'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Bot, Plus, Play, Pause, Trash2, Zap, Clock, MessageSquare, Mail, Phone } from 'lucide-react'

const tipoAcoes = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'ligacao', name: 'Ligação', icon: Phone },
]

const gatilhos = [
  { id: 'novo_lead', name: 'Novo Lead', desc: 'Quando um lead é adicionado' },
  { id: 'sem_contato', name: 'Sem contato', desc: '7 dias sem interação' },
  { id: 'etapa', name: 'Mudança de etapa', desc: 'Quando muda para outra etapa' },
]

interface Automacao {
  id: string
  nome: string
  gatilho: string
  acao: string
  status: 'ativa' | 'pausada'
  ultimaExec: string
}

export default function Automacoes() {
  const [mostrarForm, setMostrarForm] = useState(false)
  const [novaAuto, setNovaAuto] = useState({ nome: '', gatilho: '', acao: '' })

  const automacoes: Automacao[] = [
    { id: '1', nome: 'Welcome Message', gatilho: 'novo_lead', acao: 'whatsapp', status: 'ativa', ultimaExec: '2026-03-31 14:30' },
    { id: '2', nome: 'Follow-up 7 dias', gatilho: 'sem_contato', acao: 'whatsapp', status: 'ativa', ultimaExec: '2026-03-31 10:15' },
    { id: '3', nome: 'Novo lead通知', gatilho: 'novo_lead', acao: 'email', status: 'pausada', ultimaExec: '2026-03-30 16:20' },
  ]

  const ativarDesativar = (id: string) => {
    setAutomacoes(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'ativa' ? 'pausada' : 'ativa' } : a))
    toast.success('Automação atualizada!')
  }

  const [automacoesState, setAutomacoes] = useState(automacoes)

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Automações</h1>
        <button onClick={() => setMostrarForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nova Automação
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold">{automacoesState.filter(a => a.status === 'ativa').length}</div>
          <div className="text-xs text-slate-500">Ativas</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">28</div>
          <div className="text-xs text-slate-500">Execuções hoje</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-600">156</div>
          <div className="text-xs text-slate-500">Total了这个月</div>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {automacoesState.map(auto => (
          <div key={auto.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${auto.status === 'ativa' ? 'bg-green-100' : 'bg-slate-100'}`}>
                <Bot className={`w-5 h-5 ${auto.status === 'ativa' ? 'text-green-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <div className="font-medium">{auto.nome}</div>
                <div className="text-sm text-slate-500">
                  {gatilhos.find(g => g.id === auto.gatilho)?.name} → {tipoAcoes.find(t => t.id === auto.acao)?.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded ${auto.status === 'ativa' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {auto.status === 'ativa' ? 'Ativa' : 'Pausada'}
                </span>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {auto.ultimaExec}
                </div>
              </div>
              <button onClick={() => ativarDesativar(auto.id)} className="p-2 hover:bg-slate-100 rounded-lg">
                {auto.status === 'ativa' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Templates rápidos */}
      <div className="mt-8 bg-white rounded-xl p-4">
        <h2 className="font-bold mb-3">Templates Prontos</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <button className="p-3 bg-slate-50 rounded-lg text-left hover:bg-slate-100">
            <div className="font-medium text-sm">Welcome Message</div>
            <div className="text-xs text-slate-500">Olá! Obrigado pelo contato...</div>
          </button>
          <button className="p-3 bg-slate-50 rounded-lg text-left hover:bg-slate-100">
            <div className="font-medium text-sm">Follow-up 7 dias</div>
            <div className="text-xs text-slate-500">Olá! Vi que ainda não falamos...</div>
          </button>
          <button className="p-3 bg-slate-50 rounded-lg text-left hover:bg-slate-100">
            <div className="font-medium text-sm">Proposta Enviada</div>
            <div className="text-xs text-slate-500">Segue em anexo a proposta...</div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarForm(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Nova Automação</h2>
            <div className="space-y-3">
              <input value={novaAuto.nome} onChange={e => setNovaAuto({ ...novaAuto, nome: e.target.value })} placeholder="Nome" className="w-full px-4 py-2 border rounded-lg" />
              <div>
                <label className="text-xs text-slate-500">Gatilho</label>
                <select value={novaAuto.gatilho} onChange={e => setNovaAuto({ ...novaAuto, gatilho: e.target.value })} className="w-full px-4 py-2 border rounded-lg mt-1">
                  {gatilhos.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Ação</label>
                <select value={novaAuto.acao} onChange={e => setNovaAuto({ ...novaAuto, acao: e.target.value })} className="w-full px-4 py-2 border rounded-lg mt-1">
                  {tipoAcoes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => { toast.success('Automação criada!'); setMostrarForm(false); }} className="w-full btn-primary mt-4">Criar</button>
          </div>
        </div>
      )}
    </div>
  )
}