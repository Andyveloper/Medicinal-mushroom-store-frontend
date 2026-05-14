import { describe, it, expect, vi, beforeEach } from 'vitest'
import { productService } from '@/services/productService'
import api from '@/services/api'
import type { Product } from '@/types'

vi.mock('@/services/api', () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn(), patch: vi.fn() },
}))

const mockApi = vi.mocked(api)

const mockProduct: Product = {
  id: 1,
  name: 'Reishi',
  description: 'Hongo adaptógeno',
  price: 25000,
  stock: 10,
  imageUrl: 'https://example.com/img.jpg',
  active: true,
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('productService', () => {
  it('getAll retorna lista de productos', async () => {
    mockApi.get.mockResolvedValue({ data: [mockProduct] })
    const result = await productService.getAll()
    expect(result).toEqual([mockProduct])
    expect(mockApi.get).toHaveBeenCalledWith('/products')
  })

  it('getById retorna el producto correcto', async () => {
    mockApi.get.mockResolvedValue({ data: mockProduct })
    const result = await productService.getById(1)
    expect(result).toEqual(mockProduct)
    expect(mockApi.get).toHaveBeenCalledWith('/products/1')
  })

  it('getActive retorna solo productos activos', async () => {
    mockApi.get.mockResolvedValue({ data: [mockProduct] })
    const result = await productService.getActive()
    expect(result).toEqual([mockProduct])
    expect(mockApi.get).toHaveBeenCalledWith('/products/active')
  })

  it('create envía los datos y retorna el producto creado', async () => {
    mockApi.post.mockResolvedValue({ data: mockProduct })
    const payload = { name: 'Reishi', description: 'Hongo adaptógeno', price: 25000, stock: 10 }
    const result = await productService.create(payload)
    expect(result).toEqual(mockProduct)
    expect(mockApi.post).toHaveBeenCalledWith('/products', payload)
  })

  it('update actualiza el stock del producto', async () => {
    mockApi.patch.mockResolvedValue({ data: { ...mockProduct, stock: 20 } })
    const result = await productService.update(1, 20)
    expect(result.stock).toBe(20)
    expect(mockApi.patch).toHaveBeenCalledWith('/products/1/stock', { stock: 20 })
  })

  it('delete propaga error si el producto no existe', async () => {
    mockApi.delete.mockRejectedValue(new Error('404 Not Found'))
    await expect(productService.delete(999)).rejects.toThrow('404 Not Found')
  })
})
