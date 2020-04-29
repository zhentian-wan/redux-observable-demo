import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BeerList from './BeerList'

function Beers({ data, messages, status }) {
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

Beers.propTypes = {
  data: PropTypes.array.isRequired,
  messages: PropTypes.array,
  status: PropTypes.string,
}

export default connect((state) => state.beers)(Beers)
