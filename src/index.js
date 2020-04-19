import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";

import App from "./Application/App";
import history from "./Application/Services/HistoryService";
import { UILayoutReducer } from "./Application/Redux/Reducers/UILayoutReducer";
import { UILayoutMiddleware } from "./Application/Redux/Middlewares/UILayoutMiddleware";

const rootReducer = combineReducers({
  UILayoutReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(UILayoutMiddleware))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
