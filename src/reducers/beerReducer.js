import {
  SET_STATUS,
  FETCH_FULFILLED,
  FETCH_FAILED,
  RESET,
} from '../actions/beerActions'
import lensProp from 'ramda/es/lensProp'
import set from 'ramda/es/set'
import view from 'ramda/es/view'
import compose from 'ramda/es/compose'
import prop from 'ramda/es/prop'
import propOr from 'ramda/es/propOr'

const initialState = {
  data: [],
  status: 'idle', // 'idle' || 'pending' || 'success' || 'failure'
  messages: [],
}

const rootLens = lensProp('beers')
const statusLens = lensProp('status')
const dataLens = lensProp('data')
const messagesLens = lensProp('messages')

const setStatus = set(statusLens)
const setData = set(dataLens)
const setMessages = set(messagesLens)

const viewRoot = (lens) => view(compose(rootLens, lens))
const viewStatus = viewRoot(statusLens)
const viewData = viewRoot(dataLens)
const viewMessages = viewRoot(messagesLens)

const fetchFulfilled = (data, state) => {
  return compose(setData(data), setStatus('success'), setMessages([]))(state)
}

const reset = (_, state) => compose(setStatus('idle'), setMessages([]))(state)

const fetchFailed = (messages, state) => {
  return compose(
    setStatus('failure'),
    setMessages([{ type: 'error', text: messages }]),
  )(state)
}

const actions = {
  [RESET]: reset,
  [SET_STATUS]: setStatus,
  [FETCH_FULFILLED]: fetchFulfilled,
  [FETCH_FAILED]: fetchFailed,
}

export const beersReducers = (state = initialState, { type, payload }) =>
  propOr(() => state, type, actions)(payload, state)
/*
export const beersReducers = (state = initialState, action) => {
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
*/
export const rootSelector = prop('beers')
export const beersSelector = viewData
export const messagesSelector = viewMessages
export const statusSelector = viewStatus
