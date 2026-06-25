import { useState } from 'react'
import { ChevronDown, Package, RotateCcw } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { useInView } from '@/hooks/useInView'

const shippingZones = [
  { zone: 'Bogotá D.C.', time: '1–2 días hábiles', cost: 'Gratis en pedidos > $80.000' },
  { zone: 'Ciudades principales (Medellín, Cali, Barranquilla)', time: '2–3 días hábiles', cost: '$8.000 COP' },
  { zone: 'Otras ciudades capitales', time: '3–4 días hábiles', cost: '$10.000 COP' },
  { zone: 'Municipios y zonas rurales', time: '4–7 días hábiles', cost: '$15.000 – $25.000 COP' },
]

const faqItems = [
  {
    question: '¿Cuánto demora mi pedido en llegar?',
    answer:
      'El tiempo de entrega depende de tu ubicación. Para Bogotá es de 1 a 2 días hábiles; para otras ciudades capitales, entre 2 y 4 días hábiles; para municipios y zonas rurales, hasta 7 días hábiles. El contador empieza desde que confirmas el pago exitosamente.',
  },
  {
    question: '¿Puedo cambiar mi dirección de envío después de hacer el pedido?',
    answer:
      'Puedes cambiar la dirección siempre que el pedido no haya sido despachado. Escríbenos a hola@setasmedicinales.co con tu número de orden dentro de las primeras 2 horas de realizado el pedido y lo gestionamos sin costo adicional.',
  },
  {
    question: '¿Qué pasa si mi pedido llega dañado?',
    answer:
      'Si tu pedido llega en mal estado, toma fotos del empaque y el producto al momento de recibirlo y escríbenos dentro de las 24 horas siguientes. Gestionamos el reenvío o reembolso sin costo para ti. Tu satisfacción es nuestra prioridad.',
  },
  {
    question: '¿Hacen envíos internacionales?',
    answer:
      'Por ahora solo realizamos envíos dentro del territorio colombiano. Estamos trabajando para expandir nuestro servicio a otros países próximamente. Si tienes una necesidad especial, contáctanos y veremos cómo podemos ayudarte.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="text-brand-green-dark hover:text-brand-green flex w-full items-center justify-between gap-4 py-5 text-left font-medium transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}
      >
        <p className="text-muted-foreground text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function EnviosDevolucionesPage() {
  const { ref: shippingRef, inView: shippingInView } = useInView()
  const { ref: returnsRef, inView: returnsInView } = useInView()
  const { ref: faqRef, inView: faqInView } = useInView()

  return (
    <>
      <PageHeader
        label="Información de compra"
        title="Envíos y Devoluciones"
        subtitle="Todo lo que necesitas saber sobre los tiempos de entrega, costos y nuestra política de devoluciones."
      />

      {/* Shipping section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={shippingRef}
            className={`transition-all duration-700 ease-out ${shippingInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-magenta flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink">
                <Package className="text-white" size={20} />
              </div>
              <h2 className="font-heading text-ink text-2xl font-extrabold tracking-tight">
                Política de Envíos
              </h2>
            </div>

            <div className="text-muted-foreground mb-8 space-y-3 text-sm leading-relaxed">
              <p>
                Despachamos todos los pedidos desde Bogotá, Colombia, a través de operadores logísticos
                certificados. Empacamos cada producto de forma segura para garantizar que llegue en
                perfectas condiciones.
              </p>
              <p>
                Los pedidos realizados antes de las <strong className="text-foreground">2:00 p.m.</strong>{' '}
                en días hábiles son procesados el mismo día. Los pedidos realizados después de ese
                horario o en fines de semana se procesan el siguiente día hábil.
              </p>
            </div>

            {/* Zones table */}
            <div className="fungi-sticker overflow-hidden rounded-2xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink">
                    <th className="fungi-kicker px-5 py-3 text-left text-xs text-mint">
                      Zona de entrega
                    </th>
                    <th className="fungi-kicker px-5 py-3 text-left text-xs text-mint">
                      Tiempo estimado
                    </th>
                    <th className="fungi-kicker px-5 py-3 text-left text-xs text-mint">
                      Costo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map(({ zone, time, cost }, i) => (
                    <tr
                      key={zone}
                      className={`border-t ${i % 2 === 1 ? 'bg-white' : 'bg-gray-50/50'}`}
                    >
                      <td className="text-foreground px-5 py-3.5 font-medium">{zone}</td>
                      <td className="text-muted-foreground px-5 py-3.5">{time}</td>
                      <td className="text-muted-foreground px-5 py-3.5">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mt-4 text-xs">
              * Los tiempos son estimados y pueden variar por condiciones externas (clima, días
              festivos, etc.). Recibirás un código de rastreo por correo una vez despachado tu pedido.
            </p>
          </div>
        </div>
      </section>

      {/* Returns section */}
      <section className="bg-brand-beige py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={returnsRef}
            className={`transition-all duration-700 ease-out ${returnsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-mint">
                <RotateCcw className="text-ink" size={20} />
              </div>
              <h2 className="font-heading text-ink text-2xl font-extrabold tracking-tight">
                Política de Devoluciones
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="fungi-sticker rounded-2xl bg-white p-6">
                <h3 className="text-ink mb-3 font-heading font-bold">¿Cuándo aplica?</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-mint-deep mt-0.5 font-bold">✓</span>
                    Producto en mal estado o defectuoso al recibirlo
                  </li>
                  <li className="flex gap-2">
                    <span className="text-mint-deep mt-0.5 font-bold">✓</span>
                    Producto diferente al que ordenaste
                  </li>
                  <li className="flex gap-2">
                    <span className="text-mint-deep mt-0.5 font-bold">✓</span>
                    Pedido incompleto o con unidades faltantes
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    Producto abierto o sin su empaque original
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    Solicitudes realizadas después de 15 días hábiles
                  </li>
                </ul>
              </div>

              <div className="fungi-sticker rounded-2xl bg-white p-6">
                <h3 className="text-ink mb-3 font-heading font-bold">¿Cómo hacerlo?</h3>
                <ol className="text-muted-foreground space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="bg-magenta text-white flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink text-xs font-bold leading-none">
                      1
                    </span>
                    <span>
                      Escribe a{' '}
                      <strong className="text-foreground break-all">hola@setasmedicinales.co</strong>{' '}
                      con tu número de orden y fotos del producto.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-magenta text-white flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink text-xs font-bold leading-none">
                      2
                    </span>
                    <span>Nuestro equipo valida la solicitud en un plazo de 1–2 días hábiles.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-magenta text-white flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink text-xs font-bold leading-none">
                      3
                    </span>
                    <span>
                      Te enviamos el producto de reemplazo o hacemos el reembolso en 3–5 días
                      hábiles.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div
            ref={faqRef}
            className={`transition-all duration-700 ease-out ${faqInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-10 text-center">
              <span className="fungi-kicker text-sm text-magenta">
                Preguntas frecuentes
              </span>
              <h2 className="font-heading text-ink mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                ¿Tienes dudas?
              </h2>
            </div>

            <div className="fungi-sticker rounded-2xl bg-white px-6">
              {faqItems.map(({ question, answer }) => (
                <FaqItem key={question} question={question} answer={answer} />
              ))}
            </div>

            <p className="text-muted-foreground mt-8 text-center text-sm">
              ¿No encontraste tu respuesta?{' '}
              <a
                href="mailto:hola@setasmedicinales.co"
                className="text-magenta font-semibold underline-offset-4 hover:underline"
              >
                Escríbenos directamente
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
