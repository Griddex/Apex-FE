import { IAction } from "../Actions/ActionTypes";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../Actions/LogoutActions";
import userState from "../../../Administration/Redux/State/UserState";

export const logoutReducer = (state = userState, action: IAction) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggedOut: action.payload.isLoggedOut,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedOut: action.payload.isLoggedOut,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggedOut: action.payload.isLoggedOut,
      };

    default:
      return state;
  }
};
