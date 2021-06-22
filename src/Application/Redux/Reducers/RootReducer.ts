import { CLOSE_PROJECT } from "../../../Project/Redux/Actions/ProjectActions";
import { IAction } from "../Actions/ActionTypes";
import { RESET_STORE } from "../Actions/ApplicationActions";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";
import allReducers from "./AllReducers";

const rootReducer = (state: any, action: IAction) => {
  if (action.type === LOGOUT_REQUEST || action.type === RESET_STORE) {
    state = undefined;
    localStorage.clear();
  } else if (action.type === CLOSE_PROJECT) {
    const { projectReducer } = state;
    state = undefined;
    state = { projectReducer };
  }

  return allReducers(state, action);
};

export default rootReducer;
