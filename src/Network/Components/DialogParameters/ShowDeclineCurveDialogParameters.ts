import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const extrudeDialogParameters = (
  selectedRowIndex: number
): DialogStuff => {
  return {
    name: "Extrude_Decline_Curve_Parameters_Dialog",
    title: "Decline Curve Parameters",
    type: "declineParametersDialog",
    show: true,
    exclusive: false,
    maxWidth: "lg",
    iconType: "information",
    selectedRowIndex,
    actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
