import {
  PERSIST_STORE,
  SHOW_DIALOG,
  HIDE_DIALOG,
} from "../Actions/DialogsAction";
import dialogsState from "../State/DialogsState";

const dialogsReducer = (state = dialogsState, action) => {
  switch (action.type) {
    case PERSIST_STORE: //Rewrite
      return {
        ...state,
        [action.name]: action.value,
      }; //Run down object tree till you find key, then change its value

    case SHOW_DIALOG:
      return {
        ...state,
        dialogs: action.meta.exclusive
          ? [action.payload]
          : [...state.dialogs, action.payload],
      };

    case HIDE_DIALOG:
      const keptDialogs = [...state.dialogs];
      keptDialogs.pop();

      return {
        ...state,
        dialogs: keptDialogs,
      };

    default:
      return { ...state };
  }
};

export default dialogsReducer;
