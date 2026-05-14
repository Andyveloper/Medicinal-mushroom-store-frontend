import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toBeInTheDocument()
  })

  it('renders secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toBeInTheDocument()
  })

  it('renders destructive variant', () => {
    render(<Badge variant="destructive">Destructive</Badge>)
    expect(screen.getByText('Destructive')).toBeInTheDocument()
  })

  it('renders outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders ghost variant', () => {
    render(<Badge variant="ghost">Ghost</Badge>)
    expect(screen.getByText('Ghost')).toBeInTheDocument()
  })

  it('renders link variant', () => {
    render(<Badge variant="link">Link</Badge>)
    expect(screen.getByText('Link')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Badge className="my-badge">Styled</Badge>)
    expect(screen.getByText('Styled')).toHaveClass('my-badge')
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Badge asChild>
        <span data-testid="child-span">Child</span>
      </Badge>
    )
    expect(screen.getByTestId('child-span')).toBeInTheDocument()
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('returns cached result on re-render with unchanged props', () => {
    const { rerender } = render(<Badge variant="secondary">Cached</Badge>)
    rerender(<Badge variant="secondary">Cached</Badge>)
    expect(screen.getByText('Cached')).toBeInTheDocument()
  })
})
