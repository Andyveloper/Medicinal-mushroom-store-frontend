import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductDetailPage from '@/pages/DetailPage'
import { productService } from '@/services/productService'
import type { Product } from '@/types'

const mockNavigate = vi.fn()
const mockAddItem = vi.fn()
let mockProductId: string | undefined = '1'

vi.mock('@/services/productService', () => ({
  productService: { getById: vi.fn() },
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: mockProductId }),
  }
})

const mockProductService = vi.mocked(productService)

const mockProduct: Product = {
  id: 1,
  name: 'Reishi',
  description: 'Hongo adaptógeno con múltiples beneficios',
  price: 25000,
  stock: 10,
  imageUrl: '',
  active: true,
}

function renderDetail() {
  return render(
    <MemoryRouter>
      <ProductDetailPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockProductId = '1'
})

describe('ProductDetailPage', () => {
  it('shows loading state while fetching product', () => {
    mockProductService.getById.mockReturnValue(new Promise(() => {}))
    renderDetail()
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('shows "Producto no encontrado" when product does not exist', async () => {
    mockProductService.getById.mockResolvedValue(null as unknown as Product)
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Producto no encontrado')).toBeInTheDocument()
    })
  })

  it('renders product name, description and price after loading', async () => {
    mockProductService.getById.mockResolvedValue(mockProduct)
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Reishi')).toBeInTheDocument()
      expect(screen.getByText('Hongo adaptógeno con múltiples beneficios')).toBeInTheDocument()
      expect(screen.getByText('10 disponibles')).toBeInTheDocument()
    })
  })

  it('fetches product by the id from URL params', async () => {
    mockProductService.getById.mockResolvedValue(mockProduct)
    renderDetail()
    await waitFor(() => {
      expect(mockProductService.getById).toHaveBeenCalledWith(1)
    })
  })

  it('calls addItem when "Agregar al carrito" is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getById.mockResolvedValue(mockProduct)
    renderDetail()
    await waitFor(() => screen.getByText('Reishi'))
    await user.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct)
  })

  it('disables "Agregar al carrito" button when stock is 0', async () => {
    mockProductService.getById.mockResolvedValue({ ...mockProduct, stock: 0 })
    renderDetail()
    await waitFor(() => screen.getByText('Reishi'))
    expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeDisabled()
  })

  it('shows "Agotado" badge when stock is 0', async () => {
    mockProductService.getById.mockResolvedValue({ ...mockProduct, stock: 0 })
    renderDetail()
    await waitFor(() => {
      expect(screen.getByText('Agotado')).toBeInTheDocument()
    })
  })

  it('navigates back when "Volver" button is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getById.mockResolvedValue(mockProduct)
    renderDetail()
    await waitFor(() => screen.getByText('Reishi'))
    await user.click(screen.getByRole('button', { name: /volver/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('stays in loading state when id is not provided', () => {
    mockProductId = undefined
    mockProductService.getById.mockReturnValue(new Promise(() => {}))
    renderDetail()
    expect(mockProductService.getById).not.toHaveBeenCalled()
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders the product image when imageUrl is provided', async () => {
    mockProductService.getById.mockResolvedValue({
      ...mockProduct,
      imageUrl: 'https://example.com/reishi.jpg',
    })
    renderDetail()
    await waitFor(() => {
      const img = screen.getByRole('img', { name: /reishi/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/reishi.jpg')
    })
  })
})
