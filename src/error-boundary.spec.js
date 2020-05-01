import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from './error-boundary'
import { reportError as mockReportError } from './components/extra/api'

function Bomb(shouldThrow) {
  if (shouldThrow) {
    throw new Error('Bomb')
  } else {
    return null
  }
}

jest.mock('./components/extra/api')

beforeAll(() => {
  // do log out any error message
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({ success: true })
  const { rerender, getByRole, getByText, queryByText, queryByRole } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  )

  const error = expect.any(Error)
  const errorInfo = { componentStack: expect.stringContaining('Bomb') }
  expect(mockReportError).toHaveBeenCalledWith(error, errorInfo)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(queryByRole('alert')).toBeInTheDocument()
  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    'Something went wrong.',
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={false} />
    </ErrorBoundary>,
  )

  const button = getByText(/try again/i)
  fireEvent.click(button)
  // reset the mock state
  mockReportError.mockClear()
  console.error.mockClear()

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})

test('calls reportError and renders that there was a problem (clean up with wrapper)', () => {
  mockReportError.mockResolvedValueOnce({ success: true })
  const { rerender, getByRole, getByText, queryByText, queryByRole } = render(
    <Bomb />,
    { wrapper: ErrorBoundary },
  )

  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)
  const errorInfo = { componentStack: expect.stringContaining('Bomb') }
  expect(mockReportError).toHaveBeenCalledWith(error, errorInfo)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(queryByRole('alert')).toBeInTheDocument()
  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    'Something went wrong.',
  )

  rerender(<Bomb shouldThrow={false} />)

  const button = getByText(/try again/i)
  fireEvent.click(button)
  // reset the mock state
  mockReportError.mockClear()
  console.error.mockClear()

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})

afterEach(() => {
  jest.clearAllMocks()
})
