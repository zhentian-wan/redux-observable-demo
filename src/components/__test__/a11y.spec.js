import React from 'react'

import 'jest-axe/extend-expect'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'

function Form() {
  return (
    <Form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="email" />
    </Form>
  )
}

test('the form is accessible', async () => {
  const { container } = render(<Form />)
  const result = await axe(container)
  expect(result).toHaveNoViolations()
})
