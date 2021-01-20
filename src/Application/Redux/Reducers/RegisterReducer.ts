import UserState from "../State/UserState";
import {
  PERSIST_AVATAR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../Actions/RegisterActions";
import { IAction } from "../Actions/ActionTypes";
import { LOGOUT_REQUEST } from "../Actions/LogoutActions";

const registerReducer = (state = UserState, action: IAction) => {
  switch (action.type) {
    case PERSIST_AVATAR:
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        statusCode: action.payload.statusCode,
        errors: new Array(action.payload.errors),
      };
    case LOGOUT_REQUEST:
      return null;
    default:
      return state;
  }
};

export default registerReducer;
