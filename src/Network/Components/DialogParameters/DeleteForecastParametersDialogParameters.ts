import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogDeleteCancelButtons from "../../../Application/Components/DialogButtons/DialogDeleteCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const deleteDialogParameters = (
  selectedRowIndex: number,
  deleteAction: () => void
): DialogStuff => {
  return {
    name: "Delete_Forecast_Parameters_Dialog",
    title: "Delete Forecast Parameters",
    type: "textDialog",
    show: true,
    exclusive: false,
    maxWidth: "xs",
    iconType: "information",
    dialogText:
      "Do you want to permanently delete the currently selected forecast parameters?",
    selectedRowIndex,
    actionsList: () =>
      DialogDeleteCancelButtons(
        [true, true],
        [true, false],
        [unloadDialogsAction, deleteAction]
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
