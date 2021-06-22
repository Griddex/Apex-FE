import { IAction } from "../Actions/ActionTypes";
import {
  HIDE_SPINNER,
  SHOW_SPINNER,
  RESET_SPINNER,
} from "../Actions/UISpinnerActions";
import uiSpinnerState from "../State/UISpinnerState";

const uiSpinnerReducer = (state = uiSpinnerState, action: IAction) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return {
        ...state,
        pending: true,
        message: action.meta && action.meta.message,
      };

    case HIDE_SPINNER:
      return { ...state, pending: false };

    case RESET_SPINNER: {
      return uiSpinnerState;
    }

    default:
      return state;
  }
};
export default uiSpinnerReducer;
