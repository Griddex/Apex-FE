import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { StatusTextType } from "../../../Economics/Components/ForecastRunDetail";

const useStyles = makeStyles(() => ({
  status: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: 32,
    fontSize: 14,
  },
}));

const statusColor = (statusText: StatusTextType) => {
  const theme = useTheme();

  switch (statusText) {
    case "Approved":
      return {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      };

    case "Pending":
      return {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
      };

    case "Returned":
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

const Status = ({ statusText }: { statusText: StatusTextType }) => {
  const classes = useStyles();
  const statusStyle = statusColor(statusText);

  return (
    <div className={classes.status} style={statusStyle}>
      {statusText}
    </div>
  );
};

export default Status;
