import React from 'react'
import PropTypes from 'prop-types'

import BeerItem from './BeerItem'

export default function BeerList({ beers = [] }) {
  return (
    <ul className="List" data-testid="beerList">
      {beers.length === 0 ? (
        <div>No beer found!</div>
      ) : (
        beers.map((beer) => (
          <BeerItem data-testid="beerItem" key={beer.id} beer={beer} />
        ))
      )}
    </ul>
  )
}
BeerList.propTypes = {
  beers: PropTypes.array.isRequired,
}
