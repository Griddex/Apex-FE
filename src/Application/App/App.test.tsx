import { cleanup, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../Utils/ApexTestRender";
import App from "./App";

afterEach(cleanup);

describe("Tests the root component <App/>", () => {
  test("renders <App/> without errors", async () => {
    const { getByText } = render(<App />);
    const mottoElement = await waitFor(() =>
      getByText(/...inspired technologies for business growth/i)
    );
    expect(mottoElement).toBeInTheDocument();
  });

  test("<App/> matches snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test("Syncware logo renders", async () => {
    const { findByAltText } = render(<App />);
    const logoElement = await findByAltText("Syncware Logo");
    expect(logoElement).toBeInTheDocument();
  });

  test("Apex logo renders", async () => {
    const { findByAltText } = render(<App />);
    const logoElement = await findByAltText("Apex Logo");
    expect(logoElement).toBeInTheDocument();
  });
});
