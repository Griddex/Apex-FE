import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useRouteMatch } from "react-router-dom";
import SuspensePerpetualSpinner from "../../Application/Components/Visuals/SuspensePerpetualSpinner";
import VisualyticsLanding from "./VisualyticsLanding";

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
  const { path, url } = useRouteMatch();

  return (
    <main className={classes.visualyticsLayoutRoot}>
      <div className={clsx(classes.visualyticsLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <VisualyticsLanding />,
        </Suspense>
      </div>
    </main>
  );
};

export default VisualyticsLayout;
