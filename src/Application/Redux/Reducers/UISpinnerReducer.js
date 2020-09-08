import { SHOW_SPINNER, HIDE_SPINNER } from "../Actions/UISpinnerActions";

import uiSpinnerState from "./../State/UISpinnerState";

const uiSpinnerReducer = (state = uiSpinnerState, action) => {
  switch (action.type) {
    case SHOW_SPINNER:
      return { ...state, pending: true, message: action.meta.message };

    case HIDE_SPINNER:
      return { ...state, pending: false };

    default:
      return state;
  }
};
export default uiSpinnerReducer;
