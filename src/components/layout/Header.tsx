'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, User, Menu, Search, Heart, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useCartStore } from '@/lib/store/cart-store'
import { CartDrawer } from '@/components/cart/CartDrawer'

const categories = [
  { name: 'NOVO', slug: 'novo', highlight: true },
  { name: 'MULHER', slug: 'mulher' },
  { name: 'HOMEM', slug: 'homem' },
  { name: 'INFANTIL', slug: 'infantil' },
  { name: 'CASA', slug: 'casa' },
  { name: 'BELEZA', slug: 'beleza' },
]

const subcategories = {
  mulher: ['Vestidos', 'Blusas', 'Calças', 'Saias', 'Casacos', 'Acessórios'],
  homem: ['Camisas', 'Calças', 'Casacos', 'Malhas', 'Acessórios'],
  infantil: ['Menina', 'Menino', 'Bebê', 'Sapatos'],
  casa: ['Sala', 'Quarto', 'Cozinha', 'Banho', 'Decoração'],
  beleza: ['Perfumes', 'Corpo', 'Rosto', 'Cabelo'],
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items, openCart } = useCartStore()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background">
        {/* Header principal */}
        <div className="flex items-center justify-between h-20 px-4 md:px-8 lg:px-12">
          {/* Lado esquerdo: Menu + Logo */}
          <div className="flex items-center gap-6">
            {/* Menu hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 -ml-2 hover:opacity-60 transition-opacity"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] sm:w-[400px] p-0">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <nav className="flex flex-col h-full">
                  {/* Categorias principais */}
                  <div className="flex-1 overflow-y-auto py-8 px-6">
                    <div className="space-y-6">
                      {categories.map((cat) => (
                        <div key={cat.slug}>
                          <Link
                            href={`/category/${cat.slug}`}
                            className={`block text-lg tracking-wider ${cat.highlight ? 'font-medium' : 'font-light'} hover:opacity-60 transition-opacity`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {cat.name}
                          </Link>
                          {/* Subcategorias */}
                          {subcategories[cat.slug as keyof typeof subcategories] && (
                            <div className="mt-3 ml-4 space-y-2">
                              {subcategories[cat.slug as keyof typeof subcategories].map((sub) => (
                                <Link
                                  key={sub}
                                  href={`/category/${cat.slug}/${sub.toLowerCase()}`}
                                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Separador */}
                    <div className="my-8 border-t border-border" />

                    {/* Links de conta */}
                    <div className="space-y-4">
                      <Link
                        href="/auth/login"
                        className="block text-sm tracking-wider hover:opacity-60 transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        INICIAR SESSÃO
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block text-sm tracking-wider hover:opacity-60 transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        MEUS PEDIDOS
                      </Link>
                      <Link
                        href="/ajuda"
                        className="block text-sm tracking-wider hover:opacity-60 transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        AJUDA
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold tracking-tight">
                STORE
              </span>
            </Link>
          </div>

          {/* Centro: Busca (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="PESQUISA"
                className="w-full bg-transparent border-0 border-b border-border
                         py-2 text-sm tracking-wider placeholder:text-muted-foreground
                         focus:outline-none focus:border-foreground transition-colors"
              />
              <Search
                className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Lado direito: Ações */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Busca mobile */}
            <button
              className="lg:hidden p-2 hover:opacity-60 transition-opacity"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? "Fechar busca" : "Abrir busca"}
            >
              {searchOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Search className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>

            {/* Links texto (Desktop) */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/auth/login"
                className="text-xs tracking-wider hover:opacity-60 transition-opacity"
              >
                INICIAR SESSÃO
              </Link>
              <Link
                href="/ajuda"
                className="text-xs tracking-wider hover:opacity-60 transition-opacity"
              >
                AJUDA
              </Link>
            </div>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="hidden sm:flex p-2 hover:opacity-60 transition-opacity"
              aria-label="Lista de desejos"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            {/* Conta (mobile) */}
            <Link
              href="/account"
              className="md:hidden p-2 hover:opacity-60 transition-opacity"
              aria-label="Minha conta"
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            {/* Carrinho */}
            <button
              className="p-2 hover:opacity-60 transition-opacity flex items-center gap-2"
              onClick={openCart}
              aria-label="Carrinho"
            >
              <span className="hidden md:inline text-xs tracking-wider">
                CESTO [{itemCount}]
              </span>
              <span className="md:hidden relative">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-foreground text-background
                                 rounded-full text-[10px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Busca mobile expandida */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-4 border-b border-border">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="PESQUISA"
                className="w-full bg-transparent border-0 border-b border-foreground
                         py-2 text-sm tracking-wider placeholder:text-muted-foreground
                         focus:outline-none"
                autoFocus
              />
              <Search
                className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4"
                strokeWidth={1.5}
              />
            </div>
          </div>
        )}

        {/* Navegação de categorias (Desktop) - visível abaixo do header */}
        <nav className="hidden lg:block border-b border-border">
          <div className="flex items-center justify-center gap-8 h-10 px-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`text-xs tracking-wider hover:opacity-60 transition-opacity
                          ${cat.highlight ? 'font-medium' : 'font-normal'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
