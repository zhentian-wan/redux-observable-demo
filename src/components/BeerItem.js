import React from 'react'
import PropTypes from 'prop-types'

export default function BeerItem({ beer }) {
  return (
    <li className="List-item" data-testid="beerItem">
      <figure className="List-item-img">
        <img src={beer.image_url} alt={beer.name} />
      </figure>
      <div className="List-item-info">
        <p>{beer.name}</p>
        <ul>
          <li>
            <small>ABV: {beer.abv}</small>
          </li>
          <li>
            <small>
              Volume: {beer.volume.unit} {beer.volume.unit}
            </small>
          </li>
        </ul>
      </div>
    </li>
  )
}
BeerItem.propTypes = {
  beer: PropTypes.object.isRequired,
}
