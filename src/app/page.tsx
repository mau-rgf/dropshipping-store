import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'

// Dados mock para demonstração
const heroSlides = [
  {
    id: 1,
    title: 'NOVA COLEÇÃO',
    subtitle: 'PRIMAVERA 2025',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    link: '/category/novo',
    cta: 'EXPLORAR'
  }
]

const categories = [
  {
    name: 'MULHER',
    slug: 'mulher',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80'
  },
  {
    name: 'HOMEM',
    slug: 'homem',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
  },
  {
    name: 'INFANTIL',
    slug: 'infantil',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'
  },
  {
    name: 'CASA',
    slug: 'casa',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
  }
]

const featuredProducts = [
  {
    id: '1',
    name: 'Vestido Midi Cetim',
    slug: 'vestido-midi-cetim',
    description: 'Vestido midi em tecido acetinado',
    price: 299.90,
    compare_price: 399.90,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80'
    ],
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
    name: 'Blazer Oversized',
    slug: 'blazer-oversized',
    description: 'Blazer oversized com corte reto',
    price: 459.90,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'
    ],
    stock: 8,
    sku: 'BLA001',
    is_active: true,
    is_featured: true,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Calça Wide Leg',
    slug: 'calca-wide-leg',
    description: 'Calça wide leg de cintura alta',
    price: 249.90,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80'
    ],
    stock: 3,
    sku: 'CAL001',
    is_active: true,
    is_featured: true,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Camisa Linho',
    slug: 'camisa-linho',
    description: 'Camisa em tecido de linho',
    price: 199.90,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    ],
    stock: 20,
    sku: 'CAM001',
    is_active: true,
    is_featured: true,
    category_id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[90vh] min-h-[600px]">
        <Image
          src={heroSlides[0].image}
          alt={heroSlides[0].title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay escuro sutil */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Conteúdo do Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white">
          <p className="text-sm tracking-[0.3em] mb-2">{heroSlides[0].subtitle}</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-8">
            {heroSlides[0].title}
          </h1>
          <Link
            href={heroSlides[0].link}
            className="zara-button border-white text-white hover:bg-white hover:text-black"
          >
            {heroSlides[0].cta}
          </Link>
        </div>
      </section>

      {/* Grid de Categorias */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end p-6">
                <span className="text-white text-lg tracking-wider font-light">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm tracking-wider">DESTAQUES</h2>
          <Link
            href="/category/destaques"
            className="text-xs tracking-wider hover:opacity-60 transition-opacity flex items-center gap-2"
          >
            VER TUDO
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* Banner Secundário */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="Essenciais"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-3xl md:text-5xl font-light tracking-wider mb-6">
            ESSENCIAIS
          </h2>
          <p className="text-sm tracking-wider mb-8 max-w-md px-4">
            Peças atemporais que formam a base do seu guarda-roupa
          </p>
          <Link
            href="/category/essenciais"
            className="zara-button border-white text-white hover:bg-white hover:text-black"
          >
            DESCOBRIR
          </Link>
        </div>
      </section>

      {/* Seção Editorial */}
      <section className="py-16 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Editorial 1 */}
          <Link href="/category/vestidos" className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Vestidos"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <span className="text-white text-2xl tracking-wider font-light">VESTIDOS</span>
            </div>
          </Link>

          {/* Editorial 2 */}
          <Link href="/category/acessorios" className="group relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
              alt="Acessórios"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <span className="text-white text-2xl tracking-wider font-light">ACESSÓRIOS</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Banner Final */}
      <section className="py-16 px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-light tracking-wider mb-4">
          ENTREGA PARA TODO O BRASIL
        </h2>
        <p className="text-sm text-muted-foreground tracking-wider mb-8">
          Frete grátis em compras acima de R$ 299
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-xs tracking-wider text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <span className="text-foreground text-lg">TROCAS FÁCEIS</span>
            <span>30 dias para trocar</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-foreground text-lg">PAGAMENTO SEGURO</span>
            <span>Parcele em até 12x</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-foreground text-lg">ATENDIMENTO</span>
            <span>Segunda a sexta</span>
          </div>
        </div>
      </section>
    </main>
  )
}
