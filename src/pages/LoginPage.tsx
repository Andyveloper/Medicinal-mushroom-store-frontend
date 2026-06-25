import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { LoginFormData } from '@/schemas/authSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/authSchemas'
import { authService } from '@/services/authService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const LoginPage = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    try {
      const response = await authService.login(data)
      login(response.token)
      navigate('/')
    } catch (error) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="bg-ink fungi-dots flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="fungi-sticker w-full max-w-md bg-white shadow-none ring-0">
        <CardHeader className="items-center text-center">
          <Link to="/" aria-label="MR FUNGi — inicio">
            <img src="/mr-fungi-logo.png" alt="MR FUNGi" className="mx-auto h-20 w-auto" />
          </Link>
          <CardTitle className="font-heading text-2xl font-extrabold tracking-tight">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="off"
                {...register('email')}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isSubmitting}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-magenta font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
