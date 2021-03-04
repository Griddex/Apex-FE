import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./Application/App";
import history from "./Application/Services/HistoryService";
import theme from "./Application/Theme/Theme";
import { store, persistor } from "./Application/Redux/Store/Store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import "react-data-griddex/dist/react-data-grid.css";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <CssBaseline />
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
