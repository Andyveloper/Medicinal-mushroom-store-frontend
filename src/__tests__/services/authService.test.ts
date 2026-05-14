import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '@/services/authService'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: { post: vi.fn() },
}))

const mockPost = vi.mocked(api.post)

beforeEach(() => {
  mockPost.mockReset()
})

describe('authService.login', () => {
  it('retorna el token cuando las credenciales son válidas', async () => {
    mockPost.mockResolvedValue({ data: { token: 'jwt-abc' } })

    const result = await authService.login({ email: 'user@test.com', password: '123456' })

    expect(result).toEqual({ token: 'jwt-abc' })
    expect(mockPost).toHaveBeenCalledWith('/auth/login', {
      email: 'user@test.com',
      password: '123456',
    })
  })

  it('propaga el error cuando el servidor rechaza las credenciales', async () => {
    mockPost.mockRejectedValue(new Error('401 Unauthorized'))

    await expect(
      authService.login({ email: 'mal@test.com', password: 'wrongpass' })
    ).rejects.toThrow('401 Unauthorized')
  })
})

describe('authService.register', () => {
  it('retorna el token al registrar un usuario nuevo', async () => {
    mockPost.mockResolvedValue({ data: { token: 'jwt-nuevo' } })

    const result = await authService.register({
      name: 'Ana',
      lastname: 'García',
      email: 'ana@test.com',
      password: '123456',
      phoneNumber: 3001234567,
    })

    expect(result).toEqual({ token: 'jwt-nuevo' })
    expect(mockPost).toHaveBeenCalledWith('/auth/register', expect.objectContaining({ email: 'ana@test.com' }))
  })

  it('propaga el error cuando el email ya está registrado', async () => {
    mockPost.mockRejectedValue(new Error('409 Conflict'))

    await expect(
      authService.register({
        name: 'Ana',
        lastname: 'García',
        email: 'existente@test.com',
        password: '123456',
        phoneNumber: 3001234567,
      })
    ).rejects.toThrow('409 Conflict')
  })
})
