import DialogOkayCancelButtons from "../../../Application/Components/DialogButtons/DialogOkayCancelButtons";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const confirmationDialogParameters = (
  name: string,
  title: string,
  dialogText: string,
  exclusive: boolean,
  shouldDispatch: boolean,
  action: () => IAction | void,
  oneButtonName = "Save",
  oneButtonIconName = "saveOutlined"
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
      DialogOneCancelButtons(
        [true, true],
        [true, shouldDispatch],
        [unloadDialogsAction, action],
        oneButtonName,
        oneButtonIconName
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
