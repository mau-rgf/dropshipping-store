'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

// Dados mock para demonstração
const mockProducts = [
  {
    id: '1',
    name: 'Vestido Midi Cetim',
    slug: 'vestido-midi-cetim',
    description: 'Vestido midi em tecido acetinado',
    price: 299.90,
    compare_price: 399.90,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80'],
    stock: 15,
    sku: 'VES001',
    is_active: true,
    is_featured: true,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Blazer Oversized Lã',
    slug: 'blazer-oversized-la',
    description: 'Blazer oversized em lã',
    price: 459.90,
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'],
    stock: 8,
    sku: 'BLA001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Calça Wide Leg Alfaiataria',
    slug: 'calca-wide-leg-alfaiataria',
    description: 'Calça wide leg de cintura alta',
    price: 249.90,
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80'],
    stock: 3,
    sku: 'CAL001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Camisa Linho Manga Longa',
    slug: 'camisa-linho-manga-longa',
    description: 'Camisa em tecido de linho',
    price: 199.90,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'],
    stock: 20,
    sku: 'CAM001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Saia Midi Plissada',
    slug: 'saia-midi-plissada',
    description: 'Saia midi plissada',
    price: 179.90,
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80'],
    stock: 12,
    sku: 'SAI001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Top Cropped Tricot',
    slug: 'top-cropped-tricot',
    description: 'Top cropped em tricot',
    price: 129.90,
    images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80'],
    stock: 25,
    sku: 'TOP001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Jaqueta Jeans Oversized',
    slug: 'jaqueta-jeans-oversized',
    description: 'Jaqueta jeans oversized',
    price: 349.90,
    images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80'],
    stock: 7,
    sku: 'JAQ001',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Vestido Longo Estampado',
    slug: 'vestido-longo-estampado',
    description: 'Vestido longo com estampa floral',
    price: 399.90,
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80'],
    stock: 0,
    sku: 'VES002',
    is_active: true,
    is_featured: false,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const subcategories = [
  { name: 'VER TUDO', slug: '' },
  { name: 'NOVIDADES', slug: 'novidades' },
  { name: 'VESTIDOS', slug: 'vestidos' },
  { name: 'BLUSAS', slug: 'blusas' },
  { name: 'CALÇAS', slug: 'calcas' },
  { name: 'SAIAS', slug: 'saias' },
  { name: 'CASACOS', slug: 'casacos' },
]

const categoryNames: Record<string, string> = {
  'mulher': 'MULHER',
  'homem': 'HOMEM',
  'infantil': 'INFANTIL',
  'casa': 'CASA',
  'beleza': 'BELEZA',
  'novo': 'NOVIDADES',
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [columns, setColumns] = useState<1 | 2 | 3 | 4>(4)
  const [activeSubcategory, setActiveSubcategory] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const categoryName = categoryNames[slug] || slug.toUpperCase()

  // Determinar classes de grid baseado no número de colunas
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }

  return (
    <main className="min-h-screen">
      {/* Header da categoria */}
      <div className="sticky top-20 z-40 bg-background border-b border-border">
        <div className="px-4 md:px-8 lg:px-12 py-4">
          {/* Título e controles */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg tracking-wider font-light">{categoryName}</h1>

            <div className="flex items-center gap-6">
              {/* Seletor de colunas - Desktop */}
              <div className="hidden md:flex items-center gap-2 text-xs tracking-wider">
                <span className="text-muted-foreground">VER</span>
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setColumns(num as 1 | 2 | 3 | 4)}
                    className={`w-6 h-6 flex items-center justify-center transition-opacity
                              ${columns === num ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Seletor de colunas - Mobile */}
              <div className="md:hidden flex items-center gap-2 text-xs tracking-wider">
                <span className="text-muted-foreground">VER</span>
                {[1, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setColumns(num as 1 | 2)}
                    className={`w-6 h-6 flex items-center justify-center transition-opacity
                              ${columns === num ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Botão de filtros */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-xs tracking-wider hover:opacity-60 transition-opacity">
                    FILTROS
                    <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
                  <SheetTitle className="sr-only">Filtros</SheetTitle>
                  <div className="flex flex-col h-full">
                    {/* Header dos filtros */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                      <span className="text-sm tracking-wider">FILTROS</span>
                      <button
                        onClick={() => setFiltersOpen(false)}
                        className="p-1 hover:opacity-60 transition-opacity"
                      >
                        <X className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Conteúdo dos filtros */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {/* Tamanho */}
                      <div className="mb-8">
                        <h3 className="text-xs tracking-wider mb-4">TAMANHO</h3>
                        <div className="flex flex-wrap gap-2">
                          {['PP', 'P', 'M', 'G', 'GG'].map((size) => (
                            <button
                              key={size}
                              className="px-4 py-2 border border-border text-xs tracking-wider
                                       hover:border-foreground transition-colors"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Cor */}
                      <div className="mb-8">
                        <h3 className="text-xs tracking-wider mb-4">COR</h3>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { name: 'Preto', color: '#000000' },
                            { name: 'Branco', color: '#FFFFFF' },
                            { name: 'Azul', color: '#1E40AF' },
                            { name: 'Vermelho', color: '#DC2626' },
                            { name: 'Verde', color: '#16A34A' },
                            { name: 'Bege', color: '#D4C4A8' },
                          ].map((color) => (
                            <button
                              key={color.name}
                              className="w-8 h-8 border border-border hover:scale-110 transition-transform"
                              style={{ backgroundColor: color.color }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Preço */}
                      <div className="mb-8">
                        <h3 className="text-xs tracking-wider mb-4">PREÇO</h3>
                        <div className="space-y-2">
                          {[
                            'Até R$ 100',
                            'R$ 100 - R$ 200',
                            'R$ 200 - R$ 400',
                            'Acima de R$ 400'
                          ].map((price) => (
                            <label key={price} className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 accent-foreground" />
                              <span className="text-xs tracking-wider">{price}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer dos filtros */}
                    <div className="p-6 border-t border-border space-y-3">
                      <button className="w-full py-3 bg-foreground text-background text-xs tracking-wider
                                       hover:bg-foreground/90 transition-colors">
                        APLICAR FILTROS
                      </button>
                      <button className="w-full py-3 border border-border text-xs tracking-wider
                                       hover:border-foreground transition-colors">
                        LIMPAR FILTROS
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Subcategorias */}
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubcategory(sub.slug)}
                className={`text-xs tracking-wider whitespace-nowrap transition-opacity
                          ${activeSubcategory === sub.slug
                            ? 'opacity-100 underline underline-offset-4'
                            : 'opacity-60 hover:opacity-100'
                          }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className={`grid ${gridClasses[columns]} gap-4 md:gap-6`}>
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>

        {/* Contador de produtos */}
        <div className="mt-12 text-center">
          <p className="text-xs tracking-wider text-muted-foreground">
            {mockProducts.length} PRODUTOS
          </p>
        </div>
      </div>
    </main>
  )
}
