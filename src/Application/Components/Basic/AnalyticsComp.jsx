import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  analyticsComp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  analyticsTitle: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 5,
    lineHeight: "100%",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const AnalyticsComp = ({ title, content }) => {
  const classes = useStyles();

  return (
    <div className={classes.analyticsComp}>
      <Typography className={classes.analyticsTitle}>{title}</Typography>
      <div>{content}</div>
    </div>
  );
};

export default AnalyticsComp;
