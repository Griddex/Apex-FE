import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Palette from "../Palette/Palette";

const useStyles = makeStyles(() => ({
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
      <Palette />
    </div>
  );
}
