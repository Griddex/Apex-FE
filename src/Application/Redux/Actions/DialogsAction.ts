export const PERSIST_STORE = "PERSIST_STORE";
import { IRawRow } from "../../Components/Table/ReactDataGrid/ApexGridTypes";
import { DialogStuff } from "./../../Components/Dialogs/DialogTypes";
export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";
export const UNLOAD_DIALOGS = "UNLOAD_DIALOGS";

export const persistToStoreAction = (name: string, value: string) => {
  return {
    type: PERSIST_STORE,
    payload: {
      name,
      value,
    },
  };
};

export const showDialogAction = <TRow = IRawRow>(dialog: DialogStuff<TRow>) => {
  console.log("dialog: ", dialog);
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
