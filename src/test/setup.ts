import '@testing-library/jest-dom'

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(cb: IntersectionObserverCallback) {
    void cb
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
