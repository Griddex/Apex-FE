import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";
import App from "./Application/App";
import { store } from "./Application/Redux/Store/Store";
import theme from "./Application/Theme/Theme";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import history from "./Application/Services/HistoryService";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router
          history={history}
          // getUserConfirmation={(
          //   message: string,
          //   callback: (ok: boolean) => void
          // ) => {
          //   const allowTransition = window.confirm(message);
          //   callback(allowTransition);
          // }}
        >
          <CssBaseline />
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
          {/* </PersistGate> */}
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
