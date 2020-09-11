import {
  PERSIST_STORE,
  SHOW_DIALOG,
  HIDE_DIALOG,
  HIDE_OTHERDIALOGS,
} from "../Actions/DialogsAction";
import dialogsState from "../State/DialogsState";

const dialogsReducer = (state = dialogsState, action) => {
  switch (action.type) {
    case PERSIST_STORE: //Rewrite
      return {
        ...state,
        [action.name]: action.value,
      };

    case SHOW_DIALOG:
      return {
        ...state,
        dialogs: [...state.dialogs, action.payload.dialogData],
      };

    case HIDE_DIALOG:
      return {
        ...state,
        dialogs: [
          ...state.dialogs.map((dialog) =>
            dialog.name === action.payload.name
              ? (dialog.show = false)
              : (dialog.show = true)
          ),
        ],
      };

    case HIDE_OTHERDIALOGS:
      return {
        ...state,
        dialogs: [...action.payload.dialogs],
      };

    default:
      return { ...state };
  }
};

export default dialogsReducer;
