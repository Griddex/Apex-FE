import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters = () => {
  return {
    name: "Save_Visualytics_Success_Dialog",
    title: "Data Save Success",
    type: "textDialog",
    show: true,
    exclusive: false,
    maxWidth: "xs",
    dialogText: "Success! Your data was saved successfully.",
    iconType: "success",
    actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  } as DialogStuff;
};

export const failureDialogParameters = () => {
  return {
    name: "Save_Visualytics_Failure_Dialog",
    title: "Data Save Failure",
    type: "textDialog",
    show: true,
    exclusive: false,
    maxWidth: "xs",
    dialogText:
      "An unexpected error occurred while trying to save your data. Please try again",
    iconType: "error",
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  } as DialogStuff;
};
