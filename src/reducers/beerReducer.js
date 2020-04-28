import {
  SET_STATUS,
  FETCH_FULFILLED,
  FETCH_FAILED,
  RESET,
} from '../actions/beerActions'

const initialState = {
  data: [],
  status: 'idle', // 'idle' || 'pending' || 'success' || 'failure'
}

export function beersReducers(state = initialState, action) {
  switch (action.type) {
    case RESET: {
      return {
        ...state,
        status: 'idle',
        messages: [],
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }
    case FETCH_FULFILLED: {
      return {
        ...state,
        status: 'success',
        data: action.payload,
        messages: [],
      }
    }
    case FETCH_FAILED: {
      return {
        ...state,
        status: 'failure',
        messages: [{ type: 'error', text: action.payload }],
      }
    }
    default:
      return state
  }
}
