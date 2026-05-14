import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminOrdersPage from '@/pages/AdminPages/AdminOrdersPage'
import { orderService } from '@/services/orderService'
import type { Order } from '@/types'

vi.mock('@/services/orderService', () => ({
  orderService: { getAll: vi.fn() },
}))

const mockOrderService = vi.mocked(orderService)

const mockOrders: Order[] = [
  {
    id: 1,
    userId: 10,
    userEmail: 'cliente@test.com',
    userName: 'Ana García',
    userPhone: 3001234567,
    totalPrice: 55000,
    status: 'PENDING',
    createdAt: '2024-01-15T10:00:00Z',
    items: [
      { id: 1, productId: 1, productName: 'Reishi', quantity: 2, unitPrice: 25000 },
      { id: 2, productId: 2, productName: 'Chaga', quantity: 1, unitPrice: 30000 },
    ],
  },
  {
    id: 2,
    userId: 11,
    userEmail: 'otro@test.com',
    userName: 'Carlos López',
    userPhone: 3109876543,
    totalPrice: 30000,
    status: 'PAID',
    createdAt: '2024-01-10T10:00:00Z',
    items: [{ id: 3, productId: 2, productName: 'Chaga', quantity: 1, unitPrice: 30000 }],
  },
  {
    id: 3,
    userId: 12,
    userEmail: 'cancel@test.com',
    userName: 'María Torres',
    userPhone: 3201112233,
    totalPrice: 25000,
    status: 'CANCELLED',
    createdAt: '2024-01-08T10:00:00Z',
    items: [{ id: 4, productId: 1, productName: 'Reishi', quantity: 1, unitPrice: 25000 }],
  },
]

function renderAdminOrders() {
  return render(
    <MemoryRouter>
      <AdminOrdersPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AdminOrdersPage', () => {
  it('shows loading state while fetching orders', () => {
    mockOrderService.getAll.mockReturnValue(new Promise(() => {}))
    renderAdminOrders()
    expect(screen.getByText('Cargando órdenes...')).toBeInTheDocument()
  })

  it('renders the page title after loading', async () => {
    mockOrderService.getAll.mockResolvedValue([])
    renderAdminOrders()
    await waitFor(() => {
      expect(screen.getByText('Gestión de Órdenes')).toBeInTheDocument()
    })
  })

  it('renders all orders with their IDs', async () => {
    mockOrderService.getAll.mockResolvedValue(mockOrders)
    renderAdminOrders()
    await waitFor(() => {
      expect(screen.getByText('Orden #1')).toBeInTheDocument()
      expect(screen.getByText('Orden #2')).toBeInTheDocument()
      expect(screen.getByText('Orden #3')).toBeInTheDocument()
    })
  })

  it('shows PENDING, PAID and CANCELLED status badges', async () => {
    mockOrderService.getAll.mockResolvedValue(mockOrders)
    renderAdminOrders()
    await waitFor(() => {
      expect(screen.getByText('Pendiente')).toBeInTheDocument()
      expect(screen.getByText('Pagado')).toBeInTheDocument()
      expect(screen.getByText('Cancelado')).toBeInTheDocument()
    })
  })

  it('shows customer name and email for each order', async () => {
    mockOrderService.getAll.mockResolvedValue([mockOrders[0]])
    renderAdminOrders()
    await waitFor(() => {
      expect(screen.getByText(/Ana García/)).toBeInTheDocument()
      expect(screen.getByText(/cliente@test.com/)).toBeInTheDocument()
    })
  })

  it('shows order items with product names and quantities', async () => {
    mockOrderService.getAll.mockResolvedValue([mockOrders[0]])
    renderAdminOrders()
    await waitFor(() => {
      expect(screen.getByText(/Reishi x2/)).toBeInTheDocument()
      expect(screen.getByText(/Chaga x1/)).toBeInTheDocument()
    })
  })

  it('calls getAll on mount', async () => {
    mockOrderService.getAll.mockResolvedValue([])
    renderAdminOrders()
    await waitFor(() => {
      expect(mockOrderService.getAll).toHaveBeenCalledTimes(1)
    })
  })
})
