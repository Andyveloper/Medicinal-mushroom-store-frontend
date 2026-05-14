import api from './api'
import { type Order, type CreateOrderRequest } from '@/types'

export const orderService = {
  create: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await api.post<Order>('/orders', data)
    return response.data
  },
  getById: async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`)
    return response.data
  },
  getByUserId: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>(`/orders/user`)
    return response.data
  },
}
