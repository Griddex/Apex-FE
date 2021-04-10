import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import PerpetualSpinner from "./../../Application/Components/Visuals/PerpetualSpinner";
import ForecastLanding from "./ForecastLanding";

const navbarHeight = 43;
const subNavBarHeight = 25;
const useStyles = makeStyles(() => {
  return {
    forecastLayoutRoot: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    forecastLayoutContainer: {
      display: "flex",
      marginTop: navbarHeight + subNavBarHeight,
      width: "100%",
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const ForecastLayout = () => {
  const classes = useStyles();
  // const { path, url } = useRouteMatch();

  return (
    <main className={classes.forecastLayoutRoot}>
      <div className={clsx(classes.forecastLayoutContainer)}>
        <Suspense fallback={<PerpetualSpinner />}>
          {/* <Route exact path={path}> */}
          <ForecastLanding />
          {/* </Route> */}
        </Suspense>
      </div>
    </main>
  );
};

export default ForecastLayout;
