import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "date-fns";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./Application/App";
import { store } from "./Application/Redux/Store/Store";
import history from "./Application/Services/HistoryService";
import theme from "./Application/Theme/Theme";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

async function prepare() {
  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router history={history}>
              <CssBaseline />
              <App />
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>,
    document.getElementById("app")
  );
});
