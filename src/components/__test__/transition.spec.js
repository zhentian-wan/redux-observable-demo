import { render, fireEvent } from '@testing-library/react'
import { HiddenMessage } from '../extra/hidden-message'

jest.mock('react-transition-group', {
  CssTransition: (props) => {
    return props.in ? props.children : null
  },
})

test('show hidden message when toggle is clicked', () => {
  const message = 'Hello World'
  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>,
  )
  const button = getByText(/toggle/i)
  expect(queryByText(message)).not.toBeInTheDocument()
  fireEvent.click(button)
  expect(queryByText(message)).toBeInTheDocument()
  fireEvent.click(button)
  expect(queryByText(message)).not.toBeInTheDocument()
})
