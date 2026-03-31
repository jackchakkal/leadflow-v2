'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Shield, Lock, Eye, Key, Smartphone, Monitor, Trash2, Check, X } from 'lucide-react'

const logAcesso = [
  { id: '1',ip: '189.45.123.21', dispositivo: 'Chrome / Windows', local: 'Barreiras, BA', atual: true },
  { id: '2',ip: '189.45.123.22', dispositivo: 'Safari / iOS', local: 'São Paulo, SP', atual: false },
  { id: '3',ip: '189.45.123.23', dispositivo: 'Firefox / Linux', local: 'Rio de Janeiro, RJ', atual: false },
]

export default function Seguranca() {
  const [twoFA, setTwoFA] = useState(false)
  const [sessions, setSessions] = useState(logAcesso)

  const revogar = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id))
    toast.success('Sessão revocada!')
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Segurança</h1>

      {/* 2FA */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="font-bold">Autenticação em 2 Pasos (2FA)</div>
              <div className="text-sm text-slate-500">Proteja sua conta com verificação em 2 pasos</div>
            </div>
          </div>
          <button
            onClick={() => setTwoFA(!twoFA)}
            className={`px-4 py-2 rounded-lg font-medium ${twoFA ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
          >
            {twoFA ? 'Ativo' : 'Inativo'}
          </button>
        </div>
      </div>

      {/* Senha */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-bold">Senha</div>
              <div className="text-sm text-slate-500">Última alteração: há 30 dias</div>
            </div>
          </div>
          <button className="btn-secondary">Alterar</button>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="font-bold">API Keys</div>
              <div className="text-sm text-slate-500">Gerencie suas chaves de API</div>
            </div>
          </div>
          <button className="btn-secondary">Gerar Nova</button>
        </div>
      </div>

      {/* Sessões ativas */}
      <div className="bg-white rounded-xl p-6">
        <h2 className="font-bold mb-4">Sessões Ativas</h2>
        <div className="space-y-3">
          {sessions.map(s => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.dispositivo}</span>
                    {s.atual && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Atual</span>}
                  </div>
                  <div className="text-xs text-slate-500">{s.local} • {s.ip}</div>
                </div>
              </div>
              {!s.atual && (
                <button onClick={() => revogar(s.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* LGPD */}
      <div className="bg-white rounded-xl p-6 mt-6">
        <h2 className="font-bold mb-4">LGPD</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>同意接收 comunicações de marketing</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>同意 com o armazenamento de dados</span>
          </label>
          <button className="btn-secondary mt-2">Solicitar Exportação</button>
          <button className="btn-secondary ml-2 text-red-500 border-red-500">Solicitar Exclusão</button>
        </div>
      </div>
    </div>
  )
}