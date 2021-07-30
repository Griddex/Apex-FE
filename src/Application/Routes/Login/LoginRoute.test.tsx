import { cleanup, waitFor } from "@testing-library/react";
import React from "react";
import { render } from "../../Utils/ApexTestRender";
import LoginRoute from "./LoginRoute";

afterEach(cleanup);

describe("Tests the root component <App/>", () => {
  test("renders without errors", async () => {
    const { getByText } = render(<LoginRoute />);
    const mottoElement = await waitFor(() =>
      getByText(
        /- Versatile Hydrocarbon Forecasting and Economics Evaluation Platform/i
      )
    );
    expect(mottoElement).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { container } = render(<LoginRoute />);
    expect(container).toMatchSnapshot();
  });

  test("Apex logo renders", async () => {
    const { findByAltText } = render(<LoginRoute />);
    const logoElement = await findByAltText(
      "Hydrocarbon Forecasting Platform Company Logo"
    );
    expect(logoElement).toBeInTheDocument();
  });

  test("Login is successful with registered user", () => {});
});
