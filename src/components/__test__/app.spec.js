import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import { submitForm as mockSubmitForm } from '../extra/api'
import App from '../extra/app'
// import '@testing-library/jest-dom/extend-expect'

jest.mock('../extra/api')

afterEach(() => {
  jest.clearAllMocks()
})

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true })
  const testData = { food: 'test food', drink: 'test drink' }
  const { getByLabelText, getByText, findByText } = render(<App />)

  // use regex
  fireEvent.click(getByText(/fill.*form/i))

  // pass the data
  fireEvent.change(getByLabelText(/food/i), {
    target: { value: testData.food },
  })
  fireEvent.click(getByText(/next/i))

  fireEvent.change(getByLabelText(/drink/i), {
    target: { value: testData.drink },
  })
  fireEvent.click(getByText(/review/i))

  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  // solve multi confirm text, add selector
  fireEvent.click(getByText(/confirm/i, { selector: 'button' }))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  // findBy*, using await
  fireEvent.click(await findByText(/home/i))

  expect(getByText(/welcome home/i)).toBeInTheDocument()
})

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true })
  const testData = { food: 'test food', drink: 'test drink' }
  const { findByLabelText, findByText } = render(<App />)

  fireEvent.click(await findByText(/fill.*form/i))

  fireEvent.change(await findByLabelText(/food/i), {
    target: { value: testData.food },
  })
  fireEvent.click(await findByText(/next/i))

  fireEvent.change(await findByLabelText(/drink/i), {
    target: { value: testData.drink },
  })
  fireEvent.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(await findByText(/confirm/i, { selector: 'button' }))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({ success: true })
  const testData = { food: 'test food', drink: 'test drink' }
  const { findByLabelText, findByText } = render(<App />)

  user.click(await findByText(/fill.*form/i))

  user.type(await findByLabelText(/food/i), testData.food)
  user.click(await findByText(/next/i))

  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(await findByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(await findByText(/confirm/i, { selector: 'button' }))

  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  user.click(await findByText(/home/i))

  expect(await findByText(/welcome home/i)).toBeInTheDocument()
})
