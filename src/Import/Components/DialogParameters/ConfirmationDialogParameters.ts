import DialogOkayCancelButtons from "../../../Application/Components/DialogButtons/DialogOkayCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const confirmationDialogParameters = (
  name: string,
  title: string,
  dialogText: string,
  exclusive: boolean,
  shouldDispatch: boolean,
  action: () => IAction | void
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
      DialogOkayCancelButtons(
        [true, true],
        [true, shouldDispatch],
        [unloadDialogsAction, action]
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
