import { makeStyles, useTheme } from "@material-ui/core";
import capitalize from "lodash.capitalize";
import React from "react";
import { ApprovalTextType } from "../../../Application/Components/Approval/ApprovalTypes";

const useStyles = makeStyles(() => ({
  DeclineParametersType: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 32,
    fontSize: 14,
  },
}));

const statusColor = (dpTypeText: ApprovalTextType) => {
  const theme = useTheme();

  switch (dpTypeText) {
    case "Default":
      return {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.grey[100],
      };

    case "User":
      return {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
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
  dpTypeText: ApprovalTextType;
}) => {
  const classes = useStyles();
  const dpStyle = statusColor(dpTypeText);

  return (
    <div className={classes.DeclineParametersType} style={dpStyle}>
      {capitalize(dpTypeText)}
    </div>
  );
};

export default DeclineParametersType;
