import {
  PERSIST_STORE,
  SHOW_DIALOG,
  HIDE_DIALOG,
  HIDE_OTHERDIALOGS,
} from "../Actions/DialogsAction";
import dialogsState from "../State/DialogsState";

const dialogsReducer = (state = dialogsState, action) => {
  switch (action.type) {
    case PERSIST_STORE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SHOW_DIALOG:
      return {
        ...state,
        ...action.payload.dialogData,
      };
    case HIDE_DIALOG:
      return {
        ...state,
        ...action.payload,
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
