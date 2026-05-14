import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'secondary')
  })

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'ghost')
  })

  it('renders destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'destructive')
  })

  it('renders link variant', () => {
    render(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'link')
  })

  it('renders sm size', () => {
    render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'sm')
  })

  it('renders lg size', () => {
    render(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg')
  })

  it('renders icon size', () => {
    render(<Button size="icon">Icon</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'icon')
  })

  it('renders xs size', () => {
    render(<Button size="xs">XS</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'xs')
  })

  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders with custom className', () => {
    render(<Button className="custom-btn">Styled</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-btn')
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link', { name: 'Link Button' })).toBeInTheDocument()
  })

  it('returns cached result on re-render with unchanged props', () => {
    const { rerender } = render(<Button variant="outline" size="sm">Cached</Button>)
    rerender(<Button variant="outline" size="sm">Cached</Button>)
    expect(screen.getByRole('button', { name: 'Cached' })).toBeInTheDocument()
  })
})
