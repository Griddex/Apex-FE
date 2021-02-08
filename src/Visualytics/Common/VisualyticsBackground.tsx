import { makeStyles } from "@material-ui/core";
import React from "react";
import Visualytics from "../Images/Visualytics.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const VisualyticsBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={Visualytics}
        alt="Visualytics background"
        height={250}
        width={250}
      />
    </div>
  );
};

export default VisualyticsBackground;
