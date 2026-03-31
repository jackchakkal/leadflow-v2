import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LeadFlow - Captação de Leads via Google Maps',
  description: 'Sistema de captação de leads para empresas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}
