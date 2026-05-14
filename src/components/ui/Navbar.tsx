import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { ShoppingCart, LogOut, User } from 'lucide-react'
import { UserRole } from '@/types/UserRole'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          🍄 Setas Medicinales
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-muted-foreground flex items-center gap-1 text-sm">
                <User size={16} />
                {user?.email}
              </span>
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart size={16} />
                  {itemCount > 0 && (
                    <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              {user?.role === UserRole.ADMIN && (
                <Link to="/admin/products">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
