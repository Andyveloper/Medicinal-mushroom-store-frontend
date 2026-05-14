import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CartPage from '@/pages/CartPage'
import { orderService } from '@/services/orderService'
import type { CartItem, Order } from '@/types'

const mockNavigate = vi.fn()
const mockRemoveItem = vi.fn()
const mockUpdateQuantity = vi.fn()
const mockClearCart = vi.fn()

let mockItems: CartItem[] = []
let mockTotal = 0
let mockIsAuthenticated = false

vi.mock('@/services/orderService', () => ({
  orderService: { create: vi.fn() },
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({
    items: mockItems,
    removeItem: mockRemoveItem,
    updateQuantity: mockUpdateQuantity,
    clearCart: mockClearCart,
    total: mockTotal,
  }),
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: mockIsAuthenticated }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockOrderService = vi.mocked(orderService)

const mockProduct = {
  id: 1,
  name: 'Reishi',
  description: 'Hongo adaptógeno',
  price: 25000,
  stock: 10,
  imageUrl: '',
  active: true,
}

const mockOrder: Order = {
  id: 42,
  userId: 1,
  userEmail: 'test@test.com',
  userName: 'Test',
  userPhone: 3001234567,
  totalPrice: 25000,
  status: 'PENDING',
  createdAt: '2024-01-01T00:00:00Z',
  items: [],
}

function renderCart() {
  return render(
    <MemoryRouter>
      <CartPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockItems = []
  mockTotal = 0
  mockIsAuthenticated = false
})

describe('CartPage', () => {
  it('shows empty cart message when there are no items', () => {
    renderCart()
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
  })

  it('navigates to home when "Ver productos" is clicked on empty cart', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByRole('button', { name: /ver productos/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('renders cart items with product name and quantity', () => {
    mockItems = [{ product: mockProduct, quantity: 2 }]
    mockTotal = 50000
    renderCart()
    expect(screen.getByText('Reishi')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls updateQuantity with quantity - 1 when minus button is clicked', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 2 }]
    mockTotal = 50000
    renderCart()
    const [decreaseBtn] = screen.getAllByRole('button')
    await user.click(decreaseBtn)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 1)
  })

  it('calls updateQuantity with quantity + 1 when plus button is clicked', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockTotal = 25000
    renderCart()
    const [, increaseBtn] = screen.getAllByRole('button')
    await user.click(increaseBtn)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 2)
  })

  it('calls removeItem when trash button is clicked', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockTotal = 25000
    renderCart()
    const [, , removeBtn] = screen.getAllByRole('button')
    await user.click(removeBtn)
    expect(mockRemoveItem).toHaveBeenCalledWith(mockProduct.id)
  })

  it('disables plus button when quantity reaches stock limit', () => {
    mockItems = [{ product: { ...mockProduct, stock: 2 }, quantity: 2 }]
    renderCart()
    const [, increaseBtn] = screen.getAllByRole('button')
    expect(increaseBtn).toBeDisabled()
  })

  it('redirects to /login when proceeding to checkout without authentication', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockIsAuthenticated = false
    renderCart()
    await user.click(screen.getByRole('button', { name: /proceder al pago/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('creates order, clears cart and navigates to /checkout/:id when authenticated', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockIsAuthenticated = true
    mockOrderService.create.mockResolvedValue(mockOrder)
    renderCart()
    await user.click(screen.getByRole('button', { name: /proceder al pago/i }))
    await waitFor(() => {
      expect(mockOrderService.create).toHaveBeenCalledWith({
        orderItems: [{ product: { id: mockProduct.id }, quantity: 1 }],
      })
      expect(mockClearCart).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/checkout/42')
    })
  })

  it('shows loading text on checkout button while order is being created', async () => {
    const user = userEvent.setup()
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockIsAuthenticated = true
    mockOrderService.create.mockReturnValue(new Promise(() => {}))
    renderCart()
    await user.click(screen.getByRole('button', { name: /proceder al pago/i }))
    expect(screen.getByRole('button', { name: /procesando/i })).toBeInTheDocument()
  })

  it('renders product image when cart item has an imageUrl', () => {
    mockItems = [{ product: { ...mockProduct, imageUrl: 'https://example.com/img.jpg' }, quantity: 1 }]
    renderCart()
    const img = screen.getByRole('img', { name: /reishi/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg')
  })

  it('alerts and keeps cart when order creation fails', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    mockItems = [{ product: mockProduct, quantity: 1 }]
    mockIsAuthenticated = true
    mockOrderService.create.mockRejectedValue(new Error('Server error'))
    renderCart()
    await user.click(screen.getByRole('button', { name: /proceder al pago/i }))
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error al crear la orden')
    })
    expect(mockClearCart).not.toHaveBeenCalled()
  })
})
