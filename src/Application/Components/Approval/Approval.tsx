import { makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { ApprovalTextType } from "./ApprovalTypes";

const useStyles = makeStyles(() => ({
  approval: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: 32,
    fontSize: 14,
  },
}));

const approvalColor = (approvalText: ApprovalTextType) => {
  const theme = useTheme();

  switch (approvalText) {
    case "Existing":
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

const Approval = ({ approvalText }: { approvalText: ApprovalTextType }) => {
  const classes = useStyles();
  const approvalStyle = approvalColor(approvalText);

  return (
    <div className={classes.approval} style={approvalStyle}>
      {approvalText}
    </div>
  );
};

export default Approval;
