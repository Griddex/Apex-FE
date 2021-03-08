import { IAction } from "../Actions/ActionTypes";
import {
  PERSIST_STORE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERDETAILS_REQUEST,
  FETCH_USERDETAILS_SUCCESS,
  FETCH_USERDETAILS_FAILURE,
} from "../Actions/LoginActions";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";
import userState from "../State/UserState";

const loginReducer = (state = userState, action: IAction) => {
  switch (action.type) {
    case PERSIST_STORE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
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

    default:
      return state;
  }
};

export default loginReducer;
