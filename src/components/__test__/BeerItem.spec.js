import React from 'react'
import 'jest-axe/extend-expect'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'

import BeerItem from '../BeerItem'

const mockBeer = {
  name: 'beer mock',
  id: 1,
  image_url: '',
  volume: {
    unit: 1,
  },
  abv: 'abv',
}

test('should have no aria issue', async () => {
  const { container } = render(<BeerItem beer={mockBeer} />)
  expect(await axe(container)).toHaveNoViolations()
})
