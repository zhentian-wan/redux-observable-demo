import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { loadGreeting as mockLoadGreeting } from '../extra/api'
import '@testing-library/jest-dom/extend-expect'
import { GreetingLoader } from '../extra/greeting-loader-01-mocking'
// mock all the export from api module
jest.mock('../extra/api')

test('loads greeting on click', async () => {
  const testGreeting = 'TEST_GREETING'
  // Mock the data return
  mockLoadGreeting.mockResolvedValueOnce({ data: { greeting: testGreeting } })
  const { getByLabelText, getByText } = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  // using waitFor until to avoid warning from React
  await waitFor(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})

afterEach(() => {
  jest.clearAllMocks()
})
