export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_FULFILLED = 'FETCH_FULFILLED'
export const FETCH_FAILED = 'FETCH_FAILED'
export const SET_STATUS = 'SET_STATUS'
export const SEARCH = 'SEARCH'
export const CANCEL = 'CANCEL'
export const RESET = 'RESET'
export const RANDOM = 'RANDOM'
export function random() {
  return {
    type: RANDOM,
  }
}
export function reset() {
  return {
    type: RESET,
  }
}
export function cancel() {
  return {
    type: CANCEL,
  }
}
export function fetchData() {
  return {
    type: FETCH_DATA,
  }
}
export function fetchFulfilled(beers) {
  return {
    type: FETCH_FULFILLED,
    payload: beers,
  }
}
export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message,
  }
}
export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status,
  }
}
export function search(searchContent) {
  return {
    type: SEARCH,
    payload: searchContent,
  }
}
