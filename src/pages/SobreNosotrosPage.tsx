import { Award, Leaf, Shield } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import { useInView } from '@/hooks/useInView'

const values = [
  {
    Icon: Award,
    name: 'Calidad',
    description:
      'Cada lote pasa por controles rigurosos antes de llegar a tus manos. Seleccionamos solo las mejores cepas para garantizar potencia y pureza en cada producto.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    Icon: Leaf,
    name: 'Sostenibilidad',
    description:
      'Nuestros procesos de cultivo están diseñados para tener el menor impacto posible en el entorno. Sin pesticidas, sin químicos artificiales, sin compromisos con la naturaleza.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    Icon: Shield,
    name: 'Transparencia',
    description:
      'Te contamos exactamente cómo cultivamos, procesamos y empacamos cada producto. Sin secretos — solo información clara para que tomes las mejores decisiones para tu salud.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
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
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <span className="text-brand-green mb-3 block text-sm font-semibold uppercase tracking-widest">
                Misión
              </span>
              <p className="text-muted-foreground leading-relaxed">
                Somos una empresa colombiana dedicada al cultivo y distribución de hongos medicinales
                de alta calidad. Creemos en el poder de la naturaleza respaldado por la ciencia, y
                trabajamos cada día para ofrecerte productos que contribuyan a tu bienestar de forma
                genuina y sostenible.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <span className="text-brand-green mb-3 block text-sm font-semibold uppercase tracking-widest">
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
              <span className="text-brand-green text-sm font-semibold uppercase tracking-widest">
                Lo que nos guía
              </span>
              <h2 className="font-heading text-brand-green-dark mt-3 text-3xl font-bold">
                Nuestros Valores
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map(({ Icon, name, description, color, bg }, i) => (
                <div
                  key={name}
                  className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ${bg}`}
                  >
                    <Icon className={color} size={26} />
                  </div>
                  <h3 className="text-brand-green-dark mb-3 text-lg font-semibold">{name}</h3>
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
