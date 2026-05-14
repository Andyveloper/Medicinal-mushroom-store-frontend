import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { paymentService } from '@/services/paymentService'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message || 'Error al procesar el pago')
      setLoading(false)
    } else {
      navigate('/orders')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading || !stripe}>
        {loading ? 'Procesando pago...' : 'Pagar ahora'}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    paymentService
      .createPayment(Number(orderId))
      .then((data) => setClientSecret(data.clientSecret))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Preparando pago...</p>
      </div>
    )

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Completar Pago</CardTitle>
        </CardHeader>
        <CardContent>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
