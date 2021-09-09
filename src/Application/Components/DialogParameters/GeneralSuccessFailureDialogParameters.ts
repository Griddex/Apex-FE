import DialogCancelButton from "../DialogButtons/DialogCancelButton";
import DialogOkayCancelButtons from "../DialogButtons/DialogOkayCancelButtons";
import { DialogStuff } from "../Dialogs/DialogTypes";
import {
  hideDialogAction,
  unloadDialogsAction,
} from "../../Redux/Actions/DialogsAction";

export const generalSuccessDialogParameters = (
  name: string,
  title: string,
  exclusive: boolean,
  dialogText: string
): DialogStuff => ({
  name,
  title,
  type: "textDialog",
  show: true,
  exclusive,
  maxWidth: "xs",
  dialogText,
  iconType: "success",
  actionsList: () =>
    DialogOkayCancelButtons(
      [true, true],
      [true, true],
      [unloadDialogsAction, hideDialogAction]
    ),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});

export const generalFailureDialogParameters = (
  name: string,
  title: string,
  exclusive: boolean,
  errorMessage: string,
  errorText: string
): DialogStuff => ({
  name,
  title,
  type: "textDialog",
  show: true,
  exclusive,
  maxWidth: "xs",
  dialogText: `${errorText}
  
  ${errorMessage}
  `,
  iconType: "error",
  actionsList: () => DialogCancelButton(),
  dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
});
