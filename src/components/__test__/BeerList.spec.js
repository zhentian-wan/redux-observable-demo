import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import BeerList from '../BeerList'

const beers = [
  { id: 1, name: 'soemthing', volume: { unit: 1 }, abv: '' },
  { id: 2, name: 'soemthing2', volume: { unit: 1 }, abv: '' },
]

test('should render a list of beers', () => {
  const { queryByText, getAllByTestId, rerender } = render(
    <BeerList beers={[]} />,
  )
  expect(queryByText(/no beer found!/i)).toBeInTheDocument()

  rerender(<BeerList beers={beers} />)
  const items = getAllByTestId('beerItem')
  expect(items.length).toEqual(2)
})
