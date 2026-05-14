import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CatalogPage from '@/pages/CatalogPage'
import { productService } from '@/services/productService'
import type { Product } from '@/types'

const mockNavigate = vi.fn()
const mockAddItem = vi.fn()

vi.mock('@/services/productService', () => ({
  productService: { getActive: vi.fn() },
}))

vi.mock('@/context/CartContext', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockProductService = vi.mocked(productService)

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Reishi',
    description: 'Hongo adaptógeno',
    price: 25000,
    stock: 10,
    imageUrl: '',
    active: true,
  },
  {
    id: 2,
    name: 'Chaga',
    description: 'Hongo antioxidante',
    price: 30000,
    stock: 0,
    imageUrl: '',
    active: true,
  },
]

function renderCatalog() {
  return render(
    <MemoryRouter>
      <CatalogPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CatalogPage', () => {
  it('shows loading state before products are fetched', () => {
    mockProductService.getActive.mockReturnValue(new Promise(() => {}))
    renderCatalog()
    expect(screen.getByText('Cargando productos...')).toBeInTheDocument()
  })

  it('renders product cards after loading', async () => {
    mockProductService.getActive.mockResolvedValue(mockProducts)
    renderCatalog()
    await waitFor(() => {
      expect(screen.getByText('Reishi')).toBeInTheDocument()
      expect(screen.getByText('Chaga')).toBeInTheDocument()
    })
  })

  it('shows "Agotado" badge for out-of-stock products', async () => {
    mockProductService.getActive.mockResolvedValue(mockProducts)
    renderCatalog()
    await waitFor(() => {
      expect(screen.getByText('Agotado')).toBeInTheDocument()
    })
  })

  it('shows stock count badge for available products', async () => {
    mockProductService.getActive.mockResolvedValue(mockProducts)
    renderCatalog()
    await waitFor(() => {
      expect(screen.getByText('10 disponibles')).toBeInTheDocument()
    })
  })

  it('calls addItem when "Agregar" button is clicked for an in-stock product', async () => {
    const user = userEvent.setup()
    mockProductService.getActive.mockResolvedValue([mockProducts[0]])
    renderCatalog()
    await waitFor(() => screen.getByText('Reishi'))
    await user.click(screen.getByRole('button', { name: /agregar/i }))
    expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0])
  })

  it('disables "Agregar" button for out-of-stock products', async () => {
    mockProductService.getActive.mockResolvedValue([mockProducts[1]])
    renderCatalog()
    await waitFor(() => screen.getByText('Chaga'))
    expect(screen.getByRole('button', { name: /agregar/i })).toBeDisabled()
  })

  it('navigates to product detail when "Ver detalle" is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getActive.mockResolvedValue([mockProducts[0]])
    renderCatalog()
    await waitFor(() => screen.getByText('Reishi'))
    await user.click(screen.getByRole('button', { name: /ver detalle/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/products/1')
  })

  it('renders an empty list when there are no active products', async () => {
    mockProductService.getActive.mockResolvedValue([])
    renderCatalog()
    await waitFor(() => {
      expect(screen.getByText('Nuestros Productos')).toBeInTheDocument()
      expect(screen.queryByText('Reishi')).not.toBeInTheDocument()
    })
  })

  it('renders product image when imageUrl is provided', async () => {
    mockProductService.getActive.mockResolvedValue([
      { ...mockProducts[0], imageUrl: 'https://example.com/reishi.jpg' },
    ])
    renderCatalog()
    await waitFor(() => {
      const img = screen.getByRole('img', { name: /reishi/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/reishi.jpg')
    })
  })
})
