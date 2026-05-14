import { describe, it, expect, vi, beforeEach } from 'vitest'
import { paymentService } from '@/services/paymentService'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: { post: vi.fn() },
}))

const mockPost = vi.mocked(api.post)

beforeEach(() => {
  mockPost.mockReset()
})

describe('paymentService', () => {
  it('createPayment retorna el clientSecret y orderId', async () => {
    mockPost.mockResolvedValue({ data: { clientSecret: 'pi_secret_abc', orderId: 1 } })

    const result = await paymentService.createPayment(1)

    expect(result).toEqual({ clientSecret: 'pi_secret_abc', orderId: 1 })
    expect(mockPost).toHaveBeenCalledWith('/payments/1')
  })

  it('propaga error si la orden no es válida para pago', async () => {
    mockPost.mockRejectedValue(new Error('400 Bad Request'))

    await expect(paymentService.createPayment(999)).rejects.toThrow('400 Bad Request')
  })
})
