import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const failureDialogParameters: DialogStuff = {
  name: "Recent_Projects_Failure_Dialog",
  title: "Recent Projects Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Recent Projects Fetch failure",
  iconType: "error",
  actionsList: () => DialogOkayButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
