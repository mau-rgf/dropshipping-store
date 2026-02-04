// Tipos principais do e-commerce

export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  is_default: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  images: string[]
  price: number
  compare_price?: number
  cost: number
  sku: string
  stock: number
  category_id?: string
  category?: Category
  is_active: boolean
  is_featured: boolean
  supplier_url?: string
  supplier_id?: string
  weight: number
  width: number
  height: number
  length: number
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string>
  image_url?: string
  is_active: boolean
}

export interface CartItem {
  id: string
  product_id: string
  variant_id?: string
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_value?: number
  max_uses?: number
  used_count: number
  expires_at?: string
  is_active: boolean
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped_to_supplier'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'refunded'

export interface Order {
  id: string
  user_id: string
  user?: User
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: 'pix' | 'credit_card' | 'boleto'
  payment_id?: string
  subtotal: number
  shipping_cost: number
  discount: number
  total: number
  coupon_id?: string
  coupon?: Coupon
  shipping_address: Address
  tracking_code?: string
  notes?: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
  total: number
}

export interface SupplierOrder {
  id: string
  order_id: string
  supplier: string
  external_id?: string
  tracking_code?: string
  status: 'pending' | 'ordered' | 'shipped' | 'delivered'
  cost: number
  created_at: string
  updated_at: string
}

export interface ShippingQuote {
  id: string
  name: string
  company: string
  price: number
  delivery_time: number
  delivery_range: {
    min: number
    max: number
  }
}

// Respostas de API
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// Filtros
export interface ProductFilters {
  category?: string
  min_price?: number
  max_price?: number
  search?: string
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'name'
  page?: number
  per_page?: number
}
