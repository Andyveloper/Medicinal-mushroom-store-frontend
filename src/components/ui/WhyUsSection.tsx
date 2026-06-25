import { Leaf, Truck, FlaskConical, MessageCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const benefits = [
  {
    Icon: Leaf,
    title: '100% Orgánico',
    description:
      'Cultivados sin pesticidas ni químicos. Solo procesos naturales que respetan el ecosistema.',
    color: 'text-ink',
    bg: 'bg-mint',
  },
  {
    Icon: Truck,
    title: 'Envío a todo Colombia',
    description:
      'Recibe tu pedido en 2–5 días hábiles. Empaque seguro y refrigerado para conservar frescura.',
    color: 'text-white',
    bg: 'bg-magenta',
  },
  {
    Icon: FlaskConical,
    title: 'Respaldado por ciencia',
    description:
      'Beneficios comprobados por estudios científicos. Cada producto con información nutricional completa.',
    color: 'text-mint',
    bg: 'bg-ink',
  },
  {
    Icon: MessageCircle,
    title: 'Asesoría personalizada',
    description:
      'Te guiamos en el uso de cada producto según tu objetivo de bienestar y estilo de vida.',
    color: 'text-ink',
    bg: 'bg-mint',
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
            <span className="fungi-kicker text-magenta text-sm">Por qué somos diferentes</span>
            <h2 className="font-heading text-ink mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base">
              Nos dedicamos a ofrecerte la mejor experiencia en productos de salud natural.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, description, color, bg }, i) => (
              <div
                key={title}
                className="fungi-sticker rounded-2xl bg-white p-6 text-center"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className={`border-ink mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border-2 ${bg}`}
                >
                  <Icon className={`${color}`} size={26} />
                </div>
                <h3 className="text-ink font-heading mb-2 text-lg font-bold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
