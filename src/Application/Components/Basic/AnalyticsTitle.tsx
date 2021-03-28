import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  analyticsTitle: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 0,
    // borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 5,
    lineHeight: "100%",
    marginBottom: theme.spacing(1),
    // color: theme.palette.text.primary,
    // backgroundColor: "#F7F7F7",
    // width: "100%",

    textTransform: "uppercase",
    color: theme.palette.primary.dark,
    letterSpacing: 1.5,
    fontSize: 12,
    fontWeight: "bold",
  },
}));

interface IAnalyticsTitleProps {
  title: string;
  titleStyle?: CSSProperties;
}

const AnalyticsTitle: React.FC<IAnalyticsTitleProps> = ({
  title,
  titleStyle,
}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.analyticsTitle} style={titleStyle}>
      {title}
    </Typography>
  );
};

export default AnalyticsTitle;
