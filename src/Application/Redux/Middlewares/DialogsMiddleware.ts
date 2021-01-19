import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../Actions/ActionTypes";
import { SHOW_DIALOG } from "../Actions/DialogsAction";

const dialogsMiddleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  // let dialogs = getState().dialogsReducer.dialogs;

  if (action.type === SHOW_DIALOG) {
    // const currentDialogs = dialogs.pop();
    // dispatch(showDialogExclusivelyAction(action.payload));
    return next(action);
  }
};
export default dialogsMiddleware;
