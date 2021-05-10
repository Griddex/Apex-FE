import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
  analyticsContainer: {
    display: "flex",
    alignItems: "center",
    minWidth: "70%",
  },
  analyticsText: {
    minWidth: "30%",
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 0,
    // borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 5,
    lineHeight: "100%",
    textTransform: "uppercase",
    // color: theme.palette.primary.dark,
    color: theme.palette.grey[900],
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "bold",
    // color: theme.palette.text.primary,
    // backgroundColor: "#F7F7F7",
  },
  textContainer: {
    minWidth: "70%",
  },
}));

export interface IAnalyticsTitleProps {
  title: string;
  text: string;
  direction: "Vertical" | "Horizontal";
  containerStyle?: CSSProperties;
  textStyle?: CSSProperties;
  titleStyle?: CSSProperties;
}

const AnalyticsText: React.FC<IAnalyticsTitleProps> = (props) => {
  const classes = useStyles(props);
  const { title, text, titleStyle, textStyle, containerStyle } = props;

  const flexStyle = (): React.CSSProperties => {
    if (props.direction === "Horizontal") return { flexDirection: "row" };
    else return { flexDirection: "column" };
  };

  const finalStyle = { ...flexStyle(), ...containerStyle };

  return (
    <div className={classes.analyticsContainer} style={finalStyle}>
      <Typography className={classes.analyticsText} style={titleStyle}>
        {title}
      </Typography>
      <Typography className={classes.textContainer} style={textStyle}>
        {text}
      </Typography>
    </div>
  );
};

export default AnalyticsText;
