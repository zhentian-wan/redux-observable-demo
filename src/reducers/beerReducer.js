import {
  SET_STATUS,
  FETCH_FULFILLED,
  FETCH_FAILED,
  RESET,
} from '../actions/beerActions'
import lensProp from 'ramda/es/lensProp'
import set from 'ramda/es/set'
import compose from 'ramda/es/compose'

const initialState = {
  data: [],
  status: 'idle', // 'idle' || 'pending' || 'success' || 'failure'
  messages: [],
}

const statusLens = lensProp('status')
const dataLens = lensProp('data')
const messagesLens = lensProp('messages')

const setStatus = set(statusLens)
const setData = set(dataLens)
const setMessages = set(messagesLens)

const fetchFulfilled = (data, state) => {
  return compose(
    setData(data),
    setStatus('success'),
    setMessages([]),
  )(state)
}

const reset = compose(
  setStatus('idle'),
  setMessages([]),
)

const fetchFailed = (messages, state) => {
  return compose(
    setStatus('failure'),
    setMessages([{ type: 'error', text: messages }]),
  )(state)
}

export function beersReducers(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return reset(state)
    }
    case SET_STATUS: {
      return setStatus(action.payload, state)
    }
    case FETCH_FULFILLED: {
      return fetchFulfilled(action.payload, state)
    }
    case FETCH_FAILED: {
      return fetchFailed(action.payload, state)
    }
    default:
      return state
  }
}
