import { DialogActions, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const OpenProjectConfirmationDialog: React.FC<DialogStuff> = ({
  title,
  show,
  maxWidth,
  iconType,
  actionsList,
  dialogText,
  dialogContentStyle,
}) => {
  const dispatch = useDispatch();

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
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent dividers style={dialogContentStyle}>
        <Typography style={{ marginLeft: "5%", width: "95%" }} variant="body1">
          {dialogText}
        </Typography>
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};
export default OpenProjectConfirmationDialog;
