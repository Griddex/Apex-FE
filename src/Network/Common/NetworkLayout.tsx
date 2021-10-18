import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";

const NetworkLanding = React.lazy(() => import("./NetworkLanding"));

const navbarHeight = 43;
const addedHeight = 0;
const useStyles = makeStyles(() => {
  return {
    networkLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    networkLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const NetworkLayout = () => {
  const classes = useStyles();

  return (
    <main className={classes.networkLayoutRoot}>
      <div className={clsx(classes.networkLayoutContainer)}>
        <NetworkLanding />
      </div>
    </main>
  );
};

export default NetworkLayout;
