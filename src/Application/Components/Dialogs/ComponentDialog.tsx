import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import withStyles from "@mui/styles/withStyles";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import DialogTitle from "../DialogTitles/DialogTitle";
import { DialogStuff } from "./DialogTypes";

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(1.5),
    width: "100%",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1.5),
  },
}))(MuiDialogActions);

const ComponentDialog: React.FC<DialogStuff> = ({
  title,
  show,
  maxWidth,
  iconType,
  customComponent,
  actionsList,
  dialogContentStyle,
}) => {
  const dispatch = useDispatch();

  const CustomComponent = customComponent as JSX.Element;

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
      style={{ padding: 0 }}
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent dividers style={{ ...dialogContentStyle, height: 650 }}>
        {CustomComponent}
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};
export default ComponentDialog;
