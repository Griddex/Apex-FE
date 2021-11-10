import {
  DialogStuff,
  IDialogState,
} from "../../Components/Dialogs/DialogTypes";
import {
  HIDE_DIALOG,
  SHOW_DIALOG,
  UNLOAD_DIALOGS,
  UNLOAD_DIALOGS_BYNUMBER,
} from "../Actions/DialogsAction";
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
): IDialogState<DialogStuff> | undefined => {
  switch (action.type) {
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

    case UNLOAD_DIALOGS: {
      return { ...state, dialogs: [] };
    }

    case UNLOAD_DIALOGS_BYNUMBER: {
      const { noOfDialogs } = action.payload as any;

      const noOfDlgs = noOfDialogs ? noOfDialogs : 0;
      const totalNoOfDialogs = state.dialogs.length;
      const lastIndex = totalNoOfDialogs - noOfDlgs;
      const keptDialogs = state.dialogs.slice(0, lastIndex);

      return {
        ...state,
        dialogs: keptDialogs,
      };
    }

    default:
      return state;
  }
};

export default dialogsReducer;
