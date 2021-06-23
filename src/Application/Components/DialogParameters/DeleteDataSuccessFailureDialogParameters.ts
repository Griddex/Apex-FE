import DialogCancelButton from "../DialogButtons/DialogCancelButton";
import DialogOkayCancelButtons from "../DialogButtons/DialogOkayCancelButtons";
import { DialogStuff } from "../Dialogs/DialogTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";

export const deleteSuccessDPs = (): DialogStuff => ({
  name: "Delete_Data_Success_Dialog",
  title: "Delete Operation Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Data successfully deleted.`,
  iconType: "success",
  actionsList: () =>
    DialogOkayCancelButtons(
      [true, true],
      [true, true],
      [unloadDialogsAction, hideDialogAction]
    ),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const deleteFailureDPs = (errorMessage?: string): DialogStuff => ({
  name: "Delete_Data_Failure_Dialog",
  title: "Delete Operation Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and the selected data could not be saved.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
