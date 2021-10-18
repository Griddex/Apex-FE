import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";

const ForecastLanding = React.lazy(() => import("./ForecastLanding"));

const navbarHeight = 43;
const subNavBarHeight = 0;
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
      height: `calc(100% - ${navbarHeight + subNavBarHeight}px)`,
    },
  };
});

const ForecastLayout = () => {
  const classes = useStyles();

  return (
    <main className={classes.forecastLayoutRoot}>
      <div className={clsx(classes.forecastLayoutContainer)}>
        <ForecastLanding />
      </div>
    </main>
  );
};

export default ForecastLayout;
