import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { converge, identity, compose, objOf, range } from 'ramda'
import { random, search, cancel } from '../actions/beerActions'
import { setConfig } from '../actions/configActions'
import { useSideEffect, useFocus } from '../utils/hooks'

const createOptions = (nums) => {
  return range(1, nums + 1).map((val) => (
    <option key={val} value={val}>
      {val} results
    </option>
  ))
}

function ActionBars({
  config,
  status,
  randomDispatch,
  cancelDispatch,
  searchDispatch,
  setConfigDispatch,
}) {
  const [numOptions, setNumOptions] = useState(config.perPage)
  const [searchTerm, doSearch] = useSideEffect(searchDispatch)
  const changeNumOptions = converge(identity, [
    compose(
      setConfigDispatch,
      objOf('perPage'),
    ),
    setNumOptions,
  ])
  const inputRef = useFocus()

  return (
    <div className="App-inputs">
      <select
        name="pre-page"
        defaultValue={numOptions}
        onChange={(e) => changeNumOptions(Number(e.target.value))}
      >
        {createOptions(10)}
      </select>
      <label htmlFor="searchInput">Search beer</label>
      <input
        id="searchInput"
        type="text"
        placeholder="Search beer"
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => doSearch(e.target.value)}
      />
      <button onClick={randomDispatch}>Random Select</button>
      {status === 'pending' && (
        <>
          <button type="button" onClick={cancelDispatch}>
            Cancel
          </button>
          <span className="App-spinner">
            <img src={'/ajax-loader.gif'} alt="" />
          </span>
        </>
      )}
    </div>
  )
}

ActionBars.propTypes = {
  status: PropTypes.string,
  config: PropTypes.object.isRequired,
  searchDispatch: PropTypes.func.isRequired,
  cancelDispatch: PropTypes.func.isRequired,
  setConfigDispatch: PropTypes.func.isRequired,
  randomDispatch: PropTypes.func.isRequired,
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config,
  }
}

export default connect(
  mapState,
  {
    setConfigDispatch: setConfig,
    randomDispatch: random,
    cancelDispatch: cancel,
    searchDispatch: search,
  },
)(ActionBars)
