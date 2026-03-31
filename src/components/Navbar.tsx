'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-white text-xl">🎯</span>
            </div>
            <span className="text-xl font-bold gradient-text">LeadFlow</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">
              Planos
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-cyan-600 font-medium transition-colors">
              Sobre
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium hidden sm:block">
              Entrar
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Começar Grátis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
