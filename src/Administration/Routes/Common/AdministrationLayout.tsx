import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";

const AdministrationLanding = React.lazy(
  () => import("./AdministrationLanding")
);

const navbarHeight = 43;
const addedHeight = 0;
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
      <div className={classes.administrationLayoutContainer}>
        <AdministrationLanding />
      </div>
    </main>
  );
};

export default AdministrationLayout;
