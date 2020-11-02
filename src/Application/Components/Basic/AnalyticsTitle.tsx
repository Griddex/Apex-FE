import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

interface IAnalyticsTitleProps {
  title: string;
}

const AnalyticsTitle: React.FC<IAnalyticsTitleProps> = ({ title }) => {
  const classes = useStyles();

  return <Typography className={classes.analyticsTitle}>{title}</Typography>;
};

export default AnalyticsTitle;