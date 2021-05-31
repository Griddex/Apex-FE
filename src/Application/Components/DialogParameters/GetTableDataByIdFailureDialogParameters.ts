import DialogOkayButton from "../DialogButtons/DialogOkayButton";
import { DialogStuff } from "../Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../Redux/Actions/DialogsAction";

export const failureDialogParameters = (): DialogStuff => ({
  name: "Get_Table_Id_Failure_Dialog",
  title: "Table Data Failure",
  type: "textDialog",
  show: true,
  exclusive: true,
  maxWidth: "xs",
  dialogText: `Table data could not be retrieved.
  Please try again`,
  iconType: "error",
  actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
