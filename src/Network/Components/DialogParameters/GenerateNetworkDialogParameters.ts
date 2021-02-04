import DialogSaveButton from "../../../Application/Components/DialogButtons/DialogSaveButton";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";

export const confirmationDialogParameters = (
  name: string,
  title: string,
  dialogText: string,
  exclusive: boolean,
  action: () => IAction
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
    actionsList: () => DialogSaveButton(action),
    dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
  };
};
