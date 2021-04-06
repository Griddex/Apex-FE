import { makeStyles } from "@material-ui/core";
import React from "react";
import Import from "../../Images/Import.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const InputBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Import} alt="Import background" height={250} width={250} />
    </div>
  );
};

export default InputBackground;
