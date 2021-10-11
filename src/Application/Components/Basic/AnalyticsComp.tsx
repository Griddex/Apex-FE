import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  analyticsComp: {
    display: "flex",
  },
  analyticsTitle: {
    // borderStyle: "solid",
    // borderColor: theme.palette.primary.main,
    // borderLeftWidth: 2,
    // borderRightWidth: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
    paddingLeft: 3,
    paddingRight: 3,
    lineHeight: "100%",
    marginBottom: 0,
    // marginBottom: theme.spacing(1),
    // color: theme.palette.text.primary,
    // color: theme.palette.text.primary,
    // color: theme.palette.primary.dark,
    // backgroundColor: theme.palette.primary.light,
    // backgroundColor: "#E0E0E0",
    // backgroundColor: "#EBEBEB",
    // border: `1px solid ${theme.palette.primary.dark}`,
    textTransform: "capitalize",
    // color: theme.palette.primary.dark,
    color: theme.palette.grey[900],
    letterSpacing: 1.2,
    fontSize: 14,
    fontWeight: 500,
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
      <div>
        <Typography className={classes.analyticsTitle} style={titleStyle}>
          {title}
        </Typography>
      </div>
      <div
        style={{ width: "100%", marginLeft: 3, marginTop: 3, ...contentStyle }}
      >
        {content}
      </div>
    </div>
  );
};

export default AnalyticsComp;
