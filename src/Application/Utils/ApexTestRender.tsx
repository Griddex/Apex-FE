import DateFnsUtils from "@date-io/date-fns";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { render, RenderOptions } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store } from "../Redux/Store/Store";
import theme from "../Theme/Theme";

const history = createMemoryHistory();
const ApexProviders: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router history={history}>
            <CssBaseline />
            {children}
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
};

const apexTestRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ApexProviders, ...options });

export * from "@testing-library/react";
export { apexTestRender as render };
