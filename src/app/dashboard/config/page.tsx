'use client'

import { useState } from 'react'
import { Settings, User, Bell, Shield, CreditCard, Key, Globe, Database, Trash2 } from 'lucide-react'

const tabs = [
  { id: 'conta', name: 'Conta', icon: User },
  { id: 'notificacoes', name: 'Notificações', icon: Bell },
  { id: 'seguranca', name: 'Segurança', icon: Shield },
  { id: 'pagamento', name: 'Pagamento', icon: CreditCard },
  { id: 'api', name: 'API', icon: Key },
  { id: 'dominio', name: 'Domínio', icon: Globe },
  { id: 'banco', name: 'Banco', icon: Database },
]

export default function Configuracoes() {
  const [tab, setTab] = useState('conta')
  const [dados, setDados] = useState({
    nome: 'João Silva',
    email: 'joao@empresa.com',
    empresa: 'Minha Empresa',
    notification_email: true,
    notification_whatsapp: true,
    dark_mode: false,
  })

  const salvar = () => {
    alert('Salvo!')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold p-4">Configurações</h1>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-white p-4 border-r">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${tab === t.id ? 'bg-cyan-50 text-cyan-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <t.icon className="w-4 h-4" /> {t.name}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 p-6">
          {tab === 'conta' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Dados da Conta</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">Nome</label>
                  <input value={dados.nome} onChange={e => setDados({ ...dados, nome: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm text-slate-500">E-mail</label>
                  <input value={dados.email} onChange={e => setDados({ ...dados, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm text-slate-500">Empresa</label>
                  <input value={dados.empresa} onChange={e => setDados({ ...dados, empresa: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <button onClick={salvar} className="btn-primary">Salvar</button>
              </div>
            </div>
          )}

          {tab === 'notificacoes' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Notificações</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={dados.notification_email} onChange={e => setDados({ ...dados, notification_email: e.target.checked })} className="w-4 h-4" />
                  <span>E-mail</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={dados.notification_whatsapp} onChange={e => setDados({ ...dados, notification_whatsapp: e.target.checked })} className="w-4 h-4" />
                  <span>WhatsApp</span>
                </label>
              </div>
            </div>
          )}

          {tab === 'seguranca' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Segurança</h2>
              <div className="space-y-4">
                <button className="w-full p-4 border rounded-lg text-left hover:bg-slate-50">
                  <div className="font-medium">Alterar Senha</div>
                  <div className="text-sm text-slate-500">Última alteração: há 30 dias</div>
                </button>
                <button className="w-full p-4 border rounded-lg text-left hover:bg-slate-50">
                  <div className="font-medium">2FA (Autenticação em 2 pasos)</div>
                  <div className="text-sm text-green-600">Ativo</div>
                </button>
                <button className="w-full p-4 border rounded-lg text-left hover:bg-slate-50">
                  <div className="font-medium">Sessões Ativas</div>
                  <div className="text-sm text-slate-500">2 dispositivos conectados</div>
                </button>
              </div>
            </div>
          )}

          {tab === 'pagamento' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Plano Atual</h2>
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm opacity-80">Plano</div>
                    <div className="text-2xl font-bold">PRO</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80">Próximo cobrança</div>
                    <div className="font-bold">R$ 97/mês</div>
                  </div>
                </div>
              </div>
              <button className="w-full btn-secondary mt-4">Alterar Plano</button>
            </div>
          )}

          {tab === 'api' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">API Keys</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">Google Maps API Key</label>
                  <input type="password" value="AIzaSy***" readOnly className="w-full px-4 py-2 border rounded-lg bg-slate-50" />
                </div>
                <div>
                  <label className="text-sm text-slate-500">Supabase URL</label>
                  <input type="password" value="https://***.supabase.co" readOnly className="w-full px-4 py-2 border rounded-lg bg-slate-50" />
                </div>
                <button className="btn-secondary">Gerar Nova Key</button>
              </div>
            </div>
          )}

          {tab === 'dominio' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Domínio Personalizado</h2>
              <div className="p-4 border rounded-lg text-center text-slate-500">
                Configure um domínio próprio para seu leadflow
              </div>
              <input placeholder="seudominio.com" className="w-full px-4 py-2 border rounded-lg mt-4" />
              <button className="w-full btn-primary mt-4">Configurar</button>
            </div>
          )}

          {tab === 'banco' && (
            <div className="max-w-md">
              <h2 className="text-lg font-bold mb-4">Dados Bancários</h2>
              <div className="space-y-4">
                <input placeholder="Banco" className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Agência" className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="Conta" className="w-full px-4 py-2 border rounded-lg" />
                <input placeholder="CPF/CNPJ" className="w-full px-4 py-2 border rounded-lg" />
                <button className="btn-primary w-full">Salvar Dados</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}