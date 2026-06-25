interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-ink fungi-dots relative overflow-hidden py-20">
      <div className="absolute -top-10 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-magenta/15 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {label && (
          <span className="fungi-kicker text-sm text-mint">
            {label}
          </span>
        )}
        <h1
          className={`font-heading font-extrabold tracking-tight text-white md:text-6xl ${label ? 'mt-3 text-4xl' : 'text-4xl'}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
