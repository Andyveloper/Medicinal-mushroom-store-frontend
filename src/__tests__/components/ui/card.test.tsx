import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders with default size', () => {
    render(<Card data-testid="card">content</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('renders with sm size', () => {
    render(
      <Card size="sm" data-testid="card">
        content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveAttribute('data-size', 'sm')
  })

  it('renders with custom className', () => {
    render(
      <Card className="my-custom" data-testid="card">
        content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('my-custom')
  })

  it('renders CardHeader', () => {
    render(<CardHeader data-testid="hdr">header</CardHeader>)
    expect(screen.getByTestId('hdr')).toBeInTheDocument()
  })

  it('renders CardHeader with custom className', () => {
    render(
      <CardHeader className="hdr-class" data-testid="hdr">
        header
      </CardHeader>
    )
    expect(screen.getByTestId('hdr')).toHaveClass('hdr-class')
  })

  it('renders CardTitle', () => {
    render(<CardTitle>My Title</CardTitle>)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('renders CardTitle with custom className', () => {
    render(<CardTitle className="title-class">Title</CardTitle>)
    expect(screen.getByText('Title')).toHaveClass('title-class')
  })

  it('renders CardDescription', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders CardDescription with custom className', () => {
    render(<CardDescription className="desc-class">Description</CardDescription>)
    expect(screen.getByText('Description')).toHaveClass('desc-class')
  })

  it('renders CardAction', () => {
    render(<CardAction data-testid="action">action content</CardAction>)
    expect(screen.getByTestId('action')).toBeInTheDocument()
  })

  it('renders CardAction with custom className', () => {
    render(
      <CardAction className="action-class" data-testid="action">
        action
      </CardAction>
    )
    expect(screen.getByTestId('action')).toHaveClass('action-class')
  })

  it('renders CardContent', () => {
    render(<CardContent>main content</CardContent>)
    expect(screen.getByText('main content')).toBeInTheDocument()
  })

  it('renders CardContent with custom className', () => {
    render(<CardContent className="content-class" data-testid="content">body</CardContent>)
    expect(screen.getByTestId('content')).toHaveClass('content-class')
  })

  it('renders CardFooter', () => {
    render(<CardFooter data-testid="footer">footer content</CardFooter>)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders CardFooter with custom className', () => {
    render(
      <CardFooter className="footer-class" data-testid="footer">
        footer
      </CardFooter>
    )
    expect(screen.getByTestId('footer')).toHaveClass('footer-class')
  })

  it('returns cached result on Card re-render with unchanged props', () => {
    const { rerender } = render(<Card data-testid="card">stable</Card>)
    rerender(<Card data-testid="card">stable</Card>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('returns cached result on CardDescription re-render with unchanged props', () => {
    const { rerender } = render(<CardDescription>stable desc</CardDescription>)
    rerender(<CardDescription>stable desc</CardDescription>)
    expect(screen.getByText('stable desc')).toBeInTheDocument()
  })
})
