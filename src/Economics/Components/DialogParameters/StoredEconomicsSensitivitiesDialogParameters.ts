import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters: DialogStuff = {
  name: "Stored_Economics_Sensitivities_Success_Dialog",
  title: "Stored Economics Sensitivities Retrieval Success",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Stored Economics Sensitivities Retrieval Successful",
  iconType: "success",
  actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};

export const failureDialogParameters: DialogStuff = {
  name: "Stored_Economics_Sensitivities_Failure_Dialog",
  title: "Sensitivities Retrieval Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Stored Economics Sensitivities Retrieval failure",
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
