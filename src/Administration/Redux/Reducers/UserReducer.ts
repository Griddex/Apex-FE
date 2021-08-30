import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import userState from "../State/UserState";
import {
  PERSIST_USER_AVATAR,
  USER_REGISTRATION_FAILURE,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  RESET_USER,
  UPDATE_REGISTRATION,
} from "./../Actions/UserActions";

const userReducer = (state = userState, action: IAction) => {
  switch (action.type) {
    case UPDATE_REGISTRATION: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      };
    }

    case PERSIST_USER_AVATAR:
      return {
        ...state,
        avatarUrl: action.payload.avatarUrl,
      };

    case USER_REGISTRATION_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case USER_REGISTRATION_FAILURE:
      return {
        ...state,
        status: action.payload.status,
        errors: new Array(action.payload.errors),
      };

    case RESET_USER: {
      return userState;
    }

    default:
      return state;
  }
};

export default userReducer;
