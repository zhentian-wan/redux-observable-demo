import React, { Children } from 'react'
import { render, queryByTestId, queryAllByTestId } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Beers from '../Beers'
import { beersReducers } from '../../reducers/beerReducer'
import { configureStore } from '../../configureStore'

function renderReducer(ui, options = {}) {
  const store =
    options.store || createStore(options.reducer, options.initialState)
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    store,
  }
}

test('can render redux with custom initial state', () => {
  const { getByText } = renderReducer(<Beers />, {
    reducer: beersReducers,
    initialState: {
      beers: {
        status: 'pending',
        data: [],
        messages: [],
      },
    },
  })

  expect(getByText(/loading Beers!.../i)).toBeTruthy()
})

test('can render redux with custom initial state', () => {
  const { queryByTestId, queryAllByTestId } = renderReducer(<Beers />, {
    reducer: beersReducers,
    initialState: {
      beers: {
        status: 'success',
        data: [
          {
            id: 1,
            name: 'some beer',
            volume: { unit: 1 },
            abv: '',
          },
        ],
        messages: [],
      },
    },
  })

  expect(queryByTestId('beerList')).toBeTruthy()
  expect(queryAllByTestId('beerItem').length).toEqual(1)
})

test('can render initial status with a hint for search', () => {
  const { getByText, debug } = renderReducer(<Beers />, {
    store: configureStore(),
  })
  expect(getByText(/get started by searching beers/i)).toBeTruthy()
})
