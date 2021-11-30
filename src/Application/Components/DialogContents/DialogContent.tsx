import withStyles from "@mui/styles/withStyles";
import MuiDialogContent from "@mui/material/DialogContent";
import React from "react";

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

export default DialogContent;
