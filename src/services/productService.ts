import type { ProductFormData } from '@/schemas/productSchema'
import api from './api'
import { type Product } from '@/types'

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products')
    return response.data
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },
  getActive: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/active')
    return response.data
  },
  create: async (data: Omit<ProductFormData, 'id'>): Promise<Product> => {
    const response = await api.post<Product>('/products', data)
    return response.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete<Product>(`/products/${id}`)
  },
  update: async (id: number, stock: number): Promise<Product> => {
    const response = await api.patch<Product>(`/products/${id}/stock`, { stock })
    return response.data
  },
}
