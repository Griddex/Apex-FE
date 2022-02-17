import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const successDialogParameters = (
  name: string,
  title: string,
  exclusive: boolean,
  dialogText: string
): DialogStuff => ({
  name,
  title,
  type: "textDialog",
  show: true,
  exclusive,
  maxWidth: "xs",
  dialogText,
  iconType: "success",
  actionsList: () => DialogOkayButton([true], [false], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const failureDialogParameters = (
  name: string,
  title: string,
  exclusive: boolean,
  dataCategory: string,
  errorMessage: string
): DialogStuff => ({
  name,
  title,
  type: "textDialog",
  show: true,
  exclusive,
  maxWidth: "xs",
  dialogText: `Something unexpected happened and ${dataCategory} data could not be saved.
  Please try again
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
