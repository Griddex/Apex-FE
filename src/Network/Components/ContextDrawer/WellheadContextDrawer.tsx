import React from "react";
import { makeStyles } from "@material-ui/core";
import { ICurrentPopoverData } from "../../Redux/State/NetworkStateTypes";
import { IContextStatistics } from "./ContextDrawerNodeTypes";

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

const ContextStat = ({ caption, contentText }: IContextStatistics) => {
  const classes = useStyles();
  return (
    <div className={classes.contextStat}>
      <div className={classes.titleStat}>{caption}:</div>
      <div className={classes.contentStat}>
        <span>&nbsp;&nbsp;</span>
        {`${contentText}`}
      </div>
    </div>
  );
};

const WellheadContextDrawer = ({ data }: ICurrentPopoverData) => {
  const classes = useStyles();
  const keys = Object.keys((data as Record<string, React.Key>[])[0]);

  return (
    <div className={classes.contextStatRoot}>
      {data &&
        (data as Record<string, React.Key>[]).map((obj) => {
          const allStat = keys.map((k, i) => {
            const contentText = obj[k] as string;

            return (
              <div key={i}>
                <ContextStat caption={k} contentText={contentText} />
              </div>
            );
          });

          return allStat;
        })}
    </div>
  );
};

export default WellheadContextDrawer;
