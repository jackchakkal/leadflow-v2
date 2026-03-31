import { NextResponse } from 'next/server'

// Simular banco de dados em memória
const empresas = new Map()

export async function GET() {
  const resultados = Array.from(empresas.values())
  return NextResponse.json(resultados)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { nome, endereco, telefone, nota, avaliacoes, categoria, cidade, estado, place_id, lat, lng } = body
  
  if (!nome || !categoria) {
    return NextResponse.json({ error: 'Nome e categoria são obrigatórios' }, { status: 400 })
  }
  
  const empresa = {
    id: crypto.randomUUID(),
    nome,
    endereco: endereco || '',
    telefone: telefone || '',
    nota: nota || 0,
    avaliacoes: avaliacoes || 0,
    categoria,
    cidade: cidade || '',
    estado: estado || '',
    place_id: place_id || '',
    lat: lat || 0,
    lng: lng || 0,
    created_at: new Date().toISOString(),
  }
  
  empresas.set(empresa.id, empresa)
  
  return NextResponse.json(empresa, { status: 201 })
}