import { useEffect, useState } from 'react'
import { orderService } from '@/services/orderService'
import { type Order } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService
      .getAll()
      .then((data) => setOrders(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando órdenes...</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="fungi-kicker text-sm text-magenta">Panel admin</span>
      <h1 className="mb-8 mt-2 font-heading text-4xl font-extrabold tracking-tight">Gestión de Órdenes</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="fungi-sticker shadow-none ring-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-heading text-base font-bold">Orden #{order.id}</CardTitle>
              <Badge variant={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-1 text-sm">Cliente: {order.userName}</p>
              <p className="text-muted-foreground mb-1 text-sm">Email: {order.userEmail}</p>
              <p className="text-muted-foreground mb-3 text-sm">Teléfono: {order.userPhone}</p>
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
                    <span key={item.id} className="flex items-center gap-2">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />
                    </span>
                    <span className="flex items-center justify-around">
                      {item.productName} x{item.quantity}
                    </span>
                    <span>${(item.unitPrice * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold">
                <span className="font-heading">Total</span>
                <span className="text-magenta font-heading text-lg">${order.totalPrice.toLocaleString('es-CO')} COP</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
