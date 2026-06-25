import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import { type Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import HeroSection from '@/components/ui/HeroSection'
import WhyUsSection from '@/components/ui/WhyUsSection'
import TestimonialsSection from '@/components/ui/TestimonialsSection'
import { useInView } from '@/hooks/useInView'

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const { ref: productsRef, inView: productsInView } = useInView()

  useEffect(() => {
    productService
      .getActive()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <HeroSection />

      {/* Products section */}
      <section id="products" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div
            ref={productsRef}
            className={`transition-all duration-700 ease-out ${productsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-12 text-center">
              <span className="fungi-kicker text-sm text-magenta">
                Catálogo
              </span>
              <h2 className="font-heading text-ink mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                Nuestros Productos
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base">
                Cada hongo seleccionado por sus propiedades y cultivado bajo los más altos estándares de calidad.
              </p>
            </div>

            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-muted-foreground">Cargando productos...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="fungi-sticker flex flex-col shadow-none ring-0">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-48 w-full rounded-t-lg object-cover"
                      />
                    )}
                    <CardContent className="flex-1 pt-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h2 className="font-heading text-lg font-bold leading-tight">{product.name}</h2>
                        <Badge
                          variant={product.stock > 0 ? 'secondary' : 'destructive'}
                          className="shrink-0 border-2 border-ink"
                        >
                          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-3 text-sm">{product.description}</p>
                      <p className="text-magenta mt-3 font-heading text-2xl font-extrabold">${product.price.toLocaleString('es-CO')} COP</p>
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
            )}
          </div>
        </div>
      </section>

      <WhyUsSection />
      <TestimonialsSection />
    </>
  )
}
