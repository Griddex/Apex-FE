import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import {
  PERSIST_AVATAR,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_REGISTRATION,
  RESET_ADMIN,
} from "../Actions/AdminActions";
import userState from "../../../Application/Redux/State/UserState";

const adminReducer = (state = userState, action: IAction) => {
  switch (action.type) {
    case UPDATE_REGISTRATION: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    }
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
        status: action.payload.status,
        errors: new Array(action.payload.errors),
      };
    case RESET_ADMIN: {
      return userState;
    }
    default:
      return state;
  }
};

export default adminReducer;
