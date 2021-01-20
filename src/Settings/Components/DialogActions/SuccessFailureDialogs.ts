import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const successDialogParameters: DialogStuff = {
  name: "New_Project_Success_Dialog",
  title: "New Project Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "New Project Creation Successful",
  iconType: "success",
  actionsList: () => DialogOkayButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};

export const failureDialogParameters: DialogStuff = {
  name: "New_Project_Failure_Dialog",
  title: "Save Forecasting Parameters Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Save Forecasting Parameters failure",
  iconType: "error",
  actionsList: () => DialogOkayButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
