import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ShoppingCart, LogOut, User, ChevronDown } from 'lucide-react'
import { UserRole } from '@/types/UserRole'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'bg-background/95 shadow-md backdrop-blur-sm'
          : 'bg-background shadow-none',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-heading text-brand-green-dark text-xl font-bold tracking-tight">
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
                    <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              {user?.role === UserRole.ADMIN && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Admin
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/admin/products">Productos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/orders">Ordenes</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {user?.role === UserRole.CLIENT && (
                <Button variant="outline" size="sm" onClick={() => navigate('/orders')}>
                  Mis Órdenes
                </Button>
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
