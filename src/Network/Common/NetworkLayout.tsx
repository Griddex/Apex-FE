import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import SuspensePerpetualSpinner from "../../Application/Components/Visuals/SuspensePerpetualSpinner";
import NetworkLanding from "./NetworkLanding";

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
  const dispatch = useDispatch();

  return (
    <main className={classes.networkLayoutRoot}>
      <div className={clsx(classes.networkLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <NetworkLanding />
        </Suspense>
      </div>
    </main>
  );
};

export default NetworkLayout;
