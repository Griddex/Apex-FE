import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters: DialogStuff = {
  name: "New_Project_Success_Dialog",
  title: "Create New Project Success",
  type: "textDialog",
  show: true,
  exclusive: false,
  maxWidth: "xs",
  dialogText: "New Project Creation Successful",
  iconType: "success",
  actionsList: () => DialogOkayButton(true, unloadDialogsAction),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};

export const failureDialogParameters: DialogStuff = {
  name: "New_Project_Failure_Dialog",
  title: "Create New Project Failure",
  type: "textDialog",
  show: true,
  exclusive: false,
  maxWidth: "xs",
  dialogText: "New Project Creation failure",
  iconType: "error",
  actionsList: () => DialogCancelButton(true, unloadDialogsAction),
  // actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
