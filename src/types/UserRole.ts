export const UserRole ={
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
} as const

export type UserRole = typeof UserRole[keyof typeof UserRole];