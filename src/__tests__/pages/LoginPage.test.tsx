import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import { authService } from '@/services/authService'

const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('@/services/authService', () => ({
  authService: { login: vi.fn() },
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockAuthService = vi.mocked(authService)

function renderLogin() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LoginPage', () => {
  it('renderiza el formulario de login correctamente', () => {
    renderLogin()
    expect(screen.getByText('Iniciar Sesión', { selector: '[data-slot="card-title"]' })).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('muestra errores de validación al enviar el formulario vacío', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  it('llama a login y navega a / cuando las credenciales son válidas', async () => {
    const user = userEvent.setup()
    mockAuthService.login.mockResolvedValue({ token: 'jwt-token' })

    renderLogin()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'user@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), '123456')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('jwt-token')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('muestra mensaje de error cuando el servidor rechaza las credenciales', async () => {
    const user = userEvent.setup()
    mockAuthService.login.mockRejectedValue(new Error('401'))

    renderLogin()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'mal@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    })
  })
})
