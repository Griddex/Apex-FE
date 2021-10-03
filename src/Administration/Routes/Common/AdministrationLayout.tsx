import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import React, { Suspense } from "react";
import SuspensePerpetualSpinner from "../../../Application/Components/Visuals/SuspensePerpetualSpinner";
import AdministrationLanding from "./AdministrationLanding";

const navbarHeight = 43;
// const subNavBarHeight = 25;
const addedHeight = 10;
const useStyles = makeStyles(() => {
  return {
    administrationLayoutRoot: {
      display: "flex",
      width: "100%",
    },
    administrationLayoutContainer: {
      display: "flex",
      width: "100%",
      marginTop: navbarHeight + addedHeight,
      height: `calc(100% - ${navbarHeight + addedHeight})`,
    },
  };
});

const AdministrationLayout = () => {
  const classes = useStyles();

  return (
    <main className={classes.administrationLayoutRoot}>
      <div className={clsx(classes.administrationLayoutContainer)}>
        <Suspense
          fallback={
            <SuspensePerpetualSpinner pending={true} message="Loading..." />
          }
        >
          <AdministrationLanding />
        </Suspense>
      </div>
    </main>
  );
};

export default AdministrationLayout;
