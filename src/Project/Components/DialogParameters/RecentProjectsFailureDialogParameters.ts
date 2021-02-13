import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const failureDialogParameters: DialogStuff = {
  name: "Recent_Projects_Failure_Dialog",
  title: "Recent Projects Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText:
    "Oops! An unexpected error occurred while trying to retrieve recent projects. Please try again",
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
