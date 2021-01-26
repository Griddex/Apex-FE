import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const failureDialogParameters = (): DialogStuff => ({
  name: "Generate_Network_Failure_Dialog",
  title: "Generate Network Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Network could not be generated.
  Please try again`,
  iconType: "error",
  actionsList: () => DialogOkayButton(false, unloadDialogsAction),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
