import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(1000, 'El precio mínimo es 1000'),
  stock: z.number().min(0, 'El stock no puede ser negativo'),
  imageUrl: z.url('URL inválida').optional().or(z.literal('')),
})

export type ProductFormData = z.infer<typeof productSchema>
