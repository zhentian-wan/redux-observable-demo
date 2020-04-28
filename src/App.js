import React from 'react'
import './styles.css'
import ErrorBoundary from './error-boundary'
import { connect } from 'react-redux'

const Beers = React.lazy(() => import('./components/Beers'))

function App(prop) {
  return (
    <div className="App">
      <ErrorBoundary fallback={'Sorry, Cannot load application, my bad!'}>
        <React.Suspense
          fallback={<div>Loading Application, please wait...</div>}
        >
          <Beers />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default connect((state) => state.app)(App)
