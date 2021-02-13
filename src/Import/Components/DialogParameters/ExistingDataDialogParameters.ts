import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters: DialogStuff = {
  name: "ExistingData_Success_Dialog",
  title: "Existing Data Retrieval Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Existing Data Retrieval Successful",
  iconType: "success",
  actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};

export const failureDialogParameters: DialogStuff = {
  name: "Existing_Data_Failure_Dialog",
  title: "Existing Data Retrieval Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Existing Data Retrieval failure",
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
