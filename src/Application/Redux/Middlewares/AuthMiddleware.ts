import { Dispatch, MiddlewareAPI } from "redux";
import { IAction } from "../Actions/ActionTypes";

//flag to define data binding modus operandi
const authMiddleware =
  ({ getState }: MiddlewareAPI) =>
  (next: Dispatch<IAction>) =>
  (action: IAction) => {
    console.log("Im in auth middleware");
    const falsies = [null, undefined, false, ""];
    if (falsies.some((value) => value === action.meta)) {
      return next(action);
    }

    if (action.meta && action.meta.addAuth) {
      const authToken = getState().loginReducer.token;

      const actionAuth = {
        ...action,
        payload: {
          ...action.payload,
          authHeaders: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "en-US, en;q=0.8",
            Authorization: `Bearer ${authToken}`,
          },
        },
      };
      return next(actionAuth);
    }

    return next(action);
  };

export default authMiddleware;
