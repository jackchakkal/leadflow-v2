'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { Search, Phone, Mail, MessageSquare, Calendar, Plus, X, Star, ChevronLeft, ChevronRight, MoreVertical, Check, Clock, FileText, DollarSign, User, Tag } from 'lucide-react'

const ETAPAS = [
  { id: 'novo', name: 'Novo', color: 'bg-blue-500', icon: '📥' },
  { id: 'contato', name: 'Contato', color: 'bg-yellow-500', icon: '📞' },
  { id: 'proposta', name: 'Proposta', color: 'bg-purple-500', icon: '📄' },
  { id: 'fechado', name: 'Fechado', color: 'bg-green-500', icon: '✅' },
  { id: 'perdido', name: 'Perdido', color: 'bg-red-500', icon: '❌' },
]

const TIPOS_INTERACAO = [
  { id: 'ligacao', name: 'Ligação', icon: Phone },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'reuniao', name: 'Reunião', icon: Calendar },
  { id: 'nota', name: 'Nota', icon: FileText },
]

interface Lead {
  id: string
  nome: string
  telefone: string
  categoria: string
  cidade: string
  nota: number
  valor: number
  etapa: string
  observacoes: string
  fonte: string
  created_at: string
  interacoes: Interacao[]
}

interface Interacao {
  id: string
  tipo: string
  descricao: string
  resultado: string
  created_at: string
}

