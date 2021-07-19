import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";

import LoginRoute from "./LoginRoute";
import theme from "../../Theme/Theme";
import { store } from "../../Redux/Store/Store";

const history = createMemoryHistory();
const Component = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router history={history}>
          <CssBaseline />
          <LoginRoute />
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Provider>
);
afterEach(cleanup);

describe("Tests the root component <App/>", () => {
  test("renders without errors", async () => {
    const { getByText } = render(Component);
    const mottoElement = await waitFor(() =>
      getByText(
        /- Versatile Hydrocarbon Forecasting and Economics Evaluation Platform/i
      )
    );
    expect(mottoElement).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(Component);
    expect(container).toMatchSnapshot();
  });

  test("Apex logo renders", async () => {
    const { findByAltText } = render(Component);
    const logoElement = await findByAltText(
      "Hydrocarbon Forecasting Platform Company Logo"
    );
    expect(logoElement).toBeInTheDocument();
  });

  test("Login is successful with registered user", () => {});
});
