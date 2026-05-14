import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/ui/Navbar'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import AdminProductsPage from './pages/AdminPages/AdminProductsPage'

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Navbar />
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
        <Route path="/admin/orders" element={<div>Admin Orders Page</div>} />
      </Routes>
    </>
  )
}

export default App
