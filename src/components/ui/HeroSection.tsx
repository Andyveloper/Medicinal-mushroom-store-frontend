import { Button } from '@/components/ui/button'
import { useInView } from '@/hooks/useInView'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const { ref, inView } = useInView(0.05)

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden">
      {/* Photo background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-mushrooms.webp')` }}
      />

      {/* Dark gradient overlay so text stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(160deg, oklch(0.18 0.07 143 / 0.88) 0%, oklch(0.24 0.10 143 / 0.82) 50%, oklch(0.20 0.06 70 / 0.80) 100%)
          `,
        }}
      />

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-4xl px-6 py-24 text-center transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Cultivados con amor en Colombia
        </span>

        <h1 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          Hongos Medicinales{' '}
          <span
            className="block"
            style={{ color: 'oklch(0.82 0.13 82)' }}
          >
            de Alta Calidad
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
          Cultivados en Colombia con procesos orgánicos y sostenibles.
          <br className="hidden sm:block" /> Potencia tu bienestar de forma natural.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={scrollToProducts}
            className="rounded-full px-8 py-3 text-base font-semibold shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'oklch(0.82 0.13 82)',
              color: 'oklch(0.18 0.07 143)',
            }}
          >
            Ver Productos
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToProducts}
        aria-label="Ir a productos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-white/50 transition-colors hover:text-white/80"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </button>
    </section>
  )
}
