import React from 'react'
import { reportError } from './components/extra/api'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  tryAgain = () => this.setState({ hasError: false })

  static defaultProps = {
    fallback: (
      <>
        <h1>Something went wrong.</h1>
        <button onClick={this.tryAgain}>Try again</button>
      </>
    ),
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    reportError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
