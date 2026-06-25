import { useEffect, useState } from 'react'
import { productService } from '@/services/productService'
import { type Product } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trash2, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductFormData } from '@/schemas/productSchema'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newStock, setNewStock] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    productService
      .getAll()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }

  const onSubmit = async (data: ProductFormData) => {
    await productService.create(data)
    reset()
    setShowForm(false)
    loadProducts()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    await productService.delete(id)
    loadProducts()
  }

  const handleUpdateStock = async () => {
    if (!editingProduct) return
    await productService.update(editingProduct.id, Number(newStock))
    setEditingProduct(null)
    setNewStock('')
    loadProducts()
  }

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="fungi-kicker text-sm text-magenta">Panel admin</span>
          <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight">Gestión de Productos</h1>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {showForm && (
        <Card className="fungi-sticker mb-8 shadow-none ring-0">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input {...register('name')} placeholder="Nombre del producto" />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Precio (COP)</Label>
                  <Input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    placeholder="70000"
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input {...register('description')} placeholder="Descripción del producto" />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    {...register('stock', { valueAsNumber: true })}
                    placeholder="10"
                  />
                  {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>URL de imagen</Label>
                  <Input {...register('imageUrl')} placeholder="https://..." />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : 'Guardar producto'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <Card key={product.id} className="fungi-sticker shadow-none ring-0">
            <CardContent className="flex items-center gap-4 pt-4">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg border-2 border-ink object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-heading font-bold">{product.name}</p>
                <p className="text-magenta text-sm font-semibold">
                  ${product.price.toLocaleString('es-CO')} COP
                </p>
              </div>
              <Badge
                variant={product.stock > 0 ? 'secondary' : 'destructive'}
                className="border-2 border-ink"
              >
                {product.stock} en stock
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                <Trash2 size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditingProduct(product)
                  setNewStock(String(product.stock))
                }}
              >
                <Plus size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar stock — {editingProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label>Nuevo stock</Label>
            <Input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              placeholder="0"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateStock}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
