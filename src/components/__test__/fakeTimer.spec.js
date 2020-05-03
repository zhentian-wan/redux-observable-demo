import React from 'react'
import { render, act } from '@testing-library/react'
import { Countdown } from '../extra/countdown'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  jest.useFakeTimers() // similar to fakeAsync
  const { unmount } = render(<Countdown />)
  unmount()
  // act is similar to Angualr flush
  act(() => jest.runOnlyPendingTimers())
  expect(console.error).not.toHaveBeenCalled()
})
