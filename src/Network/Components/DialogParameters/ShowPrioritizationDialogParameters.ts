import DialogCancelButton from "../../../Application/Components/DialogButtons/DialogCancelButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";

export const extrudeDialogParameters = (
  selectedRowIndex: number
): DialogStuff => {
  return {
    name: "Extrude_Prioritization_Parameters_Dialog",
    title: "Production/Stream Prioritization",
    type: "productionStreamPrioritizationDialog",
    show: true,
    exclusive: false,
    maxWidth: "xl",
    iconType: "information",
    selectedRowIndex,
    actionsList: () => DialogCancelButton(),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
