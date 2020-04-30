import React from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  )
}
