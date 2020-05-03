import { useState, useEffect, useRef } from 'react'
import { identity, converge } from 'ramda'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useInputSideEffect(dispatch, def = '') {
  const [value, setValue] = useState(def)
  const combinedActions = converge(identity, [dispatch, setValue])

  return [value, combinedActions]
}

export function useFocus() {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return inputRef
}
