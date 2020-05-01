import React from 'react'
import { reportError } from './components/extra/api'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false }
  tryAgain = () => this.setState({ hasError: false })

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
    reportError(error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <>
        <h1 role="alert">Something went wrong.</h1>
        <button onClick={this.tryAgain}>Try again</button>
      </>
    )
  }
}
