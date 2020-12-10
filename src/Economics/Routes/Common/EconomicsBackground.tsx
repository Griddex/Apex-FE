import { makeStyles } from "@material-ui/core";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const EconomicsBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <img src={Network} alt="Network background" height={250} width={250} /> */}
      <LocalAtmOutlinedIcon style={{ fontSize: 300 }} />
    </div>
  );
};

export default EconomicsBackground;
