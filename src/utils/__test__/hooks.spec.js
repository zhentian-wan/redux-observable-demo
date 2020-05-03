import React from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useFocus } from '../hooks'
import { useCounter } from '../../components/extra/use-counter'

test('should expose input ref and auto focus on input dom', () => {
  let inputRef
  function InputComponent() {
    inputRef = useFocus()
    return <input ref={inputRef} data-testid="testInput" />
  }
  const { getByTestId } = render(<InputComponent />)
  expect(getByTestId('testInput')).toHaveFocus()
})

test('exposes the count and increment/decrement functions', () => {
  const result = {}
  function TestComponent(options) {
    result.current = useCounter(options)
    return null
  }
  const { rerender } = render(<TestComponent />)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  rerender(<TestComponent step={2} />)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(-1)
})
