import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./Application/App";
import { store } from "./Application/Redux/Store/Store";
import theme from "./Application/Theme/Theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router
        getUserConfirmation={(
          message: string,
          callback: (ok: boolean) => void
        ) => {
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
      >
        <CssBaseline />
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
