import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, ProductVariant, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Ações
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Getters
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) => {
        const items = get().items
        const existingIndex = items.findIndex(
          (item) =>
            item.product_id === product.id &&
            item.variant_id === (variant?.id || undefined)
        )

        if (existingIndex > -1) {
          // Atualizar quantidade se já existe
          const newItems = [...items]
          newItems[existingIndex].quantity += quantity
          set({ items: newItems })
        } else {
          // Adicionar novo item
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || 'default'}-${Date.now()}`,
            product_id: product.id,
            variant_id: variant?.id,
            product,
            variant,
            quantity,
            price: variant?.price || product.price,
          }
          set({ items: [...items, newItem] })
        }

        // Abrir carrinho ao adicionar
        set({ isOpen: true })
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.product_id === productId && item.variant_id === variantId)
          ),
        })
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        set({
          items: get().items.map((item) =>
            item.product_id === productId && item.variant_id === variantId
              ? { ...item, quantity }
              : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
