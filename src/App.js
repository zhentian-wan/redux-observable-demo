import React from 'react'
import './styles.css'

import { connect } from 'react-redux'

import Beers from './components/Beers'

function App(prop) {
  return (
    <div className="App">
      <Beers />
    </div>
  )
}

export default connect((state) => state.app)(App)
