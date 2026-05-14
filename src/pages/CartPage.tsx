import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const order = await orderService.create({
        orderItems: items.map((item) => ({
          product: { id: item.product.id },
          quantity: item.quantity,
        })),
      })
      clearCart()
      navigate(`/checkout/${order.id}`)
    } catch {
      alert('Error al crear la orden')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Tu carrito está vacío</p>
        <Button onClick={() => navigate('/')}>Ver productos</Button>
      </div>
    )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Tu Carrito</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Card key={item.product.id}>
            <CardContent className="flex items-center gap-4 pt-4">
              {item.product.imageUrl && (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-16 w-16 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-muted-foreground text-sm">
                  ${item.product.price.toLocaleString('es-CO')} COP
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <p className="w-24 text-right font-bold">
                ${(item.product.price * item.quantity).toLocaleString('es-CO')}
              </p>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
                <Trash2 size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Separator className="my-6" />
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xl font-semibold">Total</span>
        <span className="text-2xl font-bold">${total.toLocaleString('es-CO')} COP</span>
      </div>
      <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
        {loading ? 'Procesando...' : 'Proceder al pago'}
      </Button>
    </div>
  )
}
