import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import { type Product } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    productService
      .getById(Number(id))
      .then((data) => setProduct(data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    )

  if (!product)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Producto no encontrado</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft size={16} className="mr-2" />
        Volver
      </Button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="fungi-sticker w-full rounded-2xl object-cover"
          />
        )}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight">{product.name}</h1>
          <Badge
            variant={product.stock > 0 ? 'secondary' : 'destructive'}
            className="w-fit border-2 border-ink"
          >
            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
          </Badge>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-magenta font-heading text-4xl font-extrabold">${product.price.toLocaleString('es-CO')} COP</p>
          <Button
            size="lg"
            disabled={product.stock === 0}
            onClick={() => {
              addItem(product)
            }}
          >
            <ShoppingCart size={18} className="mr-2" />
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
