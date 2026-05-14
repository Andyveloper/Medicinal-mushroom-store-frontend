import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AdminProductsPage from '@/pages/AdminPages/AdminProductsPage'
import { productService } from '@/services/productService'
import type { Product } from '@/types'

vi.mock('@/services/productService', () => ({
  productService: {
    getAll: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}))

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
    active: false,
  },
]

function renderAdminProducts() {
  return render(
    <MemoryRouter>
      <AdminProductsPage />
    </MemoryRouter>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})

describe('AdminProductsPage', () => {
  it('shows loading state while fetching products', () => {
    mockProductService.getAll.mockReturnValue(new Promise(() => {}))
    renderAdminProducts()
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders the page title and "Nuevo Producto" button after loading', async () => {
    mockProductService.getAll.mockResolvedValue([])
    renderAdminProducts()
    await waitFor(() => {
      expect(screen.getByText('Gestión de Productos')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /nuevo producto/i })).toBeInTheDocument()
    })
  })

  it('renders all products with their names', async () => {
    mockProductService.getAll.mockResolvedValue(mockProducts)
    renderAdminProducts()
    await waitFor(() => {
      expect(screen.getByText('Reishi')).toBeInTheDocument()
      expect(screen.getByText('Chaga')).toBeInTheDocument()
    })
  })

  it('shows stock count badge for each product', async () => {
    mockProductService.getAll.mockResolvedValue(mockProducts)
    renderAdminProducts()
    await waitFor(() => {
      expect(screen.getByText('10 en stock')).toBeInTheDocument()
      expect(screen.getByText('0 en stock')).toBeInTheDocument()
    })
  })

  it('shows product creation form when "Nuevo Producto" is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([])
    renderAdminProducts()
    await waitFor(() => screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /nuevo producto/i }))
    expect(screen.getByRole('button', { name: /guardar producto/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  })

  it('hides the form when "Cancelar" is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([])
    renderAdminProducts()
    await waitFor(() => screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /cancelar/i }))
    expect(screen.queryByRole('button', { name: /guardar producto/i })).not.toBeInTheDocument()
  })

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([])
    renderAdminProducts()
    await waitFor(() => screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /guardar producto/i }))
    await waitFor(() => {
      expect(screen.getByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument()
    })
  })

  it('calls productService.create with valid form data and reloads the list', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([])
    mockProductService.create.mockResolvedValue(undefined as never)
    renderAdminProducts()
    await waitFor(() => screen.getByRole('button', { name: /nuevo producto/i }))
    await user.click(screen.getByRole('button', { name: /nuevo producto/i }))

    await user.type(screen.getByPlaceholderText('Nombre del producto'), 'Reishi')
    await user.type(screen.getByPlaceholderText('Descripción del producto'), 'Hongo medicinal adaptógeno')
    await user.type(screen.getByPlaceholderText('70000'), '25000')
    await user.type(screen.getByPlaceholderText('10'), '5')

    await user.click(screen.getByRole('button', { name: /guardar producto/i }))

    await waitFor(() => {
      expect(mockProductService.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Reishi', price: 25000, stock: 5 })
      )
      expect(mockProductService.getAll).toHaveBeenCalledTimes(2)
    })
  })

  it('calls productService.delete after user confirms deletion', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([mockProducts[0]])
    mockProductService.delete.mockResolvedValue(undefined as never)
    renderAdminProducts()
    await waitFor(() => screen.getByText('Reishi'))

    const buttons = screen.getAllByRole('button')
    const trashBtn = buttons[1]
    await user.click(trashBtn)

    await waitFor(() => {
      expect(mockProductService.delete).toHaveBeenCalledWith(mockProducts[0].id)
    })
  })

  it('does not delete product when user cancels the confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    mockProductService.getAll.mockResolvedValue([mockProducts[0]])
    renderAdminProducts()
    await waitFor(() => screen.getByText('Reishi'))

    const buttons = screen.getAllByRole('button')
    const trashBtn = buttons[1]
    await user.click(trashBtn)

    expect(mockProductService.delete).not.toHaveBeenCalled()
  })

  it('opens stock dialog with product name when edit button is clicked', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([mockProducts[0]])
    renderAdminProducts()
    await waitFor(() => screen.getByText('Reishi'))

    const buttons = screen.getAllByRole('button')
    const editStockBtn = buttons[2]
    await user.click(editStockBtn)

    await waitFor(() => {
      expect(screen.getByText(/Actualizar stock — Reishi/)).toBeInTheDocument()
    })
  })

  it('calls productService.update with new stock value from dialog', async () => {
    const user = userEvent.setup()
    mockProductService.getAll.mockResolvedValue([mockProducts[0]])
    mockProductService.update.mockResolvedValue(undefined as never)
    renderAdminProducts()
    await waitFor(() => screen.getByText('Reishi'))

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[2])

    await waitFor(() => screen.getByText(/Actualizar stock — Reishi/))

    const stockInput = screen.getByPlaceholderText('0')
    await user.clear(stockInput)
    await user.type(stockInput, '20')

    await user.click(screen.getByRole('button', { name: /^guardar$/i }))

    await waitFor(() => {
      expect(mockProductService.update).toHaveBeenCalledWith(mockProducts[0].id, 20)
    })
  })
})
