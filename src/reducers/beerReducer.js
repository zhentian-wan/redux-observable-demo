import {
  SET_STATUS,
  FETCH_FULFILLED,
  FETCH_FAILED,
  RESET,
} from '../actions/beerActions'
import { createReducer } from '../utils/utils'
import { lensProp, set, view, compose, prop } from 'ramda'

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

const reducers = {
  [RESET]: reset,
  [SET_STATUS]: setStatus,
  [FETCH_FULFILLED]: fetchFulfilled,
  [FETCH_FAILED]: fetchFailed,
}

export const beersReducers = (state = initialState, action) =>
  createReducer(reducers, state, action)

export const rootSelector = prop('beers')
export const beersSelector = viewData
export const messagesSelector = viewMessages
export const statusSelector = viewStatus
