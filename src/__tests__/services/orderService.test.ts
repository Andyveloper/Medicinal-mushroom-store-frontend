import { describe, it, expect, vi, beforeEach } from 'vitest'
import { orderService } from '@/services/orderService'
import api from '@/services/api'
import type { Order } from '@/types'

vi.mock('@/services/api', () => ({
  default: { get: vi.fn(), post: vi.fn() },
}))

const mockApi = vi.mocked(api)

const mockOrder: Order = {
  id: 1,
  userId: 10,
  userEmail: 'user@test.com',
  userName: 'Juan',
  userPhone: 3001234567,
  totalPrice: 50000,
  status: 'PENDING',
  createdAt: '2026-05-14T00:00:00Z',
  items: [{ id: 1, productId: 1, productName: 'Reishi', imageUrl: '', quantity: 2, unitPrice: 25000 }],
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('orderService', () => {
  it('create crea una orden y la retorna', async () => {
    mockApi.post.mockResolvedValue({ data: mockOrder })
    const payload = { orderItems: [{ product: { id: 1 }, quantity: 2 }] }
    const result = await orderService.create(payload)
    expect(result).toEqual(mockOrder)
    expect(mockApi.post).toHaveBeenCalledWith('/orders', payload)
  })

  it('getById retorna la orden correcta', async () => {
    mockApi.get.mockResolvedValue({ data: mockOrder })
    const result = await orderService.getById(1)
    expect(result).toEqual(mockOrder)
    expect(mockApi.get).toHaveBeenCalledWith('/orders/1')
  })

  it('getByUserId retorna las órdenes del usuario autenticado', async () => {
    mockApi.get.mockResolvedValue({ data: [mockOrder] })
    const result = await orderService.getByUserId()
    expect(result).toEqual([mockOrder])
    expect(mockApi.get).toHaveBeenCalledWith('/orders/user')
  })

  it('getAll retorna todas las órdenes', async () => {
    mockApi.get.mockResolvedValue({ data: [mockOrder] })
    const result = await orderService.getAll()
    expect(result).toEqual([mockOrder])
    expect(mockApi.get).toHaveBeenCalledWith('/orders')
  })

  it('getById propaga error si la orden no existe', async () => {
    mockApi.get.mockRejectedValue(new Error('404 Not Found'))
    await expect(orderService.getById(999)).rejects.toThrow('404 Not Found')
  })
})
