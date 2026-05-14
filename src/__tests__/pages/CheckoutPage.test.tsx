import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CheckoutPage from '@/pages/CheckoutPage'
import { paymentService } from '@/services/paymentService'

const mockNavigate = vi.fn()
let mockStripe: { confirmPayment: ReturnType<typeof vi.fn> } | null = null
let mockElements: object | null = null
let mockOrderId: string | undefined = '1'

vi.mock('@/services/paymentService', () => ({
  paymentService: { createPayment: vi.fn() },
}))

vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn().mockResolvedValue(null),
}))

vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PaymentElement: () => <div data-testid="payment-element" />,
  useStripe: () => mockStripe,
  useElements: () => mockElements,
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ orderId: mockOrderId }),
  }
})

const mockPaymentService = vi.mocked(paymentService)

function renderCheckout() {
  return render(
    <MemoryRouter>
      <CheckoutPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockStripe = null
  mockElements = null
  mockOrderId = '1'
})

describe('CheckoutPage', () => {
  it('shows loading state while fetching payment intent', () => {
    mockPaymentService.createPayment.mockReturnValue(new Promise(() => {}))
    renderCheckout()
    expect(screen.getByText('Preparando pago...')).toBeInTheDocument()
  })

  it('stays in loading state and skips createPayment when orderId is missing', () => {
    mockOrderId = undefined
    renderCheckout()
    expect(mockPaymentService.createPayment).not.toHaveBeenCalled()
    expect(screen.getByText('Preparando pago...')).toBeInTheDocument()
  })

  it('calls createPayment with the order ID from URL params', async () => {
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => {
      expect(mockPaymentService.createPayment).toHaveBeenCalledWith(1)
    })
  })

  it('renders the checkout card after payment intent is created', async () => {
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => {
      expect(screen.getByText('Completar Pago')).toBeInTheDocument()
    })
  })

  it('renders the payment form when clientSecret is available', async () => {
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => {
      expect(screen.getByTestId('payment-element')).toBeInTheDocument()
    })
  })

  it('navigates to home when payment creation fails', async () => {
    mockPaymentService.createPayment.mockRejectedValue(new Error('Payment failed'))
    renderCheckout()
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('navigates to /orders on successful payment', async () => {
    const user = userEvent.setup()
    mockStripe = { confirmPayment: vi.fn().mockResolvedValue({}) }
    mockElements = {}
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => screen.getByRole('button', { name: /pagar ahora/i }))
    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/orders')
    })
  })

  it('shows stripe error message when payment fails', async () => {
    const user = userEvent.setup()
    mockStripe = {
      confirmPayment: vi.fn().mockResolvedValue({ error: { message: 'Card declined' } }),
    }
    mockElements = {}
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => screen.getByRole('button', { name: /pagar ahora/i }))
    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    await waitFor(() => {
      expect(screen.getByText('Card declined')).toBeInTheDocument()
    })
  })

  it('shows fallback error when stripe error has no message', async () => {
    const user = userEvent.setup()
    mockStripe = {
      confirmPayment: vi.fn().mockResolvedValue({ error: {} }),
    }
    mockElements = {}
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => screen.getByRole('button', { name: /pagar ahora/i }))
    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    await waitFor(() => {
      expect(screen.getByText('Error al procesar el pago')).toBeInTheDocument()
    })
  })

  it('shows loading text while payment is processing', async () => {
    const user = userEvent.setup()
    mockStripe = { confirmPayment: vi.fn().mockReturnValue(new Promise(() => {})) }
    mockElements = {}
    mockPaymentService.createPayment.mockResolvedValue({ clientSecret: 'pi_secret_abc', orderId: 1 })
    renderCheckout()
    await waitFor(() => screen.getByRole('button', { name: /pagar ahora/i }))
    await user.click(screen.getByRole('button', { name: /pagar ahora/i }))
    await waitFor(() => {
      expect(screen.getByText('Procesando pago...')).toBeInTheDocument()
    })
  })
})
