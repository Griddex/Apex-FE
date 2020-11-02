import {
  SHOW_DIALOG,
  showDialogExclusivelyAction,
} from "./../Actions/DialogsAction";

const dialogsMiddleware = ({ dispatch }) => (next) => (action) => {
  // let dialogs = getState().dialogsReducer.dialogs;

  if (action.type === SHOW_DIALOG) {
    // const currentDialogs = dialogs.pop();
    dispatch(showDialogExclusivelyAction(action.payload));
    return next(action);
  }
};
export default dialogsMiddleware;
