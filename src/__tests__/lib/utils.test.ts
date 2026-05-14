import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('combina múltiples clases', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('resuelve conflictos de Tailwind manteniendo la última clase', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('ignora valores falsy', () => {
    expect(cn('flex', false, undefined, null, 'gap-2')).toBe('flex gap-2')
  })
})
