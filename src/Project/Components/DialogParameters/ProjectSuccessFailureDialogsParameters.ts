import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters: DialogStuff = {
  name: "New_Project_Success_Dialog",
  title: "Create Project Success",
  type: "textDialog",
  show: true,
  exclusive: false,
  maxWidth: "xs",
  dialogText: "Success! Your project was created successfully.",
  iconType: "success",
  actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};

export const failureDialogParameters: DialogStuff = {
  name: "New_Project_Failure_Dialog",
  title: "Create Project Failure",
  type: "textDialog",
  show: true,
  exclusive: false,
  maxWidth: "xs",
  dialogText:
    "An unexpected error occurred while trying to create your new project. Please try again",
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
