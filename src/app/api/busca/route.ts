import { NextRequest, NextResponse } from 'next/server'

// Simulação de busca no Google Maps (sem Credits API real)
const buscarLeads_mock = async (cidade: string, estado: string, categorias: string[]) => {
  const resultados = []
  const base = {
    'Restaurantes': ['Restaurante Sabor Baiano', 'Churrascaria Prime', 'Pizzaria Napoli'],
    'Clínicas': ['Clínica Saúde Integral', 'Consultório Médico', 'Centro Médico'],
    'Dentistas': ['Dr. João Silva', 'Oral Care', 'Sorriso Dental'],
    'Academias': ['Smart Fit', 'Bio Ritmo', 'Academia Velocity'],
    'Advogados': ['Silva & Associados', 'Direito Corp', 'Advocacia Legal'],
    'Beleza': ['Salão Beleza Prime', 'Studio Beleza', 'Espaço Feminino'],
  }
  
  for (const categoria of categorias) {
    const names = base[categoria] || [categoria]
    for (const name of names) {
      resultados.push({
        nome: `${name} ${categoria}`,
        endereco: `Rua das Flores, ${Math.floor(Math.random() * 999)} - ${cidade}`,
        telefone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        nota: (Math.random() * 2 + 3).toFixed(1),
        avaliacoes: Math.floor(Math.random() * 500),
        categoria,
        cidade,
        estado,
        place_id: `place_${Math.random().toString(36).substr(2, 9)}`,
        lat: -12.28 + (Math.random() - 0.5),
        lng: -41.92 + (Math.random() - 0.5),
      })
    }
  }
  
  return resultados
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cidade, estado, categorias, raio = 5000 } = body
    
    if (!cidade || !estado || !categorias?.length) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 }
      )
    }
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const results = await buscarLeads_mock(cidade, estado, categorias)
    
    return NextResponse.json({
      total: results.length,
      resultados: results,
      credits_usados: results.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}