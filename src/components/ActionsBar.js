import React, { memo, useState, useCallback } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { converge, identity, compose, objOf, range } from 'ramda'
import { random, search, cancel } from '../actions/beerActions'
import { setConfig } from '../actions/configActions'
import { useInputSideEffect } from '../utils/hooks'

const createOptions = (nums) => {
  return range(1, nums + 1).map((val) => (
    <option key={val} value={val}>
      {val} results
    </option>
  ))
}

export const NumberResultsSelector = memo(({ perPage, onSelectNumChanged }) => {
  const [numOptions, setNumOptions] = useState(perPage)

  const changeNumOptions = converge(identity, [
    compose(onSelectNumChanged, objOf('perPage')),
    setNumOptions,
  ])
  return (
    <select
      name="pre-page"
      defaultValue={numOptions}
      onChange={(e) => changeNumOptions(Number(e.target.value))}
    >
      {createOptions(10)}
    </select>
  )
})
export const RandomSelectButton = memo(({ onRandomSearch }) => {
  return <button onClick={onRandomSearch}>Random Select</button>
})

export const SearchInput = memo(({ onSearch }) => {
  const [searchTerm, doSearch] = useInputSideEffect(onSearch)
  return (
    <input
      id="searchInput"
      type="text"
      placeholder="Search beer"
      value={searchTerm}
      onChange={(e) => doSearch(e.target.value)}
    />
  )
})

export const CancelSearchButtton = memo(({ onCancel }) => {
  return (
    <>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <span className="App-spinner">
        <img src={'/ajax-loader.gif'} alt="" />
      </span>
    </>
  )
})

export default function ActionBars() {
  // state
  const { status } = useSelector((state) => state.beers, shallowEqual)
  const { perPage } = useSelector((state) => state.config, shallowEqual)
  // dispatch
  const dispatch = useDispatch()
  const randomDispatch = useCallback(() => dispatch(random()))
  const setConfigDispatch = useCallback((num) => dispatch(setConfig(num)), [
    dispatch,
  ])
  const searchDispatch = useCallback((val) => dispatch(search(val)))
  const cancelDispatch = useCallback(() => dispatch(cancel()))

  return (
    <div className="App-inputs">
      <NumberResultsSelector
        perPage={perPage}
        onSelectNumChanged={setConfigDispatch}
      />
      <SearchInput onSearch={searchDispatch} />
      <RandomSelectButton onRandomSearch={randomDispatch} />
      {status === 'pending' && (
        <CancelSearchButtton onCancel={cancelDispatch} />
      )}
    </div>
  )
}
