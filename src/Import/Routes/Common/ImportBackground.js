import React from "react";
import Import from "../../Images/Import.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ImportBackground = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Import} height={250} width={250} />
    </div>
  );
};

export default ImportBackground;
