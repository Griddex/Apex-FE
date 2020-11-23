import {
  DialogStuff,
  IDialogState,
} from "../../Components/Dialogs/DialogTypes";
import { HIDE_DIALOG, SHOW_DIALOG } from "../Actions/DialogsAction";
import dialogsState from "../State/DialogsState";

const dialogsReducer = (
  state = dialogsState,
  action: {
    type: string;
    name: string;
    value: unknown;
    meta: { exclusive: boolean };
    payload: DialogStuff;
  }
): IDialogState<DialogStuff> => {
  switch (action.type) {
    // case PERSIST_STORE: //Rewrite
    //   return {
    //     ...state,
    //     [action.name]: action.value,
    //   }; //Run down object tree till you find key, then change its value

    case SHOW_DIALOG: {
      let updatedDialogs: DialogStuff[] = [];

      if (action.meta.exclusive) {
        updatedDialogs = (state.dialogs as any[]).map((dialog) => {
          dialog.show = false;
          return dialog;
        });

        updatedDialogs.push(action.payload);
      } else {
        updatedDialogs = [...state.dialogs, action.payload];
      }

      return {
        ...state,
        dialogs: updatedDialogs,
      };
    }

    case HIDE_DIALOG: {
      const keptDialogs = [...state.dialogs];
      keptDialogs.pop();

      return {
        ...state,
        dialogs: keptDialogs,
      };
    }
    default:
      return { ...state };
  }
};

export default dialogsReducer;
