import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const failureDialogParameters: DialogStuff = {
  name: "Open_Projects_Failure_Dialog",
  title: "Open Projects Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: "Open Projects Fetch failure",
  iconType: "error",
  actionsList: () => DialogOkayButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
};
