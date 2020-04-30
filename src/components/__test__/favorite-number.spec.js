import React from 'react'
// extend expect object to have methods from jest-dom
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import { FavoriteNumber } from '../extra/favorite-number'

test('renders a text input with placeholder Search beer', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  debug(input)
  debug()
  expect(input).toHaveAttribute('type', 'number')
})

test('debug show case', () => {
  const { getByLabelText, debug } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  //debug(input)
  //debug()
  expect(input).toHaveAttribute('type', 'number')
})

test('v1: entering an invalid value shows an error message', () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  // fire a change event
  fireEvent.change(input, { target: { value: 10 } })
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})

test('v2: entering an invalid value shows an error message', () => {
  const { getByLabelText, getByRole } = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  // simulate a user type on input
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})

test('rerender the component when the prop changes', () => {
  const { getByLabelText, getByRole, queryByRole, rerender } = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  // rerender with a different prop
  rerender(<FavoriteNumber max={10} />)
  expect(queryByRole('alert')).not.toBeInTheDocument()
})
