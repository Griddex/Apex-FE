import { makeStyles } from "@material-ui/core";
import React from "react";
import Forecast from "../Images/Forecast.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ForecastBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Forecast} alt="Forecast background" height={250} width={250} />
    </div>
  );
};

export default ForecastBackground;
