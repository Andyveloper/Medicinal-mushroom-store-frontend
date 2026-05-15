import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import OrdersPage from '@/pages/OrdersPage'
import { orderService } from '@/services/orderService'
import type { Order, User } from '@/types'

const mockNavigate = vi.fn()
let mockUser: User | null = null

vi.mock('@/services/orderService', () => ({
  orderService: { getByUserId: vi.fn() },
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: mockUser }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockOrderService = vi.mocked(orderService)

const baseUser: User = {
  id: 1,
  name: 'Juan',
  lastname: 'Pérez',
  email: 'user@test.com',
  phoneNumber: 3001234567,
  imageUrl: '',
  role: 'CLIENT',
  active: true,
}

const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    userEmail: 'user@test.com',
    userName: 'Juan Pérez',
    userPhone: 3001234567,
    totalPrice: 55000,
    status: 'PENDING',
    createdAt: '2024-01-15T10:00:00Z',
    items: [
      { id: 1, productId: 1, productName: 'Reishi', imageUrl: '', quantity: 1, unitPrice: 25000 },
      { id: 2, productId: 2, productName: 'Chaga', imageUrl: '', quantity: 1, unitPrice: 30000 },
    ],
  },
  {
    id: 2,
    userId: 1,
    userEmail: 'user@test.com',
    userName: 'Juan Pérez',
    userPhone: 3001234567,
    totalPrice: 30000,
    status: 'PAID',
    createdAt: '2024-01-10T10:00:00Z',
    items: [{ id: 3, productId: 2, productName: 'Chaga', imageUrl: '', quantity: 1, unitPrice: 30000 }],
  },
]

function renderOrders() {
  return render(
    <MemoryRouter>
      <OrdersPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockUser = baseUser
})

describe('OrdersPage', () => {
  it('shows loading state while fetching orders', () => {
    mockOrderService.getByUserId.mockReturnValue(new Promise(() => {}))
    renderOrders()
    expect(screen.getByText('Cargando órdenes...')).toBeInTheDocument()
  })

  it('shows empty state message when user has no orders', async () => {
    mockOrderService.getByUserId.mockResolvedValue([])
    renderOrders()
    await waitFor(() => {
      expect(screen.getByText('No tienes órdenes todavía')).toBeInTheDocument()
    })
  })

  it('renders all orders with their IDs after loading', async () => {
    mockOrderService.getByUserId.mockResolvedValue(mockOrders)
    renderOrders()
    await waitFor(() => {
      expect(screen.getByText('Orden #1')).toBeInTheDocument()
      expect(screen.getByText('Orden #2')).toBeInTheDocument()
    })
  })

  it('shows correct status badges for each order', async () => {
    mockOrderService.getByUserId.mockResolvedValue(mockOrders)
    renderOrders()
    await waitFor(() => {
      expect(screen.getByText('Pendiente')).toBeInTheDocument()
      expect(screen.getByText('Pagado')).toBeInTheDocument()
    })
  })

  it('shows order items with product names and quantities', async () => {
    mockOrderService.getByUserId.mockResolvedValue([mockOrders[0]])
    renderOrders()
    await waitFor(() => {
      expect(screen.getByText(/Reishi x1/)).toBeInTheDocument()
      expect(screen.getByText(/Chaga x1/)).toBeInTheDocument()
    })
  })

  it('shows "Completar pago" button only for PENDING orders', async () => {
    mockOrderService.getByUserId.mockResolvedValue(mockOrders)
    renderOrders()
    await waitFor(() => {
      const payButtons = screen.getAllByRole('button', { name: /completar pago/i })
      expect(payButtons).toHaveLength(1)
    })
  })

  it('navigates to checkout when "Completar pago" is clicked', async () => {
    const user = userEvent.setup()
    mockOrderService.getByUserId.mockResolvedValue([mockOrders[0]])
    renderOrders()
    await waitFor(() => screen.getByRole('button', { name: /completar pago/i }))
    await user.click(screen.getByRole('button', { name: /completar pago/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/checkout/1')
  })

  it('does not fetch orders when user is null', () => {
    mockUser = null
    renderOrders()
    expect(mockOrderService.getByUserId).not.toHaveBeenCalled()
  })

  it('shows "Cancelado" badge for cancelled orders', async () => {
    const cancelledOrder: Order = {
      id: 3,
      userId: 1,
      userEmail: 'user@test.com',
      userName: 'Juan Pérez',
      userPhone: 3001234567,
      totalPrice: 25000,
      status: 'CANCELLED',
      createdAt: '2024-01-08T10:00:00Z',
      items: [{ id: 5, productId: 1, productName: 'Reishi', imageUrl: '', quantity: 1, unitPrice: 25000 }],
    }
    mockOrderService.getByUserId.mockResolvedValue([cancelledOrder])
    renderOrders()
    await waitFor(() => {
      expect(screen.getByText('Cancelado')).toBeInTheDocument()
    })
  })

  it('does not show "Completar pago" button for PAID orders', async () => {
    mockOrderService.getByUserId.mockResolvedValue([mockOrders[1]])
    renderOrders()
    await waitFor(() => screen.getByText('Orden #2'))
    expect(screen.queryByRole('button', { name: /completar pago/i })).not.toBeInTheDocument()
  })
})
