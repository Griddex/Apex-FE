import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../Dialogs/DialogTypes";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { unloadDialogsAction } from "../../Redux/Actions/DialogsAction";

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
  iconType: DialogStuff["iconType"] = "save",
  deleteTitle?: string
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
    deleteTitle,
    actionsList: (arg?: any, flag?: boolean) =>
      DialogOneCancelButtons(
        [true, true],
        [true, shouldDispatch],
        [unloadDialogsAction, action],
        oneButtonTitle,
        oneButtonIconTitle,
        flag,
        "All"
      ),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
