import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";

const resetStoreMiddleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch<IAction>
) => (action: IAction) => {
  if (action.type === LOGOUT_REQUEST) {
    return next(action);
  }
};
export default resetStoreMiddleware;
