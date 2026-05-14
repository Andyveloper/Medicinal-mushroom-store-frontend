import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'

describe('Dialog', () => {
  it('renders dialog content when open', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })

  it('shows the close button by default', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>With Close</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('hides the close button when showCloseButton is false', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>No Close Button</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders DialogDescription', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Helpful description text</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Helpful description text')).toBeInTheDocument()
  })

  it('renders DialogDescription with custom className', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>T</DialogTitle>
          <DialogDescription className="desc-cls" data-testid="desc">
            Description
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('desc')).toHaveClass('desc-cls')
  })

  it('renders DialogFooter without close button by default', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Footer Test</DialogTitle>
          <DialogFooter data-testid="footer">
            <span>Footer content</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('renders a Close button inside DialogFooter when showCloseButton is true', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Footer Close</DialogTitle>
          <DialogFooter showCloseButton>
            <span>Footer</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('renders DialogHeader with custom className', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogHeader className="hdr-class" data-testid="hdr">
            <DialogTitle>Header</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('hdr')).toHaveClass('hdr-class')
  })

  it('renders DialogFooter with custom className', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>T</DialogTitle>
          <DialogFooter className="ftr-class" data-testid="ftr">
            <span>footer</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByTestId('ftr')).toHaveClass('ftr-class')
  })

  it('renders DialogTrigger to open dialog on click', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Triggered Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('renders DialogClose inside open dialog', () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>With Close</DialogTitle>
          <DialogClose asChild>
            <button>Custom Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole('button', { name: 'Custom Close' })).toBeInTheDocument()
  })
})
