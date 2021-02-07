import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const extrudeDialogParameters = (
  selectedRowIndex: number
): DialogStuff => {
  return {
    name: "Extrude_Decline_Curve_Parameters_Dialog",
    title: "Decline Curve Parameters",
    type: "declineCurveParametersDialog",
    show: true,
    exclusive: false,
    maxWidth: "xl",
    iconType: "information",
    selectedRowIndex,
    actionsList: () =>
      DialogCancelButton([true], [true], [unloadDialogsAction]),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
