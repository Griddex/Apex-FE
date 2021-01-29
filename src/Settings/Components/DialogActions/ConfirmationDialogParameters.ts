import DialogOkayButton from "../../../Application/Components/DialogButtons/DialogOkayButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const unitGroupConfirmationDialogParameters = (
  unitGroup: string
): DialogStuff => {
  const group = unitGroup === "Field" ? "Metric" : "Field";

  return {
    name: "Confirm_UnitGroup_Change_Dialog",
    title: "Global Unit Group Change",
    type: "textDialog",
    show: true,
    exclusive: false,
    maxWidth: "xs",
    dialogText: `Do you want to change all units to default ${group} units?`,
    iconType: "confirmation",
    actionsList: () => DialogOkayButton([true], [true], [unloadDialogsAction]),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
