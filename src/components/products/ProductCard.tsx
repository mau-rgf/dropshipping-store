'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { formatCurrency } from '@/lib/utils/format'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  showQuickAdd?: boolean
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCartStore()

  const hasMultipleImages = product.images && product.images.length > 1
  const displayImage = isHovered && hasMultipleImages
    ? product.images[1]
    : product.images?.[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // TODO: Integrar com API de favoritos
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem do produto - aspect ratio 3:4 */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-3">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-xs tracking-wider">
              SEM IMAGEM
            </span>
          </div>
        )}

        {/* Indicador de cores disponíveis */}
        {product.variants && product.variants.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.variants.slice(0, 4).map((variant, i) => (
              <div
                key={i}
                className="w-3 h-3 border border-white/50 shadow-sm"
                style={{ backgroundColor: variant.attributes?.color || '#ccc' }}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[10px] text-white drop-shadow ml-1">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Botão favoritos */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100
                   transition-opacity hover:scale-110"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite
                ? 'fill-foreground stroke-foreground'
                : 'stroke-foreground fill-transparent'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Tag de estoque baixo */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] tracking-wider text-foreground underline">
              POUCAS UNIDADES
            </span>
          </div>
        )}

        {/* Botão adicionar - aparece no hover */}
        {showQuickAdd && product.stock > 0 && (
          <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100
                        transition-opacity bg-gradient-to-t from-black/20 to-transparent">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 bg-white text-black text-xs tracking-wider
                       hover:bg-black hover:text-white transition-colors"
            >
              ADICIONAR
            </button>
          </div>
        )}

        {/* Tag esgotado */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs tracking-wider">ESGOTADO</span>
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="space-y-1">
        {/* Nome do produto */}
        <h3 className="text-xs tracking-wider uppercase line-clamp-1 group-hover:underline">
          {product.name}
        </h3>

        {/* Preço */}
        <div className="flex items-center gap-2">
          <span className="text-xs tracking-wider">
            {formatCurrency(product.price)}
          </span>
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.compare_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
