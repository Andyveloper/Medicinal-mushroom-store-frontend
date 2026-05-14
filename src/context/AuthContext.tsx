import type { AuthContextType, JwtPayload, User } from '@/types'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import type { UserRole } from '@/types/UserRole'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const login = (newToken: string) => {
    const decoded = jwtDecode<JwtPayload>(newToken)
    const newUser: User = {
      id: 0,
      name: '',
      lastname: '',
      email: decoded.sub,
      phoneNumber: 0,
      imageUrl: '',
      role: decoded.role as UserRole,
      active: true,
    }
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
