interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(to bottom, oklch(0.95 0.02 85), oklch(1 0 0))' }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        {label && (
          <span className="text-brand-green text-sm font-semibold uppercase tracking-widest">
            {label}
          </span>
        )}
        <h1
          className={`font-heading text-brand-green-dark font-bold md:text-5xl ${label ? 'mt-3 text-4xl' : 'text-4xl'}`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
