import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayCancelButtons from "../../../Application/Components/DialogButtons/DialogOkayCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters = (): DialogStuff => ({
  name: "Save_CostsRevenue_Success_Dialog",
  title: "Costs & Revenues Save Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Costs & Revenues save was successfully completed!`,
  iconType: "success",
  actionsList: () =>
    DialogOkayCancelButtons(
      [true, true],
      [true, true],
      [unloadDialogsAction, hideDialogAction]
    ),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (errorMessage: string): DialogStuff => ({
  name: "Save_CostsRevenue_Failure_Dialog",
  title: "Costs Revenues Save Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and costs & revenues data could not be saved.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
