export const OrderStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    CANCELLED: 'CANCELLED',
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];