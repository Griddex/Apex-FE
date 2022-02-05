import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";

const VisualyticsLanding = React.lazy(() => import("./VisualyticsLanding"));

const navbarHeight = 43;
const subNavBarHeight = 0;
const useStyles = makeStyles(() => {
  return {
    visualyticsLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    visualyticsLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + subNavBarHeight,
      height: `calc(100% - ${navbarHeight + subNavBarHeight})`,
    },
  };
});

const VisualyticsLayout = () => {
  const classes = useStyles();

  return (
    <main className={classes.visualyticsLayoutRoot}>
      <div className={classes.visualyticsLayoutContainer}>
        <VisualyticsLanding />
      </div>
    </main>
  );
};

export default VisualyticsLayout;
