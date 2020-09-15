import { ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./Application/App";
import history from "./Application/Services/HistoryService";
import theme from "./Application/Theme/Theme";
import store from "./Application/Redux/Store/Store";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <CssBaseline />
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("app")
);
