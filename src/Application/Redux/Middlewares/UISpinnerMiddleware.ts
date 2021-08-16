import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../Actions/ActionTypes";
import { showSpinnerAction } from "../Actions/UISpinnerActions";

const uiSpinnerMiddleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch<IAction>) =>
  (action: IAction) => {
    if (action.meta && action.meta.showSpinner) {
      dispatch(showSpinnerAction(action.meta.message as string));
    }

    return next(action);
  };

export default uiSpinnerMiddleware;
