import React from "react";
import { connect } from "react-redux";

import { search, cancel, random } from "../actions/beerActions";
import BeerList from "./BeerList";
import { setConfig } from "../actions/configActions";

function Beers(props) {
  const {
    data,
    messages,
    status,
    search,
    cancel,
    config,
    setConfig,
    random
  } = props;

  return (
    <>
      <div className="App-inputs">
        <select
          name="pre-page"
          defaultValue={config.perPage}
          onChange={e => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Search beer"
          onChange={evt => search(evt.target.value)}
        />
        <button onClick={random}>Random</button>
        {status === "pending" && (
          <>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <span className="App-spinner">
              <img src={"/ajax-loader.gif"} alt="" />
            </span>
          </>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeerList beers={data} />
        </div>
      )}
      {status === "failure" && (
        <div className="App-messages">
          <p>Oops! {messages[0].text}</p>
        </div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config
  };
}

export default connect(
  mapState,
  { search, cancel, setConfig, random }
)(Beers);
