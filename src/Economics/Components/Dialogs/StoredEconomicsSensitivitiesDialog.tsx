import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import StoredEconomicsSensitivities from "../../Routes/EconomicsAnalyses/EconomicsParametersSensitivities/StoredEconomicsSensitivities";

const StoredEconomicsSensitivitiesDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();
  const { title, show, maxWidth, iconType, actionsList } = props;

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
        style={{
          display: "flex",
          flexDirection: "column",
          height: 640,
        }}
      >
        <StoredEconomicsSensitivities />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};

export default StoredEconomicsSensitivitiesDialog;
