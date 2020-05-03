import { propOr } from 'ramda'

export function createResource(asyncFn) {
  let status = 'pending'
  let result
  let promise = asyncFn().then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'failure'
      result = e
    },
  )

  return {
    read() {
      if (status === 'pending') {
        throw promise
      }
      if (status === 'failure') {
        throw result
      }
      if (status === 'success') {
        return result
      }
    },
  }
}

export const createReducer = (reducers, state, { type, payload }) =>
  propOr(() => state, type, reducers)(payload, state)
