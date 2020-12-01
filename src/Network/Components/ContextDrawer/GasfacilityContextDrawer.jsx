import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contextStatRoot: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    padding: 5,
  },
  contextStat: {
    display: "flex",
    flexDirection: "row",
    height: 20,
  },
  titleStat: {
    width: "70%",
    borderBottom: "1px solid #707070",
  },
  contentStat: {
    width: "30%",
    borderBottom: "1px solid #707070",
  },
}));

const ContextStat = ({ caption, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.contextStat}>
      <div className={classes.titleStat}>{caption}:</div>
      <div className={classes.contentStat}>
        <span>&nbsp;&nbsp;</span>
        {`${text}`}
      </div>
    </div>
  );
};

const GasfacilityContextDrawer = ({ data }) => {
  const classes = useStyles();
  const keys = Object.keys(data[0]);

  return (
    <div className={classes.contextStatRoot}>
      {data &&
        data.map((obj) => {
          const allStat = keys.map((k, i) => {
            const text = obj[k];

            return (
              <div key={i}>
                <ContextStat caption={k} text={text} />
              </div>
            );
          });

          return allStat;
        })}
    </div>
  );
};

export default GasfacilityContextDrawer;
