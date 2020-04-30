import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { loadGreeting as mockLoadGreeting } from '../extra/api'
import { GreetingLoader } from '../extra/greeting-loader-01-mocking'
console.log(jest)
// mock all the export from api module
jest.mock('../api')

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
  // using wait until to avoid warning from React
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
