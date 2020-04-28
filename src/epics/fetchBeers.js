import {
  filter,
  map,
  switchMap,
  debounceTime,
  catchError,
  takeWhile,
  mapTo,
  withLatestFrom,
  pluck,
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

const random = (apiBase) => `${apiBase}/random`

export function randomFetchEpic(action$, state$, { getJSON }) {
  return action$.pipe(
    ofType(RANDOM),
    debounceTime(500),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([_, config]) => {
      const requests = [...new Array(config.perPage)].fill(1).map(() => {
        return getJSON(random(config.apiBase)).pipe(pluck(0))
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

export function fetchBeersEpic(action$, state$, { getJSON }) {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    takeWhile(({ payload }) => payload.trim() !== ''),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([{ payload }, config]) => {
      const ajax$ = getJSON(
        buildAPI(config.apiBase, config.perPage, payload),
      ).pipe(
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
