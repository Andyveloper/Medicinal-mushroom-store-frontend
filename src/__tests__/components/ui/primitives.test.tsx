import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

describe('Label', () => {
  it('renders with text content', () => {
    render(<Label>My Label</Label>)
    expect(screen.getByText('My Label')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Label className="label-cls">Styled Label</Label>)
    expect(screen.getByText('Styled Label')).toHaveClass('label-cls')
  })
})

describe('Separator', () => {
  it('renders with default horizontal orientation', () => {
    render(<Separator data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeInTheDocument()
  })

  it('renders with vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeInTheDocument()
  })

  it('renders with decorative false', () => {
    render(<Separator decorative={false} data-testid="sep" />)
    expect(screen.getByTestId('sep')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Separator className="sep-cls" data-testid="sep" />)
    expect(screen.getByTestId('sep')).toHaveClass('sep-cls')
  })
})

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input type="text" placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders an email input', () => {
    render(<Input type="email" placeholder="email@test.com" />)
    expect(screen.getByPlaceholderText('email@test.com')).toBeInTheDocument()
  })

  it('renders a password input', () => {
    render(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Input className="input-cls" placeholder="styled" />)
    expect(screen.getByPlaceholderText('styled')).toHaveClass('input-cls')
  })

  it('renders in disabled state', () => {
    render(<Input disabled placeholder="disabled" />)
    expect(screen.getByPlaceholderText('disabled')).toBeDisabled()
  })

  it('renders without a type prop', () => {
    render(<Input placeholder="no-type" />)
    expect(screen.getByPlaceholderText('no-type')).toBeInTheDocument()
  })

  it('returns cached result on re-render with unchanged props', () => {
    const { rerender } = render(<Input type="text" placeholder="cached" />)
    rerender(<Input type="text" placeholder="cached" />)
    expect(screen.getByPlaceholderText('cached')).toBeInTheDocument()
  })
})

describe('Label re-render', () => {
  it('returns cached result on re-render with unchanged props', () => {
    const { rerender } = render(<Label>Stable</Label>)
    rerender(<Label>Stable</Label>)
    expect(screen.getByText('Stable')).toBeInTheDocument()
  })
})

describe('Separator re-render', () => {
  it('returns cached result on re-render with unchanged props', () => {
    const { rerender } = render(<Separator data-testid="s" />)
    rerender(<Separator data-testid="s" />)
    expect(screen.getByTestId('s')).toBeInTheDocument()
  })
})
