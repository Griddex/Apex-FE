import { ThemeProvider } from "@material-ui/core";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./Application/App";
import history from "./Application/Services/HistoryService";
import theme from "./Application/Theme/Theme";
import store from "./Application/Redux/Store/Store";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://c2967263fae54787a9c535167158d65a@o324350.ingest.sentry.io/5442360",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <CssBaseline />
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("app")
);
