import { Star } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const testimonials = [
  {
    name: 'María González',
    city: 'Bogotá',
    text: 'El Reishi cambió completamente mi calidad de sueño. Llevo 3 meses tomándolo y me siento más descansada y con energía. 100% recomendado.',
    rating: 5,
    initial: 'M',
    accent: 'bg-emerald-600',
  },
  {
    name: 'Carlos Rodríguez',
    city: 'Medellín',
    text: 'El Lion\'s Mane me ha ayudado muchísimo con la concentración en el trabajo. La calidad del producto es excelente y el envío llegó muy rápido.',
    rating: 5,
    initial: 'C',
    accent: 'bg-amber-600',
  },
  {
    name: 'Valentina Torres',
    city: 'Cali',
    text: 'Me encanta que sean orgánicos y cultivados en Colombia. La asesoría fue increíble, me orientaron perfectamente sobre qué hongo era mejor para mí.',
    rating: 5,
    initial: 'V',
    accent: 'bg-teal-600',
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20" style={{ background: 'oklch(0.97 0.01 85)' }}>
      <div className="mx-auto max-w-6xl px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="mb-14 text-center">
            <span className="text-brand-green text-sm font-semibold uppercase tracking-widest">
              Nuestros clientes hablan
            </span>
            <h2 className="font-heading text-brand-green-dark mt-3 text-3xl font-bold md:text-4xl">
              Lo que dicen de nosotros
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map(({ name, city, text, rating, initial, accent }, i) => (
              <div
                key={name}
                className="rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  &ldquo;{text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${accent} text-sm font-bold text-white`}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="text-brand-green-dark text-sm font-semibold">{name}</p>
                    <p className="text-muted-foreground text-xs">{city}, Colombia</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
