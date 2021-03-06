import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import Visualytics from "../Images/Visualytics.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
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
