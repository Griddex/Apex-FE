import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contextStatRoot: {
    display: "flex",
    flexDirection: "column",
    height: 120,
    width: 180,
    backgroundColor: "#F7F7F7",
    border: "1px solid #707070",
    padding: 5,
  },
  contextStat: {
    display: "flex",
    flexDirection: "row",
    height: 20,
  },
}));

const ContextStat = ({ caption, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.contextStat}>
      <div>{caption}:</div>
      <div>{` ${text}`}</div>
    </div>
  );
};

const WellheadContextDrawer = ({ data }) => {
  const classes = useStyles();
  const keys = Object.keys(data);

  return (
    <div className={classes.contextStatRoot}>
      {data &&
        keys.map((k, i) => {
          const text = data[k];

          return <ContextStat key={i} caption={k} text={text} />;
        })}
    </div>
  );
};

export default WellheadContextDrawer;
