'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Users, Plus, Crown, Edit, Trash2, User, Shield, Clock, Eye } from 'lucide-react'

interface Membro {
  id: string
  nome: string
  email: string
  permissao: 'admin' | 'editor' | 'viewer'
  status: 'ativo' | 'inativo'
  ultimoAcesso: string
}

const permissoes = [
  { id: 'admin', name: 'Admin', desc: 'Acesso total', icon: Crown },
  { id: 'editor', name: 'Editor', desc: 'Pode editar', icon: Edit },
  { id: 'viewer', name: 'Viewer', desc: 'Apenas visualizar', icon: Eye },
]

export default function Equipe() {
  const [mostrarForm, setMostrarForm] = useState(false)
  const [novoMembro, setNovoMembro] = useState({ nome: '', email: '', permissao: 'editor' })
  
  const membros: Membro[] = [
    { id: '1', nome: 'João Silva', email: 'joao@empresa.com', permissao: 'admin', status: 'ativo', ultimoAcesso: '2026-03-31 14:30' },
    { id: '2', nome: 'Maria Santos', email: 'maria@empresa.com', permissao: 'editor', status: 'ativo', ultimoAcesso: '2026-03-31 12:15' },
    { id: '3', nome: 'Pedro Costa', email: 'pedro@empresa.com', permissao: 'editor', status: 'ativo', ultimoAcesso: '2026-03-30 16:45' },
    { id: '4', nome: 'Ana Oliveira', email: 'ana@empresa.com', permissao: 'viewer', status: 'inativo', ultimoAcesso: '2026-03-25 09:20' },
  ]

  const adicionar = () => {
    if (!novoMembro.nome || !novoMembro.email) {
      toast.error('Preencha todos os campos')
      return
    }
    toast.success('Convite enviado!')
    setMostrarForm(false)
    setNovoMembro({ nome: '', email: '', permissao: 'editor' })
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Equipe</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold">{membros.length}</div>
          <div className="text-xs text-slate-500">Total</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{membros.filter(m => m.status === 'ativo').length}</div>
          <div className="text-xs text-slate-500">Ativos</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-600">{membros.filter(m => m.permissao === 'admin').length}</div>
          <div className="text-xs text-slate-500">Admins</div>
        </div>
      </div>

      {/* Botão adicionar */}
      <button onClick={() => setMostrarForm(true)} className="btn-primary flex items-center gap-2 mb-4">
        <Plus className="w-4 h-4" /> Convidar Membro
      </button>

      {/* Lista */}
      <div className="space-y-3">
        {membros.map(m => (
          <div key={m.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{m.nome.charAt(0)}</span>
              </div>
              <div>
                <div className="font-medium">{m.nome}</div>
                <div className="text-sm text-slate-500">{m.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded ${m.permissao === 'admin' ? 'bg-purple-100 text-purple-700' : m.permissao === 'editor' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                  {m.permissao}
                </span>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> {m.ultimoAcesso}
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${m.status === 'ativo' ? 'bg-green-500' : 'bg-slate-300'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Permissões info */}
      <div className="mt-8 bg-white rounded-xl p-4">
        <h2 className="font-bold mb-3">Níveis de Permissão</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {permissoes.map(p => (
            <div key={p.id} className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <p.icon className="w-4 h-4 text-cyan-600" />
                <span className="font-medium">{p.name}</span>
              </div>
              <div className="text-sm text-slate-500">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setMostrarForm(false)}>
          <div className="bg-white rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Convidar Membro</h2>
            <div className="space-y-3">
              <input value={novoMembro.nome} onChange={e => setNovoMembro({ ...novoMembro, nome: e.target.value })} placeholder="Nome" className="w-full px-4 py-2 border rounded-lg" />
              <input value={novoMembro.email} onChange={e => setNovoMembro({ ...novoMembro, email: e.target.value })} type="email" placeholder="E-mail" className="w-full px-4 py-2 border rounded-lg" />
              <select value={novoMembro.permissao} onChange={e => setNovoMembro({ ...novoMembro, permissao: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button onClick={adicionar} className="w-full btn-primary mt-4">Enviar Convite</button>
          </div>
        </div>
      )}
    </div>
  )
}