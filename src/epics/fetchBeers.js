import {
  filter,
  map,
  switchMap,
  debounceTime,
  catchError,
  mapTo,
  withLatestFrom,
  pluck,
  distinctUntilChanged,
} from 'rxjs/operators'
import {
  fetchFulfilled,
  setStatus,
  SEARCH,
  fetchFailed,
  CANCEL,
  reset,
  RANDOM,
} from '../actions/beerActions'
import { ofType } from 'redux-observable'
import { of, concat, merge, fromEvent, race, forkJoin } from 'rxjs'

const buildAPI = (apiBase, perPage, searchContent) =>
  `${apiBase}?beer_name=${encodeURIComponent(
    searchContent,
  )}&per_page=${perPage}`

const randomApi = (apiBase) => `${apiBase}/random`

export function randomFetchEpic(action$, state$, { getJSON }) {
  return action$.pipe(
    ofType(RANDOM),
    debounceTime(500),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([_, config]) => {
      const requests = [...new Array(config.perPage)].fill(1).map(() => {
        return getJSON(randomApi(config.apiBase)).pipe(pluck(0))
      })

      const ajax$ = forkJoin(requests).pipe(
        map((resp) => fetchFulfilled(resp)),
        catchError((err) => {
          return of(fetchFailed(err.response.message))
        }),
      )

      const blockers$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, 'keyup').pipe(
          filter((e) => e.key === 'Escape' || e.key === 'Esc'),
        ),
      ).pipe(mapTo(reset()))

      return concat(of(setStatus('pending')), race(ajax$, blockers$))
    }),
  )
}

// getJSON is passing from the dependeniences
export function fetchBeersEpic(action$, state$, { getJSON }) {
  return action$.pipe(
    ofType(SEARCH),
    // avoid too many request to server
    debounceTime(500),
    // Filter out empty search
    filter(({ payload }) => payload.trim() !== ''),
    // Avoid sending the same request payload to server
    distinctUntilChanged(),
    // Get Config State
    withLatestFrom(state$.pipe(pluck('config'))),
    // Ignore the previous request's response
    switchMap(([{ payload }, config]) => {
      // Network reqest
      // This observable can be cancelled by blockers$
      const ajax$ = getJSON(
        buildAPI(config.apiBase, config.perPage, payload),
      ).pipe(
        // Dispatch fulfilled action
        map((resp) => fetchFulfilled(resp)),
        catchError((err) => {
          // If error, dispatch fail action
          return of(fetchFailed(err.response.message))
        }),
      )

      // Canceller
      // Used to cancel the network request when press "Esc" key
      // Or Cancel button was clicked
      // Or this observable can be cancelled by ajax$
      const blockers$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, 'keyup').pipe(
          filter((e) => e.key === 'Escape' || e.key === 'Esc'),
        ),
      ).pipe(
        // Dispatch reset action
        mapTo(reset()),
      )

      // Dispatch setStatus action
      // and wait ajax$ or blockers$, depends on which is faster
      // Faster one will cancel the slower one
      return concat(of(setStatus('pending')), race(ajax$, blockers$))
    }),
  )
}
