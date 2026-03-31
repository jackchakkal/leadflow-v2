import { NextRequest, NextResponse } from 'next/server'

// Pipeline em memória
const pipeline = new Map()

const etapas = ['novo', 'contato', 'proposta', 'fechado', 'perdido']

export async function GET() {
  const resultados = Array.from(pipeline.values())
  return NextResponse.json(resultados)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { empresa_id, nome, etapa = 'novo', valor = 0, probabilidade = 10, observacoes } = body
  
  if (!empresa_id || !nome) {
    return NextResponse.json({ error: 'Empresa e nome são obrigatórios' }, { status: 400 })
  }
  
  const lead = {
    id: crypto.randomUUID(),
    empresa_id,
    nome,
    etapa,
    valor,
    probabilidade,
    observacoes: observacoes || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  
  pipeline.set(lead.id, lead)
  
  return NextResponse.json(lead, { status: 201 })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, etapa } = body
  
  if (!id || !etapas.includes(etapa)) {
    return NextResponse.json({ error: 'ID ou etapa inválidos' }, { status: 400 })
  }
  
  const lead = pipeline.get(id)
  if (!lead) {
    return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })
  }
  
  lead.etapa = etapa
  lead.updated_at = new Date().toISOString()
  pipeline.set(id, lead)
  
  return NextResponse.json(lead)
}