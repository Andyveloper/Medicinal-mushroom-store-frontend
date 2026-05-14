import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { jwtDecode } from 'jwt-decode'

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}))

const mockJwtDecode = vi.mocked(jwtDecode)

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

beforeEach(() => {
  localStorage.clear()
  mockJwtDecode.mockReturnValue({ sub: 'user@test.com', role: 'CLIENT', exp: 9999999999 })
})

describe('AuthContext', () => {
  it('lanza error si se usa fuera del provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within an AuthProvider')
  })

  it('inicia sin autenticación cuando no hay token en localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
  })

  it('login guarda el token, construye el usuario y persiste en localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => result.current.login('test-jwt-token'))

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.token).toBe('test-jwt-token')
    expect(result.current.user?.email).toBe('user@test.com')
    expect(result.current.user?.role).toBe('CLIENT')
    expect(localStorage.getItem('token')).toBe('test-jwt-token')
  })

  it('logout limpia el estado y elimina los datos de localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => result.current.login('test-jwt-token'))
    act(() => result.current.logout())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('inicia autenticado si ya existe un token en localStorage', () => {
    localStorage.setItem('token', 'existing-token')
    localStorage.setItem('user', JSON.stringify({ id: 0, email: 'user@test.com', role: 'CLIENT' }))

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.token).toBe('existing-token')
  })
})
