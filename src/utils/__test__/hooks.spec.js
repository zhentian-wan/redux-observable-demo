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
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})
