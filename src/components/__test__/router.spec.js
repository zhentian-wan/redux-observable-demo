import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
// import '@testing-library/jest-dom/extend-expect'
import { Main } from '../extra/main'

test('main renders about and home page and I can navigate to those page', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { getByRole, getByText } = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({ initialEntries: ['/no-match-router'] })
  const { getByRole } = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
