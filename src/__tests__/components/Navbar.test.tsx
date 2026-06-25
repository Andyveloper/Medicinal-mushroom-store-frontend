import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '@/components/ui/Navbar'
import type { User } from '@/types'

const mockNavigate = vi.fn()
const mockLogout = vi.fn()

let mockIsAuthenticated = false
let mockUser: User | null = null
let mockItemCount = 0

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    logout: mockLogout,
    user: mockUser,
  }),
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({ itemCount: mockItemCount }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const clientUser: User = {
  id: 1,
  name: 'Juan',
  lastname: 'Pérez',
  email: 'juan@test.com',
  phoneNumber: 3001234567,
  imageUrl: '',
  role: 'CLIENT',
  active: true,
}

const adminUser: User = { ...clientUser, role: 'ADMIN' }

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockIsAuthenticated = false
  mockUser = null
  mockItemCount = 0
})

describe('Navbar', () => {
  it('shows "Iniciar Sesión" and "Registrarse" links when not authenticated', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('hides login and register links when authenticated', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    renderNavbar()
    expect(screen.queryByRole('link', { name: /iniciar sesión/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /registrarse/i })).not.toBeInTheDocument()
  })

  it('shows user email when authenticated', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    renderNavbar()
    expect(screen.getByText('juan@test.com')).toBeInTheDocument()
  })

  it('shows cart link when authenticated', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    renderNavbar()
    expect(document.querySelector('a[href="/cart"]')).toBeInTheDocument()
  })

  it('does not show Admin link for CLIENT role', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    renderNavbar()
    expect(screen.queryByRole('button', { name: /admin/i })).not.toBeInTheDocument()
  })

  it('shows Admin link for ADMIN role', () => {
    mockIsAuthenticated = true
    mockUser = adminUser
    renderNavbar()
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument()
  })

  it('shows cart item count badge when itemCount is greater than 0', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    mockItemCount = 3
    renderNavbar()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not show cart badge when itemCount is 0', () => {
    mockIsAuthenticated = true
    mockUser = clientUser
    mockItemCount = 0
    renderNavbar()
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('calls logout and navigates to /login when logout button is clicked', async () => {
    const user = userEvent.setup()
    mockIsAuthenticated = true
    mockUser = clientUser
    renderNavbar()
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[buttons.length - 1])
    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('renders the brand link to home', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /mr fungi/i })).toBeInTheDocument()
  })

  it('renders authenticated nav without user info when user is null', () => {
    mockIsAuthenticated = true
    mockUser = null
    renderNavbar()
    expect(screen.queryByText('juan@test.com')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /admin/i })).not.toBeInTheDocument()
  })

  it('returns cached result on re-render with unchanged auth state', () => {
    mockIsAuthenticated = false
    const { rerender } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    rerender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument()
  })
})
