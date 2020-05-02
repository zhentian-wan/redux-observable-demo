import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Redirect as MockRedirect } from 'react-router'
import { savePost as mockSavePost } from '../extra/api'
import { Editor } from '../extra/redirect'
import '@testing-library/jest-dom/extend-expect'
import { build, fake, sequence } from 'test-data-bot'

// Mock Router redirect
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../extra/api')

afterEach(() => {
  jest.clearAllMocks()
})

const postBuilder = build('Post').fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence((s) => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const { getByLabelText, getByText } = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await waitFor(() =>
    expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {}),
  )
})

test('should render an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({ data: { error: testError } })
  const fakeUser = userBuilder()
  const { getByText, findByRole } = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
  const postError = await findByRole('alert')
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
