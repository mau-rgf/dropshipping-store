'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar integração com newsletter
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-background border-t border-border mt-auto">
      {/* Newsletter */}
      <div className="border-b border-border">
        <div className="px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-xl">
            <h3 className="text-sm tracking-wider mb-6">RECEBA NOSSA NEWSLETTER</h3>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="INSIRA AQUI O SEU E-MAIL"
                className="w-full bg-transparent border-0 border-b border-border
                         py-3 text-sm tracking-wider placeholder:text-muted-foreground
                         focus:outline-none focus:border-foreground transition-colors pr-10"
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-60 transition-opacity"
                aria-label="Inscrever-se"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Redes sociais */}
      <div className="border-b border-border">
        <div className="px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-wrap gap-6 text-xs tracking-wider">
            <Link href="#" className="hover:opacity-60 transition-opacity">INSTAGRAM</Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">FACEBOOK</Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">TIKTOK</Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">PINTEREST</Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">YOUTUBE</Link>
          </div>
        </div>
      </div>

      {/* Links em colunas */}
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Coluna 1: Ajuda */}
          <div>
            <h4 className="text-xs font-medium tracking-wider mb-6">AJUDA</h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link href="/account" className="hover:text-foreground transition-colors">
                  MINHA CONTA
                </Link>
              </li>
              <li>
                <Link href="/ajuda/tamanhos" className="hover:text-foreground transition-colors">
                  GUIA DE TAMANHOS
                </Link>
              </li>
              <li>
                <Link href="/ajuda/presente" className="hover:text-foreground transition-colors">
                  OPÇÕES DE PRESENTE
                </Link>
              </li>
              <li>
                <Link href="/ajuda/envios" className="hover:text-foreground transition-colors">
                  ENVIOS
                </Link>
              </li>
              <li>
                <Link href="/ajuda/pagamentos" className="hover:text-foreground transition-colors">
                  PAGAMENTOS
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-foreground transition-colors">
                  MEUS PEDIDOS
                </Link>
              </li>
              <li>
                <Link href="/ajuda/trocas" className="hover:text-foreground transition-colors">
                  TROCAS E DEVOLUÇÕES
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Siga-nos */}
          <div>
            <h4 className="text-xs font-medium tracking-wider mb-6">SIGA-NOS</h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link href="/newsletter" className="hover:text-foreground transition-colors">
                  NEWSLETTER
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  TIKTOK
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  INSTAGRAM
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  FACEBOOK
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  PINTEREST
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  YOUTUBE
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Empresa */}
          <div>
            <h4 className="text-xs font-medium tracking-wider mb-6">EMPRESA</h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link href="/sobre" className="hover:text-foreground transition-colors">
                  QUEM SOMOS
                </Link>
              </li>
              <li>
                <Link href="/sustentabilidade" className="hover:text-foreground transition-colors">
                  SUSTENTABILIDADE
                </Link>
              </li>
              <li>
                <Link href="/lojas" className="hover:text-foreground transition-colors">
                  LOJAS
                </Link>
              </li>
              <li>
                <Link href="/trabalhe-conosco" className="hover:text-foreground transition-colors">
                  TRABALHE CONOSCO
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Políticas */}
          <div>
            <h4 className="text-xs font-medium tracking-wider mb-6">POLÍTICAS</h4>
            <ul className="space-y-3 text-xs tracking-wider text-muted-foreground">
              <li>
                <Link href="/politica-privacidade" className="hover:text-foreground transition-colors">
                  POLÍTICA DE PRIVACIDADE
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-foreground transition-colors">
                  CONDIÇÕES DE COMPRA
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  DEFINIÇÕES DE COOKIES
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-border">
        <div className="px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* País e idioma */}
            <div className="flex items-center gap-4 text-xs tracking-wider text-muted-foreground">
              <span>BRASIL</span>
              <span className="text-border">|</span>
              <Link href="#" className="hover:text-foreground transition-colors">
                PORTUGUÊS
              </Link>
              <span className="text-border">|</span>
              <Link href="#" className="hover:text-foreground transition-colors">
                ENGLISH
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs tracking-wider text-muted-foreground">
              © {new Date().getFullYear()} STORE. TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
