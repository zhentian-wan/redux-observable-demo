import React from 'react'
import { render, within } from '@testing-library/react'
import { Modal } from '../extra/modal'
// import '@testing-library/jest-dom/extend-expect'

test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )

  // get element only in modal-root
  const { getByTestId } = within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})
