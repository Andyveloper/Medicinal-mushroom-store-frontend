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
        'sticky top-0 z-50 h-20 border-b border-white/10 text-white transition-all duration-300',
        scrolled
          ? 'bg-ink/95 shadow-[0_2px_0_0_var(--color-magenta)] backdrop-blur-md'
          : 'bg-ink shadow-none'
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link to="/" aria-label="MR FUNGi — inicio" className="flex items-center">
          <img src="/mr-fungi-logo.png" alt="MR FUNGi" className="fungi-neon w-mt-auto mt-2 h-20" />
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden items-center gap-1 text-sm text-white/70 sm:flex">
                <User size={16} className="text-mint" />
                {user?.email}
              </span>
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative border-none bg-[#02E4B7]">
                  <ShoppingCart size={16} className="text-black" />
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
                    <Button variant="outline" size="sm" className="border-none bg-[#f82888]">
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
