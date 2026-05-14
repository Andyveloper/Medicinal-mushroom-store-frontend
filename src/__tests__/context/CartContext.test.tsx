import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: 1,
  name: 'Reishi',
  description: 'Hongo adaptógeno',
  price: 25000,
  stock: 10,
  imageUrl: '',
  active: true,
}

const mockProduct2: Product = { ...mockProduct, id: 2, name: 'Chaga', price: 30000 }

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  it('lanza error si se usa fuera del provider', () => {
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider')
  })

  it('inicia con el carrito vacío', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
    expect(result.current.itemCount).toBe(0)
  })

  it('addItem agrega un producto nuevo al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('addItem incrementa la cantidad si el producto ya existe', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('removeItem elimina el producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.removeItem(mockProduct.id))
    expect(result.current.items).toHaveLength(0)
  })

  it('updateQuantity actualiza la cantidad correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(mockProduct.id, 5))
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('updateQuantity elimina el item si la cantidad es 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(mockProduct.id, 0))
    expect(result.current.items).toHaveLength(0)
  })

  it('clearCart vacía el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct2))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
  })

  it('total y itemCount calculan correctamente con múltiples productos', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))   // 25000 x 1
    act(() => result.current.addItem(mockProduct))   // 25000 x 2
    act(() => result.current.addItem(mockProduct2))  // 30000 x 1
    expect(result.current.total).toBe(25000 * 2 + 30000)
    expect(result.current.itemCount).toBe(3)
  })

  it('addItem increments only the matching item when multiple products exist', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct2))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(2)
    expect(result.current.items.find((i) => i.product.id === mockProduct.id)?.quantity).toBe(2)
    expect(result.current.items.find((i) => i.product.id === mockProduct2.id)?.quantity).toBe(1)
  })

  it('updateQuantity updates only the matching item when multiple products exist', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct2))
    act(() => result.current.updateQuantity(mockProduct.id, 5))
    expect(result.current.items.find((i) => i.product.id === mockProduct.id)?.quantity).toBe(5)
    expect(result.current.items.find((i) => i.product.id === mockProduct2.id)?.quantity).toBe(1)
  })
})
