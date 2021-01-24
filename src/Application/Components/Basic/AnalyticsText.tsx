import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  analyticsContainer: {
    display: "flex",
    alignItems: "center",
    minWidth: "70%",
  },
  analyticsTitle: {
    minWidth: "30%",
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 5,
    lineHeight: "100%",
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    backgroundColor: "#F7F7F7",
  },
  analyticsText: {
    minWidth: "70%",
  },
}));

export interface IAnalyticsTitleProps {
  title: string;
  text: string;
  direction: "Vertical" | "Horizontal";
}

const AnalyticsText: React.FC<IAnalyticsTitleProps> = (props) => {
  const classes = useStyles(props);
  const { title, text } = props;

  const flexStyle = (): React.CSSProperties => {
    if (props.direction === "Horizontal") return { flexDirection: "row" };
    else return { flexDirection: "column" };
  };

  return (
    <div className={classes.analyticsContainer} style={flexStyle()}>
      <Typography className={classes.analyticsTitle}>{title}</Typography>
      <Typography className={classes.analyticsText}>{text}</Typography>
    </div>
  );
};

export default AnalyticsText;