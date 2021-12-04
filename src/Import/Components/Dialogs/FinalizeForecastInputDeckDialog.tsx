import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { IInputWorkflows } from "../../../Application/Components/Workflows/WorkflowTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import ForecastInputDeckFinalization from "../../Routes/ForecastInputDeck/ForecastInputDeckFinalization";

const FinalizeForecastInputDeckDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, actionsList, workflowProcess } =
    props;

  const wp = workflowProcess as IInputWorkflows["wkPs"];

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <ForecastInputDeckFinalization workflowProcess={wp} />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default FinalizeForecastInputDeckDialog;
