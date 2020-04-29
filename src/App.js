import React from 'react'
import { connect } from 'react-redux'

import ErrorBoundary from './error-boundary'
import ActionsBar from './components/ActionsBar'

import './styles.css'

const Beers = React.lazy(() => import('./components/Beers'))

function App() {
  return (
    <div className="App">
      <ActionsBar />
      <ErrorBoundary>
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
