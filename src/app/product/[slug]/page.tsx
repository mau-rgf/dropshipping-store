'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { formatCurrency } from '@/lib/utils/format'

// Produto mock para demonstração
const mockProduct = {
  id: '1',
  name: 'Vestido Midi Cetim',
  slug: 'vestido-midi-cetim',
  description: 'Vestido midi de gola lapela e manga curta. Cinto com laço no mesmo tecido. Fecho frontal com botões.',
  price: 299.90,
  compare_price: 399.90,
  images: [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  ],
  stock: 5,
  sku: 'VES001',
  is_active: true,
  is_featured: true,
  category_id: '1',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  variants: [
    { id: 'v1', name: 'P', attributes: { size: 'P' }, stock: 2 },
    { id: 'v2', name: 'M', attributes: { size: 'M' }, stock: 3 },
    { id: 'v3', name: 'G', attributes: { size: 'G' }, stock: 0 },
  ],
  colors: [
    { name: 'Azul Elétrico', code: '#1E40AF', reference: '7324/285/446' },
    { name: 'Preto', code: '#000000', reference: '7324/285/800' },
    { name: 'Vermelho', code: '#DC2626', reference: '7324/285/600' },
  ],
  composition: '100% Poliéster',
  care: 'Lavar à máquina max. 30°C. Não usar alvejante. Passar a ferro temperatura baixa. Não usar secadora. Limpeza a seco com percloroetileno.',
  origin: 'Fabricado em Portugal'
}

interface AccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-xs tracking-wider hover:opacity-60 transition-opacity"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductPage() {
  const params = useParams()
  const { addItem, openCart } = useCartStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = mockProduct // Em produção, buscar do backend

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Mostrar mensagem para selecionar tamanho
      return
    }
    addItem(product as any, quantity)
    openCart()
  }

  const selectedVariant = product.variants.find(v => v.attributes.size === selectedSize)
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : false

  return (
    <main className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Galeria de imagens - Mobile: Carrossel horizontal, Desktop: Lista vertical */}
        <div className="lg:w-[60%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto">
          {/* Mobile: Imagem principal com miniaturas */}
          <div className="lg:hidden">
            <div className="relative aspect-[3/4]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Miniaturas mobile */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-20 flex-shrink-0 ${
                    selectedImage === index ? 'ring-1 ring-foreground' : ''
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Lista vertical de imagens */}
          <div className="hidden lg:block">
            {product.images.map((img, index) => (
              <div key={index} className="relative aspect-[3/4]">
                <Image
                  src={img}
                  alt={`${product.name} - Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Informações do produto */}
        <div className="lg:w-[40%] px-4 md:px-8 lg:px-12 py-8 lg:py-12">
          {/* Tag de estoque baixo */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs tracking-wider underline mb-2">POUCAS UNIDADES</p>
          )}

          {/* Nome e favoritos */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-lg tracking-wider font-normal uppercase">
              {product.name}
            </h1>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-foreground' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Preço */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg tracking-wider">{formatCurrency(product.price)}</span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.compare_price)}
              </span>
            )}
          </div>

          {/* Separador */}
          <div className="border-t border-border mb-6" />

          {/* Cor selecionada */}
          <div className="mb-6">
            <p className="text-xs tracking-wider mb-3">
              {selectedColor.name.toUpperCase()} | {selectedColor.reference}
            </p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.code}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 border transition-all ${
                    selectedColor.code === color.code
                      ? 'border-foreground scale-110'
                      : 'border-border hover:border-foreground/50'
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Seleção de tamanho */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-wider">TAMANHO</p>
              <Link href="#" className="text-xs tracking-wider underline hover:opacity-60 transition-opacity">
                GUIA DE TAMANHOS
              </Link>
            </div>
            <div className="flex gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => variant.stock > 0 && setSelectedSize(variant.attributes.size)}
                  disabled={variant.stock === 0}
                  className={`px-4 py-2 border text-xs tracking-wider transition-all
                            ${selectedSize === variant.attributes.size
                              ? 'border-foreground bg-foreground text-background'
                              : variant.stock === 0
                                ? 'border-border text-muted-foreground line-through cursor-not-allowed'
                                : 'border-border hover:border-foreground'
                            }`}
                >
                  {variant.attributes.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="mb-6">
            <p className="text-xs tracking-wider mb-3">QUANTIDADE</p>
            <div className="flex items-center border border-border w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-muted transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <span className="px-6 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || !selectedSize}
            className={`w-full py-4 text-xs tracking-wider transition-colors mb-8
                      ${isOutOfStock
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-foreground text-background hover:bg-foreground/90'
                      }`}
          >
            {isOutOfStock ? 'ESGOTADO' : 'ADICIONAR'}
          </button>

          {/* Descrição */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Acordeões */}
          <div>
            <Accordion title="MEDIDAS DO PRODUTO">
              <p>A modelo usa tamanho M.</p>
              <p className="mt-2">Comprimento: 120cm</p>
              <p>Largura: 45cm</p>
            </Accordion>

            <Accordion title="COMPOSIÇÃO, CUIDADOS E ORIGEM">
              <p className="font-medium mb-2">Composição</p>
              <p className="mb-4">{product.composition}</p>

              <p className="font-medium mb-2">Cuidados</p>
              <p className="mb-4">{product.care}</p>

              <p className="font-medium mb-2">Origem</p>
              <p>{product.origin}</p>
            </Accordion>

            <Accordion title="VER DISPONIBILIDADE NA LOJA">
              <p>Consulte a disponibilidade deste produto em nossas lojas físicas.</p>
              <button className="mt-3 text-xs tracking-wider underline">
                ENCONTRAR LOJAS
              </button>
            </Accordion>

            <Accordion title="ENVIOS, TROCAS E DEVOLUÇÕES">
              <p className="mb-2">
                <strong>Envio:</strong> Entrega em 3-7 dias úteis para todo o Brasil.
              </p>
              <p className="mb-2">
                <strong>Trocas:</strong> Você tem 30 dias para trocar seu produto.
              </p>
              <p>
                <strong>Devoluções:</strong> Devoluções gratuitas em até 30 dias.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  )
}
