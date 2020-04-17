import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./General/App";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import history from "./General/Services/HistoryService";
// import { userReducer } from "./Redux/Reducers/UserReducer";

//const store = createStore(userReducer, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Router history={history}>
      <App />
    </Router>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
