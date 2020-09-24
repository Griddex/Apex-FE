import {
  SHOW_DIALOG,
  showDialogExclusivelyAction,
} from "./../Actions/DialogsAction";

const dialogsMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  let dialogs = getState().dialogsReducer.dialogs;
  let currentDialogs = [];

  if (action.type === SHOW_DIALOG) {
    currentDialogs = dialogs.pop();
    dispatch(showDialogExclusivelyAction(action.payload));
    return next(action);
  }
};
export default dialogsMiddleware;
