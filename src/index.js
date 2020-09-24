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
import Button from "@material-ui/core/Button";

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <SnackbarProvider
    maxSnack={3}
    ref={notistackRef}
    action={(key) => (
      <Button
        style={{ border: "2px solid black" }}
        onClick={onClickDismiss(key)}
      >
        Dismiss
      </Button>
    )}
  >
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
