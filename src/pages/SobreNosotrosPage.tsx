import { Award, Leaf, Shield } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { useInView } from '@/hooks/useInView'

const values = [
  {
    Icon: Award,
    name: 'Calidad',
    description:
      'Cada lote pasa por controles rigurosos antes de llegar a tus manos. Seleccionamos solo las mejores cepas para garantizar potencia y pureza en cada producto.',
    color: 'text-white',
    bg: 'bg-magenta',
  },
  {
    Icon: Leaf,
    name: 'Sostenibilidad',
    description:
      'Nuestros procesos de cultivo están diseñados para tener el menor impacto posible en el entorno. Sin pesticidas, sin químicos artificiales, sin compromisos con la naturaleza.',
    color: 'text-ink',
    bg: 'bg-mint',
  },
  {
    Icon: Shield,
    name: 'Transparencia',
    description:
      'Te contamos exactamente cómo cultivamos, procesamos y empacamos cada producto. Sin secretos — solo información clara para que tomes las mejores decisiones para tu salud.',
    color: 'text-mint',
    bg: 'bg-ink',
  },
]

export default function SobreNosotrosPage() {
  const { ref: missionRef, inView: missionInView } = useInView()
  const { ref: valuesRef, inView: valuesInView } = useInView()

  return (
    <>
      <PageHeader
        label="Quiénes somos"
        title="Sobre Nosotros"
        subtitle="Una empresa colombiana con un propósito claro: llevar los beneficios de la naturaleza a cada hogar."
      />

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={missionRef}
            className={`grid grid-cols-1 gap-10 transition-all duration-700 ease-out md:grid-cols-2 ${missionInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="fungi-sticker rounded-2xl bg-white p-8">
              <span className="fungi-kicker mb-3 block text-sm text-magenta">
                Misión
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Somos una empresa colombiana dedicada al cultivo y distribución de hongos
                medicinales de alta calidad. Creemos en el poder de la naturaleza respaldado por la
                ciencia, y trabajamos cada día para ofrecerte productos que contribuyan a tu
                bienestar de forma genuina y sostenible.
              </p>
            </div>

            <div className="fungi-sticker rounded-2xl bg-white p-8">
              <span className="fungi-kicker mb-3 block text-sm text-magenta">
                Visión
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Queremos acercar los beneficios de los hongos medicinales a cada hogar colombiano,
                con productos orgánicos, accesibles y de confianza. Ser el referente nacional en
                micología medicinal, construyendo una comunidad informada que tome decisiones de
                salud conscientes y naturales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-beige py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div
            ref={valuesRef}
            className={`transition-all duration-700 ease-out ${valuesInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="mb-12 text-center">
              <span className="fungi-kicker text-sm text-magenta">
                Lo que nos guía
              </span>
              <h2 className="font-heading text-ink mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
                Nuestros Valores
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map(({ Icon, name, description, color, bg }, i) => (
                <div
                  key={name}
                  className="fungi-sticker rounded-2xl bg-white p-8"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink ${bg}`}
                  >
                    <Icon className={color} size={26} />
                  </div>
                  <h3 className="text-ink mb-3 font-heading text-lg font-bold">{name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
