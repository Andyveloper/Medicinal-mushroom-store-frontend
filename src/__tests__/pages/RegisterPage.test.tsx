import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RegisterPage from '@/pages/RegisterPage'
import { authService } from '@/services/authService'

const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('@/services/authService', () => ({
  authService: { register: vi.fn() },
}))

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockAuthService = vi.mocked(authService)

function renderRegister() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('RegisterPage', () => {
  it('renderiza el formulario de registro correctamente', () => {
    renderRegister()
    expect(screen.getByText('Crear Cuenta', { selector: '[data-slot="card-title"]' })).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
  })

  it('muestra errores de validación si el nombre es demasiado corto', async () => {
    const user = userEvent.setup()
    renderRegister()

    await user.type(screen.getByLabelText(/nombre/i), 'J')
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }))

    await waitFor(() => {
      expect(screen.getByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument()
    })
  })

  it('llama a register y navega a / con datos válidos', async () => {
    const user = userEvent.setup()
    mockAuthService.register.mockResolvedValue({ token: 'jwt-nuevo' })

    renderRegister()

    await user.type(screen.getByLabelText(/nombre/i), 'Juan')
    await user.type(screen.getByLabelText(/apellido/i), 'Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), '123456')
    await user.type(screen.getByLabelText(/teléfono/i), '3001234567')
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('jwt-nuevo')
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('muestra error cuando el email ya está registrado', async () => {
    const user = userEvent.setup()
    mockAuthService.register.mockRejectedValue(new Error('409'))

    renderRegister()

    await user.type(screen.getByLabelText(/nombre/i), 'Juan')
    await user.type(screen.getByLabelText(/apellido/i), 'Pérez')
    await user.type(screen.getByLabelText(/email/i), 'existente@test.com')
    await user.type(screen.getByLabelText(/contraseña/i), '123456')
    await user.type(screen.getByLabelText(/teléfono/i), '3001234567')
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Error al registrarse. El email puede estar en uso.')
      ).toBeInTheDocument()
    })
  })
})
