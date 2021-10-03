import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline, StyledEngineProvider, Theme, ThemeProvider } from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store } from "../Redux/Store/Store";
import theme from "../Theme/Theme";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const history = createMemoryHistory();
const ApexProviders: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router history={history}>
              <CssBaseline />
              {children}
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

const apexTestRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ApexProviders, ...options });

export * from "@testing-library/react";
export { apexTestRender as render };

