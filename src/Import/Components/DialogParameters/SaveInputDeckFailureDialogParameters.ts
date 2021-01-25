import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "./../../../Application/Components/Dialogs/DialogTypes";

export const failureDialogParameters = (
  inputDeckType: string
): DialogStuff => ({
  name: "Save_InputDeck_Failure_Dialog",
  title: "Save InputDeck Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Save ${inputDeckType} failure`,
  iconType: "error",
  actionsList: () => DialogOkayButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
