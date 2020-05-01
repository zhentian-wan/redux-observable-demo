import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import BeerList from '../BeerList'

jest.mock('./BeerItem', {
  BeerItem: ({ beer }) => {
    return (
      <div data-testid="item" key={beer.id}>
        {beer.name}
      </div>
    )
  },
})

const beers = [{ id: 1, name: 'soemthing' }, { id: 2, name: 'soemthing2' }]

test('should render a list of beers', () => {
  const { queryByText, queryAllByTestId, rerender } = render(
    <BeerList beers={[]} />,
  )
  expect(queryByText(/no beer found!/i)).toBeInTheDocument()

  rerender(<BeerList beers={beers} />)
  const items = queryAllByTestId('item')
  expect(items.length).toEqual(2)
})
