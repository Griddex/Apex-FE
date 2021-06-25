import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";

export const confirmationDialogParameters = (
  name: string,
  title: string,
  type: DialogStuff["type"],
  dialogText: string,
  exclusive: boolean,
  shouldDispatch: boolean,
  action: (titleDesc?: Record<string, string>) => IAction | void,
  oneButtonTitle: string,
  oneButtonIconTitle: string,
  iconType: DialogStuff["iconType"] = "save"
): DialogStuff => {
  return {
    name,
    title,
    type,
    show: true,
    exclusive,
    maxWidth: "xs",
    dialogText,
    iconType,
    actionsList: (isFinalButtonDisabled: boolean) =>
      DialogOneCancelButtons(
        [true, true],
        [true, shouldDispatch],
        [unloadDialogsAction, action],
        oneButtonTitle,
        oneButtonIconTitle,
        isFinalButtonDisabled,
        "All"
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
