import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import App from "./App";
import { Router } from "react-router-dom";
import history from "./../Services/HistoryService";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import theme from "../Theme/Theme";
import { Provider } from "react-redux";
import { store } from "../Redux/Store/Store";
import DateFnsUtils from "@date-io/date-fns";

afterEach(cleanup);

describe("Tests the root component <App/>", () => {
  const RootApp = (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router history={history}>
            <CssBaseline />
            <App />
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );

  test("renders <App/>", async () => {
    const { getByText } = render(RootApp);
    const mottoElement = await waitFor(() =>
      getByText(/...inspired technologies for business growth/i)
    );
    expect(mottoElement).toBeInTheDocument();
  });

  test("<App/> matches snapshot", () => {
    const { container } = render(RootApp);
    expect(container).toMatchSnapshot();
  });

  test("Syncware logo renders", async () => {
    const { findByAltText } = render(RootApp);
    const logoElement = await findByAltText("Syncware Logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("Apex logo renders", async () => {
    const { findByAltText } = render(RootApp);
    const logoElement = await findByAltText("Apex Logo");
    expect(logoElement).toBeInTheDocument();
  });
});
