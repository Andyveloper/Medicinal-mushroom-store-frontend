import type { PaymentResponse } from '@/types'
import api from './api'

export const paymentService = {
  createPayment: async (orderId: number): Promise<PaymentResponse> => {
    const response = await api.post<PaymentResponse>(`/payments/${orderId}`)
    return response.data
  },
}