export default function Pipeline() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showInteracao, setShowInteracao] = useState(false)
  const [novaInteracao, setNovaInteracao] = useState({ tipo: 'ligacao', descricao: '', resultado: '' })

  // Dados mock para demo
  const leadsDemo: Lead[] = [
    { id: '1', nome: 'Restaurante Sabor Baiano', telefone: '(77) 99999-0001', categoria: 'Restaurantes', cidade: 'Barreiras', nota: 4.5, valor: 5000, etapa: 'novo', observacoes: 'Cliente potencial', fonte: 'Busca Google', created_at: new Date().toISOString(), interacoes: [] },
    { id: '2', nome: 'Clínica Saúde Integral', telefone: '(77) 99999-0002', categoria: 'Clínicas', cidade: 'Barreiras', nota: 4.8, valor: 15000, etapa: 'contato', observacoes: 'Interessado em serviço', fonte: 'Busca Google', created_at: new Date().toISOString(), interacoes: [{ id: '1', tipo: 'whatsapp', descricao: 'Primeiro contato', resultado: 'Positivo', created_at: new Date().toISOString() }] },
    { id: '3', nome: 'Academia Smart Fit', telefone: '(77) 99999-0003', categoria: 'Academias', cidade: 'Barreiras', nota: 4.2, valor: 8000, etapa: 'proposta', observacoes: 'Aguardando resposta', fonte: 'Busca Google', created_at: new Date().toISOString(), interacoes: [] },
    { id: '4', nome: 'Dr. João Silva Dentista', telefone: '(77) 99999-0004', categoria: 'Dentistas', cidade: 'Barreiras', nota: 4.9, valor: 25000, etapa: 'fechado', observacoes: 'Fechado!', fonte: 'Indicação', created_at: new Date().toISOString(), interacoes: [] },
    { id: '5', nome: 'Silva & Associados', telefone: '(77) 99999-0005', categoria: 'Advogados', cidade: 'Barreiras', nota: 4.6, valor: 0, etapa: 'perdido', observacoes: 'Não tinha orçamento', fonte: 'Busca Google', created_at: new Date().toISOString(), interacoes: [] },
  ]

  // Carregar demo
  const carregarDemo = () => {
    setLeads(leadsDemo)
    toast.success('Dados de demo carregados!')
  }

  // Mover lead para próxima etapa
  const proximaEtapa = (leadId: string) => {
    const idx = ETAPAS.findIndex(e => e.id === leads.find(l => l.id === leadId)?.etapa)
    if (idx < ETAPAS.length - 1) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, etapa: ETAPAS[idx + 1].id } : l))
      toast.success(`Movido para ${ETAPAS[idx + 1].name}!`)
    }
  }

  // Etapa anterior
  const etapaAnterior = (leadId: string) => {
    const idx = ETAPAS.findIndex(e => e.id === leads.find(l => l.id === leadId)?.etapa)
    if (idx > 0) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, etapa: ETAPAS[idx - 1].id } : l))
      toast.success(`Movido para ${ETAPAS[idx - 1].name}!`)
    }
  }

  // Adicionar interação
  const adicionarInteracao = () => {
    if (!selectedLead || !novaInteracao.descricao) return
    const interacao: Interacao = {
      id: crypto.randomUUID(),
      ...novaInteracao,
      created_at: new Date().toISOString()
    }
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, interacoes: [...l.interacoes, interacao] } : l))
    setShowInteracao(false)
    setNovaInteracao({ tipo: 'ligacao', descricao: '', resultado: '' })
    toast.success('Interação registrada!')
  }

  // Estatísticas
  const stats = {
    total: leads.length,
    valorTotal: leads.reduce((s, l) => s + (l.valor || 0), 0),
    fechados: leads.filter(l => l.etapa === 'fechado').length,
    taxaConversao: leads.length ? (leads.filter(l => l.etapa === 'fechado').length / leads.length * 100).toFixed(1) : 0,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-slate-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Pipeline CRM</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={carregarDemo} className="px-3 py-2 text-sm border rounded-lg hover:bg-slate-50">
              📊 Carregar Demo
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Novo Lead
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Leads</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">R$ {stats.valorTotal.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Valor Total</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{stats.fechados}</div>
            <div className="text-xs text-slate-500">Fechados</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-cyan-600">{stats.taxaConversao}%</div>
            <div className="text-xs text-slate-500">Conversão</div>
          </div>
        </div>
      </div>

      {/* Pipeline Kanban */}
      <div className="max-w-7xl mx-auto p-4 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {ETAPAS.map(etapa => (
            <div key={etapa.id} className="w-72 flex-shrink-0">
              {/* Header da coluna */}
              <div className={`h-1 ${etapa.color} rounded-t-full`} />
              <div className="bg-white rounded-b-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <span>{etapa.icon}</span> {etapa.name}
                  </h3>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                    {leads.filter(l => l.etapa === etapa.id).length}
                  </span>
                </div>
                
                {/* Leads */}
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {leads.filter(l => l.etapa === etapa.id).map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <div className="font-medium text-sm mb-1">{lead.nome}</div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{lead.categoria}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" /> {lead.nota}
                        </span>
                      </div>
                      {lead.valor > 0 && (
                        <div className="text-xs text-green-600 font-medium mt-2">
                          R$ {lead.valor.toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Controles */}
                {etapa.id !== 'perdido' && (
                  <div className="flex gap-1 mt-3 pt-3 border-t">
                    <button
                      onClick={(e) => { e.stopPropagation(); etapaAnterior(etapa.id) }}
                      disabled={etapa.id === 'novo'}
                      className="flex-1 py-1 text-xs border rounded hover:bg-slate-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); proximaEtapa(etapa.id) }}
                      disabled={etapa.id === 'fechado'}
                      className="flex-1 py-1 text-xs border rounded hover:bg-slate-50 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Novo Lead */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Novo Lead</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nome da empresa" className="w-full px-4 py-3 border rounded-xl" />
              <input placeholder="Telefone" className="w-full px-4 py-3 border rounded-xl" />
              <input placeholder="Categoria" className="w-full px-4 py-3 border rounded-xl" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Cidade" className="w-full px-4 py-3 border rounded-xl" />
                <input placeholder="Valor" type="number" className="w-full px-4 py-3 border rounded-xl" />
              </div>
              <textarea placeholder="Observações" className="w-full px-4 py-3 border rounded-xl" rows={3} />
            </div>
            <button onClick={() => setShowModal(false)} className="w-full btn-primary mt-4">
              Criar Lead
            </button>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Lead */}
      {selectedLead && !showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{selectedLead.nome}</h2>
                <div className="text-sm text-slate-500">{selectedLead.categoria} • {selectedLead.cidade}</div>
              </div>
              <button onClick={() => setSelectedLead(null)}><X className="w-5 h-5" /></button>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500">Telefone</div>
                <a href={`tel:${selectedLead.telefone}`} className="text-cyan-600 font-medium">{selectedLead.telefone}</a>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500">Valor</div>
                <div className="text-green-600 font-bold">R$ {selectedLead.valor.toLocaleString()}</div>
              </div>
            </div>

            {/* Observações */}
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Observações</div>
              <div className="p-3 bg-slate-50 rounded-xl text-sm">{selectedLead.observacoes || 'Sem observações'}</div>
            </div>

            {/* Interações */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-slate-500">Histórico ({selectedLead.interacoes.length})</div>
                <button onClick={() => setShowInteracao(true)} className="text-xs text-cyan-600">+ Nova</button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedLead.interacoes.map(int => (
                  <div key={int.id} className="p-2 bg-slate-50 rounded-lg text-xs">
                    <div className="font-medium">{int.tipo}</div>
                    <div>{int.descricao}</div>
                    {int.resultado && <div className="text-green-600">{int.resultado}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 border rounded-lg flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Ligar
              </button>
              <button className="flex-1 py-2 border rounded-lg flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Nova Interaction */}
      {showInteracao && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowInteracao(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Nova Interação</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500">Tipo</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {TIPOS_INTERACAO.map(tipo => (
                    <button
                      key={tipo.id}
                      onClick={() => setNovaInteracao({ ...novaInteracao, tipo: tipo.id })}
                      className={`p-2 text-xs border rounded-lg flex flex-col items-center gap-1 ${
                        novaInteracao.tipo === tipo.id ? 'border-cyan-500 bg-cyan-50' : ''
                      }`}
                    >
                      <tipo.icon className="w-4 h-4" />
                      {tipo.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500">Descrição</label>
                <textarea
                  value={novaInteracao.descricao}
                  onChange={e => setNovaInteracao({ ...novaInteracao, descricao: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                  rows={3}
                  placeholder="O que aconteceu?"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Resultado</label>
                <input
                  value={novaInteracao.resultado}
                  onChange={e => setNovaInteracao({ ...novaInteracao, resultado: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                  placeholder="Ex: Positivo, Negativo, Aguardando..."
                />
              </div>
            </div>
            <button onClick={adicionarInteracao} className="w-full btn-primary mt-4">
              Registrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}