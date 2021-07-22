import React from "react";
import {
  render,
  waitFor,
  cleanup,
  RenderOptions,
} from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { store } from "../Redux/Store/Store";
import theme from "../Theme/Theme";

// type TChildren

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
