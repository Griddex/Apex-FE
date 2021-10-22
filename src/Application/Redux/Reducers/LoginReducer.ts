import userState from "../../../Administration/Redux/State/UserState";
import { IAction } from "../Actions/ActionTypes";
import {
  FETCH_USERDETAILS_FAILURE,
  FETCH_USERDETAILS_REQUEST,
  FETCH_USERDETAILS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_USER,
} from "../Actions/LoginActions";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";

const loginReducer = (state = userState, action: IAction) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case FETCH_USERDETAILS_REQUEST:
    case FETCH_USERDETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_FAILURE:
    case FETCH_USERDETAILS_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        errors: new Array(action.payload.errors),
      };

    case LOGOUT_REQUEST:
      return { ...state, undefined };

    case RESET_USER: {
      return userState;
    }

    default:
      return state;
  }
};

export default loginReducer;
