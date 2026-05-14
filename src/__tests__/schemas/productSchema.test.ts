import { describe, it, expect } from 'vitest'
import { productSchema } from '@/schemas/productSchema'

describe('productSchema', () => {
  const base = {
    name: 'Reishi',
    description: 'Hongo medicinal con propiedades adaptógenas',
    price: 25000,
    stock: 10,
    imageUrl: 'https://example.com/reishi.jpg',
  }

  it('acepta un producto válido', () => {
    const result = productSchema.safeParse(base)
    expect(result.success).toBe(true)
  })

  it('acepta imageUrl vacía', () => {
    const result = productSchema.safeParse({ ...base, imageUrl: '' })
    expect(result.success).toBe(true)
  })

  it('rechaza precio por debajo del mínimo', () => {
    const result = productSchema.safeParse({ ...base, price: 500 })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('El precio mínimo es 1000')
  })

  it('rechaza stock negativo', () => {
    const result = productSchema.safeParse({ ...base, stock: -1 })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('El stock no puede ser negativo')
  })

  it('rechaza descripción demasiado corta', () => {
    const result = productSchema.safeParse({ ...base, description: 'Corta' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('La descripción debe tener al menos 10 caracteres')
  })
})
