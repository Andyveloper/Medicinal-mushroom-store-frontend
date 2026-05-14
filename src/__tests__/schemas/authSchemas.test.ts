import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '@/schemas/authSchemas'

describe('loginSchema', () => {
  it('acepta credenciales válidas', () => {
    const result = loginSchema.safeParse({ email: 'user@test.com', password: '123456' })
    expect(result.success).toBe(true)
  })

  it('rechaza email con formato inválido', () => {
    const result = loginSchema.safeParse({ email: 'no-es-un-email', password: '123456' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Email inválido')
  })

  it('rechaza contraseña con menos de 6 caracteres', () => {
    const result = loginSchema.safeParse({ email: 'user@test.com', password: '123' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('La contraseña debe tener al menos 6 caracteres')
  })
})

describe('registerSchema', () => {
  const base = {
    name: 'Juan',
    lastname: 'Pérez',
    email: 'juan@test.com',
    password: '123456',
    phoneNumber: 3001234567,
  }

  it('acepta datos de registro válidos', () => {
    const result = registerSchema.safeParse(base)
    expect(result.success).toBe(true)
  })

  it('rechaza nombre con menos de 2 caracteres', () => {
    const result = registerSchema.safeParse({ ...base, name: 'J' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('El nombre debe tener al menos 2 caracteres')
  })

  it('rechaza número de teléfono inválido', () => {
    const result = registerSchema.safeParse({ ...base, phoneNumber: 123 })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Número de teléfono inválido')
  })

  it('rechaza email inválido', () => {
    const result = registerSchema.safeParse({ ...base, email: 'invalido' })
    expect(result.success).toBe(false)
  })
})
