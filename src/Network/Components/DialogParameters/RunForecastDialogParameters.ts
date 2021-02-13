import DialogRunForecastCancelButtons from "../../../Application/Components/DialogButtons/DialogRunForecastCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { runForecastRequestAction } from "../../Redux/Actions/NetworkActions";

export const confirmationDialogParameters = (
  name: string,
  title: string,
  dialogText: string,
  exclusive: boolean
  // action: () => IAction
): DialogStuff => {
  return {
    name,
    title,
    type: "textDialog",
    show: true,
    exclusive,
    maxWidth: "xs",
    dialogText,
    iconType: "confirmation",
    actionsList: () =>
      DialogRunForecastCancelButtons(
        [true, true],
        [true, true],
        [unloadDialogsAction, runForecastRequestAction]
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
