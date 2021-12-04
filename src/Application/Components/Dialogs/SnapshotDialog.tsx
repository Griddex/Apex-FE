import { DialogActions, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import Image from "../Visuals/Image";
import { DialogStuff } from "./DialogTypes";

const SnapshotDialog: React.FC<DialogStuff> = ({
  title,
  show,
  maxWidth,
  iconType,
  snapshot,
  actionsList,
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
        <Image src={snapshot} height={"100%"} width={"100%"} alt="snapshot" />
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};
export default SnapshotDialog;
