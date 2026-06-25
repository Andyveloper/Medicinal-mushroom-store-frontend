import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import { type Order } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const statusColors = {
  PENDING: 'secondary',
  PAID: 'default',
  CANCELLED: 'destructive',
} as const

const statusLabels = {
  PENDING: 'Pendiente',
  PAID: 'Pagado',
  CANCELLED: 'Cancelado',
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    orderService
      .getByUserId()
      .then((data) => setOrders(data))
      .finally(() => setLoading(false))
  }, [user])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando órdenes...</p>
      </div>
    )

  if (orders.length === 0)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-4 text-center">
        <p className="font-heading text-2xl font-extrabold tracking-tight">No tienes órdenes todavía</p>
        <p className="text-muted-foreground">Cuando hagas tu primer pedido aparecerá aquí.</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="fungi-kicker text-sm text-magenta">Historial</span>
      <h1 className="mb-8 mt-2 font-heading text-4xl font-extrabold tracking-tight">Mis Órdenes</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="fungi-sticker shadow-none ring-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-heading text-base font-bold">Orden #{order.id}</CardTitle>
              <Badge variant={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">
                {new Date(order.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b py-2 align-middle text-sm last:border-0"
                  >
                    <span>
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                    </span>
                    <span className="flex items-center justify-center gap-2">
                      <p>
                        {item.productName} x{item.quantity}
                      </p>
                    </span>
                    <span>${(item.unitPrice * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between font-bold">
                <span className="font-heading">Total</span>
                <span className="text-magenta font-heading text-lg">${order.totalPrice.toLocaleString('es-CO')} COP</span>
              </div>
              {order.status === 'PENDING' && (
                <Button size="sm" className="mt-4" onClick={() => navigate(`/checkout/${order.id}`)}>
                  Completar pago
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
