import { Leaf, Truck, FlaskConical, MessageCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const benefits = [
  {
    Icon: Leaf,
    title: '100% Orgánico',
    description: 'Cultivados sin pesticidas ni químicos. Solo procesos naturales que respetan el ecosistema.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    Icon: Truck,
    title: 'Envío a todo Colombia',
    description: 'Recibe tu pedido en 2–5 días hábiles. Empaque seguro y refrigerado para conservar frescura.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    Icon: FlaskConical,
    title: 'Respaldado por ciencia',
    description: 'Beneficios comprobados por estudios científicos. Cada producto con información nutricional completa.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    Icon: MessageCircle,
    title: 'Asesoría personalizada',
    description: 'Te guiamos en el uso de cada producto según tu objetivo de bienestar y estilo de vida.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
]

export default function WhyUsSection() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-brand-beige py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="mb-14 text-center">
            <span className="text-brand-green text-sm font-semibold uppercase tracking-widest">
              Por qué somos diferentes
            </span>
            <h2 className="font-heading text-brand-green-dark mt-3 text-3xl font-bold md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base">
              Nos dedicamos a ofrecerte la mejor experiencia en productos de salud natural.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, description, color, bg }, i) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={`${color}`} size={26} />
                </div>
                <h3 className="text-brand-green-dark mb-2 text-base font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
