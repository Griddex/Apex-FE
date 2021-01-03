import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  analyticsComp: {
    display: "flex",
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

interface IAnalyticsCompProps {
  title: string;
  content: JSX.Element | string;
  direction: "Vertical" | "Horizontal";
  containerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const AnalyticsComp: React.FC<IAnalyticsCompProps> = (props) => {
  const classes = useStyles();
  const { title, content, titleStyle, contentStyle, containerStyle } = props;

  const flexStyle = (): React.CSSProperties => {
    if (props.direction === "Horizontal")
      return {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      };
    else
      return {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      };
  };

  return (
    <div
      className={classes.analyticsComp}
      style={{ ...flexStyle(), ...containerStyle }}
    >
      <Typography className={classes.analyticsTitle} style={titleStyle}>
        {title}
      </Typography>
      <div style={{ width: "100%", ...contentStyle }}>{content}</div>
    </div>
  );
};

export default AnalyticsComp;
