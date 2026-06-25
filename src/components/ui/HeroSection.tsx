import { Button } from '@/components/ui/button'
import { useInView } from '@/hooks/useInView'
import { ChevronDown } from 'lucide-react'

const tickerItems = [
  'HONGOS FUNCIONALES',
  'CULTIVADO EN COLOMBIA',
  'MR FUNGi',
  '100% ORGÁNICO',
  'DROP NATURAL',
]

function Ticker() {
  // Two identical tracks so the loop is seamless
  const track = (
    <div className="fungi-marquee__track" aria-hidden="true">
      {tickerItems.concat(tickerItems).map((label, i) => (
        <span key={`${label}-${i}`} className="flex items-center gap-5">
          <span className="fungi-kicker text-sm text-ink">{label}</span>
          <span className="text-mint">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="fungi-marquee border-y-2 border-ink bg-magenta py-2.5">
      {track}
      {track}
    </div>
  )
}

export default function HeroSection() {
  const { ref, inView } = useInView(0.05)

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-ink text-white">
      <div className="relative flex min-h-[78vh] items-center justify-center overflow-hidden">
        {/* Photo background, dimmed into the ink */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url('/hero-mushrooms.webp')` }}
        />
        <div className="fungi-dots absolute inset-0 opacity-70" />
        {/* Neon spotlights bleeding from the logo */}
        <div className="absolute top-1/3 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-magenta/20 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-mint/20 blur-[110px]" />

        {/* Content */}
        <div
          ref={ref}
          className={`relative z-10 mx-auto max-w-4xl px-6 py-20 text-center transition-all duration-700 ease-out ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-1.5 text-sm font-medium text-mint backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Cultivados con amor en Colombia
          </span>

          <img
            src="/mr-fungi-logo.png"
            alt="MR FUNGi"
            className="fungi-neon mx-auto h-44 w-auto md:h-56 lg:h-64"
          />

          <h1 className="sr-only">MR FUNGi — Hongos medicinales de alta calidad</h1>

          <p className="mx-auto mt-6 max-w-2xl font-heading text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
            Hongos medicinales,{' '}
            <span className="fungi-gradient-text fungi-text-glow">sin filtros.</span>
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Cultivados en Colombia con procesos orgánicos y sostenibles. Potencia tu
            bienestar de forma natural.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="fungi-sticker h-12 rounded-full bg-mint px-8 text-base font-bold text-ink hover:bg-mint"
            >
              Ver el catálogo
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToProducts}
          aria-label="Ir a productos"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-mint/60 transition-colors hover:text-mint"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </button>
      </div>

      <Ticker />
    </section>
  )
}
