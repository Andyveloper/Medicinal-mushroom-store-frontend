import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import AdminProductsPage from './pages/AdminPages/AdminProductsPage'
import AdminOrdersPage from './pages/AdminPages/AdminOrdersPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import NuestroProcesosPage from './pages/NuestroProcesosPage'
import PoliticasPrivacidadPage from './pages/PoliticasPrivacidadPage'
import TerminosCondicionesPage from './pages/TerminosCondicionesPage'
import EnviosDevolucionesPage from './pages/EnviosDevolucionesPage'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />

          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/orders"
            element={isAuthenticated ? <AdminOrdersPage /> : <Navigate to="/login" />}
          />

          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/nuestro-proceso" element={<NuestroProcesosPage />} />
          <Route path="/politicas-de-privacidad" element={<PoliticasPrivacidadPage />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondicionesPage />} />
          <Route path="/envios-y-devoluciones" element={<EnviosDevolucionesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
