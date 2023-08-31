import { useReducer, useState } from "react";
import "./App.css";

const COUNT_ACTIONS = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  INCREASE_BY: "INCREASE_BY",
};

function App() {
  const reducer = (state: any, action: any) => {
    console.log("reducer was called with action ", action);
    const newState = { ...state };
    newState.lastModified = new Date();
    switch (action.type) {
      case COUNT_ACTIONS.INCREASE:
        newState.count = newState.count + 1;
        break;
      case COUNT_ACTIONS.DECREASE:
        newState.count = newState.count - 1;
        break;
      case COUNT_ACTIONS.INCREASE_BY:
        newState.count = newState.count + Number.parseInt(action.payload);
        break;
      default:
        console.log("invalid action");
    }
    return newState;
  };
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    lastModified: new Date(),
  });
  const [inputValue, setInputValue] = useState("0");
  return (
    <div className="App">
      <p>Last Modified: {state.lastModified.toString()}</p>
      <p>Count: {state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: COUNT_ACTIONS.INCREASE });
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          dispatch({ type: COUNT_ACTIONS.DECREASE });
        }}
      >
        decrease
      </button>
      <br />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({ type: COUNT_ACTIONS.INCREASE_BY, payload: inputValue });
        }}
      >
        Increase by
      </button>
    </div>
  );
}

export default App;
