import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import { type Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    productService
      .getActive()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando productos...</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Nuestros Productos</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-48 w-full rounded-t-lg object-cover"
              />
            )}
            <CardContent className="flex-1 pt-4">
              <div className="mb-2 flex items-start justify-between">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                </Badge>
              </div>
              <p className="text-muted-foreground line-clamp-3 text-sm">{product.description}</p>
              <p className="mt-3 text-xl font-bold">${product.price.toLocaleString('es-CO')} COP</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                Ver detalle
              </Button>
              <Button
                className="flex-1"
                disabled={product.stock === 0}
                onClick={() => addItem(product)}
              >
                <ShoppingCart size={16} className="mr-2" />
                Agregar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
