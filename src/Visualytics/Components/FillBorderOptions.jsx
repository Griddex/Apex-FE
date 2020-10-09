import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Fill from "./Fill";
import Gradient from "./Gradient";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "auto",
    "& > *": { marginTop: 10 },
  },
}));

export default function FillBorderOptions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fill />
      <Gradient />
    </div>
  );
}
