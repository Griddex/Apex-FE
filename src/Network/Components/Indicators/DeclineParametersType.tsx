import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import { StatusTextType } from "../../../Economics/Components/ForecastRunDetail";
import ToTitleCase from "../../../Application/Utils/ToTitleCase";

const useStyles = makeStyles(() => ({
  DeclineParametersType: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: 32,
    fontSize: 14,
  },
}));

const statusColor = (dpTypeText: StatusTextType) => {
  const theme = useTheme();

  switch (dpTypeText) {
    case "default":
      return {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.text.disabled,
      };

    case "user":
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };

    default:
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };
  }
};

const DeclineParametersType = ({
  dpTypeText,
}: {
  dpTypeText: StatusTextType;
}) => {
  const classes = useStyles();
  const dpStyle = statusColor(dpTypeText);

  return (
    <div className={classes.DeclineParametersType} style={dpStyle}>
      {/* {ToTitleCase(dpTypeText)} */}
      {dpTypeText}
    </div>
  );
};

export default DeclineParametersType;
