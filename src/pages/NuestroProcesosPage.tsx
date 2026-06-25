import { Microscope, Thermometer, Sun, Package } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { useInView } from '@/hooks/useInView'

const steps = [
  {
    Icon: Microscope,
    title: 'Selección de Cepas',
    description:
      'Trabajamos con cepas certificadas de alta pureza, seleccionadas por su perfil de beneficios comprobados científicamente. Cada cepa es evaluada en laboratorio para verificar su identidad genética y concentración de compuestos activos antes de ingresar a producción.',
    color: 'text-white',
    bg: 'bg-magenta',
  },
  {
    Icon: Thermometer,
    title: 'Cultivo Controlado',
    description:
      'Nuestras instalaciones mantienen condiciones ideales de temperatura, humedad, ventilación y luz para cada especie. Monitoreamos cada variable en tiempo real para garantizar que los hongos alcancen su máximo potencial nutricional y medicinal.',
    color: 'text-ink',
    bg: 'bg-mint',
  },
  {
    Icon: Sun,
    title: 'Cosecha y Secado',
    description:
      'Recolectamos cada hongo en el punto exacto de madurez, donde la concentración de polisacáridos y beta-glucanos es más alta. El secado se realiza a temperatura controlada para preservar todos sus principios activos sin degradación.',
    color: 'text-mint',
    bg: 'bg-ink',
  },
  {
    Icon: Package,
    title: 'Empaque y Envío',
    description:
      'Sellado hermético al vacío que preserva las propiedades hasta 24 meses sin conservantes artificiales. Despachamos con embalaje reforzado y seguimiento en línea para que tu pedido llegue en perfecto estado a cualquier punto de Colombia.',
    color: 'text-white',
    bg: 'bg-magenta',
  },
]

export default function NuestroProcesosPage() {
  const { ref, inView } = useInView()

  return (
    <>
      <PageHeader
        label="Cómo lo hacemos"
        title="Nuestro Proceso"
        subtitle="Del sustrato a tu hogar — cada etapa diseñada para preservar la máxima calidad y potencia de cada hongo."
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div
            ref={ref}
            className={`relative transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            {/* Vertical connecting line */}
            <div
              className="absolute top-6 bottom-6 left-6 w-0.5 md:left-7"
              style={{ background: 'rgba(11, 11, 15, 0.18)' }}
            />

            <div className="space-y-12">
              {steps.map(({ Icon, title, description, color, bg }, i) => (
                <div key={title} className="relative flex gap-6 md:gap-8">
                  {/* Circle with icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink ${bg} md:h-14 md:w-14`}
                    >
                      <Icon className={color} size={22} />
                    </div>
                    {/* Step number badge */}
                    <span className="text-ink absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-white text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pb-2 pt-1">
                    <h3 className="text-ink mb-2 font-heading text-lg font-bold">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(110deg, var(--color-magenta), var(--color-mint-deep))' }}
      >
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-heading mb-4 text-3xl font-extrabold tracking-tight text-white">
            Calidad que puedes ver y sentir
          </h2>
          <p className="text-white/75">
            Cada producto es el resultado de semanas de cuidado y atención. Pruébalo y nota la
            diferencia.
          </p>
        </div>
      </section>
    </>
  )
}
