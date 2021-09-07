import DialogCancelButton from "../DialogButtons/DialogCancelButton";
import DialogOkayCancelButtons from "../DialogButtons/DialogOkayCancelButtons";
import { DialogStuff } from "../Dialogs/DialogTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";

export const updateSuccessDPs = (): DialogStuff => ({
  name: "Update_Data_Success_Dialog",
  title: "Update Operation Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Data successfully updated.`,
  iconType: "success",
  actionsList: () =>
    DialogOkayCancelButtons(
      [true, true],
      [true, true],
      [unloadDialogsAction, hideDialogAction]
    ),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const updateFailureDPs = (errorMessage?: string): DialogStuff => ({
  name: "Update_Data_Failure_Dialog",
  title: "Update Operation Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and the selected data could not be updated.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
