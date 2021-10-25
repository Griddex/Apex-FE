import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "date-fns";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
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
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    // const { server } = await import("./Mocks/Server");

    // worker.start();
    // server.listen();
  }
  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>,
    document.getElementById("app")
  );
});
