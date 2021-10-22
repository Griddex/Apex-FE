import { IRawRow } from "../../Components/Table/ReactDataGrid/ApexGridTypes";
import { DialogStuff } from "./../../Components/Dialogs/DialogTypes";
export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";
export const UNLOAD_DIALOGS = "UNLOAD_DIALOGS";

export const showDialogAction = <TRow = IRawRow>(dialog: DialogStuff<TRow>) => {
  return {
    type: SHOW_DIALOG,
    payload: dialog,
    meta: { exclusive: dialog.exclusive },
  };
};

export const hideDialogAction = () => {
  return {
    type: HIDE_DIALOG,
  };
};

export const unloadDialogsAction = () => {
  return {
    type: UNLOAD_DIALOGS,
  };
};
