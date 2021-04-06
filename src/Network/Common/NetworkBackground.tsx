import { makeStyles } from "@material-ui/core";
import React from "react";
import Network from "../Images/Pipeline.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const NetworkBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Network} alt="Network background" height={250} width={250} />
    </div>
  );
};

export default NetworkBackground;
