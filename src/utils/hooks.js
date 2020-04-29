import { useState, useEffect, useRef } from 'react'
import identity from 'ramda/es/identity'
import converge from 'ramda/es/converge'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useSideEffect(dispatch, def = '') {
  const [value, setValue] = useState(def)
  const doSearch = converge(identity, [dispatch, setValue])

  return [value, doSearch]
}

export function useFocus() {
  const inputRef = useRef()
  /*useEffect(() => {
    inputRef.current.focus()
  }, [])*/
  return inputRef
}
