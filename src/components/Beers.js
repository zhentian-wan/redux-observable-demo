import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import BeerList from './BeerList'

export default function Beers() {
  const { data, status = 'idle', messages } = useSelector(
    (state) => state.beers,
    shallowEqual,
  )

  return (
    <>
      {status === 'idle' && (
        <div className="App-content">
          <p>Get started by searching beers or get random ones</p>
        </div>
      )}
      {status === 'pending' && (
        <div className="App-content">
          <p>Loading Beers!...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="App-content">
          <BeerList beers={data} />
        </div>
      )}
      {status === 'failure' && (
        <div className="App-messages">
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  )
}
