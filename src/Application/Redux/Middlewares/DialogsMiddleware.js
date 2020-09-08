import { SHOW_DIALOG } from "./../Actions/DialogsAction";

const dialogsMiddleware = ({ getState }) => (next) => (action) => {
  if (action.type === SHOW_DIALOG && action.meta && action.meta.exclusive) {
    const dialogs = getState().dialogsReducer.dialogs;

    for (const dialog of dialogs) {
      if (dialog[show]) dialog[show] = false;
    }

    const updatedDialogs = [...dialogs, action.payload.dialogData];
    const updatedAction = {
      ...action,
      payload: { ...action.payload, dialogData: updatedDialogs },
    };
    return next(updatedAction);
  }

  return next(action);
};

export default dialogsMiddleware;
