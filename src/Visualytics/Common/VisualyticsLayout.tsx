import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useRouteMatch } from "react-router-dom";

const SuspensePerpetualSpinner = React.lazy(
  () => import("../../Application/Components/Visuals/SuspensePerpetualSpinner")
);
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
