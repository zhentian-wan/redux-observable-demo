import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import { Main } from '../extra/main'
// import '@testing-library/jest-dom/extend-expect'

// normally you'd put this logic in your test utility file so it can be used
// for all of your tests.
function renderRoute(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Router history={history}>{children}</Router>
  }
  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

test('main renders about and home and I can navigate to those pages', () => {
  const { getByRole, getByText } = renderRoute(<Main />)
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
  // you can use the `within` function to get queries for elements within the
  // about screen
})

test('landing on a bad page shows no match component', () => {
  const { getByRole } = renderRoute(<Main />, {
    route: '/something-that-does-not-match',
  })
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
