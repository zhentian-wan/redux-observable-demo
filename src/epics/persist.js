import { ofType } from 'redux-observable'
import { SET_CONFIG, setConfig } from '../actions/configActions'
import { withLatestFrom, pluck, tap, ignoreElements } from 'rxjs/operators'
import { empty, of } from 'rxjs'

const CACHE_KEY = 'ro-config'

export function persistEpic(action$, state$) {
  return action$.pipe(
    ofType(SET_CONFIG),
    withLatestFrom(state$.pipe(pluck('config'))),
    tap(([_, state]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(state))
    }),
    // no futher action need to be dispatched
    ignoreElements(),
  )
}

// This Epic only run once during the bootstrap
export function hydrateEpic() {
  const maybeConfig = localStorage.getItem(CACHE_KEY)
  if (typeof maybeConfig === 'string') {
    try {
      const parsed = JSON.parse(maybeConfig)
      // dispatch setConfig action
      return of(setConfig(parsed))
    } catch (e) {
      return empty()
    }
  }

  return empty()
}
