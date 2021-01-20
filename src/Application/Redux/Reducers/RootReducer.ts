import { IAction } from "../Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";
import allReducers from "./AllReducers";

const rootReducer = (state: any, action: IAction) => {
  if (action.type === LOGOUT_REQUEST) {
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
