import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../Actions/ActionTypes";

const authMiddleware =
  ({ getState }: MiddlewareAPI) =>
  (next: Dispatch<IAction>) =>
  (action: IAction) => {
    if (action.meta && action.meta.addAuth) {
      const token = sessionStorage.getItem("token");

      const actionAuth = {
        ...action,
        payload: {
          ...action.payload,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "en-US, en;q=0.8",
            Authorization: `Bearer ${token}`,
          },
        },
      };
      return next(actionAuth);
    }

    return next(action);
  };

export default authMiddleware;
