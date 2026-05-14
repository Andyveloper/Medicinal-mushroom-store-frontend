import type { OrderStatus } from './OrderStatus'
import type { UserRole } from './UserRole'

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  active: boolean
}

export interface User {
  id: number
  name: string
  lastname: string
  email: string
  phoneNumber: number
  imageUrl: string
  role: UserRole
  active: boolean
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: number
  userId: number
  userEmail: string
  userName: string
  userPhone: number
  totalPrice: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

export interface AuthResponse {
  token: string
}

export interface PaymentResponse {
  clientSecret: string
  orderId: number
}

// Auth
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  lastname: string
  email: string
  password: string
  phoneNumber: number
}

export interface CreateOrderRequest {
  orderItems: {
    product: { id: number }
    quantity: number
  }[]
}

export interface JwtPayload {
  sub: string
  role: string
  exp: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}
